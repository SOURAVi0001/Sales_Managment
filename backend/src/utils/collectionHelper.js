import mongoose from 'mongoose';

export const getCollectionNames = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    return collections.map(c => c.name);
  } catch (error) {
    console.error('Error listing collections:', error);
    return [];
  }
};
