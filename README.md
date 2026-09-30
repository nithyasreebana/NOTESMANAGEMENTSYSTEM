# 📝 NotesApp - Full Stack Notes Management Application

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-Build_Tool-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge" />
</p>

---

# 📖 Overview

NotesApp is a **full-stack MERN Notes Management Application** that enables users to securely create, organize, search, update, archive, pin, restore, and permanently delete notes.

The application implements **JWT Cookie Authentication**, secure password hashing using **bcrypt**, MongoDB for persistent storage, and a clean React-based user interface.

The project follows a clean folder structure with the backend and frontend separated into independent applications, making it scalable and production-ready.

---

# ✨ Features

## Authentication

* User Registration
* User Login
* Secure Password Hashing (bcrypt)
* JWT Authentication
* HTTP Only Cookie Authentication
* Logout
* Protected Routes

---

## Notes Management

* Create Notes
* Read Notes
* Update Notes
* Delete Notes
* Archive Notes
* Restore Archived Notes
* Move Notes to Trash
* Restore Notes from Trash
* Permanently Delete Notes
* Pin Notes
* Search Notes
* Filter Notes by Tags

---

## Frontend

* Modern React UI
* Responsive Design
* Authentication Pages
* Dashboard
* Sidebar Navigation
* Note Cards
* Create Note Modal
* Edit Note Modal
* Clean User Experience

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* CSS
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* cookie-parser
* dotenv

---

# 📂 Project Structure

```
NotesAPP-API-backend
│
├── backend
│   │
│   ├── controllers
│   │      note.js
│   │      user.js
│   │
│   ├── middlewares
│   │      auth.js
│   │
│   ├── models
│   │      notes.js
│   │      user.js
│   │
│   ├── routes
│   │      note.js
│   │      user.js
│   │
│   ├── views
│   │
│   ├── connect.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend
│   │
│   ├── public
│   ├── src
│   │
│   ├── components
│   │      AuthPage.jsx
│   │      Dashboard.jsx
│   │      Sidebar.jsx
│   │      NoteCard.jsx
│   │      NoteCreator.jsx
│   │      NoteModal.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙ Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=8002

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/ArunKumar09-06/NotesAPP-API-backend.git

cd NotesAPP-API-backend
```

---

## Backend Setup

```bash
cd backend

npm install
```

Start the backend server

```bash
npm run dev
```

---

## Frontend Setup

Open another terminal

```bash
cd frontend

npm install
```

Run the frontend

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication

### Register

```
POST /user/create-account
```

### Login

```
POST /user/login
```

### Logout

```
POST /user/logout
```

### Get User

```
GET /user/get-user
```

---

## Notes

### Create Note

```
POST /notes
```

---

### Get All Notes

```
GET /notes
```

---

### Get Single Note

```
GET /notes/:id
```

---

### Update Note

```
PUT /notes/:id
```

---

### Delete Note

```
DELETE /notes/:id
```

---

### Archive Note

```
PATCH /notes/:id/archive
```

---

### Restore Archived Note

```
PATCH /notes/:id/restore
```

---

### Trash Note

```
PATCH /notes/:id/trash
```

---

### Restore From Trash

```
PATCH /notes/:id/restore-trash
```

---

### Permanently Delete

```
DELETE /notes/:id/permanent
```

---

### Search Notes

```
GET /notes/search
```

Example

```
/notes/search?query=react
```

---

### Filter by Tag

```
GET /notes/tag/:tag
```

---

# 🔐 Authentication Flow

```
User
   │
   ▼

Register/Login
   │
   ▼

Password Hashing
   │
   ▼

JWT Generation
   │
   ▼

HTTP Only Cookie
   │
   ▼

Authentication Middleware
   │
   ▼

Protected Routes
```

---

# 🗄 Database Schema

## User

```
User
│
├── name
├── email
├── password
├── createdAt
└── updatedAt
```

---

## Note

```
Note
│
├── title
├── content
├── tags
├── pinned
├── archived
├── deleted
├── userId
├── createdAt
└── updatedAt
```

---

# 🔒 Security Features

* JWT Authentication
* Cookie Based Authentication
* Protected Routes
* Password Hashing using bcrypt
* Environment Variables
* Authentication Middleware
* MongoDB Validation
* Secure User Isolation

---

# 🏗 System Architecture

```
                 React Frontend
                       │
                       │
                 HTTP Requests
                       │
                       ▼
                Express REST API
                       │
         ┌─────────────┴─────────────┐
         │                           │
 Authentication Middleware      Controllers
         │                           │
         └─────────────┬─────────────┘
                       │
                    Mongoose
                       │
                       ▼
                   MongoDB
```

---

# 📸 Screenshots

You can add screenshots here.

```
Login Page

Dashboard

Create Note

Edit Note

Search Notes

Archive Notes

Trash

Responsive Mobile View
```

# 💻 Learning Outcomes

Through this project, I gained practical experience with:

* REST API Development
* MVC Architecture
* Authentication & Authorization
* JWT & Cookie Authentication
* MongoDB & Mongoose
* Express Middleware
* CRUD Operations
* React Fundamentals
* State Management
* API Integration
* Frontend–Backend Communication
* Error Handling
* Project Structuring
* Git & GitHub Workflow

---

# 👨‍💻 Author

**Arun Kumar**

B.Tech CSE (AI & ML)

Passionate about Full Stack Development, Backend Engineering, Data Structures & Algorithms, and building scalable web applications.

GitHub:
https://github.com/ArunKumar09-06

---

# ⭐ Support

If you found this project helpful:

* ⭐ Star the repository
* 🍴 Fork the repository
* 🛠 Contribute improvements
* 📢 Share it with others

---

# 📄 License

This project is developed for educational and portfolio purposes.

Feel free to use it for learning and personal projects.
