import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({}, {
      strict: false,
      timestamps: false
});

saleSchema.index({ 'Customer Name': 'text', 'Phone Number': 'text' });
saleSchema.index({ customerName: 'text', phoneNumber: 'text' });
saleSchema.index({ 'Customer Region': 1 });
saleSchema.index({ customerRegion: 1 });
saleSchema.index({ Gender: 1 });
saleSchema.index({ gender: 1 });
saleSchema.index({ 'Product Category': 1 });
saleSchema.index({ productCategory: 1 });
saleSchema.index({ Date: 1 });
saleSchema.index({ date: 1 });

const Sale = mongoose.model('Sale', saleSchema, 'sales');

export default Sale;
