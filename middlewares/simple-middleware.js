/* Membuat middleware  */
const midOne = async (request, response, next) => {
    console.log(`Run Middleware One`) // Menjalankan middleware
    next() // Memproses fungsi selanjutnya (dicontroller)
}


module.exports = {midOne} // Melakukan exports dupaya dapat digunakan di file lain