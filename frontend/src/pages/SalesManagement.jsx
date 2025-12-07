import React, { useEffect, useCallback } from 'react';
import { useSalesStore } from '../store/useSalesStore';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import StatsCards from '../components/StatsCards';
import SalesTable from '../components/SalesTable';
import Pagination from '../components/Pagination';
import '../styles/SalesManagement.css';
import { debounce } from '../utils/debounce';

const SalesManagement = () => {
  const {
    sales,
    stats,
    pagination,
    filters,
    search,
    sortBy,
    loading,
    error,
    lastFetchTime,
    setSearch,
    setSortBy,
    updateFilter,
    setCurrentPage,
    fetchSales
  } = useSalesStore();

  const debouncedFetch = useCallback(
    debounce(() => {
      fetchSales();
    }, 500),
    []
  );

  useEffect(() => {
    fetchSales();
  }, [pagination.currentPage, sortBy]);

  useEffect(() => {
    debouncedFetch();
  }, [search, filters]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    updateFilter(filterType, value);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    fetchSales();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="sales-management">
      <Sidebar />
      <div className="main-content">
        <div className="content-header">
          <h1 className="page-title">Sales Management System</h1>
          <div className="header-controls">
            <SearchBar value={search} onChange={handleSearchChange} />
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onRefresh={handleRefresh}
            />
            <SortDropdown value={sortBy} onChange={handleSortChange} />
          </div>
        </div>
        <StatsCards stats={stats} />
        {error && <div className="error-message">Error: {error}</div>}
        {lastFetchTime && (
          <div className="fetch-time-info">
            Loaded in {lastFetchTime}ms • Showing {sales.length} of {pagination.totalCount} results
          </div>
        )}
        <SalesTable sales={sales} loading={loading} />
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SalesManagement;
