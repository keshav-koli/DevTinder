const express = require('express')
const { testConnection } = require('./config/database')
const User = require('./model/user');
const app = express();

app.use(express.json())
app.post('/signup', async (req, res, next) => {
    try {
        // const user = new User({
        //     firstName: 'ram',
        //     lastNmae: 'sharma',
        //     age: 18,
        //     phoneNumber: 9874563210,
        //     address: 'karampura'
        // })
        const user=new User(req.body);
        console.log(req.body);
        await user.save()
        res.send("User Saved Successfully")
    } catch (error) {
        console.error("Error while saving user:", error);
        res.status(500).send(error.message);
    }
})


testConnection().then((res) => {
    console.log("connection successful");
    app.listen('7777', () => {
        console.log("server listening successfully");
    })

}).catch(() => {
    console.log("error in connecting ");
})

