const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        message.delete();
        const replies = ["yes", "no", "maybe", "ptn jsp zebi"];
        const question = args.join(" ");
        const answer = Math.floor(Math.random() * replies.length);

        const embed = new MessageEmbed()
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
          .setColor("#ad14da")
          .setDescription(args.join(" "))
          .setThumbnail(message.guild.iconURL())
          .addField("Answer to the question above with one the reactions:",
          `✅ - For (yes)
          🤷‍♂️ - No opinions (neutral)
          ⛔ - Against (no)
          `
          );

        const poll = await message.channel.send(embed);
        await poll.react("✅");
        await poll.react("🤷‍♂️");
        await poll.react("⛔");
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.POLL;