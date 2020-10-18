const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        let user = message.guild.member(message.mentions.users.first());
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | Specify a number between 1 and 100.\`\`\`");
  
        if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.channel.send(embedWow);
  
        const messages = (await message.channel.messages.fetch({
            limit: 100,
            before: message.id,
        })).filter(a => a.author.id === user.id).array();
  
        messages.length = Math.min(args[1], messages.length);
        const embedHub = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | No message to delete from this user (or he doesn't exist).\`\`\`");
  
        if (messages.length === 0 || !user) return message.channel.send(embedHub);
  
        if (message.length === 1) await messages[0].delete();
        else await message.channel.bulkDelete(messages);
  
        const embed = new MessageEmbed()
          .setColor("#dc143c")
          .setThumbnail(user.user.avatarURL())
          .setDescription(`**Action**: prune\n**Number of messages**: ${args[1]}\n**User**: ${user}\n**Channel**: ${message.channel}`)
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
    };
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.PRUNE;