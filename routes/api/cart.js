const cart=require('../../db').cart
const product=require('../../db').product
const route=require('express').Router()

route.post('/getItems', async function (req, res) {   
    const user = req.body.id
    const result = await cart.findAll({
        include :[{model:product}] ,
        where: {
            UserId: user
        }
    }).then((data)=>{
        res.status(200).send(data)
    }).catch((error) =>{
        console.log(error)
        res.status(501).send(error)
    })
})

route.post('/', async function (req, res) {
    console.log("in cart's post method")
    const id = Number(req.body.userId)
    const pId = Number(req.body.productId)
    console.log(id+" pid"+pId)
    try {
        let result = await cart.findOne({
            where: {
                userId: id,
                productId: pId
            }
        })
        console.log(result)
        if (result == null) {
            await cart.create({
                userId: id,
                productId: pId,
                quantity: 1
            })
            res.send({ success: true, message: "One new record added!!" })
        } else {
            let qty = result.quantity + 1;
            await cart.update(
                { quantity: qty },
                {
                    where: {
                        userId: id,
                        productId: pId,
                    }
                }
            ).then(() => { })
            res.send({ success: true, message: "Quantity of " + pId + " is updated!" })
        }
    } catch (e) {
        console.log(e)
        res.send({ success: false, message: e.message })
    }
})


//delete product from cart for a specific user
route.delete('/', async function (req, res) {

    try{
        await cart.destroy({
            where: {
                id : req.body.id
            }
        })
        res.send({success:true})
    }catch(e){
        console.log(e)
        res.send({successs:false,message:e.message})
    }
})


//delete operation for product

exports= module.exports = route