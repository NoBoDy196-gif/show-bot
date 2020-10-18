const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    message.guild.members.cache.forEach(member => { if (member.kickable) member.setNickname(args.join(" ")) });
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.RENAMEALL;


   