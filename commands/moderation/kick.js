const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    try {
        const user = message.mentions.users.first();
        const reason = (args.splice(1).join(' ') || 'No reason specified.');
        const embedKij = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | You don't have permissions to use that command.\`\`\`");
          
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(embedKij);
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | The user doesn't exist.\`\`\`");

        user ? message.guild.member(user).kick(reason) : message.channel.send(embedWow);

        const embed = new MessageEmbed()
          .setAuthor(`${user.username} (${user.id})`)
          .setColor("#ffa500")
          .setDescription(`**Action**: kick\n**Reason**: ${reason}`)
          .setThumbnail(user.avatarURL())
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        client.channels.cache.get("766674489052102696").send(embed); 
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.KICK;