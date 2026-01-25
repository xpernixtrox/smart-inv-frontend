# 📊 Visual Flow Diagram

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  App.jsx                                               │  │
│  │  - Layout & Header                                     │  │
│  └──────────────┬─────────────────────────────────────────┘  │
│                 │                                             │
│                 ▼                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Dashboard.jsx                                       │  │
│  │  - Fetches products                                  │  │
│  │  - Search & Filter logic                            │  │
│  │  - Manages state                                     │  │
│  └──────┬───────────────────────┬────────────────────────┘  │
│         │                       │                            │
│         ▼                       ▼                            │
│  ┌──────────────┐      ┌──────────────────┐                │
│  │ ProductCard  │      │ AddProductModal  │                │
│  │ - Display    │      │ - Form           │                │
│  │ - Update UI  │      │ - Validation      │                │
│  └──────────────┘      └──────────────────┘                │
└───────────────────────────────┬─────────────────────────────┘
                                │
                    HTTP Requests (GET/POST)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  server.js                                           │  │
│  │  - Express server on port 3001                      │  │
│  │  - In-memory product array                          │  │
│  └──────┬───────────────────────┬────────────────────────┘  │
│         │                       │                            │
│         ▼                       ▼                            │
│  ┌──────────────┐      ┌──────────────────┐                │
│  │ GET /products│      │ POST /update-    │                │
│  │              │      │      stock       │                │
│  │ Returns:     │      │ POST /add-       │                │
│  │ All products │      │      product    │                │
│  └──────────────┘      └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

---

## User Journey: Updating Stock

```
1. User sees ProductCard
   │
   ├─ Option A: Click + / - buttons
   │  └─> Calls handleUpdateStock(id, newQuantity)
   │
   └─ Option B: Drag stock number left/right
      └─> Mouse events calculate new quantity
          └─> Calls handleUpdateStock(id, newQuantity)

2. Dashboard.jsx sends POST request
   POST /update-stock
   Body: { id: 1, newQuantity: 5 }

3. Backend validates & updates
   - Checks if product exists
   - Validates quantity >= 0
   - Updates products array
   - Returns updated product

4. Frontend receives response
   - Updates products state
   - ProductCard re-renders with new stock
   - Shows loading state during update
```

---

## User Journey: Adding Product

```
1. User clicks "+" button (bottom right)
   │
   └─> Opens AddProductModal

2. User fills form
   - Name, Price, Stock, Category
   - Optional: Low Stock Threshold

3. User clicks "Add Product"
   │
   ├─> Frontend validates (all fields required)
   │
   └─> Sends POST /add-product
       Body: { name, price, stock, category, lowStockThreshold }

4. Backend creates product
   - Generates new ID (max existing + 1)
   - Adds to products array
   - Returns new product

5. Frontend updates
   - Adds product to state
   - Closes modal
   - Product appears in grid
```

---

## Component Hierarchy

```
App
└── Dashboard
    ├── Search Input
    ├── Category Filters
    ├── ProductCard (multiple)
    │   ├── Product Info
    │   ├── Stock Controls
    │   └── Low Stock Alert
    └── AddProductModal (when open)
        └── Form Fields
```

---

## State Flow

```
Dashboard State:
├── products: []           → Fetched from API
├── searchTerm: ""        → User input
├── selectedCategory: ""  → User selection
├── loading: true/false   → API call status
└── isModalOpen: false   → Modal visibility

ProductCard State:
├── localStock: number    → Temporary stock during drag
└── isDragging: boolean   → Drag operation status

AddProductModal State:
├── formData: {}          → Form input values
├── loading: boolean      → Submission status
└── error: string/null    → Validation errors
```

---

## API Request/Response Examples

### GET /products
**Request:**
```
GET http://localhost:3001/products
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Quantum Processor Unit",
    "price": 450000,
    "stock": 1,
    "lowStockThreshold": 2,
    "category": "Components"
  }
]
```

### POST /update-stock
**Request:**
```json
POST http://localhost:3001/update-stock
Content-Type: application/json

{
  "id": 1,
  "newQuantity": 5
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Quantum Processor Unit",
  "price": 450000,
  "stock": 5,
  "lowStockThreshold": 2,
  "category": "Components"
}
```

---

## Error Handling Flow

```
API Call Fails
    │
    ├─> Network Error
    │   └─> Shows error message
    │       └─> "Retry Connection" button
    │
    ├─> Validation Error (400)
    │   └─> Shows error in alert/modal
    │
    └─> Product Not Found (404)
        └─> Shows error message
```

---

## Key React Concepts Used

```
1. useState Hook
   └─> Manages component state
       Example: const [products, setProducts] = useState([])

2. useEffect Hook
   └─> Runs code on component mount
       Example: useEffect(() => { fetchProducts() }, [])

3. Props
   └─> Pass data from parent to child
       Example: <ProductCard product={product} />

4. Event Handlers
   └─> Handle user interactions
       Example: onClick, onChange, onMouseDown

5. Conditional Rendering
   └─> Show/hide based on state
       Example: {loading && <Spinner />}
```

---

## File Responsibilities

```
Frontend Files:
├── App.jsx              → Layout wrapper
├── Dashboard.jsx        → Main logic & API calls
├── ProductCard.jsx      → Product display & interactions
└── AddProductModal.jsx  → Form for adding products

Backend Files:
└── server.js            → API endpoints & data storage
```

---

This visual guide helps you understand how everything connects! 🎯
