/* File untuk melakukan function CRUD */ 

/* Import Model */
const adminModel = require('../models/index').admin // melakukan inisialisasi terhadap index supaya terhubung ke db

/* Import method operation sequelize  */
const Op = require(`sequelize`).Op

const md5 = require(`md5`) // hashing untuk menyembunyikan informasi yang sebenarnya. Hashing dilakukan menggunakan library md5
    
/* Function CREATE */
exports.addAdmin = (req, res) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */

    /* Mendefinisikan data dari request (menangkap) */
    let newAdmin = {
        name: req.body.name,
        contact: req.body.contact,
        address: req.body.address,
        username: req.body.username,
        password: md5(req.body.password)
    }

    /* Menambahkan data baru ke tabel */
    adminModel.create(newAdmin)
    /* Jika berhasil */
    .then(result => {
        /* Kirim response berhasil */
        return res.json({
            success: true,
            data: result,
            message: 'Data admin telah ditambahkan'
        })
    })
    /* Jika Error */
    .catch(err => {
        /* Tampilkan error */
        return res.json({
            success:false,
            message: err.message
        })
    })
}

/* Function READ */
exports.getAllAdmin = async (req, res) => {
     /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
     */
    /** call findAll() to get all data */
    let admins = await adminModel.findAll() // use findAll() : Memangil semua data

    /* Mengembalikan response */
    return res.json({
        success: true,
        data: admins,
        message: 'Semua data admin berhasil di tampilkan'
    })
}

/* Function READ Filter */
exports.findAdmin = async (req, res) => {
     /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    /* Definiskan keyword */
    let keyword = await req.body.keyword

    /* Membuat definisi untuk memanggil sesuasi kondisi */
    let admins = await adminModel.findAll({
        where: {
            [Op.or]: [
                {name: {[Op.substring]:keyword}}, // cari nama berdasarkan keyword (req)
                { address: { [Op.substring]: keyword } } // cari address berdasarkan keyword (req)
            ]
        }
    })
    /* Mengirim Response */
    return res.json({
        success: true,
        data: admins,  // Tampilkan data member
        message: `Semua data admin telah di tampilkan`
    })
}

/* Function UPDATE */
exports.updateAdmin = (req, res) => {  // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    
    /* Mendefinisikan data dari request (menangkap) */
    let dataAdmin = {
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        username: req.body.username,
        password: req.body.password
    }

    /* Mendefinisikan data berdasarkan id yang dimasukan */
    let idAdmin = req.params.id

    /* Melakukan update data berdasarkan Id */
    adminModel.update(dataAdmin, { where: { id: idAdmin } }) // update data ketika id yang ditangkap = idMember

        /* Jika berhasil */
        .then(result => {
            /* Tampilkan response success */
            return res.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        /* Jika gagal */
        .catch(error => {
            /* Tanpilkan pesan error */
            return res.json({
                success: false,
                message: error.message
            })
        })
}

/* Function Deete  */
exports.deleteAdmin = (req, res) => {  // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    
    /* Mendefinisikan data berdasarkan id dari param (menangkap) */  
    let idAdmin = req.params.id

    /* Melakukan delete data berdasarkan id yang ditangkap */
    adminModel.destroy({ where: { id: idAdmin } }) // Hapus data ketika id = idMember
    /* Jika berhasil */
        .then(result => {
            /* Tamnpilkan response success */
            return res.json({
                success: true,
                message: `Data admin has been deleted`
            })
        })
        /* Jika Error */
        .catch(error => {
            /* Tanpilkan Pesan error */
            return res.json({
                success: false,
                message: error.message
            })
        })
}

