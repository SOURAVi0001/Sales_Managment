# Architecture Documentation

## Backend Architecture

### Folder Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   │   └── salesController.js
│   ├── services/         # Business logic layer
│   │   └── salesService.js
│   ├── models/           # Database models/schemas
│   │   └── Sale.js
│   ├── routes/           # API route definitions
│   │   └── salesRoutes.js
│   ├── utils/            # Utility functions
│   │   └── database.js
│   └── index.js          # Application entry point
├── .env                  # Environment variables
├── package.json
└── README.md
```

### Module Responsibilities

**controllers/salesController.js**
- Handles HTTP requests and responses
- Extracts query parameters from requests
- Validates and transforms request data
- Calls service layer for business logic
- Formats and sends responses

**services/salesService.js**
- Contains all business logic
- Builds MongoDB queries from filters
- Handles search, filtering, sorting, and pagination
- Performs database aggregations for statistics
- Returns processed data to controllers

**models/Sale.js**
- Defines Mongoose schema for sales documents
- Creates database indexes for performance
- Validates data structure

**routes/salesRoutes.js**
- Defines API endpoints
- Maps routes to controller functions
- Handles route-specific middleware

**utils/database.js**
- Manages MongoDB connection
- Handles connection errors
- Provides connection status

**index.js**
- Initializes Express application
- Configures middleware (CORS, JSON parsing)
- Establishes database connection
- Sets up route handlers
- Starts the server

### Data Flow

1. **Request Reception:** Express receives HTTP request
2. **Route Matching:** Route handler matches request to endpoint
3. **Controller Processing:** Controller extracts and validates parameters
4. **Service Execution:** Service builds queries and executes database operations
5. **Response Formatting:** Controller formats service results into JSON response
6. **Client Delivery:** Response sent to client with appropriate status code

### Database Query Flow

1. **Query Building:** Service builds MongoDB query object based on filters
2. **Search Integration:** Search terms added using regex operators
3. **Filter Application:** Multi-select and range filters applied using MongoDB operators
4. **Sorting:** Sort criteria applied using MongoDB sort
5. **Pagination:** Skip and limit operators applied for pagination
6. **Execution:** Query executed with parallel count query for pagination metadata

## Frontend Architecture

### Folder Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Sidebar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SortDropdown.jsx
│   │   ├── StatsCards.jsx
│   │   ├── SalesTable.jsx
│   │   └── Pagination.jsx
│   ├── pages/            # Page components
│   │   └── SalesManagement.jsx
│   ├── services/         # API service functions
│   │   └── api.js
│   ├── store/            # State management
│   │   └── useSalesStore.js
│   ├── utils/            # Utility functions
│   │   └── debounce.js
│   ├── styles/           # CSS stylesheets
│   │   ├── index.css
│   │   ├── SalesManagement.css
│   │   ├── Sidebar.css
│   │   ├── SearchBar.css
│   │   ├── FilterPanel.css
│   │   ├── SortDropdown.css
│   │   ├── StatsCards.css
│   │   ├── SalesTable.css
│   │   └── Pagination.css
│   ├── App.jsx           # Root component
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── .env                  # Environment variables
├── package.json
└── README.md
```

### Module Responsibilities

**components/Sidebar.jsx**
- Renders navigation sidebar
- Handles sidebar menu expansion/collapse
- Manages navigation state

**components/SearchBar.jsx**
- Provides search input field
- Triggers search on user input
- Displays search placeholder

**components/FilterPanel.jsx**
- Renders all filter dropdowns
- Manages filter state and selections
- Handles multi-select and range filters
- Provides refresh functionality

**components/SortDropdown.jsx**
- Renders sorting options dropdown
- Manages sort selection state
- Displays current sort option

**components/StatsCards.jsx**
- Displays summary statistics
- Formats currency values
- Shows total units, amount, and discount

**components/SalesTable.jsx**
- Renders sales data table
- Formats dates and currency
- Handles loading and empty states
- Displays all table columns

**components/Pagination.jsx**
- Renders pagination controls
- Manages page navigation
- Highlights current page

**pages/SalesManagement.jsx**
- Main page component
- Orchestrates all child components
- Manages component interactions
- Handles data fetching coordination

**services/api.js**
- Configures Axios client
- Builds API request URLs with query parameters
- Handles API communication
- Transforms request/response data

**store/useSalesStore.js**
- Manages global application state
- Stores sales data, filters, pagination
- Provides state update functions
- Coordinates data fetching

**utils/debounce.js**
- Implements debounce function
- Optimizes search input handling
- Reduces API call frequency

### Data Flow

1. **User Interaction:** User performs action (search, filter, sort, paginate)
2. **State Update:** Zustand store updates relevant state
3. **Effect Trigger:** useEffect hook detects state change
4. **API Call:** Service function builds and sends API request
5. **Response Handling:** Store receives and stores response data
6. **UI Update:** React components re-render with new data

### State Management Flow

1. **Initial Load:** Store fetches initial data on mount
2. **Filter Changes:** Store updates filter state, triggers refetch
3. **Search Input:** Debounced search updates store, triggers refetch
4. **Sort Change:** Store updates sort state, triggers refetch with new sort
5. **Page Change:** Store updates page number, triggers refetch for new page
6. **Data Storage:** All fetched data stored in Zustand store for global access

### Component Hierarchy

```
SalesManagement (Page)
├── Sidebar
├── Content Header
│   ├── SearchBar
│   ├── FilterPanel
│   └── SortDropdown
├── StatsCards
├── SalesTable
└── Pagination
```

## Integration Flow

1. **Frontend Request:** User action triggers API call via service
2. **HTTP Request:** Axios sends request to backend API endpoint
3. **CORS Validation:** Backend validates request origin
4. **Request Processing:** Backend processes request through layers
5. **Database Query:** MongoDB query executed with filters
6. **Response Generation:** Backend formats and sends JSON response
7. **Frontend Update:** Frontend receives response and updates state
8. **UI Re-render:** React components update with new data
