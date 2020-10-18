const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args) => {
    try {
        const user = message.guild.member(message.mentions.users.first());
        if (!user) message.channel.send("This user as no balance for the moment.");
        const balanceToAdd = parseInt(args [1]);
        const userCoins = await client.getUser(user);
        const newBalance = userCoins.coins + balanceToAdd;
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | Enter a number.\`\`\`");

        if (isNaN(balanceToAdd)) return message.channel.send(embedWow);
        client.updateUserInfo(user, {
          "users.$.coins": newBalance
        });
        const embed = new MessageEmbed()
          .setColor("#1DFF00")
          .setDescription(`\`\`\`✅ | You successfully added ${balanceToAdd}₹ to ${user}.\`\`\``);

        message.channel.send(embed);
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.ECONOMY.ADDBALANCE;