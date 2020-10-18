const ms = require("ms");
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        const msg = await message.channel.send("Pong");
        const embedCod = new MessageEmbed()
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
          .setDescription(`\`\`\`❔ | Bot latency: ${msg.createdTimestamp - message.createdTimestamp}ms, API latency: ${Math.round(client.ws.ping)}ms.\`\`\``);
          
        msg.edit(
            embedCod
        );
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.MISC.PING;