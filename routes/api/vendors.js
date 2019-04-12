const vendor=require('../../db').vendor
const route=require('express').Router()

route.get('/',async (req,res)=>{
    await vendor.findAll()
        .then((vendor)=>
        {
            res.status(200).send(vendor)
        })
        .catch((err)=>{
            res.status(500).send({
                error:"Could not retrive users"
            })
        })

})

route.post('/',async (req,res)=>{
    await vendor.create({
        name:req.body.name

    }).then(()=>
    {
        res.status(201).send({success:true})
    })
    .catch((err)=>{
        console.log(err)
        res.status(501).send({
           success:false, error:"Could not add new vendor"
        })
    })
})

route.delete('/', (req,res) => {
    console.log("in deleted")
vendor.destroy( {
where: {
id:req.body.id
}
})
.then( () =>{
res.status(201).send("deleted")
})
.catch( (error) => {
res.status(500).send("Could not delete vendor")
})
}) 
 

exports= module.exports = route