import React from 'react';
import '../styles/SalesTable.css';

const SalesTable = ({ sales, loading }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatCurrency = (amount) => {
    return `₹ ${amount?.toLocaleString('en-IN') || '0'}`;
  };

  if (loading) {
    return <div className="table-loading">Loading...</div>;
  }

  if (!sales || sales.length === 0) {
    return <div className="table-empty">No sales data found</div>;
  }

  return (
    <div className="sales-table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer region</th>
            <th>Product ID</th>
            <th>Employee name</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>{sale['Transaction ID'] || sale.transactionId || sale.Transaction_ID || ''}</td>
              <td>{formatDate(sale.Date || sale.date)}</td>
              <td>{sale['Customer ID'] || sale.customerId || sale.Customer_ID || ''}</td>
              <td>{sale['Customer Name'] || sale.customerName || sale.Customer_Name || ''}</td>
              <td>
                <span className="phone-number">
                  {sale['Phone Number'] || sale.phoneNumber || sale.Phone_Number || ''}
                  <span className="phone-icon">🔗</span>
                </span>
              </td>
              <td>{sale.Gender || sale.gender || ''}</td>
              <td>{sale.Age || sale.age || ''}</td>
              <td>{sale['Product Category'] || sale.productCategory || sale.Product_Category || ''}</td>
              <td>{String(sale.Quantity || sale.quantity || '').padStart(2, '0')}</td>
              <td>{formatCurrency(sale['Total Amount'] || sale.totalAmount || sale.Total_Amount || 0)}</td>
              <td>{sale['Customer Region'] || sale.customerRegion || sale.Customer_Region || ''}</td>
              <td>{sale['Product ID'] || sale.productId || sale.Product_ID || ''}</td>
              <td>{sale['Employee Name'] || sale.employeeName || sale.Employee_Name || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
