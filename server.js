// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const favoriteRoutes = require('./routes/favoritesRoutes');
const collectionRoutes = require('./routes/collectionsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const followRoutes = require('./routes/followRoutes');
const activityRoutes = require('./routes/activityRoutes');


// Use routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/activity', activityRoutes);


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
