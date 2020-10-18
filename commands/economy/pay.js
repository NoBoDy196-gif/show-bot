const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, userInfo) => {
    try {
        const getter = await client.getUser(message.guild.member(message.mentions.users.first()));
        const money = parseInt(args[1]);
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription(`\`\`\`📛 | You don't have enough money to do that. (${userInfo.coins} < ${money})\`\`\``);

        if (userInfo.coins < money) return message.reply(embedWow);

        if (getter && (!isNaN(money))) {
            try {
            const embedCod = new MessageEmbed()
              .setDescription(`\`\`\`❔ | Do you wanna give ${money}₹ to ${message.guild.member(message.mentions.users.first())}. (yes)\`\`\``);

            message.channel.send(embedCod);
            const filter = m => (message.author.id === m.author.id);
            const userEntry = await message.channel.awaitMessages(filter, {
                max: 1, time: 5000, errors: ['time']
        });
        if (userEntry.first().content.toLowerCase() === 'yes') {
            const getterCoins = getter.coins + money;
            const emiterCoins = userInfo.coins - money;

            client.updateUserInfo(message.member, {
              "users.$.coins": emiterCoins, 
            });

            client.updateUserInfo(getter, {
              "users.$.coins": getterCoins, 
            });

            const embed = new MessageEmbed()
              .setColor("#1DFF00")
              .setDescription(`\`\`\`✅ | Payment successful, your balance is now at ${userInfo.coins - money}₹.\`\`\``);

            message.channel.send(embed)
        };
        } catch (e) {
            const embedMod = new MessageEmbed()
              .setColor("#FF0000")
              .setDescription(`\`\`\`📛 | Payment cancelled. Confirm the payment during the 5secs delay with (yes)\`\`\``);

            message.channel.send(embedMod)
        };
        } else {
            const embedPid = new MessageEmbed()
              .setColor("#FF0000")
              .setDescription(`\`\`\`📛 | Mention the user you wanna pay and the amount.\`\`\``);

            message.channel.send(embedPid);
        };
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.ECONOMY.PAY;