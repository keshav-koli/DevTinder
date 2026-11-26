const express = require('express');
const profileRouter = express.Router();
const { loginAuth } = require('../middleware/auth');
const cookieParse = require('cookie-parser');


// profileRouter.use(express.json())
// profileRouter.use(cookieParse())

// ! Profile api with jwt token
profileRouter.get('/profile', loginAuth, async (req, res) => {
    try {        
        const userInfo = req.user;
        res.send(userInfo);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = profileRouter