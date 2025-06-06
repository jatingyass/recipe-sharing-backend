const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, reviewController.postReview);           // POST /api/reviews
router.post('/rate', auth, reviewController.postRating);       // POST /api/reviews/rate
router.get('/:id', reviewController.getReviewsByRecipe);       // GET /api/reviews/:id

module.exports = router;
