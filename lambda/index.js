/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const facts = require('./facts')
const ACTIONS=[
            'paper',
            'rock',
            'scissor'
        ];
        
        
        
/** I tried using persistentAttributes here to can access the lastPlayed attribute from the persistent store to get the timestamp when the user last played the game but it didnt work somehow


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
        persistentAttributes.lastPlayed = Date.now(); // set the persistence attribute to current timestamp
        handlerInput.attributesManager.setPersistentAttributes(persistentAttributes);
        await handlerInput.attributesManager.savePersistentAttributes();

        const speakOutput = 'Welcome, to rock paper scissor. You have three options. If you want know the rules, say Rules or If you want to know a fact about game, say Facts or If you want to play the game, choose one out of rock, paper or scissor.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
**/ 

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, to rock paper scissor. You have three options. If you want know the rules, say Rules or If you want to know a fact about game, say Facts or If you want to play the game, choose one out of rock, paper or scissor.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



const RulesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RulesIntent';
    },
    handle(handlerInput) {
        const speakOutput = '"Welcome to rock-paper-scissors. On rock, paper, scissors, choose rock, paper, or scissors. Rock beats scissors, scissors beats paper, paper beats rock. What do you choose?"';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FactsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FactsIntent';
    },
    handle(handlerInput) {
        const speakOutput = facts[Math.floor(Math.random() * facts.length)];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const GameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GameIntent';
    },
    handle(handlerInput) {
        const userAction = handlerInput.requestEnvelope.request.intent.slots.action.value;
        
        let speakOutput = '';
        let repromptOutput = 'What is your next move?';
        
        const alexaAction=ACTIONS[Math.floor(Math.random()*ACTIONS.length)];
        
        const combo = userAction+alexaAction;
        
        switch(combo)
        {
            case 'rockrock':
                speakOutput+="you played rock and i played rock, it is a tie! <say-as interpret-as='interjection'>all righty!</say-as>";
                break;
            case 'rockpaper':
                speakOutput+="you played rock and i played paper, I win! <say-as interpret-as='interjection'>aha!</say-as>";
                break;
            case 'rockscissor':
                speakOutput+="you played rock and i played scissor, you win congratulation!" + '<audio src = "soundbank://soundlibrary/human/amzn_sfx_crowd_applause_01"/>" ';
                break;
            case 'paperrock':
                speakOutput+="you played paper and i played rock, you win congrats!" + '<audio src = "soundbank://soundlibrary/human/amzn_sfx_crowd_applause_01"/>" ';
                break;
            case 'paperpaper':
                speakOutput+="you played paper and i played paper, it is a tie! <say-as interpret-as='interjection'>all righty!</say-as>";
                break;
            case 'paperscissor':
                speakOutput+="you played paper and i played scissor, I win! <say-as interpret-as='interjection'>aha!</say-as>";
                break;
            case 'scissorrock':
                speakOutput+="you played scissor and i played rock, I win! <say-as interpret-as='interjection'>aha!</say-as>";
                break;
            case 'scissorpaper':
                speakOutput+="you played scissor and i played paper, you win congrats!" + '<audio src = "soundbank://soundlibrary/human/amzn_sfx_crowd_applause_01"/>" ';
                break;    
            case 'scissorscissor':
                speakOutput+="you played scissor and i played scissor, it is a tie! <say-as interpret-as='interjection'>all righty!</say-as>";
                break;
            default:
                break;
        }
        return handlerInput.responseBuilder
            .speak(speakOutput + repromptOutput)
            .reprompt(repromptOutput)
            .getResponse();
        
    }    
};

        

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RulesIntentHandler,
        FactsIntentHandler,
        GameIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();