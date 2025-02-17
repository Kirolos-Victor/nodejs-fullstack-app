const { isLength, isNumeric, isInt } = require('validator')

const validateProduct = (data) => {
  let errors = []

  if (!data.name || !isLength(data.name, { min: 3, max: 255 })) {
    errors.push('Name must be between 3 and 255 characters.')
  }

  if (data.price === undefined || !isNumeric(data.price.toString()) || parseFloat(data.price) < 0) {
    errors.push('Price must be a positive number.')
  }

  if (data.quantity === undefined || !isInt(data.quantity.toString())) {
    errors.push('Quantity must be an integer.')
  }

  if (data.description && !isLength(data.description, { min: 0, max: 1000 })) {
    errors.push('Description is too long.')
  }

  return errors
}

module.exports = { validateProduct }
