const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
    try {
      const user = message.guild.member(message.mentions.users.first());
      const expToRemove = parseInt(args [1]);
      const embedWow = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription("\`\`\`📛 | Enter a number.\`\`\`");

      if (isNaN(expToRemove)) return message.channel.send(embedWow);
      client.removeExp(client, user, expToRemove);
      const embed = new MessageEmbed()
        .setColor("#1DFF00")
        .setDescription(`\`\`\`✅ | You successfully removed ${expToRemove} exp to ${user}.\`\`\``);

      message.channel.send(embed);
    } catch (e) {
      const embedZyw = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

      message.channel.send(embedZyw);
      console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.REMOVEEXPERIENCE;