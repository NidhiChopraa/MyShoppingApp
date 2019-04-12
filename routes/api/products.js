const product=require('../../db').product
const vendor=require('../../db').vendor
const route=require('express').Router()

route.get('/', async(req,res)=>{
    await product.findAll({
        include : vendor
    })
        .then( (product) =>
        {
            console.log(product)
            res.status(200).send(product)
        })
        .catch((err)=>{
            res.status(500).send({
                error:"Could not retrive products"
            })
        })
})

route.post('/',async(req,res)=>{
    console.log(req.body)
   if(isNaN(req.body.price)){
        return res.status(403).send({
            error:"Price is not valid no."
        })
    }
    await product.create({
        name:req.body.name,
        vendorId:req.body.vId,
        price:parseFloat(req.body.price),
        quantity:parseInt(req.body.quantity)
    }).then((product)=>
    {
        res.status(201).send(product)
    })
    .catch((err)=>{
        console.log(err)
        res.status(501).send({
            error:"Could not add new product"
        })
    })


})

route.delete('/', (req,res) => {
    console.log("in deleted")
product.destroy( {
where: {
id:req.body.id
}
})
.then( () =>{
res.status(201).send("deleted")
})
.catch( (error) => {
res.status(500).send("Could not delete product")
})
}) 
 


exports= module.exports = route