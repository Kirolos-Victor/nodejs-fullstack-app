const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Age must be an integer.',
    },
  },
  description: {
    type: String,
    required: false,
  },

}, {
  timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = { Product }