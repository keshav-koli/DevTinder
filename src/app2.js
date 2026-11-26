const express = require('express')
const { testConnection } = require('./config/database')
const User = require('./model/user');
const app = express();
const { validatorForSignUp } = require('./utils/validator');
const bcrypt = require('bcrypt');
const cookieParse = require('cookie-parser');
const myJWT = require('jsonwebtoken');
const { loginAuth } = require('./middleware/auth')


app.use(express.json())
app.use(cookieParse())

app.post('/signup', async (req, res, next) => {
    try {
        // const user = new User({
        //     firstName: 'ram',
        //     lastNmae: 'sharma',
        //     age: 18,
        //     phoneNumber: 9874563210,
        //     address: 'karampura'
        // })
        console.log(req.body);
        validatorForSignUp(req)

        const { firstName, lastName, email, password, phoneNumber } = req.body;
        const uncryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: uncryptedPassword,
            phoneNumber
        });
        // console.log(req.body);
        await user.save()
        res.send("User Saved Successfully")
    } catch (error) {
        console.error("Error while saving user:", error);
        res.status(500).send(error.message);
    }
})

// ! Login api with token sending
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDetails = await User.findOne({ email: email });
        if (!userDetails) throw new Error('Invalid credentail');
        // const { _id } = userDetails;
        // const matchPassword = await bcrypt.compare(password, userDetails.password);
        const matchPassword = await userDetails.validatePassword(password);
        if (!matchPassword) throw new Error('Invalid password')
        else {
            // const jwtToken = myJWT.sign({ _id }, 'DevTinder@123', { expiresIn: '1d' })
            const jwtToken = userDetails.jwtToken();
            res.cookie('Token', jwtToken, { expires: new Date(Date.now() + 8 * 3600000) })
            res.send('Login successfully!!!')
        }
    } catch (err) {
        res.status(400).send("Error: " + err)
    }
})

// ! Profile api with jwt token
app.get('/profile', loginAuth, async (req, res) => {
    try {
        // const { Token } = req.cookies;
        // console.log(Token);
        // if (!Token) {
        //     throw new Error('Please Login Again')
        // }
        // const decodedMessage = myJWT.verify(Token, 'DevTinder@123')
        // console.log(decodedMessage);
        // let { _id } = decodedMessage;
        // const userDetails = await User.findById(_id);
        // if (!userDetails) throw new Error('User does not exist')
        // else res.send(userDetails)

        const userInfo = req.user;
        res.send(userInfo);
    } catch (error) {
        res.status(400).send(error.message)
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

// !  find method 
app.get('/user', loginAuth, async (req, res) => {
    // const userAge = req.body.userAge

    try {
        const user = await User.find({});
        res.send(user);

        // OR
        // const user = req.user;
        // res.send(user)
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

app.patch("/user/:userId", async (req, res) => {
    const data = req.body;
    const id = req.params?.userId

    try {

        const allowedUpdates = ['firstName', 'lastName', 'age', 'gender', 'address', 'about', 'skills', 'photoUrl', 'password'];
        const canBeChangedField = Object.keys(data).every((item) => allowedUpdates.includes(item));
        console.log(canBeChangedField);

        if (!canBeChangedField) {
            throw new Error("not able to change, only valid fields can be changed ")
        }
        if (req.body.skills && req.body.skills.length > 10) {
            throw new Error("can't add more than 10 skills")
        }
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

