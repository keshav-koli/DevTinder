const jwt = require('jsonwebtoken');
const User = require('../model/user');
// const express = require('express')


// const app = express();
// app.use(express.json())

const adminAuth = (req, res, next) => {
    console.log("checking auth");
    let Token = 'Notgranted';
    let authorised = Token == 'granted';
    if (!authorised) {
        res.status(401).send('UnAuthorized Access');
    }
    else {
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("checking auth");
    let Token = 'granted';
    let authorised = Token == 'granted';
    if (!authorised) {
        res.status(401).send('UnAuthorized Access');
    }
    else {
        next();
    }
}

const loginAuth = async (req, res, next) => {
    try {
        const { Token } = req.cookies;
        if (!Token) throw new Error('please login again')
        const decodedMessage = jwt.verify(Token, 'DevTinder@123');
        const { _id } = decodedMessage;
        const userDetails = await User.findById(_id);
        if (!userDetails) throw new Error('User does not exist')
        else req.user = userDetails
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports = {
    adminAuth,
    userAuth,
    loginAuth
}