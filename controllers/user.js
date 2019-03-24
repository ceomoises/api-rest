"use strict"

const mongoose = require("mongoose")
const User = require("../models/user")
const service = require("../services")

function signUp(req,res){
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })
  //Debemos invocar antes a gravatar
  user.avatar = user.gravatar()

  user.save((err)=>{
    if(err)res.status(500).send({message:`Erro al crear el usuario: ${err}`})
    return res.status(200).send({token: service.createToken(user) })
  })
}

function signIn(req,res){
  //Comenzamos a usar findOne
  User.findOne({email:req.body.email},(err,user)=>{
    if(err)return res.status(500).send({message:err})
    if(!user)return res.status(404).send({message:"no existe el usuario"})

    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(err)return res.status(505).send({message:`Error en servidor: ${err}`})
      if(!isMatch)return res.status(404).send({message:"Error de contraseña"})
      req.user = user
      res.status(200).send({message:"te has logueado correctamente",token:service.createToken(user)})
    })
  })
}

module.exports = {
  signUp,
  signIn
}
