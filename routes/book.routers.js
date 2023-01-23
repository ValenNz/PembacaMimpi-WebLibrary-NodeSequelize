/** load library express */
const express = require(`express`)

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load book's controller */
const bookController = require(`../controllers/book.controller`)

/** create route to get data with method "GET" */
app.get("/", bookController.getAllBooks)
/** create route to find book
 * using method "POST" and path "find" */
app.post("/find", bookController.findBook)
/** create route to find book
 * using method "POST" and path "find" */
app.post("/find", bookController.findBook)
/** create route to update book 
 * using method "PUT"
 * and define parameter for "id" */
app.put("/:id", bookController.updateBook)
/** create route to delete book 
 * using method "DELETE" and define parameter for "id" */
app.delete("/:id", bookController.deleteBook)

/** export app in order to load in another file */
module.exports = app
