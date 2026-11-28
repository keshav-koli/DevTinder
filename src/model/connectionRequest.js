const mongoose = require('mongoose');


const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['ignore', 'interested', 'accepted', 'rejected'],
            message: `{VALUE} is not correct status type`,
        }
    }
},
    {
        timestamps: true,
    }
)

ConnectionRequestSchema.index({fromUserId:1,toUserId:1})

ConnectionRequestSchema.pre("save", async function () {
    // Use .equals() to properly compare two Mongoose ObjectIds
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("Cannot send a connection request to yourself");
    }
});

const ConnectionRequestModel = new mongoose.model('ConnectionRequest', ConnectionRequestSchema)

module.exports = ConnectionRequestModel;