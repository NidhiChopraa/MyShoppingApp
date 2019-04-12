const Sequelize = require('sequelize')

const db=new Sequelize('shopdb','shopper','shopass',{
  host: 'localhost',
  dialect: 'sqlite',
  storage: __dirname + "/shopdb2.db",
  pool:{
    min:0,
    max:5
  }
})
const users = db.define('user',{
    name:{
      type:Sequelize.STRING,
      allowNull:false,
    }
   })
const vendor = db.define('vendors',{
   name:{
     type:Sequelize.STRING,
     allowNull:false,
   }
  })
const product=db.define('products',{
   name:{
     type:Sequelize.STRING,
     allowNull:false,
   },
   price:{
    type:Sequelize.INTEGER,
    allowNull:false,
    defaultValue:0.0
  },
  quantity:{
      type:Sequelize.INTEGER,
      allowNull:false,
}
})
const cart=db.define('cart',{
quantity:{
    type:Sequelize.INTEGER,
    allowNull:false,
}
})

//associations
vendor.hasMany(product, {onDelete:'cascade'})
product.belongsTo(vendor)

product.hasMany(cart,{onDelete:'cascade'})
cart.belongsTo(product)

users.hasMany(cart,{onDelete:'cascade'})
cart.belongsTo(users)


// db.sync()
//     .then(()=>console.log("Database Created"))
//     .catch(()=>console.log("Error creating database"))

  
  module.exports = {
      db, vendor,product,users,cart
    }