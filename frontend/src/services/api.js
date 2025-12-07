import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchSalesData = async (params) => {
  const { search, filters, sortBy, page } = params;
  const queryParams = new URLSearchParams();

  if (search) {
    queryParams.append('search', search);
  }

  if (filters.customerRegion && filters.customerRegion.length > 0) {
    filters.customerRegion.forEach(region => {
      queryParams.append('customerRegion', region);
    });
  }

  if (filters.gender && filters.gender.length > 0) {
    filters.gender.forEach(g => {
      queryParams.append('gender', g);
    });
  }

  if (filters.productCategory && filters.productCategory.length > 0) {
    filters.productCategory.forEach(cat => {
      queryParams.append('productCategory', cat);
    });
  }

  if (filters.tags && filters.tags.length > 0) {
    filters.tags.forEach(tag => {
      queryParams.append('tags', tag);
    });
  }

  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    filters.paymentMethod.forEach(pm => {
      queryParams.append('paymentMethod', pm);
    });
  }

  if (filters.ageRange) {
    if (filters.ageRange.min !== undefined && filters.ageRange.min !== null) {
      queryParams.append('ageMin', filters.ageRange.min);
    }
    if (filters.ageRange.max !== undefined && filters.ageRange.max !== null) {
      queryParams.append('ageMax', filters.ageRange.max);
    }
  }

  if (filters.dateRange) {
    if (filters.dateRange.start) {
      queryParams.append('dateStart', filters.dateRange.start);
    }
    if (filters.dateRange.end) {
      queryParams.append('dateEnd', filters.dateRange.end);
    }
  }

  if (sortBy) {
    queryParams.append('sortBy', sortBy);
  }

  if (page) {
    queryParams.append('page', page);
  }

  const response = await api.get(`/api/sales?${queryParams.toString()}`);
  return response.data;
};
