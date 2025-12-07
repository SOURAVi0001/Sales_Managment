import React from 'react';
import '../styles/SortDropdown.css';

const SortDropdown = ({ value, onChange }) => {
  const sortOptions = [
    { value: 'date-desc', label: 'Date (Newest First)' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'customerName-asc', label: 'Customer Name (A-Z)' },
    { value: 'customerName-desc', label: 'Customer Name (Z-A)' },
    { value: 'quantity-desc', label: 'Quantity (High to Low)' },
    { value: 'quantity-asc', label: 'Quantity (Low to High)' }
  ];

  const getCurrentLabel = () => {
    const option = sortOptions.find(opt => opt.value === value);
    return option ? option.label : 'Sort by: Customer Name (A-Z)';
  };

  return (
    <div className="sort-dropdown">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sort-select"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
