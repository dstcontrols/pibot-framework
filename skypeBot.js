/*-----------------------------------------------------------------------------
A bot for managing a users to-do list.  See the README.md file for usage
instructions.
-----------------------------------------------------------------------------*/

const restify = require('restify');
const skype = require('skype-sdk');
var builder = require('botbuilder');
const index = require('./dialogs/index');

// Initialize the BotService
const botService = new skype.BotService({
  messaging: {
    botId: '28:<bot’s id>',
    serverUrl: 'https://apis.skype.com',
    requestTimeout: 15000,
    appId: 'testId',
    appSecret: 'testSecret',
  },
});

// Create bot and add dialogs
var bot = new builder.SkypeBot(botService);
bot.add('/', index);

// Setup Restify Server
const server = restify.createServer();
server.post('/api/chat', skype.messagingHandler(botService));
server.listen(process.env.PORT || 8080, function () {
  console.log('%s listening to %s', server.name, server.url);
});
