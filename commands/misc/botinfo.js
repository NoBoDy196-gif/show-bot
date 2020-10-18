const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js'); 

module.exports.run = (client, message, args) => {
    try {
        const embed = new MessageEmbed()
          .setColor("#B4E0E0")
          .setThumbnail(client.user.displayAvatarURL())
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
          .setTimestamp()
          .setAuthor(`${client.user.username} Info`, client.user.avatarURL())
          .addFields(
            { name: 'Memory', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
            { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true },
            { name: 'Servers', value: `${client.guilds.cache.size.toString()}`, inline: true },
            { name: 'Channels', value: `${client.channels.cache.size.toString()}`, inline: true },
            { name: 'Users', value: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, inline: true },
            { name: 'Version', value: `discord.js@12.2.0`, inline: true },
            { name: 'Support', value: `[Server Invite](https://discord.gg/gCQKpZT)`, inline: true },
            { name: 'Color code', value: `Grey embed | ❔, information \nGreen embed | ✅, sucess \nRed embed | 📛, error \nRed embed | ❌, fatal error` },
          );

        message.channel.send(embed);
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.MISC.BOTINFO;