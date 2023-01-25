/* File untuk membaut router (bndpoint) */
/* Import library express */
const express = require(`express`)

/* Inisialisasi server express */
const app = express()

/* Membaca request dengan JSON */
app.use(express.json())

/* import Controller (function) */1
const bookController = require(`../controllers/book.controller`)
/** load function from simple-middleware */
const { midOne } = require(`../middlewares/simple-middleware`)

/* Endpoint Book */
/* server.method("path", namaConstroller.namaMethod) */
app.post("/",[midOne], bookController.addBook)           // post : Menambahkan data
app.get("/",[midOne],  bookController.getAllBook)         // get : Mendapatkan data   
app.post("/find",[midOne], bookController.findBook)      // post : Menangkap detail dengan path find
app.put("/:id",[midOne], bookController.updateBook)      // put : Menangkap data dengan path id
app.delete("/:id",[midOne], bookController.deleteBook)   // delete : Menghapus data dengan path id

/** export app in order to load in another file */
module.exports = app
