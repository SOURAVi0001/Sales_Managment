import { Op } from 'sequelize';
import { sequelize } from '../utils/database.js';
import Sale from '../models/Sale.js';

const buildQuery = (filters, search) => {
  const where = {};

  if (search) {
    where[Op.or] = [
      { customerName: { [Op.iLike]: `%${search}%` } },
      { phoneNumber: { [Op.iLike]: `%${search}%` } }
    ];
  }

  if (filters.customerRegion && filters.customerRegion.length > 0) {
    where.customerRegion = { [Op.in]: filters.customerRegion };
  }

  if (filters.gender && filters.gender.length > 0) {
    where.gender = { [Op.in]: filters.gender };
  }

  if (filters.productCategory && filters.productCategory.length > 0) {
    where.productCategory = { [Op.in]: filters.productCategory };
  }

  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    where.paymentMethod = { [Op.in]: filters.paymentMethod };
  }

  if (filters.tags && filters.tags.length > 0) {
    where.tags = { [Op.in]: filters.tags };
  }

  if (filters.ageRange && (filters.ageRange.min !== undefined || filters.ageRange.max !== undefined)) {
    const ageQuery = {};
    if (filters.ageRange.min !== undefined) {
      ageQuery[Op.gte] = parseInt(filters.ageRange.min);
    }
    if (filters.ageRange.max !== undefined) {
      ageQuery[Op.lte] = parseInt(filters.ageRange.max);
    }
    where.age = ageQuery;
  }

  if (filters.dateRange && (filters.dateRange.start || filters.dateRange.end)) {
    const dateQuery = {};
    if (filters.dateRange.start) {
      dateQuery[Op.gte] = new Date(filters.dateRange.start);
    }
    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      dateQuery[Op.lte] = endDate;
    }
    where.date = dateQuery;
  }

  return where;
};

const buildOrder = (sortBy) => {
  switch (sortBy) {
    case 'date-desc': return [['date', 'DESC']];
    case 'date-asc': return [['date', 'ASC']];
    case 'quantity-desc': return [['quantity', 'DESC']];
    case 'quantity-asc': return [['quantity', 'ASC']];
    case 'customerName-asc': return [['customerName', 'ASC']];
    case 'customerName-desc': return [['customerName', 'DESC']];
    default: return [['date', 'DESC']];
  }
};

export const getSales = async (params) => {
  const {
    search = '',
    filters = {},
    sortBy = 'date-desc',
    page = 1,
    limit = 10
  } = params;

  const where = buildQuery(filters, search);
  const order = buildOrder(sortBy);
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const pageLimit = Math.min(parseInt(limit), 100);

  try {
    const { count, rows } = await Sale.findAndCountAll({
      where,
      order,
      limit: pageLimit,
      offset
    });

    const totalPages = Math.ceil(count / pageLimit);

    return {
      results: rows,
      totalCount: count,
      totalPages,
      currentPage: parseInt(page),
      limit: pageLimit
    };
  } catch (error) {
    console.error('Error in getSales:', error);
    throw new Error(`Failed to fetch sales data: ${error.message}`);
  }
};

export const getAggregatedStats = async (filters, search) => {
  const where = buildQuery(filters, search);

  try {
    const stats = await Sale.findOne({
      where,
      attributes: [
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalUnits'],
        [sequelize.fn('SUM', sequelize.col('total_amount')), 'totalAmount'],
        [sequelize.fn('SUM', sequelize.col('final_amount')), 'totalFinalAmount']
      ],
      raw: true
    });

    const totalUnits = parseFloat(stats?.totalUnits || 0);
    const totalAmount = parseFloat(stats?.totalAmount || 0);
    const totalFinalAmount = parseFloat(stats?.totalFinalAmount || 0);
    const totalDiscount = totalAmount - totalFinalAmount;

    return {
      totalUnits,
      totalAmount,
      totalDiscount
    };
  } catch (error) {
    console.error('Error in getAggregatedStats:', error);
    throw new Error(`Failed to fetch aggregated stats: ${error.message}`);
  }
};
