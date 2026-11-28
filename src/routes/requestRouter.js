const express = require('express');
const { loginAuth } = require('../middleware/auth');
const requestRouter = express.Router();
const ConnectionRequest = require('../model/connectionRequest');
const User = require('../model/user');

requestRouter.post('/request/send/:status/:toUserId', loginAuth, async (req, res) => {

    try {

        let fromUserId = req.user._id;
        let toUserId = req.params.toUserId;
        let status = req.params.status;

        const validToUserId = await User.findById(toUserId);

        if (!validToUserId) return res.status(400).send('invalid id');

        const allowedStatus = ['ignore', 'interested']
        if (!allowedStatus.includes(status)) return res.status(400).send('invalid Status : ' + status);

        if (fromUserId.equals(toUserId)) return res.status(400).send('Cannot send request to yourself');

        // check already connection exist or not 
        const existingConnection = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (existingConnection) return res.status(400).send("Connection Request Already exist");

        const request = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })


        await request.save();
        res.send('Connection Saved !!!')
    } catch (err) {
        res.status(500).send(err.message)
    }
})


module.exports = requestRouter;