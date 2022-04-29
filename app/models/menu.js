//will represent the collection in DB---
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const menuScheme = new Schema({
    name: {
        type:String,
        required: true,
    },
    image: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required:true
    },
    size: {
        type:String,
        required: true
    }
});
const Menu = mongoose.model('Menu', menuScheme)

module.exports = Menu
