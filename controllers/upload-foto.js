/* Import library 'multer' and 'path' */
const multer = require(`multer`) // Multer adalah middleware node.js untuk menangani form data , yang biasanya digunakan untuk mengunggah file.
const path = require(`path`)  // Tempat menyimpan foto

/* Configurasi penyimpanan */
const storage = multer.diskStorage({
    /* Definisikan tempat penyimpanan */
    destination: (req, file, cb) => { // request, file and callback
        cb(null, `./imgaes/foto`)  //  ndak paham
    },

    /* Deinisi filename untuk upload foto */
    filename: (req, file, cb) => { // request, file and callback
        cb(null, `foto-${Date.now()}${path.extname(file.originalname)}`) // ndak paham
    }
})

/* Function Upload  with multer */
const upload = multer({
    /* konfigurasi penyimpanan */
    storage: storage,
    /* Filter upload foto */
    fileFilter: (req, file, cb) => {
        /* Filter type upload foto  */
        const acceptedType = [`image/jpg`, `image/jpeg`, `image/png`] // Acc file foto forman png, jpeg, jpg

        /* Jika type tidak sesuai */
        if (!acceptedType.includes(file.mimetype)) {
            cb(null, false) /** refuse upload */ /* Kembalikan upload jadi error */
            return cb(`Invalid file type (${file.mimetype})`) // tamopilkan error

        }

        /* Filter ukuran dari foto */
        const fileSize = req.headers[`content-length`] // filter panjang / besar file
        const maxSize = (1 * 1024 * 1024) // max ukuran 1 mb 

        /* Jika ukuran lebih dari max ukuran */
        if(fileSize > maxSize){
            cb(null, false) /* Kembalikan upload jadi error */
            return cb(`File size is too large`) // tampilkan pesan 
        }

        cb(null, true) /** accept upload */
    }
})
 
module.exports = upload // export file supaya dapat digunakan di file lain
