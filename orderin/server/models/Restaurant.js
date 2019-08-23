const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    orders: {
        type: [String]
    },
    notes: {
        type: [String]
    },
    ratings: {
        type: [Number],
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    prices: {
        type: [Number],
    },
    priceCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);