/* File untuk membaut router (bndpoint) */
/* Import library express */
const express = require(`express`)

/* Inisialisasi server express */
const app = express()

/* Membaca request dengan JSON */
app.use(express.json())

/* load authorization function from controllers */
const {authenticate} = require(`../controllers/auth.controller`)

/* Membuat router authentication */
app.post(`/`, authenticate)

module.exports = app // melakukan export file supaya dapat di acc di file lain