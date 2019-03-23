"use strict"

const express = require("express")
const productCtrl = require("../controllers/product")
const isAuth = require("../middlewares/auth")

const api = express.Router()

//Metodo GET 2048 caracteres
//Todos los productos
api.get("/product", productCtrl.getProducts)
//Un solo producto
api.get("/product/:productId",productCtrl.getProduct)
//Subir un nuevo producto
api.post("/product",productCtrl.saveProduct)
//Actualizar un producto
api.put("/product/:productId",productCtrl.updateProduct)
//Eliminar un producto
api.delete("/product/:productId",productCtrl.deleteProduct)

//privado
api.get("/private",isAuth,(req,res)=>{
  res.status(200).send({message:"tienes acceso!"})
})

module.exports = api
