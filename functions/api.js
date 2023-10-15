const express = require('express');
const serverless = require('serverless-http');
const sendMessage = require("../src/modules/chat");

const app = express();
const router = express.Router();

app.use(express.json());


// Health Check Endpoint
router.get('/', (req, res) => {
    res.status(200).json({msg: 'server is running!!'});
});


// Chat with Austin
router.post('/chat/:sessionId', async (req, res) => {
    const {sessionId} = req.params;
    const {message} = req.body;

    const messageResponse = await sendMessage(sessionId, message);

    if (!messageResponse) {
        return res.status(404).json({error: "error on send message"});
    }

    return res.status(200).json(messageResponse);
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
