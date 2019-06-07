"use strict"

const services = require("../services")

function isAuth(req,res,next){
  if(typeof req.headers.authorization !== "string"){
    return res.status(403).send({message:"no tienes autorización"})
  }
  const token = req.headers.authorization.split(" ")[1]
  console.log(token);

  services.decodeToken(token)
    .then(response=>{
      req.user = response
      next()

    })
    .catch(response=>{
      res.status(response.status).send({message:response.message})
    })
}

module.exports = isAuth
