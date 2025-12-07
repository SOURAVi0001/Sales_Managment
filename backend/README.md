# Backend - Retail Sales Management System

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory with:
```
PORT=5000
MONGODB_URI=mongodb+srv://souravpandr_db_user:icGFMHClfQEjuKeA@cluster0.mr5dqff.mongodb.net/
FRONTEND_URL=http://localhost:5173
```

3. Start the development server:
```bash
npm run dev
```

Or start production server:
```bash
npm start
```

## MongoDB Collection

The application expects data in a MongoDB collection named `sales`. The model is flexible and supports both:
- CSV-style field names (with spaces, e.g., "Customer Name", "Phone Number")
- camelCase field names (e.g., "customerName", "phoneNumber")

If your collection has a different name, update the collection name in `src/models/Sale.js` (line 19).

## API Endpoints

- `GET /api/sales` - Get sales data with filters, search, sorting, and pagination
  - Query parameters:
    - `search` - Search by customer name or phone number
    - `customerRegion` - Filter by customer region (can be multiple)
    - `gender` - Filter by gender (can be multiple)
    - `productCategory` - Filter by product category (can be multiple)
    - `tags` - Filter by tags (can be multiple)
    - `paymentMethod` - Filter by payment method (can be multiple)
    - `ageMin` - Minimum age filter
    - `ageMax` - Maximum age filter
    - `dateStart` - Start date filter (YYYY-MM-DD)
    - `dateEnd` - End date filter (YYYY-MM-DD)
    - `sortBy` - Sort option (date-desc, date-asc, customerName-asc, customerName-desc, quantity-desc, quantity-asc)
    - `page` - Page number (default: 1)
- `GET /health` - Health check endpoint
