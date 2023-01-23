/* File untuk melakukan function CRUD / 

/* Import Model */
const adminModel = require('../models/index').admin // melakukan inisialisasi terhadap index supaya terhubung ke db

/* Import method operation sequelize  */
const Op = require(`sequelize`).Op

const md5 = require(`md5`) // hashing untuk menyembunyikan informasi yang sebenarnya. Hashing dilakukan menggunakan library md5

let password = md5(`password`)

/* Function CREATE */
exports.addAdmin = (req, res) => {
    let newAdmin = {
        name: req.body.name,
        contact: req.body.contact,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password
    }

    adminModel.create(newAdmin)
    .then(result => {
        return res.json({
            success: true,
            data: result,
            message: 'Data admin telah ditambahkan'
        })
    })
    .catch(err => {
        return res.json({
            success:false,
            message: err.message
        })
    })
}

/* Function READ */
exports.getAllAdmin = async (req, res) => {
    let admins = await adminModel.findAll()

    return res.json({
        success: true,
        data: admins,
        message: 'Semua data admin berhasil di tampilkan'
    })
}

/* Function READ Filter */
exports.findAdmin = async (req, res) => {
    let keyword = await req.body.keyword

    let admins = await adminModel.findAll({
        where: {
            [Op.or]: [
                {name: {[Op.substring]:keyword}},
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return res.json({
        success: true,
        data: admins, 
        message: `Semua data admin telah di tampilkan`
    })
}

/* Function UPDATE */
exports.updateAdmin = (req, res) => { 

    let dataAdmin = {
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        username: req.body.username,
        password: req.body.password
    }

    let idAdmin = req.params.id

    adminModel.update(dataAdmin, { where: { id: idAdmin } }) 

        .then(result => {
            return res.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            return res.json({
                success: false,
                message: error.message
            })
        })
}

/* Function Deete  */
exports.deleteAdmin = (req, res) => { 

    let idAdmin = req.params.id

    adminModel.destroy({ where: { id: idAdmin } }) 
        .then(result => {
            return res.json({
                success: true,
                message: `Data admin has been deleted`
            })
        })
        .catch(error => {
            return res.json({
                success: false,
                message: error.message
            })
        })
}

