/* Import Model */
const borrowModel = require(`../models/index`).borrow                       // Model borrow
const detailsOfBorrowModel = require(`../models/index`).details_of_borrow   // Model details of borrow

/* Load Operation Sequelize */
const Op = require(`sequelize`).Op

/* Function CREATE */
exports.addBorrowing = async (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */

    /* Mendefinisikan data dari request (menangkap) */
    let newData = {
        memberID: request.body.memberID,
        adminID: request.body.adminID,
        date_of_borrow: request.body.date_of_borrow,
        date_of_return: request.body.date_of_return,
        status: request.body.status
    }

    /** Eksekusi create data */
    borrowModel.create(newData)
        /* Jika berhasil  */
        .then(result => {
            /* Tangkap id berdasarkan req dari pram yang dikirim */
            let borrowID = result.id

            /* Meniyimpan detail peminjaman buku dari permintaan berbentuk array  */
            let detailsOfBorrow = request.body.details_of_borrow

            /* Menambahkan setiap borrowID ke dalam detailOfBorrow dengan perulangan*/
            for (let i = 0; i < detailsOfBorrow.length; i++) { // i kurang dari details of borrow
                detailsOfBorrow[i].borrowID = borrowID // setiap details of borrow = borrowID
            }

            /* Memasukan semua data detail of borrow */
            detailsOfBorrowModel.bulkCreate(detailsOfBorrow) // Metode bulkCreate() memungkinkan Anda untuk memasukkan beberapa catatan ke tabel database Anda dengan satu panggilan fungsi.
                /* Jika berhasil  */
                .then(result => {
                    return response.json({
                        success: true,
                        message: `Peminjaman buku telah ditambahkan`
                    })
                })
                /* Jika error tampilkan pesan error */
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })

        })
        /* Jika tidak dapat melaku kan creat etampilkan pesan error */
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/* Function UPDATE */
exports.updateBorrowing = async (request, response) => {// exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */

    /* Mendefinisikan data dari request (menangkap) */
    let newData = {
        memberID: request.body.memberID,
        adminID: request.body.adminID,
        date_of_borrow: request.body.date_of_borrow,
        date_of_return: request.body.date_of_return,
        status: request.body.status
    }

    /* Menangkap id yang dikirim dari parameter berdasarkan request */
    let borrowID = request.params.id

    /* Eksekusi untuk melakukan update */
    borrowModel.update(newData, { where: { id: borrowID } }) // menangka data berdasarkan id yang ditangkap
        /* Jika berhasil */
        .then(async result => {

            /* hapus semua detail OfBorrow berdasarkan borrowID */
            await detailsOfBorrowModel.destroy(
                { where: { borrowID: borrowID } } // berdasarkan id
            )

            /* menyimpan detail peminjaman buku dari permintaan */
            let detailsOfBorrow = request.body.details_of_borrow

            /* sisipkan borrowID ke setiap item detailOfBorrow */
            for (let i = 0; i < detailsOfBorrow.length; i++) {
                detailsOfBorrow[i].borrowID = borrowID 
            }

            /* Memasukan kembali semua data detail of borrow */
            detailsOfBorrowModel.bulkCreate(detailsOfBorrow) // Metode bulkCreate() memungkinkan Anda untuk memasukkan beberapa catatan ke tabel database Anda dengan satu panggilan fungsi.
                /* Jika berhasil */
                .then(result => {
                    return response.json({
                        success: true,
                        message: `Book Borrowed has been updated`
                    })
                })
                /* Jiga gagal memasukan update mak atampilkan error */
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })

        })
        /* Jika gagaglk menangkap data untuk update tampilkan error */
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/* Function READ */
exports.getBorrow = async (request, response) => {  // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    /* Definiskan keyword */

    /* Membuat definisi untuk memanggil sesuasi kondisi */
    let data = await borrowModel.findAll(
        {
            include: [ // masukan member, admin
                `member`, `admin`,
                {
                    model: detailsOfBorrowModel,
                    as: `details_of_borrow`,
                    include: ["book"]
                }
            ]
        }
    )

    /* Kembalikan respoonse */
    return response.json({
        success: true,
        data: data,
        message: `Semua data peminjaman telah ditampilkan`
    })
}

/* Function Detail */
exports.findBorrow = async (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    /* Definiskan keyword */

    /* Membuat definisi untuk memanggil sesuasi kondisi */
    let members = await borrowModel.findAll({ // Temukan semua
        where: {  // ketika memberID = id di params
            memberID : request.params.id
           }
    })
    /* Mengirim Response */
    return response.json({
        success: true,
        data: members,  // Tampilkan data member
        message: `Semua data pembelian berdasarkan member telah ditampilkan`
    })
}

/* Function Delete */
exports.deleteBorrowing = async (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    /* Definiskan keyword */

    /* Menangkap id berdasarkan id params */
    let borrowID = request.params.id

    /* delet detail of borroew menggubakan model */
    detailsOfBorrowModel.destroy(
        { where: { borrowID: borrowID } } // Mengahopus berdasarkan id
    )
        /* Jika berhasil */
        .then(result => {
            /* Menghaups detail of borrrow dengan model */
            borrowModel.destroy({ where: { id: borrowID } })
                /* Jika berhasil  */
                .then(result => {
                    return response.json({
                        success: true,
                        message: `Peminjmana buku telah dihapus `
                    })
                })
                /* Jika gagal tampilkan error */
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
        /* Jika gagal menangklap id tampilkan error */
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/* Fuinct5ion Return Book */
exports.returnBook = async (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    /* Definiskan keyword */

    /* Menangkap id berdasarkan id params */
    let borrowID = request.params.id

    /* Mendefinisikan data dari request (menangkap) */
    let today = new Date()
    let currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    /* perbarui status dan tanggal_pengembalian dari data peminjam */
    borrowModel.update(
        {
            date_of_return: currentDate,
            status: true
        },
        {
            where: { id: borrowID }
        }
    )
        /* Jika berhasil */
        .then(result => {
            return response.json({
                success: true,
                message: `Buku telah dikembalikan`
            })
        })
        /* Jika gagal tampilkan error */
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}





