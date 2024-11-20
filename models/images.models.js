const mongoose = require('mongoose')

const imagesSchema = new mongoose.Schema({
    imageUrl:{
        type: String,
        unique: true,
        required: true
    },
    count:{
        type: Number,
        
    }
})
const Image = mongoose.model('Images',imagesSchema)
module.exports = Image