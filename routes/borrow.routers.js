/* File untuk membaut router (bndpoint) */
/* Import library express */
const express = require(`express`)

/* Inisialisasi server express */
const app = express()

/* Membaca request dengan JSON */
app.use(express.json())

/* import Controller (function) */1
const borrowController = require(`../controllers/borrow.controller`)

/* Endpoint Book */
/* server.method("path",[middleware], namaConstroller.namaMethod) */

app.post("/", borrowController.addBorrowing)            // post : Menambahkan data
app.get("/", borrowController.getBorrow)                // get : Mendapatkan data   
app.get("/:id", borrowController.findBorrow)            // get : Mendapatkan detail data
app.put("/:id", borrowController.updateBorrowing)       // put : Menangkap data dengan path id
app.delete("/:id", borrowController.deleteBorrowing)    // delete : Menghapus data dengan path id
app.get("/return/:id", borrowController.returnBook)     // get : Mengembalikan dengan path id


/** export app in order to load in another file */
module.exports = app

