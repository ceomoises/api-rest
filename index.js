"use strict"

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = process.env.PORT || 3000
																			/* (valores coficados en tuplas) */
// Soporta el análisis de aplicaciones/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
// Soporta el análisis de aplicaciones tipo JSON
app.use(bodyParser.json())

//Metodo GET 2048 caracteres
app.get("/saludame/:name",(req,res)=>{
	res.send({ message:`Un saludo, ${req.params.name}!` })
})

app.listen(3000,()=>{
	console.log(`API Rest corriendo en http://localhost:${port}`)
})
