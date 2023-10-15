const express = require('express');
const cors = require('cors');
const sendMessage = require("./modules/chat");

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    return res.status(200).json({msg: 'server is running!!'});
});


app.post('/chat/:sessionId', async (req, res) => {
    const {sessionId} = req.params;
    const {message} = req.body;

    const messageResponse = await sendMessage(sessionId, message);

    if (!messageResponse) {
        return res.status(404).json({error: "error on send message"});
    }


    return res.status(200).json(messageResponse);
});

module.exports = app;