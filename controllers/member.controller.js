/* File untuk melakukan function CRUD / 

/* Import Model */
const memberModel = require(`../models/index`).member // melakukan inisialisasi terhadap index supaya terhubung ke db 

/* Import method operation sequelize  */
const Op = require(`sequelize`).Op


/* Function READ */
exports.getAllMember = async (request, response) => { // exports arrow fn 
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
     */
    /** call findAll() to get all data */
    let members = await memberModel.findAll() // use findAll() : Memangil semua data
    /* Mengembalikan response */
    return response.json({
        success: true,
        data: members,
        message: `All Members have been loaded`
    })
}

/* Function READ Filter */
exports.findMember = async (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    /* Definiskan keyword */
    let keyword = request.body.keyword // Mendefinisikan dari req body postman (menangkap req)

    /* Membuat definisi untuk memanggil sesuasi kondisi */
    let members = await memberModel.findAll({ // Temukan semua
        where: {    // Ketika ditemukan semua
            [Op.or]: [  // atau 
                { name: { [Op.substring]: keyword } }, // cari nama berdasarkan keyword (req)
                { gender: { [Op.substring]: keyword } }, // cari gender berdasarkan keyword (req)
                { address: { [Op.substring]: keyword } } // cari address berdasarkan keyword (req)
            ]
        }
    })
    /* Mengirim Response */
    return response.json({
        success: true,
        data: members,  // Tampilkan data member
        message: `All Members have been loaded`
    })
}

/* Function CREATE */
exports.addMember = (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    
    /* Mendefinisikan data dari request (menangkap) */
    let newMember = { 
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }

    /* Menambahkan data baru ke tabel */
    memberModel.create(newMember) 
        /* Jika berhasil */
        .then(result => {   
            /* Kirim response berhasil */
            return response.json({
                success: true,
                data: result,
                message: `New member has been inserted`
            })
        })
        /* Jika Error */
        .catch(error => {
            /* Tampilkan error */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/* Function UPDATE */
exports.updateMember = (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    
    /* Mendefinisikan data dari request (menangkap) */
    let dataMember = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }

    /* Mendefinisikan data berdasarkan id yang dimasukan */
    let idMember = request.params.id

    /* Melakukan update data berdasarkan Id */
    memberModel.update(dataMember, { where: { id: idMember } }) // update data ketika id yang ditangkap = idMember

        /* Jika berhasil */
        .then(result => {
            /* Tampilkan response success */
            return response.json({
                success: true,
                message: `Data member has been updated`
            })
        })
        /* Jika gagal */
        .catch(error => {
            /* Tanpilkan pesan error */
            return response.json({
                success: false,
                message: error.message
            })
        })
}


/** Function Deete  */
exports.deleteMember = (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    
    /* Mendefinisikan data berdasarkan id dari param (menangkap) */
    let idMember = request.params.id

    /* Melakukan delete data berdasarkan id yang ditangkap */
    memberModel.destroy({ where: { id: idMember } }) // Hapus data ketika id = idMember
        /* Jika berhasil */
        .then(result => {
            /* Tamnpilkan response success */
            return response.json({
                success: true,
                message: `Data member has been deleted`
            })
        })
        /* Jika Error */
        .catch(error => {
            /* Tanpilkan Pesan error */
            return response.json({
                success: false,
                message: error.message
            })
        })
}



