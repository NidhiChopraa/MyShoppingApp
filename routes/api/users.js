const User=require('../../db').users
const route=require('express').Router()

route.get('/',(req,res)=>{
    User.findAll()
        .then((User)=>
        {
            res.status(200).send(User)
        })
        .catch((err)=>{
            res.status(500).send({
                error:"Could not retrive users"
            })
        })

})
route.get('/:name', (req,res)=>{
    console.log(req.params.name)
    User.findOne({
        where :{
            name : req.params.name
        }
    }).then( (data) =>
        {
            res.status(200).send(data)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send({
                error:"Item couldn't find"
            })
        })
})
route.get('/',(req,res)=>{
    User.findAll()
        .then((User)=>
        {
            res.status(200).send(User)
        })
        .catch((err)=>{
            res.status(500).send({
                error:"Could not retrive users"
            })
        })

})

route.post('/',(req,res)=>{
    console.log("in api"+ req.body.name)
    User.findOne({where:{name:req.body.name}})
        .then((user)=>{
            if(user==null){
                User.create({
                    name:req.body.name
                }).then((user)=>{
                    res.status(200).send(user)
                }).catch((err)=>
                {
                   res.status(500).send(err)
                })
            }
            else{
                res.status(200).send(user)
            }
        }).catch((err)=>
        {
           res.status(500).send(err)
        })
})

route.post('/',(req,res)=>{
    User.create({
        name:req.body.name

    }).then((User)=>
    {
        res.status(201).send(User)
    })
    .catch((err)=>{
        res.status(501).send({
            error:"Could not add new users"
        })
    })


})

exports= module.exports = route