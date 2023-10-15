const dialogflow = require('@google-cloud/dialogflow');
const googleConfig = require('../../private_key.json')

// ToDo - Organizar payload de resposta

async function sendMessage(sessionId, message) {
    try {
        const config = {
            credentials: {
                private_key: googleConfig.private_key,
                client_email: googleConfig.client_email
            }
        }

        const sessionClient = new dialogflow.SessionsClient(config);
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