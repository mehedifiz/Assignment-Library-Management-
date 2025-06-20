# 📚 Library Management API

This is a simple Library Management System built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

## 🚀 Features

- 📘 **Books Management**
  - Create, Read, Update, Delete (CRUD)
  - Filter by genre, sort, and limit
- 📖 **Borrow a Book**
  - Check if copies are available before borrowing
  - Automatically update available copies after borrow
  - Prevents borrowing more than available
- 📊 **Borrow Summary**
  - Shows total borrowed quantity per book
  - Includes book title and ISBN

---

## 🛠️ Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB with Mongoose
- Zod (for validation)

---

## 📂 API Endpoints

### 📘 Books

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| POST   | `/api/books`         | Add a new book               |
| GET    | `/api/books`         | Get all books (with filter, sort, limit) |
| GET    | `/api/books/:id`     | Get book by ID               |
| PUT    | `/api/books/:id`     | Update book by ID            |
| DELETE | `/api/books/:id`     | Delete book by ID            |

🧪 Example query:  
`/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`

---

### 📖 Borrow

| Method | Endpoint       | Description                          |
|--------|----------------|--------------------------------------|
| POST   | `/api/borrow`  | Borrow a book                        |
| GET    | `/api/borrow`  | Get summary of all borrowed books    |

---

