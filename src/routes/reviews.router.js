const express = require('express');

const { httpGetAllReviews, httpGetReviewByShopId, httpAddNewReview } = require('./reviews.controller');

const reviewRouter = express.Router();

reviewRouter.get('/', httpGetAllReviews)
reviewRouter.get('/:shopId', httpGetReviewByShopId)
reviewRouter.post('/',httpAddNewReview )

module.exports = reviewRouter;