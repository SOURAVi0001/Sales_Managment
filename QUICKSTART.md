# Quick Start Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account with data already uploaded

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and frontend URL
npm run dev
```

Backend will run on `http://localhost:5000`

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev
```

Frontend will run on `http://localhost:5173`

## Important Notes

1. **MongoDB Collection Name**: The backend expects a collection named `sales`. If your collection has a different name, update it in `backend/src/models/Sale.js` (line 19).

2. **Field Names**: The system supports both:
   - CSV-style field names: "Customer Name", "Phone Number", etc.
   - camelCase field names: "customerName", "phoneNumber", etc.

3. **Environment Variables**: 
   - Backend `.env` must have: `MONGODB_URI`, `PORT`, `FRONTEND_URL`
   - Frontend `.env` must have: `VITE_API_URL`

## Testing

1. Open `http://localhost:5173` in your browser
2. You should see the Sales Management System interface
3. Try searching, filtering, sorting, and pagination features
