const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        let user = await client.users.fetch(args[0]);
        const embedKij = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | You don't have permissions to use that command.\`\`\`");

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(embedKij);
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | The user doesn't exist.\`\`\`");

        if (!user) return message.channel.send(embedWow);
        message.guild.members.unban(user);

        const embed = new MessageEmbed()
          .setAuthor(`${user.username} (${user.id})`)
          .setColor("#dc143c")
          .setDescription(`**Action**: unban`)
          .setThumbnail(user.avatarURL())
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());

        client.channels.cache.get("766674489052102696").send(embed);
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNBAN;