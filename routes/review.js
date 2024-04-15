const express = require("express");

const wrapAsync = require("../utils/wrapAsync");

const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviews");

//REVIEWS
//POST ROUTE
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
