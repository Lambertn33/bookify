# 📚 Book Store Application

A full-stack book store application with a Laravel backend API and a React Native mobile app for browsing, searching, and purchasing books. The application supports both digital and physical book sales, where customers receive digital PDFs immediately upon purchase and physical copies are shipped to their addresses.

## 📖 Project Description

This is a comprehensive book store e-commerce application that allows users to browse, search, purchase, and manage books. The system handles both digital and physical book distribution - when a book is purchased online, customers receive immediate access to the digital PDF version, while physical hard copies are shipped to their registered address. Stock is reduced upon order approval to account for physical inventory management.

The application consists of:
- **React Native Mobile App (Client)**: User-facing mobile application for iOS and Android
- **Laravel REST API (Server)**: Backend API handling business logic, authentication, and data management
- **Filament Admin Panel**: Comprehensive admin dashboard for managing books, orders, clients, and inventory

## 🛠️ Technologies Used

### Frontend
- React Native 0.81.5
- Expo ~54.0.30
- Expo Router (file-based routing)
- TypeScript
- TanStack Query (data fetching)
- Axios (HTTP client)

### Backend
- Laravel 12.0
- PHP 8.2+
- Filament 4.0 (admin panel)
- MySQL 8.0
- Redis
- AWS S3 (file storage)

### Infrastructure
- Docker & Docker Compose

## 🚀 How to Run

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ and npm

### Backend Setup

1. **Start Docker services**
   ```bash
   docker-compose up -d
   ```
   This starts MySQL, Redis, and the Laravel API server on port 8000.

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URLs** (optional)
   
   Create `client/.env` file:
   ```env
   EXPO_PUBLIC_IOS_API_URL=http://127.0.0.1:8000/api
   EXPO_PUBLIC_ANDROID_API_URL=http://10.0.2.2:8000/api
   ```

4. **Start the app**
   ```bash
   npm start
   ```
   
   Or use Expo Go mode (recommended):
   ```bash
   npm run start:go
   ```

5. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device
   
   **Note**: The app is compatible with Expo Go. If you encounter development build errors, use `npm run start:go` to force Expo Go mode.

### Access Points
- **API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

## ✨ Features

### 📱 Mobile App (Client) Features

#### Authentication & User Management
- **User Registration**: Create new accounts with email and password
- **User Login/Logout**: Secure authentication using Laravel Sanctum
- **User Profile**: View and manage user information, address, and balance
- **Balance Management**: Prepaid balance system for making purchases

#### Book Browsing & Discovery
- **Browse by Categories**: Filter books by different categories
- **Search Functionality**: Search books by title or author
- **Book Details**: View comprehensive book information including:
  - Title, author, description
  - Price and availability
  - Cover images
  - Category information
  - Published year

#### Shopping & Checkout
- **Shopping Cart**: Add multiple books to cart
- **Cart Management**: View, modify, and remove items from cart
- **Checkout Process**: Review order summary and place orders
- **Balance Validation**: Automatic balance checking before order placement

#### Order Management
- **View Orders**: Access complete order history
- **Order Details**: View detailed information for each order including:
  - Order code (format: ORD-YYYY-CLIENTID-COUNTER)
  - Order date and status
  - List of books purchased
  - Total amount
- **Cancel Orders**: Cancel pending orders (with automatic balance refund)
- **Order Status Tracking**: Track order status (Pending, Confirmed, Cancelled)

#### Digital Library
- **My Books**: Access purchased books library
- **PDF Reading**: Open and read purchased book PDFs
- **Book Access**: Permanent access to purchased digital books

### 🖥️ Admin Dashboard Features

#### Books Management
- **Create Books**: Add new books with all details
- **Edit Books**: Update book information, prices, and stock
- **View Books**: Detailed book information with images
- **Delete Books**: Remove books from inventory
- **Stock Management**: Track and manage book inventory
- **File Uploads**: Upload book cover images and PDF files to AWS S3
- **Book Activation**: Enable/disable books for sale

#### Categories Management
- **Create Categories**: Add new book categories
- **Edit Categories**: Update category names and descriptions
- **View Categories**: Browse all categories
- **Delete Categories**: Remove categories (with validation)

