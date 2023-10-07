const dialogflow = require('@google-cloud/dialogflow');

const sessionClient = new dialogflow.SessionsClient({keyFilename: './private_key.json'});

async function sendMessage(sessionId, message) {
    try {
        const sessionPath = sessionClient.projectAgentSessionPath(process.env.PROJECT_ID, sessionId);

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