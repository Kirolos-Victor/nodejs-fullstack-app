const express = require('express')
const {
  getAllProducts,
  getProductById,
  storeProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/ProductController')
const router = express.Router()

router.route('/')
  .get(getAllProducts)
  .post(storeProduct)
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct)

module.exports = router