/* File untuk membaut router (bndpoint) */
/* Import library express */
const express = require(`express`)

/* Inisialisasi server express */
const app = express()

/* Membaca request dengan JSON */
app.use(express.json())

/* import Controller (function) */
const adminController = require(`../controllers/admin.controller`)
/** load authorization function from controllers */
const { authorize } = require(`../controllers/auth.controller`)




/* Endpoint Admin */
/* server.method("path", namaConstroller.namaMethod) */
app.post("/",[authorize], adminController.addAdmin)           // post : Menambahkan data
app.get("/",[authorize], adminController.getAllAdmin)         // get : Mendapatkan data   
app.post("/find",[authorize], adminController.findAdmin)      // post : Menangkap detail dengan path find
app.put("/:id",[authorize], adminController.updateAdmin)      // put : Menangkap data dengan path id
app.delete("/:id",[authorize], adminController.deleteAdmin)   // delete : Menghapus data dengan path id

/* Export file */
module.exports = app // melakukan export file supaya dapat di acc di file lain