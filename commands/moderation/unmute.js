const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    try {
        let user = message.guild.member(message.mentions.users.first());
        const embedKij = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | You don't have permissions to use that command.\`\`\`");
          
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(embedKij);
        let muteRole = message.guild.roles.cache.find(r => r.name === "MUTEEEE");
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | The user doesn't exist.\`\`\`");

        if (!user) return message.channel.send(embedWow);
        const embedGuh = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | Mentionned user is not muted.\`\`\`");
 
        if (!user.roles.cache.has(muteRole.id)) return message.channel.send(embedGuh);
        user.roles.remove(muteRole.id);
        const embedMop = new MessageEmbed()
          .setColor("#1DFF00")
          .setDescription(`\`\`\`✅ | <@${user.id}> is successfully unmuted.\`\`\``);

        message.channel.send(embedMop);

        const embed = new MessageEmbed()
          .setAuthor(`${user.user.username} (${user.id})`)
          .setColor("#ffa500")
          .setDescription(`**Action**: unmute`)
          .setThumbnail(user.user.avatarURL())
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

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNMUTE;