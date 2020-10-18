const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        const user = message.mentions.users.first();
        const embedKij = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | You don't have permissions to use that command.\`\`\`");
          
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(embedKij);
        let raison = args[1]; 
        const isFirstCharNumeric = c => /\d/.test(c);
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | Specify a reason.\`\`\`");

        if (!raison) return message.channel.send(embedWow);

        const embed = new MessageEmbed()
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
          .setTimestamp()
          .setThumbnail(user.displayAvatarURL())
          .addFields(
            { name: "Reported", value: user.username},
            { name: "Message link", value: isFirstCharNumeric(raison.charAt(0)) ? `[Click me](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${args[1]})` : 'No links' },
            { name: "Reason", value: isFirstCharNumeric(raison.charAt(0)) ? args.slice(args.indexOf(args[2])).join(" ") : args.slice(args.indexOf(args[1])).join(" ") }
          );

         client.channels.cache.get("766674489052102696").send(embed);
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.REPORT;