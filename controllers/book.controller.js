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

    /* Mendefinisikan data dari request (menangkap) */
    upload(request, response, async error => {
        /** check if there are errorwhen upload */
        if (error) {
            return response.json({ message: error })
        }

        /** check if file is empty */
        if (!request.file) {
            return response.json({ message: `Nothing to Upload` })
        }

        /** prepare data from request */
        let newBook = {
            isbn: request.body.isbn,
            title: request.body.title,
            author: request.body.author,
            publisher: request.body.publisher,
            category: request.body.category,
            stock: request.body.stock,
            cover: request.file.filename
        }

        /** execute inserting data to book's table */
        bookModel.create(newBook)
            .then(result => {
                /** if insert's process success */
                return response.json({
                    success: true,
                    data: result,
                    message: `New book has been inserted`
                })
            })
            .catch(error => {
                /** if insert's process failed */
                return response.json({
                    success: false,
                    message: error.message
                })
            })

    })

}

/** create function to read all data */
exports.getAllBook = async (request, response) => {
    /** call findAll() to get all data */
    let books = await bookModel.findAll()
    return response.json({
        success: true,
        data: books,
        message: `All Books have been loaded`
    })
}

/** create function for filter */
exports.findBook = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword

    /** call findAll() within where clause and operation 
     * to find data based on keyword  */
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
    return response.json({
        success: true,
        data: books,
        message: `All Books have been loaded`
    })
}

/** create function to update book */
exports.updateBook = async (request, response) => {
    /** run upload function */
    upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }

        /** store selected book ID that will update  */
        let id = request.params.id

        /** prepare book's data that will update */
        let book = {
            isbn: request.body.isbn,
            title: request.body.title,
            author: request.body.author,
            publisher: request.body.publisher,
            category: request.body.category,
            stock: request.body.stock
        }

        /** check if file is not empty,
         * it means update data within reupload file
         */
        if (request.file) {
            /** get selected book's data */
            const selectedBook = await bookModel.findOne({
                where: { id: id }
            })

            /** get old filename of cover file */
            const oldCoverBook = selectedBook.cover

            /** prepare path of old cover to delete file */
            const pathCover = path.join(__dirname, `../cover`, oldCoverBook)

            /** check file existence */
            if (fs.existsSync(pathCover)) {
                /** delete old cover file */
                fs.unlink(pathCover, error => console.log(error))
            }

            /** add new cover filename to book object */
            book.cover = request.file.filename    
        }

        /** execute update data based on defined id book */
        bookModel.update(book, { where: { id: id } })
            .then(result => {
                /** if update's process success */
                return response.json({
                    success: true,
                    message: `Data book has been updated`
                })
            })
            .catch(error => {
                /** if update's process fail */
                return response.json({
                })
            })
    })
    
}

/** create function to delete book */
exports.deleteBook = async (request, response) => {
    /** store selected book's ID that will be delete */
    const id = request.params.id

    /** -- delete cover file -- */
    /** get selected book's data */
    const book = await bookModel.findOne({ where: { id: id } })
    /** get old filename of cover file */
    const oldCoverBook = book.cover

    /** prepare path of old cover to delete file */
    const pathCover = path.join(__dirname, `../cover`, oldCoverBook)

    /** check file existence */
    if (fs.existsSync(pathCover)) {
        /** delete old cover file */
       fs.unlink(pathCover, error => console.log(error))
    }
    /** -- end of delete cover file -- */

    /** execute delete data based on defined id book */
    bookModel.destroy({ where: { id: id } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data book has been deleted`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}


