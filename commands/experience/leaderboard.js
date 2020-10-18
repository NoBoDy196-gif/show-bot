const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, settings, dbUser, dbProfile) => {
    try {
        const embed = new MessageEmbed()
          .setTitle("Top 10 users in the server (by experience)")
          .setColor('#a41f14')
          .setTimestamp()
          .setFooter("Experience");

        await client.getUsers(message.guild).then(p => {
            p.sort((a, b) => (a.experience < b.experience) ? 1 : -1).splice(0, 10).forEach(e => {
                embed.addField(`${e.username}`, `${e.experience} exp points, level: ${e.level}`);
            }); 
        });

        message.channel.send(embed);
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.LEADERBOARD;