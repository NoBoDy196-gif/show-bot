const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args) => {
    try {
        await message.react("🟥");
        await message.react("🟦");
        await message.react("🟩");
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    }
};

module.exports.help = MESSAGES.COMMANDS.REACTIONS.EMOJI;