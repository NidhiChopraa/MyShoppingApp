const route=require('express').Router()
route.use('/users',require('./users'))
route.use('/products',require('./products'))
route.use('/cart',require('./cart'))
route.use('/vendors',require('./vendors'))

exports=module.exports={
    route
}