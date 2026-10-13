const express = require('express');
const cookieParser = require('cookie-parser');

// 1. Import your auth routes
const authRoutes = require('./routes/auth.routes'); // adjust path if located in src/routes/auth.routes.js

const app = express();

app.use(express.json());
app.use(cookieParser());

// 2. Mount the auth router
app.use('/api/auth', authRoutes);

module.exports = app;