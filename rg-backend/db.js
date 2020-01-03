var mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_PORT, {
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
  })
