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
app.post("/", adminController.addAdmin)           // post : Menambahkan data
app.get("/", adminController.getAllAdmin)         // get : Mendapatkan data   
app.post("/find", adminController.findAdmin)      // post : Menangkap detail dengan path find
app.put("/:id", adminController.updateAdmin)      // put : Menangkap data dengan path id
app.delete("/:id", adminController.deleteAdmin)   // delete : Menghapus data dengan path id

/** create route to get data with method "GET" */
app.get("/", [authorize], adminController.getAdmins)

/** create route to add new admin using method "POST" */
app.post("/", [authorize], adminController.addAdmin)

/** create route to find admin
 * using method "POST" and path "find" */
app.post("/find", [authorize], adminController.findAdmin)

/** create route to update admin 
 * using method "PUT" and define parameter for "id" */
app.put("/:id", [authorize], adminController.updateAdmin)

/** create route to delete admin 
 * using method "DELETE" and define parameter for "id" */
app.delete("/:id", [authorize], adminController.deleteAdmin)



/* Export file */
module.exports = app // melakukan export file supaya dapat di acc di file lain