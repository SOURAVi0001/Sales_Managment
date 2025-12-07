import Sale from '../models/Sale.js';

const buildQuery = (filters, search) => {
  const query = {};
  const allConditions = [];

  if (search) {
    allConditions.push({
      $or: [
        { 'Customer Name': { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { 'Phone Number': { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } }
      ]
    });
  }

  if (filters.customerRegion && filters.customerRegion.length > 0) {
    allConditions.push({
      $or: [
        { 'Customer Region': { $in: filters.customerRegion } },
        { customerRegion: { $in: filters.customerRegion } }
      ]
    });
  }

  if (filters.gender && filters.gender.length > 0) {
    allConditions.push({
      $or: [
        { Gender: { $in: filters.gender } },
        { gender: { $in: filters.gender } }
      ]
    });
  }

  if (filters.productCategory && filters.productCategory.length > 0) {
    allConditions.push({
      $or: [
        { 'Product Category': { $in: filters.productCategory } },
        { productCategory: { $in: filters.productCategory } }
      ]
    });
  }

  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    allConditions.push({
      $or: [
        { 'Payment Method': { $in: filters.paymentMethod } },
        { paymentMethod: { $in: filters.paymentMethod } }
      ]
    });
  }

  if (filters.tags && filters.tags.length > 0) {
    allConditions.push({
      $or: [
        { Tags: { $in: filters.tags } },
        { tags: { $in: filters.tags } }
      ]
    });
  }

  if (filters.ageRange && (filters.ageRange.min !== undefined || filters.ageRange.max !== undefined)) {
    const ageQuery = {};
    if (filters.ageRange.min !== undefined) {
      ageQuery.$gte = parseInt(filters.ageRange.min);
    }
    if (filters.ageRange.max !== undefined) {
      ageQuery.$lte = parseInt(filters.ageRange.max);
    }
    allConditions.push({
      $or: [
        { Age: ageQuery },
        { age: ageQuery }
      ]
    });
  }

  if (filters.dateRange && (filters.dateRange.start || filters.dateRange.end)) {
    const dateQuery = {};
    if (filters.dateRange.start) {
      dateQuery.$gte = new Date(filters.dateRange.start);
    }
    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      dateQuery.$lte = endDate;
    }
    allConditions.push({
      $or: [
        { Date: dateQuery },
        { date: dateQuery }
      ]
    });
  }

  if (allConditions.length === 0) {
    return {};
  }

  if (allConditions.length === 1) {
    return allConditions[0];
  }

  query.$and = allConditions;
  return query;
};

const buildSort = (sortBy) => {
  switch (sortBy) {
    case 'date-desc':
      return { Date: -1, date: -1 };
    case 'date-asc':
      return { Date: 1, date: 1 };
    case 'quantity-desc':
      return { Quantity: -1, quantity: -1 };
    case 'quantity-asc':
      return { Quantity: 1, quantity: 1 };
    case 'customerName-asc':
      return { 'Customer Name': 1, customerName: 1 };
    case 'customerName-desc':
      return { 'Customer Name': -1, customerName: -1 };
    default:
      return { Date: -1, date: -1 };
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

  const query = buildQuery(filters, search);
  const sort = buildSort(sortBy);
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [results, totalCount] = await Promise.all([
    Sale.find(query).sort(sort).skip(skip).limit(parseInt(limit)).lean(),
    Sale.countDocuments(query)
  ]);

  const totalPages = Math.ceil(totalCount / parseInt(limit));

  return {
    results,
    totalCount,
    totalPages,
    currentPage: parseInt(page),
    limit: parseInt(limit)
  };
};

export const getAggregatedStats = async (filters, search) => {
  const query = buildQuery(filters, search);

  const stats = await Sale.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        totalUnits: {
          $sum: {
            $ifNull: ['$Quantity', { $ifNull: ['$quantity', 0] }]
          }
        },
        totalAmount: {
          $sum: {
            $ifNull: ['$Total Amount', { $ifNull: ['$totalAmount', 0] }]
          }
        },
        totalDiscount: {
          $sum: {
            $subtract: [
              { $ifNull: ['$Total Amount', { $ifNull: ['$totalAmount', 0] }] },
              { $ifNull: ['$Final Amount', { $ifNull: ['$finalAmount', 0] }] }
            ]
          }
        }
      }
    }
  ]);

  if (stats.length === 0) {
    return {
      totalUnits: 0,
      totalAmount: 0,
      totalDiscount: 0
    };
  }

  return stats[0];
};
