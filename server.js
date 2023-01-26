/* File untuk menjalankan server */

/* Imoport library express */
const express = require(`express`)

/* Membuat object ~unutk server */
const app = express()

/* Mendefinisikan port di 8000 */
const PORT = 8000

/* Import libary cors */
const cors = require(`cors`)

/** open CORS policy */ 
app.use(cors()) // Menghubungkan broweser ke web-service
app.use(express.static(__dirname))

/* Mengimport semua router */
const memberRoute = require(`./routes/member.routers`)
const adminRoute = require('./routes/admin.routers')    
const bookRoute = require(`./routes/book.routers`)
const borrowRoute = require(`./routes/borrow.routers`)
const auth = require(`./routes/auth.routers`)

/* Mendefinisikan path sebelum router */
app.use(`/member`, memberRoute) // roueter member -> localhost:8000/member
app.use('/admin', adminRoute)
app.use(`/book`, bookRoute)
app.use(`/borrow`, borrowRoute)
app.use(`/auth`, auth)

/* Menjalankan server di port 8000 */
app.listen(PORT, () => {
    console.log(`Server pembaca mimpi berjalan di port ${PORT}`)
})
