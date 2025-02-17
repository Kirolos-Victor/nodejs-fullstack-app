const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const { approvePendingVerification, getPendingVerificationCount } = require('./v1/services/handleMeta.js')
const { checkAPIHealth } = require('./v1/services/checkAPIHealth.js')
const {
  verify,
  check
} = require('./v1/services/KYCverify.js')

dotenv.config()
require('./config/database')

const app = express()

app.use(
  cors({
    credentials: true,
    sameSite: 'none',
    origin: process.env.FRONTEND_URL.split(',') ?? 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
)

app.use(express.json())
app.use(cookieParser())

// API Routes
app.get('/health', checkAPIHealth)
app.post('/kyc-verify', verify)
app.post('/kyc-check', check)
app.use('/api/v1/products', require('./v1/routes/products'))
app.use(require('./v1/middlewares/errorHandler'))
app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}!`)
)
