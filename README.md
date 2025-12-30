# 📚 Book Store Application

A full-stack book store application with a Laravel backend API and a React Native mobile app for browsing, searching, and purchasing books.

## 📖 Project Description

This is a book store e-commerce application that allows users to:
- Browse books by categories
- Search for books by title or author
- View detailed book information
- Add books to shopping cart
- Manage inventory through admin panel

The application consists of a React Native mobile app (client) that communicates with a Laravel REST API (server).

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

5. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

### Access Points
- **API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

## 🔐 Admin Dashboard

The application includes a Filament admin panel for managing books, categories, and other resources.

### Accessing the Admin Panel

1. **URL**: http://localhost:8000/admin

2. **Default Credentials** (after running seeders):
   - Email: `admin@books-store.com`
   - Password: `password123`

### Features

- **Books Management**: Create, edit, view, and delete books
- **Categories Management**: Manage book categories
- **File Uploads**: Upload book covers and PDFs to S3
- **Dashboard**: Overview of store statistics

### Creating Admin User

If you need to create a new admin user, run the seeder:
```bash
cd server
php artisan db:seed --class=UsersSeeder
```