#### Orders Management
- **View All Orders**: Comprehensive list of all system orders
- **Order Details**: Detailed view of each order including:
  - Client information
  - Order items with quantities and prices
  - Order status and total amount
  - Order code and date
- **Approve & Ship Orders**: Approve pending orders and mark as shipped
  - Automatically reduces book stock
  - Adds books to client's purchased library
  - Sends notifications to admins
- **Order Statistics Widget**: Dashboard widget showing:
  - Total orders count
  - Pending orders count
  - Confirmed orders count
  - Cancelled orders count
- **Order Filtering**: Filter orders by status

#### Clients Management
- **View Clients**: List of all registered clients
- **Client Details**: Comprehensive client information including:
  - Personal information (name, email, phone)
  - Address and location
  - Account balance
  - Complete order history
  - List of purchased books
- **Client Statistics**: View total orders and purchased books per client
- **Client Search**: Search clients by name, email, or other attributes

#### Dashboard & Analytics
- **Statistics Overview**: Real-time statistics widgets
- **Order Analytics**: Visual charts and metrics for order trends
- **Notifications**: In-app notifications for new orders and important events

## 🔄 Business Logic

### Order Processing Flow
1. **Order Creation**: Customer places order from cart
   - Balance is deducted from customer account
   - Order status set to "PENDING"
   - Unique order code generated (ORD-YYYY-CLIENTID-COUNTER)
   - Notification sent to admin

2. **Order Approval**: Admin approves and ships order
   - Order status changes to "CONFIRMED"
   - Book stock is reduced (for physical inventory)
   - Books are added to client's purchased library
   - Client receives access to digital PDFs
   - Physical copies are prepared for shipping to client's address

3. **Order Cancellation**: Customer cancels pending order
   - Order status changes to "CANCELLED"
   - Balance is refunded to customer account
   - Notification sent to admin

### Stock Management
- **Stock Reduction**: When an order is approved and shipped, the book stock is reduced
- **Rationale**: Even though books are purchased online and customers receive digital PDFs, physical hard copies are also shipped to the customer's registered address
- **Stock Validation**: Orders cannot be placed if book stock is insufficient

### Balance System
- **Prepaid Balance**: Customers must have sufficient balance to place orders
- **Automatic Deduction**: Balance is deducted immediately upon order creation
- **Automatic Refund**: Balance is refunded when pending orders are cancelled
- **Balance Display**: Current balance is always visible in user profile

### Digital & Physical Distribution
- **Digital Access**: Customers receive immediate access to PDF versions of purchased books
- **Physical Shipping**: Physical hard copies are shipped to customer addresses
- **Stock Tracking**: Inventory is managed for physical books, not digital copies

## 🔐 Admin Dashboard

The application includes a comprehensive Filament admin panel for managing all aspects of the book store.

### Accessing the Admin Panel

1. **URL**: http://localhost:8000/admin

2. **Default Credentials** (after running seeders):
   - Email: `admin@books-store.com`
   - Password: `password123`

### Admin Features Summary

- **Books Management**: Full CRUD operations for books
- **Categories Management**: Manage book categories
- **Orders Management**: View, approve, and track all orders
- **Clients Management**: View client profiles, orders, and purchased books
- **File Uploads**: Upload book covers and PDFs to AWS S3
- **Dashboard Widgets**: Real-time statistics and analytics
- **Notifications**: Receive notifications for new orders and events

### Creating Admin User

If you need to create a new admin user, run the seeder:
```bash
cd server
php artisan db:seed --class=UsersSeeder
```

## 🔧 Additional Configuration

### Queue Worker (Required for Notifications)

The application uses Laravel queues for sending notifications. Make sure to run the queue worker:

```bash
cd server
php artisan queue:work
```

Or for development:
```bash
php artisan queue:listen
```

### Environment Variables

Ensure your `.env` file in the `server` directory includes:
- Database configuration
- AWS S3 credentials (for file storage)
- Queue connection settings
- App URL and other Laravel settings

### Database Seeding

To populate the database with sample data:
```bash
cd server
php artisan db:seed
```

This will create:
- Admin user
- Sample book categories
- Sample books with covers and PDFs
- Test data for development
