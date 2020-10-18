const { Client, Message, Collection } = require('discord.js');
//const message = require('./events/message/message');
const { loadCommands, loadEvents } = require("./util/loader");

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
require("./util/functions")(client);
client.config = require('./config');
client.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => client[x] = new Collection);

loadCommands(client);
loadEvents(client);
client.mongoose.init();

//const usersMap = new Map();
//const LIMIT = 7;
//const TIME = 5000;
//const DIFF = 2000;
//client.on('message', message => {
    //if (message.author.bot) return;
    //if (message.member.hasPermission('MANAGE_MESSAGES')) return;
    //if (usersMap.has(message.author.id)) {
        //const userData = usersMap.get(message.author.id);
        //const { lastMessage, timer } = userData;
        //const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        //let msgCount = userData.msgCount;
        //if (difference > DIFF) {
            //clearTimeout(timer);
            //console.log('Cleared timeout');
            //userData.msgCount = 1;
            //userData.lastMessage = message;
            //userData.timer = setTimeout(() => {
                //usersMap.delete(message.author.id);
                //console.log('Removed from RESET.');
            //}, TIME);
            //usersMap.set(message.author.id, userData);
        //} else {
            //++msgCount;
            //if(parseInt(msgCount) === LIMIT) {
                //const role = message.guild.roles.cache.get('765209190225805353');
                //message.member.roles.add(role);
                //message.channel.send('You have been muted for spamming.');
            //} else {
                //userData.msgCount = msgCount;
                //usersMap.set(message.author.id, userData);
            //};
        //}
    //} else {
        //let fn = setTimeout(() => {
            //usersMap.delete(message.author.id);
            //console.log('Removed from map.');
        //}, TIME);
        //usersMap.set(message.author.id, {
          //msgCount: 1,
          //lastMessage: message,
          //timer: fn
        //});
    //};
//})

client.login(client.config.TOKEN);