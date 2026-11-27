const express = require('express');
const profileRouter = express.Router();
const { loginAuth } = require('../middleware/auth');
const cookieParse = require('cookie-parser');
const { validateEditRequest } = require('../utils/validator');
const User = require('../model/user')
const validator = require('validator');
const bcrypt = require('bcrypt');

// profileRouter.use(express.json())
profileRouter.use(cookieParse())

// ! Profile api with jwt token
profileRouter.get('/profile/view', loginAuth, async (req, res) => {
    try {
        const userInfo = req.user;
        res.send({ data: userInfo });
    } catch (error) {
        res.status(400).send(error.message)
    }
})

profileRouter.patch('/profile/edit', loginAuth, async (req, res) => {
    try {
        if (!validateEditRequest(req)) throw new Error('Invalid Edit Request');
        const inputFromUser = req.body;
        const loggedInUser = req.user;

        Object.keys(inputFromUser).forEach(key => loggedInUser[key] = inputFromUser[key]);

        await loggedInUser.save()
        res.json(
            {
                message: `${loggedInUser.firstName}, your profile updated Successfully`,
                data: loggedInUser
            });
    } catch (error) {
        res.status(400).send(error.message)
    }
})

profileRouter.patch('/profile/password', loginAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const matchPassword = await req.user.validatePassword(oldPassword);
        if (!matchPassword) throw new Error('Invalid password')
        if (!validator.isStrongPassword(newPassword)) throw new Error('Please give strong password');

        const loggedInUser = req.user;
        const uncryptedPassword = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = uncryptedPassword
        await loggedInUser.save()
        res.json(
            {
                message: `${loggedInUser.firstName}, your password updated Successfully`,
                data: loggedInUser
            });
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = profileRouter