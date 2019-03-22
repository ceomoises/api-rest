"use strict"

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const api = require("./routes")

																			/* (valores coficados en tuplas) */
// Soporta el análisis de aplicaciones/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
// Soporta el análisis de aplicaciones tipo JSON
app.use(bodyParser.json())

app.use("/api",api)

module.exports = app
