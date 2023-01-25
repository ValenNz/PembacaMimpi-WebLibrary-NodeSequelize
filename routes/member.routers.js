/* File untuk membaut router (bndpoint) */
/* Import library express */
const express = require(`express`)

/* Inisialisasi server express */
const app = express()

/* Membaca request dengan JSON */
app.use(express.json())

/* import Controller (function) */
const memberController = require(`../controllers/member.controller`)

/** load middleware for validation request */
let { validateMember } = require(`../middlewares/member-validation`)

/* Endpoint Member */
/* server.method("path", namaConstroller.namaMethod) */
app.post("/",[validateMember], memberController.addMember)           // post : Menambahkan data
app.get("/",[validateMember], memberController.getAllMember)         // get : Mendapatkan data
app.post("/find",[validateMember], memberController.findMember)      // post : Menangkap detail dengan path find
app.put("/:id",[validateMember], memberController.updateMember)      // put : Menangkap data dengan path id
app.delete("/:id",[validateMember], memberController.deleteMember)   // delete : Menghapus data dengan path id

/* Export file */
module.exports = app // melakukan export file supaya dapat di acc di file lain





