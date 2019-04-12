const express = require('express')
const path=require('path')
const app=express();
const {
    db,
    vendors,product
  } = require('./db')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }))



//console.log(require('./routes/api/').route)
app.use('/',express.static(path.join(__dirname + '/public')))
app.use('/api',require('./routes/api/').route)
db.sync()
  .then(() => {
    app.listen(8282,()=>console.log('server started'))
  })
