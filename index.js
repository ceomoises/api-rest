"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const Product = require("./models/product")

const app = express()
const port = process.env.PORT || 3000
																			/* (valores coficados en tuplas) */
// Soporta el análisis de aplicaciones/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
// Soporta el análisis de aplicaciones tipo JSON
app.use(bodyParser.json())

//Metodo GET 2048 caracteres
//Todos los productos
app.get("/api/product",(req,res)=>{
	Product.find({},(err,products)=>{
		if(err) return res.status(500).send({message:`Error al realizar la petición ${err}`})
		if(!products) return res.status(404).send({message:"No existen productos"})

		res.status(200).send({products})
	})
})
//Un solo producto
app.get("/api/product/:productId",(req,res)=>{
	let productId = req.params.productId
	Product.findById(productId,(err,product)=>{
		if(err) return res.status(500).send({message:`Error al realizar la petición ${err}`})
		if(!product) return res.status(404).send({message:"El producto no existe"})

		res.status(200).send({product:product})
	})
})
//Subir un nuevo producto
app.post("/api/product",(req,res)=>{
	console.log("POST /api/product")
	console.log(req.body);

	let product = new Product()
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err,productStored)=>{
		if(err) return res.status(500).send({message:`Error al salvar en la base ${err}`})
		res.status(200).send({product:productStored})
	})

})

//Actualizar un producto
app.put("/api/product/:productId",(req,res)=>{
	let productId = req.params.productId

	let update = req.body

	Product.findByIdAndUpdate(productId, update,(err,productUpdated)=>{
		if(err)return res.status(500).send({message:`Error al actualizar el producto ${err}`})
		res.status(200).send({product:productUpdated})
	})


})
//Eliminar un producto
app.delete("/api/product/:productId",(req,res)=>{

	let productId = req.params.productId
	Product.findById(productId,(err,product)=>{
		if(err) return res.status(500).send({message:`Error en la petición de borrado ${err}`})
		product.remove(err =>{
			if(err) return res.status(500).send({message:`Error al borrar el producto ${err}`})
			res.status(200).send({message:"El producto ha sido eliminado!"})
		})
	})
})


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/shop",{useNewUrlParser:true},(err,res)=>{
	if(err){
		return console.log(`Error al conectar a la base de datos:${err}`)
	}
	console.log("Conexión a la base de datos establecida...")
	app.listen(port,()=>{
		console.log(`API Rest corriendo en http://localhost:${port}`)
	})
})
