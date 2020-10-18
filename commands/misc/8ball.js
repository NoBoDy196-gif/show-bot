const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
    try {
        message.delete();
        const replies = ["yes", "no", "maybe", "ptn jsp zebi"];
        const question = args.join(" ");
        const answer = Math.floor(Math.random() * replies.length);
    
        const embed = new MessageEmbed()
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
          .setColor("#cb4e41")
          .setThumbnail(message.guild.iconURL())
          .setAuthor(`Question: ${question}`)
          .setDescription(`ᅠ\nAnswer: \`${replies[answer]}\``);
    
        message.channel.send(embed);
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.EIGHTBALL;