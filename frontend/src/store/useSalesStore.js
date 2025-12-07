import { create } from 'zustand';
import { fetchSalesData } from '../services/api';

export const useSalesStore = create((set, get) => ({
      sales: [],
      stats: {
            totalUnits: 0,
            totalAmount: 0,
            totalDiscount: 0
      },
      pagination: {
            totalCount: 0,
            totalPages: 0,
            currentPage: 1,
            limit: 10
      },
      filters: {
            customerRegion: [],
            gender: [],
            productCategory: [],
            tags: [],
            paymentMethod: [],
            ageRange: null,
            dateRange: null
      },
      search: '',
      sortBy: 'date-desc',
      loading: false,
      error: null,

      setSearch: (search) => set({ search }),

      setSortBy: (sortBy) => set({ sortBy }),

      setFilters: (filters) => set({ filters }),

      updateFilter: (filterType, value) => {
            const { filters } = get();
            set({
                  filters: {
                        ...filters,
                        [filterType]: value
                  }
            });
      },

      setCurrentPage: (page) => set({ pagination: { ...get().pagination, currentPage: page } }),

      fetchSales: async () => {
            set({ loading: true, error: null });
            try {
                  const { search, filters, sortBy, pagination } = get();
                  const response = await fetchSalesData({
                        search,
                        filters,
                        sortBy,
                        page: pagination.currentPage
                  });
                  set({
                        sales: response.data.sales,
                        stats: response.data.stats,
                        pagination: response.data.pagination,
                        loading: false
                  });
            } catch (error) {
                  set({ error: error.message, loading: false });
            }
      }
}));
