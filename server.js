/** load library express */
const express = require(`express`)

/** create object that instances of express */
const app = express()

/** define port of server */
const PORT = 8000

/** load library cors */
const cors = require(`cors`)

/** open CORS policy */
app.use(cors())

/** define all routes */
const memberRoute = require(`./routes/member.routes`)

/** define prefix for each route */
app.use(`/member`, memberRoute)

/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of School's Library runs on port ${PORT}`)
})
