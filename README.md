# 1Fi Marketplace

A mobile first marketplace experience built for the 1Fi SDE Intern assignment. It extends the existing 1Fi Shop interface with a third section called **1Fi Marketplace**, where users can browse products, select variants, compare EMI plans and proceed with their selected plan.

## Live Links

- **Frontend:** https://1-fi-market-place-sable.vercel.app
- **Backend API:** https://onefi-marketplace-mrji.onrender.com
- **GitHub:** https://github.com/jollyhub8278/1Fi-MarketPlace

## Features

- Mobile first interface consistent with the existing 1Fi Shop experience
- Top Brands, Nearby Stores and 1Fi Marketplace tabs
- Dynamic product data retrieved from MongoDB through REST APIs
- Product search
- Brand based filtering
- Price and EMI sorting
- Unique URL for every product
- Product variants with different colours, storage, pricing and stock
- Multiple EMI plans for each variant
- Down-payment, interest-rate and cashback information
- Selectable EMI plans
- Proceed confirmation flow
- Loading skeletons
- Empty, error and not found states
- Responsive centred mobile layout

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- Zod
- Helmet
- Morgan
- CORS

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Local Setup

### Prerequisites

- Node.js 20 or later
- npm
- MongoDB Atlas account or local MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/jollyhub8278/1Fi-MarketPlace.git
cd 1Fi-MarketPlace
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create `backend/.env` using `backend/.env.example`:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
```

Seed the database:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

### 3. Configure the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env` using `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Available Scripts

### Backend

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Compile TypeScript |
| `npm start` | Start the compiled production server |
| `npm run seed` | Insert or update product seed data |

### Frontend

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## API Endpoints

Base URL:

```text
https://onefi-marketplace-mrji.onrender.com/api
```

### Health check

```http
GET /health
```

Example response:

```json
{
  "success": true,
  "message": "1Fi Marketplace API is running"
}
```

### Retrieve all products

```http
GET /products
```

Example response:

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "product-id",
      "name": "Apple iPhone 17 Pro",
      "slug": "apple-iphone-17-pro",
      "brand": "Apple",
      "category": "Smartphones",
      "thumbnail": "/products/iphone-17-pro.jpg",
      "variants": []
    }
  ]
}
```

### Search products

```http
GET /products?search=iphone
```

The search checks product names, brands and categories.

### Filter by category

```http
GET /products?category=Smartphones
```

### Retrieve a product by slug

```http
GET /products/apple-iphone-17-pro
```

### Unknown product

```http
GET /products/unknown-product
```

Returns HTTP `404` with an error response.

## API Testing

The REST API was manually tested using Postman to verify successful responses, query handling and error states.

Tested scenarios include:

- API health check
- Retrieving all products
- Searching products using query parameters
- Retrieving a product by slug
- Handling an unknown product with a `404` response

## Database Schema

### Product

| Field | Type | Description |
|---|---|---|
| `name` | String | Product name |
| `slug` | String | Unique URL-friendly identifier |
| `brand` | String | Product brand |
| `category` | String | Product category |
| `description` | String | Product description |
| `thumbnail` | String | Marketplace image path |
| `specifications` | Map | Product specification pairs |
| `variants` | Array | Available product variants |
| `isActive` | Boolean | Product availability status |

### Product Variant

| Field | Type | Description |
|---|---|---|
| `sku` | String | Variant SKU |
| `color` | String | Product colour |
| `storage` | String | Storage option |
| `finish` | String | Optional finish |
| `mrp` | Number | Maximum retail price |
| `price` | Number | Current selling price |
| `images` | String[] | Variant image paths |
| `stock` | Number | Available stock |
| `emiPlans` | Array | EMI options for the variant |

### EMI Plan

| Field | Type | Description |
|---|---|---|
| `tenureMonths` | Number | EMI duration |
| `monthlyPayment` | Number | Monthly payment |
| `interestRate` | Number | Annual interest rate |
| `cashback` | Number | Available cashback |
| `downPayment` | Number | Initial payment |

## Data Flow

1. React requests products through the Axios API client.
2. TanStack Query manages loading, caching and error states.
3. Express routes requests to the product controller and service.
4. Mongoose retrieves product and EMI information from MongoDB.
5. The API returns structured JSON to the frontend.
6. Selecting a variant updates its image, price, stock and EMI plans.
7. Selecting an EMI plan updates the Proceed CTA and confirmation sheet.

## Design Decisions

- The interface is mobile-first because the feature extends the existing 1Fi application experience.
- On wider screens, the application remains centred inside a mobile-width container.
- Product and EMI information is stored in MongoDB rather than hardcoded in React components.
- Product slugs provide readable and shareable URLs.
- EMI payments are calculated during database seeding.
- Top Brands and Nearby Stores are intentionally left without full implementation according to the assignment scope.

## Deployment Notes

The frontend uses a Vercel rewrite rule so React Router URLs work when opened directly.

Production environment variables:

### Vercel

```env
VITE_API_URL=https://onefi-marketplace-mrji.onrender.com/api
```

### Render

```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=https://1-fi-market-place-sable.vercel.app
```

## Author

**Bharti Jangir**  
B.Tech, IIT Guwahati
