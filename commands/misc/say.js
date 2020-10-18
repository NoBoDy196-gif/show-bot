const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args) => {
    try {
        let messageToBot = args.join(" ");
        message.delete().catch();
        message.channel.send(messageToBot);
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.SAY;