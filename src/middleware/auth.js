const adminAuth = (req, res, next) => {
    console.log("checking auth");
    let token = 'Notgranted';
    let authorised = token == 'granted';
    if (!authorised) {
        res.status(401).send('UnAuthorized Access');
    }
    else {
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("checking auth");
    let token = 'granted';
    let authorised = token == 'granted';
    if (!authorised) {
        res.status(401).send('UnAuthorized Access');
    }
    else {
        next();
    }
}


module.exports = {
    adminAuth,
    userAuth
}