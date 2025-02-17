import assert from 'assert'
import test from 'node:test'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {
  getAllProducts,
  getProductById,
  storeProduct,
  updateProduct,
  deleteProduct,
} from '../v1/controllers/ProductController.js'
import { Product } from '../v1/models/Product.js'

dotenv.config()

const mockRequest = (body = {}, params = {}, query = {}) => ({ body, params, query })
const mockResponse = () => {
  const res = {}
  res.status = (code) => {
    res.statusCode = code
    return res
  }
  res.json = (data) => {
    res.body = data
    return res
  }
  return res
}

test('Product Tests', async (t) => {
  await mongoose.connect(process.env.MONGO_TESTING_URI, {
    serverSelectionTimeoutMS: 30000,
  })

  await Product.deleteMany({})

  await t.test('storeProduct', async () => {
    const data = {
      name: 'Test Product',
      price: 100,
      quantity: 10,
      description: 'This is a test product',
    }
    const req = mockRequest(data)
    const res = mockResponse()
    await storeProduct(req, res, () => {})

    assert.strictEqual(res.statusCode, 201)
    assert.strictEqual(res.body.success, true)
    assert.strictEqual(res.body.data.name, 'Test Product')
    assert.strictEqual(res.body.data.price, 100)
    assert.strictEqual(res.body.data.quantity, 10)
    assert.strictEqual(res.body.data.description, 'This is a test product')
  })

  await t.test('getProductById', async () => {
    const product = await Product.findOne({ name: 'Test Product' })
    const req = mockRequest({}, { id: product._id })
    const res = mockResponse()
    await getProductById(req, res, () => {})

    assert.strictEqual(res.statusCode, 200)
    assert.strictEqual(res.body.success, true)
    assert.strictEqual(res.body.data._id.toString(), product._id.toString())
  })

  await t.test('getAllProducts', async () => {
    const req = mockRequest({}, {}, { page: 1, limit: 10 })
    const res = mockResponse()
    await getAllProducts(req, res, () => {})

    assert.strictEqual(res.statusCode, 200)
    assert.strictEqual(res.body.success, true)
    assert.strictEqual(res.body.data.data.length, 1)
  })

  await t.test('updateProduct', async () => {
    const product = await Product.findOne({ name: 'Test Product' })
    const req = mockRequest(
      { name: 'Updated Product', price: 200, quantity: 20, description: 'Updated description' },
      { id: product._id }
    )
    const res = mockResponse()
    await updateProduct(req, res, () => {})

    assert.strictEqual(res.statusCode, 200)
    assert.strictEqual(res.body.success, true)
    assert.strictEqual(res.body.data.name, 'Updated Product')
  })

  await t.test('deleteProduct', async () => {
    const product = await Product.findOne({ name: 'Updated Product' })
    const req = mockRequest({}, { id: product._id })
    const res = mockResponse()
    await deleteProduct(req, res, () => {})

    assert.strictEqual(res.statusCode, 204)
  })

  await t.test('getProductById after deletion', async () => {
    const product = await Product.findOne({ name: 'Updated Product' })
    const req = mockRequest({}, { id: product?._id })
    const res = mockResponse()
    await getProductById(req, res, () => {})

    assert.strictEqual(res.statusCode, 422)
    assert.strictEqual(res.body.error, 'Product not found')
  })

  await mongoose.disconnect()
})
