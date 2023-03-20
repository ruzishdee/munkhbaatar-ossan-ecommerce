console.log('E-commerce Back-END')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const menuApi = require('./routes/menu-api')
const adminApi = require('./routes/admin-api')

const app = express()
const PORT = 8082;
const MONGO_CONNECTION_STRING = "mongodb+srv://blackbilguun:TEozn8OuZBEU4XQF@bilguunee.rn8hbjv.mongodb.net/blgnshop"

app.use(cors())
app.use(express.json())
app.use("/menu", menuApi)
app.use("/admin", adminApi)

app.listen(PORT, () => {
    mongoose
        .connect(MONGO_CONNECTION_STRING)
        .then(console.log("Database succesfully connect"))
        .catch((error) => console.error(error));

    console.log(`E-commerce application is ruuning on http://localhost:${PORT}`)
})