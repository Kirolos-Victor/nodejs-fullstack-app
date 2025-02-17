function handleResponse (res, status, data) {
  return res.status(status).json({ success: true, data: data })
}

function handleError (res, status, error) {
  return res.status(status).json({ success: false, error: error })
}

module.exports = {
  handleResponse,
  handleError
}