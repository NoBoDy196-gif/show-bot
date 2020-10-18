const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | Specify a number between 1 and 100.\`\`\`");

        if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.channel.send(embedWow);

        const messages = await message.channel.messages.fetch({
            limit: Math.min(args[0], 100),
            before: message.id,
        });

        await message.channel.bulkDelete(messages);

        const embed = new MessageEmbed()
          .setColor("#dc143c")
          .setDescription(`**Action**: purge\n**Number of messages**: ${args[0]}\n**Channel**: ${message.channel}`)
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());

        const log_channel = client.channels.cache.get("766674489052102696");
        log_channel.send(embed);
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

        message.channel.send(embedZyw);
        console.error(e);
  }
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.PURGE;