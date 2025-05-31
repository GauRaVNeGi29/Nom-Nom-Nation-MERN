# 🍔 Nom Nom Nation

**Nom Nom Nation** is a full-stack food ordering web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It allows admins to add and manage food items through a dedicated admin panel, while users can browse the menu through a clean, responsive frontend interface.

---

## 📸 Preview

![Nom Nom Nation Screenshot](./preview.png) <!-- Add your screenshot image or remove this section if not available -->

---

## 🚀 Features

- 🔐 **Admin Panel** to manage food items (add, update, delete)
- 🧾 **Dynamic Menu** displayed on the frontend
- 📦 **RESTful API** for CRUD operations
- 💾 **MongoDB Database** for storing food items
- ⚡ **Responsive Design** with CSS
- 🛠️ Easy-to-understand folder structure

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Version Control**: Git & GitHub

---

## 📂 Project Structure

nom-nom-nation/
├── admin/
│ ├── public/
│ ├── src/
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ └── vite.config.js
├── backend/
│ ├── config/
│ ├── controller/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ ├── .env
│ ├── index.js
│ ├── package-lock.json
│ └── package.json
├── frontend/
│ ├── public/
│ ├── src/
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ ├── postcss.config.js
│ ├── tailwind.config.js
│ └── vite.config.js
└── README.md

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/nom-nom-nation.git
cd nom-nom-nation

**Backend Setup**

cd backend
npm install

**Create a .env file inside /backend and add:**

PORT=4000
MONGO_URI=your_mongodb_connection_string

**Start the backend:**

npm run dev

**Frontend Setup**

cd ../frontend
npm install
npm run dev

🧪 API Endpoints (Sample)

🔐 User Authentication
Method	Endpoint	          Description
POST	  /api/user/register	Register a new user
POST	  /api/user/login	    Login a user

🍽️ Food Items
Method	Endpoint	        Description
POST	  /api/food/add	    Add a food item (with image)
GET	    /api/food/list	  Get all food items
POST	  /api/food/remove	Remove a food item

🛒 Cart
Method	Endpoint	        Description
POST	  /api/cart/add	    Add item to cart
POST	  /api/cart/remove	Remove item from cart
POST	  /api/cart/get	    Get user's cart

📦 Orders
Method	Endpoint	  Description
POST	  /api/order	Place an order

🙌 Acknowledgements
    MongoDB for database services
    Tailwind CSS for styling
    Vite for fast frontend development
    Express for API handling

📃 License
This project is licensed under the MIT License.

💬 Contact
Gaurav Negi
📧 Email: negigaurav419@gmail.com
🔗 GitHub: GauRaVNeGi29
