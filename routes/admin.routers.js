/* File untuk membaut router (bndpoint) */
/* Import library express */
const express = require(`express`)

/* Inisialisasi server express */
const app = express()

/* Membaca request dengan JSON */
app.use(express.json())

/* import Controller (function) */
const adminController = require(`../controllers/admin.controller`)

/* Endpoint Admin */
app.post("/", adminController.addAdmin)           // post : Menambahkan data
/* server.method("path", namaConstroller.namaMethod) */
app.get("/", adminController.getAllAdmin)         // get : Mendapatkan data   
app.post("/find", adminController.findAdmin)      // post : Menangkap detail dengan path find
app.put("/:id", adminController.updateAdmin)      // put : Menangkap data dengan path id
app.delete("/:id", adminController.deleteAdmin)   // delete : Menghapus data dengan path id

/* Export file */
module.exports = app // melakukan export file supaya dapat di acc di file lain