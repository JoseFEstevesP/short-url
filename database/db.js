const mongoose = require('mongoose')
mongoose.connect(process.env.URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('db connectado 💻'))
.catch((e)=> console.log('error en la connecion 🤦‍♀️', e))