/* File untuk melakukan function CRUD */ 

/* Import Model */
const bookModel = require(`../models/index`).book // melakukan inisialisasi terhadap index supaya terhubung ke db

/* Import method operation sequelize  */
const Op = require(`sequelize`).Op

/* Import library 'path' and 'filestream' */
const path = require(`path`) // Peletakan file
const fs = require(`fs`)     // Pengelolaan file

/* Definisi letak penyimpanan foto dengan req (foto) dan hanya satu foto*/
const upload = require(`./upload-cover`).single(`cover`)


/* Function CREATE */
exports.addBook = (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */

    /* Upload data  */
    upload(request, response, async error => {
        /* Check jika terjadi error tampilkan pesan */
        if (error) {
            return response.json({ message: error })
        }

        /* Check jika tidak upload foto tampilkan pesan 'Tidak ada foto buku yang dihapus */
        if (!request.file) {
            return response.json({ message: `Tidak ada foto buku yang dihapus` })
        }

    /* Mendefinisikan data dari request (menangkap) */
        let newBook = {
            isbn: request.body.isbn,
            title: request.body.title,
            author: request.body.author,
            publisher: request.body.publisher,
            category: request.body.category,
            stock: request.body.stock,
            cover: request.file.filename
        }

        /* Ekseskusi tambah data  */
        bookModel.create(newBook)
            /* Jika berhasil tampilkan pesan  */
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: `Buku baru telah ditambahkan`
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

}

/* Function READ */
exports.getAllBook = async (request, response) => {
     /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
     */
    /** call findAll() to get all data */
    let books = await bookModel.findAll() // use findAll() : Memangil semua data

    /* Mengembalikan response */
    return response.json({
        success: true,
        data: books,
        message: `All Books have been loaded`
    })
}

/* Funtion Detail  */
exports.findBook = async (request, response) => {
     /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
     */
    /** call findAll() to get all data */
    let keyword = request.body.keyword

    /* Mencari buku berdasarkan salah satu data yang dimasukan */
    let books = await bookModel.findAll({
        where: {
            [Op.or]: [
                { isbn: { [Op.substring]: keyword } },
                { title: { [Op.substring]: keyword } },
                { author: { [Op.substring]: keyword } },
                { category: { [Op.substring]: keyword } },
                { publisher: { [Op.substring]: keyword } }
            ]
        }
    })

    /* Mengembalikan response */
    return response.json({
        success: true,
        data: books,
        message: `All Books have been loaded`
    })
}

/* Function UPDATE */
exports.updateBook = async (request, response) => {  // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */
    
    /* Upload data */
    upload(request, response, async error => {
        /* Check jika terjadi error tampilkan pesan */
        if (error) {
            return response.json({ message: error })
        }

        /* Mendefinisikan data berdasarkan id yang dimasukan */
        let id = request.params.id

        /* Mendefinisikan data dari request (menangkap) */
        let book = {
            isbn: request.body.isbn,
            title: request.body.title,
            author: request.body.author,
            publisher: request.body.publisher,
            category: request.body.category,
            stock: request.body.stock
        }

        /* Check jika foto tidak kosong update data dengan foto reuppload  */
        if (request.file) {
            /* Dapatkan buku berdasarkan id */
            const selectedBook = await bookModel.findOne({
                where: { id: id }
            })

            /* Dapatkan nama lama buku */
            const oldCoverBook = selectedBook.cover

            /* Letak dari penyimpana foto */
            const pathCover = path.join(__dirname, `../images/cover`, oldCoverBook)

            /**check file existence */
            if (fs.existsSync(pathCover)) {
                /* Hapus foto lama */
                fs.unlink(pathCover, error => console.log(error)) // unlink (hapus)
            }

            /* Tambahkan foto baru di buku */
            book.cover = request.file.filename    
        }

        /* Eksekusi update data buku */
        bookModel.update(book, { where: { id: id } }) // Berdasarkan id 
        /* Jika suskses update tampilkan pesan */
            .then(result => {
                return response.json({
                    success: true,
                    message: `Data buku telah di update`
                })
            })
            /* Jika error tampilkan pesan error */
            .catch(error => {
                return response.json({
                })
            })
    })
    
}

/* Funtion Delete */
exports.deleteBook = async (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */

    /* Mendefinisikan data berdasarkan id yang dimasukan */
    const id = request.params.id

    /* -- delete cover file -- */
    /* Mendapatkan data buku  */
    const book = await bookModel.findOne({ where: { id: id } })

    /* Mendapatkan foto lama */
    const oldCoverBook = book.cover

    /* Mendefinisikan peletakan dari penyimpanan foto */
    const pathCover = path.join(__dirname, `../images/cover`, oldCoverBook)

    /** check file existence */
    if (fs.existsSync(pathCover)) {
        /* Hapus foto lama */
       fs.unlink(pathCover, error => console.log(error))
    }
    /** -- end of delete cover file -- */

    /* Eksekusi Hapus berdasarkan id */
    bookModel.destroy({ where: { id: id } })
        /* Jika berhasil tampilkan pesan data berhasil dihapus */
        .then(result => {
            return response.json({
                success: true,
                message: `Data buku berhasil dihapus`
            })
        })
        /* Jika error tampilkan pesan error */
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}


