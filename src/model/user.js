const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 6,
        maxLength: 100,
        lowercase: true,
        // match: /^\S+@\S+\.\S+$/
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Email is not valid')
            }
        }

    },
    age: {
        type: Number,
        min: 18,
        validate(val) {
            console.log(val);

            if (!(val <= 100)) {
                throw new Error('Age is not valid')
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10,
        match: /^[0-9]{10}$/
    },
    gender: {
        type: String,
        validate(val) {
            if (!['male', 'female', 'other'].includes(val)) {
                throw new Error('Gender is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password is not strong')
            }
        }
    },

    address: {
        type: String,

    },
    about: {
        type: String,
        default: 'This is a default about of a user',
    },
    skills: {
        type: [String],

    },
    photoUrl: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
        validate(val) {
            if (!validator.isURL(val)) {
                throw new Error('photoUrl is not valid')
            }
        }
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User