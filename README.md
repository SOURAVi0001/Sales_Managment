# Retail Sales Management System

## Overview

A comprehensive retail sales management system built with a modern tech stack. The system provides a user-friendly interface for managing and analyzing sales transactions with advanced search, filtering, sorting, and pagination capabilities.

## Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB Atlas (Cloud Database)
- Mongoose ODM

**Frontend:**
- React 18
- Vite
- Zustand (State Management)
- Axios (HTTP Client)

## Search Implementation Summary

The search functionality allows users to search sales records by:
- Customer Name (case-insensitive)
- Phone Number (case-insensitive)

Search is implemented using MongoDB regex queries with case-insensitive matching. The search query is debounced on the frontend to optimize API calls and improve performance.

## Filter Implementation Summary

Multi-select filters:
- Customer Region (North, South, East, West)
- Gender (Male, Female, Other)
- Product Category (Clothing, Beauty, Electronics, Food)
- Tags (organic, skincare, premium)
- Payment Method (UPI, Cash, Card, Net Banking)

Range filters:
- Age Range (min and max values)
- Date Range (start and end dates)

All filters use MongoDB query operators ($in for multi-select, $gte/$lte for ranges) and can be combined for complex filtering scenarios.

## Sorting Implementation Summary

Available sort options:
- Date (Newest First / Oldest First)
- Customer Name (A-Z / Z-A)
- Quantity (High to Low / Low to High)

Sorting is implemented using MongoDB sort queries with proper indexing for optimal performance.

## Pagination Implementation Summary

Pagination features:
- 10 items per page
- Total page count calculation
- Current page tracking
- Navigation controls

Pagination is implemented using MongoDB skip and limit operators, with total count calculated separately for accurate page information.

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=mongodb+srv://souravpandr_db_user:icGFMHClfQEjuKeA@cluster0.mr5dqff.mongodb.net/
FRONTEND_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend application will run on `http://localhost:5173`

## Deployment Instructions

### Backend Deployment (Render / Railway)

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. Create a new Web Service on Render or Railway

3. Configure the following:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:**
     - `PORT` (usually auto-assigned)
     - `MONGODB_URI` (your MongoDB Atlas connection string)
     - `FRONTEND_URL` (your deployed frontend URL)

4. Deploy the service

### Frontend Deployment (Vercel / Netlify)

1. Push your code to a Git repository

2. Import the project on Vercel or Netlify

3. Configure build settings:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`

4. Set environment variables:
   - `VITE_API_URL` (your deployed backend URL)

5. Deploy the application

6. Update the backend `.env` file with the deployed frontend URL:
   - `FRONTEND_URL` (your deployed frontend URL for CORS)

## Notes

- Ensure MongoDB Atlas network access allows connections from your deployment platform
- CORS is configured to only allow requests from the specified frontend URL
- All environment variables should be set in your deployment platform's environment settings
