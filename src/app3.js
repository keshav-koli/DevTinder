const express = require('express')
const { testConnection } = require('./config/database')
const profileRouter = require('./routes/profileRouter')
const authRouter = require('./routes/authRouter')
const cookieParse = require('cookie-parser');


const app = express();
app.use(express.json())
app.use(cookieParse())

app.use('/', authRouter)
app.use('/', profileRouter)



testConnection().then((res) => {
    console.log("connection successfull");
    app.listen('7777', () => {
        console.log("server listening successfully");
    })

}).catch(() => {
    console.log("error in connecting ");
})

