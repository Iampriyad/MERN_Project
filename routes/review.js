const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isReviewAuthor,validateReview} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//post reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.postReviews));

//delete route 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReviews));

module.exports = router;