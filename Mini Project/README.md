# Personal Expense Tracker (MERN)

## Requirements
- Node.js and npm
- MongoDB running locally, OR a MongoDB Atlas connection string

## 1. Backend setup
Open a terminal in `backend` and run:
```bash
npm install
```
Edit `backend/.env` and set `MONGO_URI`.
For local MongoDB:
`MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker`
For MongoDB Atlas, paste your Atlas connection string instead.

Start the backend:
```bash
npm run dev
```
The API runs at http://localhost:5000.

## 2. Frontend setup
Open a SECOND terminal in `frontend` and run:
```bash
npm install
npm start
```
React should open at http://localhost:3000.

## Features
- Add an expense
- View all expenses
- Edit an expense
- Delete an expense
- See the total of all listed expenses

This is a simple student mini project; it has no login or payment functionality.
