const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    shopId:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    review: {
        attachment: {
          type: [String],
          default: []
        },
        des: {
          type: String,
          default: ''
        }
    },
    rating: {
        type: Number,
        required:true,
        default:5
    },
    status:{
        type:String,
        default: 'ACTIVE'
    }
})

module.exports = mongoose.model('reviews', reviewSchema, 'reviews')