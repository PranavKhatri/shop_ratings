const express = require('express');

const { httpGetAllReviews, httpGetReviewByShopId, httpAddNewReview, httpPostReviewByShopId } = require('./reviews.controller');

const reviewRouter = express.Router();

reviewRouter.get('/', httpGetAllReviews)
reviewRouter.get('/:shopId', httpGetReviewByShopId)
reviewRouter.post('/',httpAddNewReview )
reviewRouter.post('/shopId', httpPostReviewByShopId)

module.exports = reviewRouter;