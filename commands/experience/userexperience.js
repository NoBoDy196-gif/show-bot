const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, settings, dbUser) => {
    try {
        const user = message.guild.member(message.mentions.users.first());

        if (args[0]) {
            const mentionnedUser = await client.getUser(user);
            const embedCod = new MessageEmbed()
              .setDescription(`\`\`\`❔ | ${user} have ${mentionnedUser.experience} experience, he is level ${mentionnedUser.level}.\`\`\``);
    
            message.channel.send(embedCod);
        } else {
            const embedMyc = new MessageEmbed()
              .setDescription(`\`\`\`❔ | You have ${dbUser.experience} experience, you are level ${dbUser.level}.\`\`\``);

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

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.USEREXPERIENCE;