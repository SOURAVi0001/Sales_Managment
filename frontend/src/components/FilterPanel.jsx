import React, { useState } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange, onRefresh }) => {
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleMultiSelect = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange(filterType, newValues);
  };

  const handleAgeRange = (type, value) => {
    const currentRange = filters.ageRange || {};
    onFilterChange('ageRange', {
      ...currentRange,
      [type]: value ? parseInt(value) : null
    });
  };

  const handleDateRange = (type, value) => {
    const currentRange = filters.dateRange || {};
    onFilterChange('dateRange', {
      ...currentRange,
      [type]: value || null
    });
  };

  return (
    <div className="filter-panel">
      <button className="filter-icon-btn" onClick={onRefresh} title="Refresh">
        🔄
      </button>
      <div className="filter-dropdown">
        <button className="filter-btn" onClick={() => toggleFilter('customerRegion')}>
          Customer Region
        </button>
        {openFilter === 'customerRegion' && (
          <div className="filter-menu">
            {['North', 'South', 'East', 'West'].map(region => (
              <label key={region} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={(filters.customerRegion || []).includes(region)}
                  onChange={() => handleMultiSelect('customerRegion', region)}
                />
                {region}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="filter-dropdown">
        <button className="filter-btn" onClick={() => toggleFilter('gender')}>
          Gender
        </button>
        {openFilter === 'gender' && (
          <div className="filter-menu">
            {['Male', 'Female', 'Other'].map(gender => (
              <label key={gender} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={(filters.gender || []).includes(gender)}
                  onChange={() => handleMultiSelect('gender', gender)}
                />
                {gender}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="filter-dropdown">
        <button className="filter-btn" onClick={() => toggleFilter('ageRange')}>
          Age Range
        </button>
        {openFilter === 'ageRange' && (
          <div className="filter-menu">
            <div className="filter-range">
              <input
                type="number"
                placeholder="Min"
                value={filters.ageRange?.min || ''}
                onChange={(e) => handleAgeRange('min', e.target.value)}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.ageRange?.max || ''}
                onChange={(e) => handleAgeRange('max', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="filter-dropdown">
        <button className="filter-btn" onClick={() => toggleFilter('productCategory')}>
          Product Category
        </button>
        {openFilter === 'productCategory' && (
          <div className="filter-menu">
            {['Clothing', 'Beauty', 'Electronics', 'Food'].map(cat => (
              <label key={cat} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={(filters.productCategory || []).includes(cat)}
                  onChange={() => handleMultiSelect('productCategory', cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="filter-dropdown">
        <button className="filter-btn" onClick={() => toggleFilter('tags')}>
          Tags
        </button>
        {openFilter === 'tags' && (
          <div className="filter-menu">
            {['organic', 'skincare', 'premium'].map(tag => (
              <label key={tag} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={(filters.tags || []).includes(tag)}
                  onChange={() => handleMultiSelect('tags', tag)}
                />
                {tag}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="filter-dropdown">
        <button className="filter-btn" onClick={() => toggleFilter('paymentMethod')}>
          Payment Method
        </button>
        {openFilter === 'paymentMethod' && (
          <div className="filter-menu">
            {['UPI', 'Cash', 'Card', 'Net Banking'].map(method => (
              <label key={method} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={(filters.paymentMethod || []).includes(method)}
                  onChange={() => handleMultiSelect('paymentMethod', method)}
                />
                {method}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="filter-dropdown">
        <button className="filter-btn" onClick={() => toggleFilter('date')}>
          Date
        </button>
        {openFilter === 'date' && (
          <div className="filter-menu">
            <div className="filter-range">
              <input
                type="date"
                value={filters.dateRange?.start || ''}
                onChange={(e) => handleDateRange('start', e.target.value)}
              />
              <span>to</span>
              <input
                type="date"
                value={filters.dateRange?.end || ''}
                onChange={(e) => handleDateRange('end', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
