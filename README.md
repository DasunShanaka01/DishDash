# 🍕 Dish Dash – Modern Food Delivery Web App


<img src="https://github.com/user-attachments/assets/ce15052a-c504-434e-b9f2-545f306a9f2e" alt="DishDash Logo" width="250"/>


**Dish Dash** is a modern full-stack food delivery platform inspired by **Uber Eats** and **Pizza Hut**. Customers can browse menus, place orders, and track delivery in real-time. Admins can manage menu items and orders via a sleek dashboard with glassmorphism UI and a modern color palette.

---

## 🚀 Features

### 👨‍🍳 User Panel:
- 🍔 Browse food by category
- 🛒 Add items to cart and checkout
- 🔄 Track order status (`pending → preparing → delivery → completed`)
- 📱 Responsive glass UI with Tailwind CSS animations

### 🛠️ Admin Dashboard:
- ➕ Add / edit / delete food items (with image upload)
- 🔄 Manage live orders and update statuses
- 🔍 Filter and search food items by category
- 📊 Insights: total orders, active orders, and revenue tracking

---

## 🎨 UI Design – Color Palette

Dish Dash uses a fresh, food-inspired theme:

| Element               | Hex Code     |
|------------------------|--------------|
| **Primary (Dark Brown)**      | `#7B4019` |
| **Accent (Bright Orange)**    | `#FF7D29` |
| **Light (Mint)**             | `#D1D8BE` |
| **Highlight (Peach)**        | `#FFBF78` |

Tailwind CSS and custom animations create a sleek, engaging user experience.

---

## 🛠️ Tech Stack  

**Frontend**:
- React.js  
- Tailwind CSS  
- Axios  
- React Router DOM  

**Backend**:
- Spring Boot (Java)  
- MongoDB  
- Lombok  
- File upload via `MultipartFile`  
- RESTful APIs

---

## 🖼️ Screenshots

**User View**

| Home Page | Register Page | Food Catalog |
|----------|---------------|--------------|
| ![3](https://github.com/user-attachments/assets/5c34b58f-a44a-432e-8e21-423bf6c4adca) | ![1](https://github.com/user-attachments/assets/53839207-5ca5-407d-bed1-cb9b4340a2e3) | ![4](https://github.com/user-attachments/assets/4b2ab3de-bd26-49f7-a250-4fa394a6a412) |




---

**Admin View**


| Dashboard | Order Management | Add/Edit Food |
|-----------|------------------|----------------|
| ![13](https://github.com/user-attachments/assets/d2d1f584-702c-4180-a664-361833a6e10c) |![14](https://github.com/user-attachments/assets/bee79309-9c1d-4277-baa1-6869a7a6d581) | ![15](https://github.com/user-attachments/assets/b50eee91-076e-4dfc-82fe-3ae81c8ee44b) |




---

## 📁 Project Structure

```bash
DishDash/
├── backend/
│   ├── src/main/java/com/example/backend/
│   │   ├── OrderPlace/
│   │   ├── AddFood/
│   │   └── Auth/
│   └── resources/application.properties
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── FoodDisplay/
│       │   ├── Register/
│       │   ├── Login/
│       │   └── DishDashAdmin.jsx
│       └── App.jsx
│
├── assets/
│   ├── logo.png
│   ├── banner.png
│   ├── home.png
│   ├── register.png
│   ├── menu.png
│   ├── dashboard.png
│   ├── orders.png
│   └── foodform.png
└── README.md



🛠️ How to Run
Backend (Spring Boot)
bash
cd backend
./mvnw spring-boot:run

Frontend (React)
bash
cd frontend
npm install
npm start

💬 Live Preview
🔗 Live Demo

🤝 Contributing
Fork the repo

Create a feature branch

Make your changes

Submit a pull request

📬 Contact
Your Name
📧 dasunshanaka2002@gmail.com
💼 https://www.linkedin.com/in/dasun-shanaka-756559250/

© 2025 Dish Dash — All rights reserved.


