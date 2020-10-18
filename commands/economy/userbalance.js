const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args, userInfo) => {
    try {
        const user = message.guild.member(message.mentions.users.first());    
        if (args[0]) {
            const mentionnedUser = await client.getUser(user);
            const embedCod = new MessageEmbed()
              .setDescription(`\`\`\`❔ | ${user} have ${mentionnedUser.coins}₹.\`\`\``);

            message.channel.send(embedCod);
        } else {
            const embedMyc = new MessageEmbed()
              .setDescription(`\`\`\`❔ | You have ${userInfo.coins}₹.\`\`\``);

            message.channel.send(embedMyc);
        };
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.ECONOMY.USERBALANCE;