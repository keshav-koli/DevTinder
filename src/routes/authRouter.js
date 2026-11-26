const express = require('express');
const authRouter = express.Router();
const User = require('../model/user')
const { validatorForSignUp } = require('../utils/validator');
const bcrypt = require('bcrypt');


// authRouter.use(express.json())
authRouter.post('/signup', async (req, res, next) => {
    try {
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
        await user.save()
        res.send("User Saved Successfully")
    } catch (error) {
        console.error("Error while saving user:", error);
        res.status(500).send(error.message);
    }
})

// ! Login api with token sending
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDetails = await User.findOne({ email: email });
        if (!userDetails) throw new Error('Invalid credentail');
        const matchPassword = await userDetails.validatePassword(password);
        if (!matchPassword) throw new Error('Invalid password')
        else {
            const jwtToken = userDetails.jwtToken();
            res.cookie('Token', jwtToken, { expires: new Date(Date.now() + 8 * 3600000) })
            res.send('Login successfully!!!')
        }
    } catch (err) {
        res.status(400).send("Error: " + err)
    }
})

module.exports = authRouter;
