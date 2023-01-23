/* File untuk membaut router (bndpoint) */
/* Import library express */
const express = require(`express`)

/* Inisialisasi server express */
const app = express()

/* Membaca request dengan JSON */
app.use(express.json())

/* import Controller (function) */
const memberController = require(`../controllers/member.controller`)

/* Endpoint Member */
/* server.method("path", namaConstroller.namaMethod) */
app.get("/", memberController.getAllMember)         // get : Mendapatkan data
app.post("/", memberController.addMember)           // post : Menambahkan data
app.post("/find", memberController.findMember)      // post : Menangkap detail dengan path find
app.put("/:id", memberController.updateMember)      // put : Menangkap data dengan path id
app.delete("/:id", memberController.deleteMember)   // delete : Menghapus data dengan path id

/* Export file */
module.exports = app // melakukan export file supaya dapat di acc di file lain





