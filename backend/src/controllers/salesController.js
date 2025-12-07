import { getSales, getAggregatedStats } from '../services/salesService.js';

export const getSalesData = async (req, res) => {
  try {
    const {
      search = '',
      customerRegion,
      gender,
      productCategory,
      tags,
      paymentMethod,
      ageMin,
      ageMax,
      dateStart,
      dateEnd,
      sortBy = 'date-desc',
      page = 1
    } = req.query;

    const filters = {
      customerRegion: customerRegion ? (Array.isArray(customerRegion) ? customerRegion : [customerRegion]) : [],
      gender: gender ? (Array.isArray(gender) ? gender : [gender]) : [],
      productCategory: productCategory ? (Array.isArray(productCategory) ? productCategory : [productCategory]) : [],
      tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [],
      paymentMethod: paymentMethod ? (Array.isArray(paymentMethod) ? paymentMethod : [paymentMethod]) : [],
      ageRange: (ageMin || ageMax) ? { min: ageMin, max: ageMax } : null,
      dateRange: (dateStart || dateEnd) ? { start: dateStart, end: dateEnd } : null
    };

    const salesData = await getSales({
      search,
      filters,
      sortBy,
      page,
      limit: 10
    });

    const stats = await getAggregatedStats(filters, search);

    res.json({
      success: true,
      data: {
        sales: salesData.results,
        pagination: {
          totalCount: salesData.totalCount,
          totalPages: salesData.totalPages,
          currentPage: salesData.currentPage,
          limit: salesData.limit
        },
        stats: {
          totalUnits: stats.totalUnits || 0,
          totalAmount: stats.totalAmount || 0,
          totalDiscount: stats.totalDiscount || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales data',
      error: error.message
    });
  }
};
