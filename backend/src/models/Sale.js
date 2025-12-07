import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database.js';

const Sale = sequelize.define('Sale', {
  transactionId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'transaction_id'
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'transaction_date'
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'customer_id'
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'customer_name'
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number'
  },
  gender: {
    type: DataTypes.STRING,
    field: 'gender'
  },
  age: {
    type: DataTypes.INTEGER,
    field: 'age'
  },
  productCategory: {
    type: DataTypes.STRING,
    field: 'product_category'
  },
  productId: {
    type: DataTypes.STRING,
    field: 'product_id'
  },
  employeeName: {
    type: DataTypes.STRING,
    field: 'employee_name'
  },
  quantity: {
    type: DataTypes.INTEGER,
    field: 'quantity'
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    field: 'price_per_unit'
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    field: 'total_amount'
  },
  discountPercent: {
    type: DataTypes.FLOAT,
    field: 'discount_percent'
  },
  finalAmount: {
    type: DataTypes.FLOAT,
    field: 'final_amount'
  },
  customerRegion: {
    type: DataTypes.STRING,
    field: 'customer_region'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    field: 'payment_method'
  },
  tags: {
    type: DataTypes.STRING,
    field: 'tags'
  },
  status: {
    type: DataTypes.STRING,
    field: 'order_status'
  }
}, {
  timestamps: false,
  tableName: 'sales_data'
});

export default Sale;
