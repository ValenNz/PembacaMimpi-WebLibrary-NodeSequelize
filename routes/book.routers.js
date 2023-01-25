/* File untuk membaut router (bndpoint) */
/* Import library express */
const express = require(`express`)

/* Inisialisasi server express */
const app = express()

/* Membaca request dengan JSON */
app.use(express.json())

/* import Controller (function) */
const bookController = require(`../controllers/book.controller`)

/* Endpoint Book */
/* server.method("path", namaConstroller.namaMethod) */
app.post("/", bookController.addBook)           // post : Menambahkan data
app.get("/", bookController.getAllBook)         // get : Mendapatkan data   
app.post("/find", bookController.findBook)      // post : Menangkap detail dengan path find
app.put("/:id", bookController.updateBook)      // put : Menangkap data dengan path id
app.delete("/:id", bookController.deleteBook)   // delete : Menghapus data dengan path id

/** export app in order to load in another file */
module.exports = app
