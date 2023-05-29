const { getAllReviews, existsReviewByShopId, addNewReview } = require('../models/reviews.model');

async function httpGetAllReviews(req, res){

    const reviews = await getAllReviews();
    console.log(reviews);

    if(reviews.length)
        return res.status(200).json(reviews);

    return res.status(404).json({
            error: "No Reviews found!"
        });
}

async function httpGetReviewByShopId(req, res){
    const shopId = Number(req.params.shopId);
    console.log(shopId)

    // const filteredReview = reviews.filter((review) => review.shopId == shopId);
    const filteredReview = await existsReviewByShopId(shopId);

    console.log('filteredReview', filteredReview)

    if(filteredReview){
        const resReviews = [];

        const groupedReviews = {};
        filteredReview.forEach((each_review) => {
            console.log('each_review', each_review)
            each_review = each_review.toObject();
        const { customerId, customerName,review, ...reviewWithoutCustomerInfo } = each_review;
        if (!groupedReviews.hasOwnProperty(each_review.productId)) {
            groupedReviews[each_review.productId] = [];
        }
        groupedReviews[each_review.productId].push(reviewWithoutCustomerInfo);
        });

        console.log('groupedReviews', groupedReviews)

        for(const productId in groupedReviews){
            if(groupedReviews.hasOwnProperty(productId)){
                const reviews = groupedReviews[productId];

                console.log('reviews',reviews )

                let totalRating = 0;
                const ratingCounts = {
                    totalRatingCount:  0,
                    oneStarRatingCount: 0,
                    twoStarRatingCount: 0,
                    threeStarRatingCount: 0,
                    fourStarRatingCount: 0,
                    fiveStarRatingCount: 0,
                };

                reviews.forEach((review)=>{
                    const rating = review.rating;

                    ratingCounts.totalRatingCount++;

                    switch (rating) {
                        case 1:
                          ratingCounts.oneStarRatingCount++;
                          break;
                        case 2:
                            ratingCounts.twoStarRatingCount++;
                          break;
                        case 3:
                          ratingCounts.threeStarRatingCount++;
                          break;
                        case 4:
                          ratingCounts.fourStarRatingCount++;
                          break;
                        case 5:
                          ratingCounts.fiveStarRatingCount++;
                          break;
                        default:
                          break;
                      }
                    

                      totalRating += rating;

                });

                const averageRating =  ratingCounts.totalRatingCount > 0 ? totalRating /  ratingCounts.totalRatingCount : 0;

                const new_review = {
                    shopId:shopId,
                    productId:productId,
                    ...ratingCounts,
                    averageRating:averageRating

                }

                resReviews.push(new_review);

            }
        }


        res.status(200).json(resReviews);
    }
    else{
        res.status(404).json({
            error: "Oops Shop Id donot Exist!"
        });
    }
}

async function httpAddNewReview(req, res){

    const review = req.body;

    if(!review.shopId || !review.customerId || !review.rating || !review.productId){
        return res.status(400).json({
            error: 'Missing Some property'
        });
    }


    if(typeof review.rating !== "number" || !Number.isInteger(review.rating)){
        return res.status(400).json({
            error: 'please provide numeric rating',
        });
    }

    // const new_review = {
    //     productId: review.productId,
    //     customerId: review.customerId,
    //     customerName: review.customerName,
    //     shopId:review.shopId,
    //     review:{
    //         attachment: review.attachment ? review.attachment : [],
    //         des: review.feedback ? review.feedback : '',
    //     },
    //     rating: review.rating,
    //     status:review.status ? review.status : ACTIVE
    // }


   
    // reviews.push(new_review);
    
    await addNewReview(review);

    return res.status(201).json(review);

}

module.exports = {
    httpGetAllReviews,
    httpGetReviewByShopId,
    httpAddNewReview
};