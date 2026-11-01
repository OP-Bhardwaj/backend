const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// 1. Import your auth routes
const authRoutes = require('./routes/auth.routes'); // adjust path if located in src/routes/auth.routes.js

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// 2. Mount the auth router
app.use('/api/auth', authRoutes);

module.exports = app;