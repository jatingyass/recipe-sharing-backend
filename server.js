// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }) // use alter for development
  .then(() => {
    console.log('MySQL Connected...');
    app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
