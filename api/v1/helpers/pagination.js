// helpers/pagination.js
const paginate = async (model, query, page = 1, limit = 10) => {
  // Convert page and limit to numbers
  page = parseInt(page, 10)
  limit = parseInt(limit, 10)

  // Calculate skip value
  const skip = (page - 1) * limit

  // Fetch data from the database
  const data = await model.find(query).skip(skip).limit(limit).lean()

  // Count total documents matching the query
  const total = await model.countDocuments(query)

  // Calculate total pages
  const totalPages = Math.ceil(total / limit)

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  }
}

module.exports = paginate