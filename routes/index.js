"use strict"

const express = require("express")
const productCtrl = require("../controllers/product")
const userCtrl = require("../controllers/user")
const isAuth = require("../middlewares/auth")

const api = express.Router()

//Metodo GET 2048 caracteres
//Todos los productos
api.get("/product",isAuth, productCtrl.getProducts)
//Un solo producto
api.get("/product/:productId",isAuth,productCtrl.getProduct)
//Subir un nuevo producto
api.post("/product",isAuth,productCtrl.saveProduct)
//Actualizar un producto
api.put("/product/:productId",isAuth,productCtrl.updateProduct)
//Eliminar un producto
api.delete("/product/:productId",isAuth,productCtrl.deleteProduct)

api.post("/signup",userCtrl.signUp)
api.post("/signin",userCtrl.signIn)

//privado
api.get("/private",isAuth,(req,res)=>{
  res.status(200).send({message:"tienes acceso!"})
})

module.exports = api
