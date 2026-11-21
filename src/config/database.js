// const mongoose = require('mongoose');

// const connect = async () => {
//     console.log("connecting to database");
//     // await mongoose.connect('mongodb+srv://fitnessfreak7gym_db_user:UZA07BHTLXb8RTvy@cluster0.kotxlfd.mongodb.net')
//     console.log("MongoDB URI loaded:", !!process.env.MONGODB_URI);
//     await mongoose.connect(process.env.MONGODB_URI, {
//         serverSelectionTimeoutMS: 10000
//     });
    
// }

// module.exports = {
//     connect
// }

// connect().then((res) => {
//     console.log("connection successful");

// }).catch(() => {
//     console.log("error in connecting ");
// })

require('dotenv').config();

const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log("Testing MongoDB connection...");

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
            family: 4
        });

        console.log("Connected successfully!");

        console.log("Database:", mongoose.connection.name);


    } catch (error) {
        console.log("Connection failed!");
        console.log("Error name:", error.name);
        console.log("Error message:", error.message);

    }
}

// testConnection();

module.exports = {
    testConnection
}