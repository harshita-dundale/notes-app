📒 Notes Management App

A full-stack MERN application to securely manage personal notes. It supports authentication, authorization, and complete CRUD functionality with real-time updates.

🚀 Features

🔐 JWT Authentication and bcrypt for secure login/signup
📝 CRUD operations – Create, Read, Update, Delete personal notes
⚡ Real-time updates with React.js
🌐 RESTful APIs with authentication middleware
📂 Secure data storage using MongoDB

🛠️ Tech Stack

Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT, bcrypt


⚙️ Installation & Setup
# Clone the repository
git clone <your-repo-link>

# Go to project directory
cd notes-app

# Install dependencies
npm install

# Start backend server
cd backend
npm install
npm start

# Start frontend
cd frontend
npm install
npm start

🔑 Environment Variables

Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

📌 Usage
Register/Login with email and password
Add, edit, delete, and view notes
Data securely stored in MongoDB

🏆 Learning Outcomes
Implementing authentication/authorization with JWT
Using bcrypt for password security
Handling CRUD APIs with Express.js
Building a full-stack app with MERN
