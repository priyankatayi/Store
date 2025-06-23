
# 🛒Nature's Crate - Full Stack Grocery Store Application

A modern full-stack grocery store web application built with **React**, **Node.js**, **MongoDB**, and **Stripe** for seamless shopping and checkout experiences.


## 🔗 Live Demo

- 🌐 Frontend: [https://store-alpha-weld.vercel.app/](https://store-alpha-weld.vercel.app/)
- 🛠 Backend: [https://store-backend-taupe.vercel.app/](https://store-backend-taupe.vercel.app/)

---

## 🔧 Tech Stack

### Frontend
- ⚛️ React 19
- 🧭 React Router DOM
- 🌬 Tailwind CSS
- 🍞 React Hot Toast (Notifications)
- ⚡️ Vite (Development Tool)
- 📦 Axios (API Calls)

### Backend
- 🧠 Node.js + Express.js
- 🍃 MongoDB with Mongoose ODM
- 🔐 JWT Authentication + Bcrypt for password hashing
- 📦 Multer (File Uploads)
- ☁️ Cloudinary (Image Storage)
- 💳 Stripe API (Payment Integration)
- 🍪 Cookie-Parser (Auth tokens)
- 🌐 CORS

---

## 🖥️ Features

### 🛍️ Customer
- Browse grocery items with images, names, prices, and categories.
- Add/remove items from the cart.
- Choose payment method: Card (Stripe) or Cash on Delivery
- Checkout with secure Stripe payment.
- View their orders
- Authentication: Sign-up, login, and session management using secure HTTP-only cookies

### 🧑‍🍳 Seller
- Add products.
- Upload product images.
- Update product availaibility.
- View order submissions.

---

## 📂 Folder Structure

```
shopping-cart/
│
├── front-end/           # React Frontend
│   ├── src/
    ├── assets/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
│
├── back-end/            # Node Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── configs/
│   └── server.js
│
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/priyankatayi/shopping-cart.git
cd shopping-cart
```

### 2️⃣ Setup the backend

```bash
cd back-end
npm install
touch .env
```

#### `.env` example:

```
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
NODE_ENV="development"
SELLER_EMAIL="admin@example.com"
SELLER_PASSWORD="admin123"
CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOKS_SECRET="your_stripe_webhooks_secret"
```

```bash
npm run server
```

### 3️⃣ Setup the frontend

```bash
cd ../client
npm install
npm run dev
```

---
## 🔐 Demo Credentials

### 🛍️ Customer
- Email: `customer@demo.com`
- Password: `password123`

### 🧑‍🍳 Seller / Admin
- Email: `admin@demo.com`
- Password: `admin123`
---

---

## 💳 Stripe Testing

Use the following test card for payment:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

---

## 📌 Scripts

### Frontend

- `npm run dev` – Start development server

### Backend

- `npm run server` – Run server with Nodemon

---

> ⚠️ This project was built by following a tutorial as a learning exercise and extended/customized for portfolio purposes.

## 📬 Contact

**Priyanka Tayi** – [tayi.priyanka@gmail.com](mailto:tayi.priyanka@gmail.com)

Project Link: [https://github.com/priyankatayi/shopping-cart](https://github.com/priyankatayi/shopping-cart)
