# Faruk Fashion — Full Stack E-Commerce Platform

**Style That Speaks**

Premium e-commerce application for Handbags, Trolley Bags, School Bags, College Bags, Kids Bags, Office Bags, Sling Bags & Travelling Kits.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js 18 + Vite + HTML/CSS       |
| Backend    | Java 17 + Spring Boot 3.2           |
| Database   | MongoDB                             |
| Auth       | JWT (Stateless)                     |
| Payments   | Razorpay (UPI / Card / NetBanking)  |
| Notifications | Email + WhatsApp (Twilio) + SMS  |

---

## Features Implemented (as per your requirements)

1. **Inventory Management** — Stock quantity, low-stock alerts, automatic stock reduction on order
2. **Order Confirmations** — WhatsApp + SMS + Email to **both buyer and seller**
3. **Customer Login** — Email/Phone + Password, personalized product recommendations based on preferences
4. **Classic & Elegant UI** — Black & Gold theme matching your brand identity
5. **Private Server Ready** — Standard Spring Boot + React build, deploy on any VPS / private server
6. **24×7 Support** — Contact page, WhatsApp integration, support messaging
7. **Separate Logs** — Login Log · Purchase Log · Return/Refund Log · Inventory Log
8. **Creative Theme** — Cormorant Garamond + Montserrat, gold accents, elegant cards
9. **Secure Payment Gateway** — Razorpay with signature verification
10. **Contact & About Pages** — Full store information
11. **Offers Banner** — Dynamic home page banners from database

---

## Project Structure

```
faruk-fashion/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/farukfashion/
│   │   ├── config/          # Security, CORS
│   │   ├── controller/      # REST endpoints
│   │   ├── dto/             # Request/Response objects
│   │   ├── model/           # User, Product, Order, Offer, LogEntry
│   │   ├── repository/      # MongoDB repositories
│   │   ├── security/        # JWT filter & util
│   │   └── service/         # Business logic + Notifications
│   └── src/main/resources/application.yml
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/      # Navbar, Footer, ProductCard
│   │   ├── context/         # Auth + Cart
│   │   ├── pages/           # Home, Products, Cart, Checkout, etc.
│   │   ├── services/        # API client
│   │   └── styles/          # Global elegant theme
│   └── package.json
└── docs/
```

---

## Quick Start

### 1. Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- MongoDB 6+ (local or Atlas)
- (Optional) Razorpay & Twilio keys

### 2. Backend

```bash
cd backend

# Edit src/main/resources/application.yml
# Set MongoDB URI, JWT secret, mail, Razorpay, Twilio keys

mvn spring-boot:run
# API runs at http://localhost:8080/api
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:3000
```

### 4. Create Admin User

Register normally, then in MongoDB set the user's roles to include `ADMIN`:

```js
db.users.updateOne(
  { email: "your-admin@email.com" },
  { $set: { roles: ["ADMIN"] } }
)
```

---

## Environment Variables (Production)

```env
MONGODB_URI=mongodb://your-private-server:27017/faruk_fashion
JWT_SECRET=your-very-long-secure-secret-key
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=...
MAIL_PASSWORD=...
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_FROM=whatsapp:+14...
FRONTEND_URL=https://yourdomain.com
```

---

## API Overview

| Method | Endpoint                    | Description                    |
|--------|-----------------------------|--------------------------------|
| POST   | /api/auth/register          | Customer registration          |
| POST   | /api/auth/login             | Login (email or phone)         |
| GET    | /api/products               | List products (paginated)      |
| GET    | /api/products/{id}          | Product detail                 |
| GET    | /api/products/recommendations | Personalized suggestions     |
| POST   | /api/orders                 | Place order                    |
| POST   | /api/orders/verify-payment  | Confirm Razorpay payment       |
| POST   | /api/orders/return          | Request return/refund          |
| GET    | /api/offers/banners         | Home page offer banners        |
| GET    | /api/admin/logs/login       | Login logs (Admin)             |
| GET    | /api/admin/logs/purchase    | Purchase logs (Admin)          |
| GET    | /api/admin/logs/returns     | Return/Refund logs (Admin)     |
| PUT    | /api/admin/products/{id}/stock | Update inventory (Admin)    |

---

## Store Details

- **Name:** Faruk Fashion  
- **Tagline:** Style That Speaks  
- **Address:** 35, Kamarajar Street, Thenkarai, Periyakulam-625 601  
- **WhatsApp:** +91 93442 82751  

---

## Deployment on Private Server

1. Build backend: `mvn clean package -DskipTests` → run the JAR  
2. Build frontend: `npm run build` → serve `dist/` with Nginx  
3. Point Nginx reverse proxy `/api` → `localhost:8080`  
4. Use MongoDB on the same private network  
5. Configure SSL (Let's Encrypt)  

---

## Next Steps You May Want

- Admin dashboard UI for inventory & orders  
- Product image upload (S3 / local storage)  
- Coupon engine  
- Mobile app (React Native sharing same API)  
- Google / Facebook login  

---

Built with care for Faruk Fashion · Style That Speaks
