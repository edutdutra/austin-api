const dialogflow = require('@google-cloud/dialogflow');


async function sendMessage(sessionId, message) {
    try {
        const sessionClient = new dialogflow.SessionsClient({keyFilename: './private_key.json'});

        const sessionPath = sessionClient.projectAgentSessionPath('austintest-buip', sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'pt-BR'
                }
            }
        };

        const responses = await sessionClient.detectIntent(request);

        return responses[0];
    } catch (error) {
        console.log('ERRO ON SEND MESSAGE => ', error)

        return false
    }
}

module.exports = sendMessage