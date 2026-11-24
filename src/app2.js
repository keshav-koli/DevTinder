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
        const user = new User(req.body);
        console.log(req.body);
        await user.save()
        res.send("User Saved Successfully")
    } catch (error) {
        console.error("Error while saving user:", error);
        res.status(500).send(error.message);
    }
})


// ! findById function
// app.post('/user', async (req, res) => {
//     const id = req.body.userId
//     try {
//         const user = await User.findById(id);
//         res.send(user);
//     }
//     catch (err) {
//         res.status(400).send(err.message);
//     }
// })

// !  find by anything 
app.get('/user', async (req, res) => {
    // const userAge = req.body.userAge

    try {
        const user = await User.find({});
        res.send(user);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

// ! find One 
app.post('/user', async (req, res) => {
    const userAge = req.body.userAge

    try {
        const user = await User.findOne({ age: userAge });
        res.send(user);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

// ! delete user
app.delete('/user', async (req, res) => {
    const id = req.body.id

    try {
        // const user = await User.findByIdAndDelete( id );
        // const user = await User.findByIdAndDelete({ _id: id });
        const user = await User.findOneAndDelete({ _id: id });
        console.log(user);
        res.send(user);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

// ! update user 

app.patch('/user', async (req, res) => {
    const data = req.body;
    const id = req.body.id

    try {
        // const user = await User.findByIdAndDelete( id );
        // const user = await User.findByIdAndUpdate({ _id: id },data);
        const user = await User.findByIdAndUpdate({ _id: id }, data, { returnDocument: 'after', runValidators: true });
        console.log(user);
        res.send(user);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

testConnection().then((res) => {
    // console.log(res);
    console.log("connection successfull");
    app.listen('7777', () => {
        console.log("server listening successfully");
    })

}).catch(() => {
    console.log("error in connecting ");
})

