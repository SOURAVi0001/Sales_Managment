import React from 'react';
import '../styles/StatsCards.css';

const StatsCards = ({ stats }) => {
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="stats-cards">
      <div className="stat-card">
        <div className="stat-label">
          Total units sold
          <span className="stat-info-icon">ℹ️</span>
        </div>
        <div className="stat-value">{stats.totalUnits || 0}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">
          Total Amount
          <span className="stat-info-icon">ℹ️</span>
        </div>
        <div className="stat-value">
          {formatCurrency(stats.totalAmount || 0)}
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">
          Total Discount
          <span className="stat-info-icon">ℹ️</span>
        </div>
        <div className="stat-value">
          {formatCurrency(stats.totalDiscount || 0)}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
