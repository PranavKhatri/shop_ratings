const reviewsDatabase = require('./reviews.mongo');

const ACTIVE = 'ACTIVE';


async function getAllReviews(){
  return await reviewsDatabase
      .find({}, {'_id':0 , '__v':0})
      .sort({shopId: 1})
}


async function saveReview(review){
  return await reviewsDatabase.findOneAndUpdate({
      shopId: review.shopId,
      productId: review.productId,
      customerId: review.customerId,
  }, review, {
      upsert: true,
  })
}


async function findReview(filter){
  return await reviewsDatabase.find(filter, {'_id':0 , '__v':0});
}


async function existsReviewByShopId(shopId){
    return await findReview({
        shopId: shopId,
    });
}


async function addNewReview(review){

    const new_review = {
      productId: review.productId,
      customerId: review.customerId,
      customerName: review.customerName,
      shopId:review.shopId,
      review:{
          attachment: review.attachment ? review.attachment : [],
          des: review.feedback ? review.feedback : '',
      },
      rating: review.rating,
      status:review.status ? review.status : ACTIVE
  }

  await saveReview(new_review);

}

// const reviews = [{
//     productId: '12345',
//     customerId: '23456edg',
//     customerName: 'Pranav Khatri',
//     review: {
//       attachment: ['Good Food'],
//       des: ''
//     },
//     rating: 5,
//     status: 'ACTIVE',
//     shopId: '67891'
//   },{
//     productId: '12345',
//     customerId: '23456edg',
//     customerName: 'Pranav Khatri',
//     review: {
//       attachment: ['Good Food'],
//       des: ''
//     },
//     rating: 4,
//     status: 'ACTIVE',
//     shopId: '67891'
//   },{
//     productId: '12345',
//     customerId: '23456edg',
//     customerName: 'Pranav Khatri',
//     review: {
//       attachment: ['Good Food'],
//       des: ''
//     },
//     rating: 5,
//     status: 'ACTIVE',
//     shopId: '678'
//   },{
//     productId: '1234',
//     customerId: '23456edg',
//     customerName: 'Pranav Khatri',
//     review: {
//       attachment: ['Good Food'],
//       des: ''
//     },
//     rating: 3,
//     status: 'ACTIVE',
//     shopId: '67891'
//   },{
//     productId: '1234',
//     customerId: '23456edg',
//     customerName: 'Pranav Khatri',
//     review: {
//       attachment: ['Good Food'],
//       des: ''
//     },
//     rating: 2,
//     status: 'ACTIVE',
//     shopId: '67891'
//   },{
//     productId: '1234',
//     customerId: '23456edg',
//     customerName: 'Pranav Khatri',
//     review: {
//       attachment: ['Good Food'],
//       des: ''
//     },
//     rating: 5,
//     status: 'ACTIVE',
//     shopId: '67891'
//   },{
//     productId: '1234',
//     customerId: '23456edg',
//     customerName: 'Pranav Khatri',
//     review: {
//       attachment: ['Good Food'],
//       des: ''
//     },
//     rating: 5,
//     status: 'ACTIVE',
//     shopId: '67891'
//   }]

  module.exports = {
    getAllReviews,
    saveReview,
    existsReviewByShopId,
    addNewReview
  }
  

