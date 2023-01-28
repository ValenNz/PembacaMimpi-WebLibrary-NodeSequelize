/* Import library JOI */
const Joi = require(`joi`) // Validasi input 

/* Fungsi validasi dari member */
const validateMember = (request, response, next) => {
    /* Definisi peraturan validasi */
    const rules = Joi
        .object()
        .keys({
            /* Field harus diisi */
            name: Joi.string().required(),
            address: Joi.string().required(),
            contact: Joi.number().required(),
            gender: Joi.string().valid(`Male`, `Female`)
        })
        .options({ abortEarly: false })

    /* Mendapatkan error jika ad error pada validasi */
    let { error } = rules.validate(request.body)

    /* Jika ada error */
    if (error != null) {
        /* Mendapatkan semua error */
        let errMessage = error.details.map(it => it.message).join(",")

        /* Mengirim response error dengan code 422*/
        return response.status(422).json({
            success: false,
            message: errMessage
        })
    }

    next() // jika tidak ada erro lanjutkan function selanjutnya (controller)
}

module.exports = { validateMember } // Melakukan exports supaya dapat digyunakan di file lain
