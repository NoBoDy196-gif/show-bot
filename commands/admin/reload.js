const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    await message.delete();
    const embed = new MessageEmbed()
      .setColor("#1DFF00")
      .setDescription(`\`\`\`✅ | The bot is restarting.\`\`\``)
    await client.channels.cache.get("766674489052102696").send(embed);
    process.exit();
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.RELOAD;