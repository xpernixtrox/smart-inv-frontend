# 🚀 Quick Interview Cheat Sheet

## Project in 30 Seconds
**Smart Inventory Management System** - Full-stack web app for tracking product inventory with real-time stock updates, search/filter, and low stock alerts.

---

## Tech Stack (Memorize This!)
- **Frontend**: React 19 + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Communication**: REST API (HTTP requests)

---

## 3 Main Components

### 1. Dashboard.jsx
- **Does**: Fetches products, handles search/filter, manages all product operations
- **Key State**: `products`, `searchTerm`, `selectedCategory`
- **Key Functions**: `fetchProducts()`, `handleUpdateStock()`, `handleAddProduct()`

### 2. ProductCard.jsx  
- **Does**: Shows one product, allows stock updates via drag or buttons
- **Cool Feature**: Drag the stock number left/right to adjust
- **Shows**: Name, price, stock, category, low stock alerts

### 3. AddProductModal.jsx
- **Does**: Form popup to add new products
- **Validates**: All required fields before submission

---

## 3 API Endpoints

1. **GET /products** → Returns all products
2. **POST /update-stock** → Updates product stock (needs `id` and `newQuantity`)
3. **POST /add-product** → Adds new product (needs `name`, `price`, `stock`, `category`)

---

## Key Features to Mention

✅ Real-time stock updates  
✅ Drag-to-adjust stock (unique!)  
✅ Search and category filtering  
✅ Low stock visual alerts  
✅ Responsive design  
✅ Smooth animations  

---

## Data Flow (Simple Version)

1. **Page loads** → Dashboard fetches products from backend
2. **User updates stock** → Frontend sends POST request → Backend updates → Frontend refreshes
3. **User adds product** → Form submits → Backend creates product → Added to list

---

## Product Object Structure
```javascript
{
  id: 1,
  name: "Product Name",
  price: 1000,
  stock: 10,
  lowStockThreshold: 5,
  category: "Electronics"
}
```

---

## If Asked "What's Unique?"
**Answer**: "The drag-to-adjust stock feature - users can drag the stock number horizontally to quickly change quantities, which is much faster than clicking buttons."

---

## If Asked "How to Improve?"
**Answer**: "Add a database for persistent storage (currently in-memory), user authentication, product images, and a history log for tracking changes."

---

## Quick Commands
```bash
# Backend
cd smart-inv-backend
npm start  # Runs on port 3001

# Frontend  
cd smart-inv-frontend
npm run dev  # Runs on port 5173
```

---

## React Concepts Used
- `useState` - Managing state
- `useEffect` - Fetching data on mount
- `useRef` - Storing drag values
- Props - Passing data between components
- Event handlers - onClick, onChange, onMouseDown

---

## Remember These Terms
- **REST API**: Standard way to communicate between frontend/backend
- **CORS**: Allows frontend to call backend from different port
- **State**: Data that changes in React components
- **Props**: Data passed from parent to child component
- **Async/Await**: Handling API calls that take time

---

## Confidence Boosters 💪

✅ You built a full-stack application  
✅ You understand React components and state  
✅ You can explain API communication  
✅ You implemented unique UX features  
✅ You handled errors and edge cases  

**You've got this!** 🎯
