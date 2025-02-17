const mongoose = require('mongoose')

//Connect to the database
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(`Connected to mongoDB!`)

}).catch((error) => {
  console.log(`Connection to mongoDB failed!`, error)
})