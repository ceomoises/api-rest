"use strict"

const express = require("express")
const bodyParser = require("body-parser")
//interfaz
const hbs = require("express-handlebars")

const app = express()
const api = require("./routes")

																			/* (valores coficados en tuplas) */
// Soporta el análisis de aplicaciones/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
// Soporta el análisis de aplicaciones tipo JSON
app.use(bodyParser.json())

/* Configurando handlebars */
app.engine(".hbs",hbs({
  defaultLayout:"default",
  extname:".hbs"
}))
app.set("view engine",".hbs")
/* Terminando handlebars  */

app.use("/api",api)

app.get("/login",(req,res)=>{
  res.render("login")
})
app.get('/', (req, res) => {
  res.render('product')
})


module.exports = app
