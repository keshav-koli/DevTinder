const validate = require('validator');

const validatorForSignUp = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error('Name is not required')
    } else if (!validate.isEmail(email)) {
        throw new Error("Email is not valid")
    } else if (!validate.isStrongPassword(password)) {
        throw new Error("Please enter a strong password")
    }
};

module.exports = {
    validatorForSignUp
}