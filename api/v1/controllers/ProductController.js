const { Product } = require('../models/Product')
const { handleError, handleResponse } = require('../helpers/JsonResponse')
const { validateProduct } = require('../validations/Product')
const paginate = require('../helpers/pagination')

const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const result = await paginate(Product, {}, page, limit)
    return handleResponse(res, 200, result)
  } catch (error) {
    next(error)
  }
}
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return handleError(res, 422, 'Product not found')
    }
    return handleResponse(res, 200, product)
  } catch (error) {
    next(error)
  }
}

const storeProduct = async (req, res, next) => {
  try {
    const errors = validateProduct(req.body)
    if (errors.length > 0) {
      return handleError(res, 422, errors)
    }
    const { name, price, quantity, description } = req.body

    const product = await Product.create({
      name,
      price,
      quantity,
      description
    })

    return handleResponse(res, 201, product)

  } catch (error) {
    next(error)
  }
}
const updateProduct = async (req, res, next) => {
  try {
    const errors = validateProduct(req.body)
    if (errors.length > 0) {
      return handleError(res, 422, errors)
    }
    const { name, price, quantity, description } = req.body

    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      quantity,
      description
    }, { new: true })
    if (!product) {
      return handleError(res, 422, 'product not found')
    }
    return handleResponse(res, 200, product)
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return handleError(res, 422, 'Product not found')
    }
    return handleResponse(res, 204, 'Product deleted successfully')
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllProducts, getProductById, storeProduct, updateProduct, deleteProduct }