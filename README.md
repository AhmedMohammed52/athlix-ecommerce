# ATHLIX — Sportswear E-Commerce Platform

> A modern, responsive sportswear e-commerce platform built with React, Supabase, Tailwind CSS, and TanStack React Query.

**ATHLIX** is a full-featured e-commerce web application designed to provide a seamless shopping experience for sportswear and fitness products. The project focuses on reusable React architecture, real-world authentication and e-commerce workflows, responsive UI, and scalable data management.

[🚀 Live Demo](https://ahmedmohammed52.github.io/athlix-ecommerce/) · [💻 GitHub Repository](https://github.com/AhmedMohammed52/athlix-ecommerce)

---

## ✨ Features

### 🛍️ Shopping Experience

* Browse products through a responsive product catalog
* Product details with available variants such as colors and sizes
* New Arrivals and Sale product sections
* Add products to the shopping bag
* Update product quantities directly from the bag
* Add and remove products from the wishlist
* Complete checkout flow
* Order confirmation and order details

### 🔐 Authentication & User Accounts

* User registration and login
* Protected routes for authenticated users
* Guest routes for unauthenticated users
* Forgot-password flow
* User profile management
* Authentication state persistence

### 📦 Orders & Data Management

* Order creation and management
* Order details and order history
* Supabase integration for backend services and authentication
* TanStack React Query for server-state and asynchronous data management
* Dedicated service layer for organized API communication

### 🎨 UI & User Experience

* Fully responsive design across desktop, tablet, and mobile
* Reusable and modular React components
* Tailwind CSS-based styling system
* Smooth UI animations using Framer Motion
* Loading and error states
* Toast notifications and user feedback
* Responsive navigation and interactive UI elements

### 📰 Journal

* Dedicated Journal section for sports and fitness-related content
* Journal listing and article detail pages
* Structured article content with sections and related information

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **Vite**
* **JavaScript (ES6+)**
* **React Router**
* **Tailwind CSS**
* **Framer Motion**
* **React Icons**

### State & Data Management

* **TanStack React Query**
* **React Context API**
* **Supabase**

### Forms & Validation

* **React Hook Form**
* **Zod**

### Development Tools

* **Git**
* **GitHub**
* **NPM**

---

## 🏗️ Project Architecture

The project follows a modular structure designed to keep UI components, application logic, API communication, and validation concerns separated.

```text
src/
├── assets/
├── components/
├── context/
├── data/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── routes/
├── services/
└── validation/
```

### Architecture Highlights

* **Components** — Reusable UI components organized by functionality
* **Pages** — Application-level pages mapped to routes
* **Layouts** — Shared page layouts and structural components
* **Context** — Global application state such as authentication, cart, and wishlist
* **Hooks** — Reusable custom React hooks
* **Services** — Dedicated API and backend communication logic
* **Routes** — Centralized routing and route protection
* **Validation** — Form schemas and validation logic using Zod
* **Data** — Static and application data used across the project
* **Lib** — Shared utilities and external service configuration

---

## 🔑 Authentication Flow

ATHLIX implements separate authentication flows for authenticated and unauthenticated users.

The application includes:

* Registration
* Login
* Logout
* Protected routes
* Guest-only routes
* Forgot-password functionality
* Persistent authentication state

Authentication and user-related backend functionality are powered by **Supabase**.

---

## 🔄 Data & API Architecture

The application separates backend communication from UI components through a dedicated service layer.

Services are organized around different application domains, including:

* Products
* Authentication
* Profiles
* Shopping Bag
* Wishlist
* Orders

**TanStack React Query** is used to manage asynchronous server state, caching, loading states, and data synchronization.

This approach keeps components focused on presentation and user interaction while keeping data-access logic organized and maintainable.

---

## 📱 Responsive Design

ATHLIX is designed to provide a consistent shopping experience across different screen sizes.

The interface adapts to:

* Desktop
* Tablet
* Mobile

Responsive layouts are implemented using **Tailwind CSS**, with reusable components and responsive navigation patterns.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* NPM
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/AhmedMohammed52/athlix-ecommerce.git
```

Navigate to the project directory:

```bash
cd athlix-ecommerce
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---

## 🔐 Environment Variables

Create a `.env` file in the project root and configure the required Supabase environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Never commit your `.env` file or expose private credentials in the repository.

---

## 🔮 Future Improvements

The project is actively being developed.

Planned improvements include:

* **Stock & Inventory Management** — In Progress
* Additional e-commerce improvements
* Further performance optimizations
* Additional user experience enhancements

---

## 🌐 Links

* **Live Demo:** https://ahmedmohammed52.github.io/athlix-ecommerce/
* **GitHub:** https://github.com/AhmedMohammed52/athlix-ecommerce
* **Developer:** Ahmed Mohammed
* **LinkedIn:** https://linkedin.com/in/ahmed-mohammed-99a121267

---

## 👨‍💻 Author

**Ahmed Mohammed**

React Front-End Developer focused on building responsive, scalable, and user-focused web applications using modern React technologies.

* GitHub: [AhmedMohammed52](https://github.com/AhmedMohammed52)
* LinkedIn: [Ahmed Mohammed](https://linkedin.com/in/ahmed-mohammed-99a121267)

---

## 📄 License

This project is developed for educational and portfolio purposes.
