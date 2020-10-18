const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');
const moment = require("moment");

module.exports.run = (client, message, args) => {
    try {
        let member = message.member;
        if (args[0]) member = message.guild.member(message.mentions.users.first());
        let user = member.user;
        const flags = {
            DISCORD_EMPLOYEE: `Discord employee`,
            DISCORD_PARTNER: `Discord partner`,
            BUGHUNTER_LEVEL_1: `Bug hunter (level 1)`,
            BUGHUNTER_LEVEL_2: `Bug hunter (level 2)`,
            HYPESQUAD_EVENTS: `Hypesquad events`,
            HOUSE_BRAVERY: `House of Bravery`,
            HOUSE_BRILLIANCE: `House of Brillance`,
            HOUSE_BALANCE: `House of Balance`,
            EARLY_SUPPORTER: `Early supporter`,
            TEAM_USER: `Team User`,
            SYSTEM: `System`,
            VERIFIED_BOT: `Verified bot`,
            VERIFIED_DEVELOPER: `Verified developer`
        };
        const userFlags = message.member.user.flags.toArray();

        const embed = new MessageEmbed()
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
          .setTimestamp()
          .setColor("#CCE0B4")
          .setThumbnail(user.displayAvatarURL())
          .addField(
            `Further informations about ${user.username}`,
            `·Name: ${user.tag}
            · Bot: ${user.bot ? 'true' : 'false'}
            · Created at: ${moment(user.createdAt).format('DD/MM/YYYY | hh:mm')}
            · Status: ${user.presence.status.toUpperCase()}
            · Nickname: ${member.nickname ? member.nickname : 'none'}
            · Joined at: ${moment(member.joinedAt).format('DD/MM/YYYY | hh:mm')}
            · Badges: ${userFlags.length ? userFlags.map(flag => flag.replace(/_/g, ' ')).toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase()) : `\`No badges\``}
            · Roles: ${member.roles.cache.map(roles => `${roles}`)}`
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

module.exports.help = MESSAGES.COMMANDS.MISC.USERINFO;