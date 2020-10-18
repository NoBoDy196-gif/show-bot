const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');
const moment = require("moment");

module.exports.run = (client, message, args) => {
    try {
        const guild = message.guild;

        const embed = new MessageEmbed()
          .setColor("#C016FF")
          .setThumbnail(guild.iconURL())
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
          .setTimestamp()
          .addField(`Further informations about *${guild.name}*`, 
            `· ID: ${guild.id}
            · Owner: ${guild.owner.user.tag} (${guild.ownerID})
            · Roles: ${guild.roles.cache.size}
            · Members: ${guild.memberCount}
            · Channels: ${guild.channels.cache.size} channels including, ${guild.channels.cache.filter(ch => ch.type === "text").size} text channels and ${guild.channels.cache.filter(ch => ch.type === "voice").size} voice channels
            · Created at: ${moment(guild.createdAt).format('DD/MM/YYYY')}
            `
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

module.exports.help = MESSAGES.COMMANDS.MISC.SERVERINFO;