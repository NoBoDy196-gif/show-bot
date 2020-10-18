const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");
const { capitalize } = require("../../util/Prototypes");

module.exports.run = async (client, message, args, userInfo) => {
  try {
    const items = [];
    const shop = require("../../assets/shop/shop.json");
    const q = args.slice(1).join(" ");
    const position = shop.map(e => e.name.toLowerCase()).indexOf(q.toLowerCase());
    const item = shop[position];
    const userInventory = userInfo.inventory;
    const embedWow = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`📛 | This object doesn't exist, verify the speling.\`\`\`");

    if (q && position == -1) message.channel.send(embedWow);
    const embed = new MessageEmbed()
      .setTitle("Welcome in the shop")
      .setTimestamp()
      .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());

    if (q && position !== -1) {
      if (args[0] == "show") {
        const embedBut = new MessageEmbed()
          .setTitle(`${item.name} (type: ${item.type})`)
          .setColor(item.color)
          .setDescription(`${item.description} (price: ${item.prix}₹)`)
          .addField("Attributs", `${Object.entries(item.attributs).map(([key, value]) => `${key.capitalize()}: ${value}`).join(' | ')}`);

        message.channel.send(embedBut);
      };
      if (args[0] == "buy") {
        try {
          const embedCod = new MessageEmbed()
            .setDescription(`\`\`\`❔ | Do you wanna buy ${item.name} for ${item.prix}₹. (yes)\`\`\``);

          message.channel.send(embedCod);
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 5000, errors: ['time']
          });

          if (userEntry.first().content.toLowerCase() === 'yes') {
            const userCoins = userInfo.coins - item.prix;
            client.updateUserInfo(message.member, {
              "users.$.coins": userCoins
            });
            const embedMud = new MessageEmbed()
              .setColor("#1DFF00")
              .setDescription(`\`\`\`✅ | Purchase successful, your balance is now at ${userInfo.coins - item.prix}₹.\`\`\``);

            message.channel.send(embedMud);
            userInventory.push(item.item);
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory
            });
          };
        } catch (e) {
          const embedMod = new MessageEmbed()
            .setColor("#FF0000")
            .setDescription(`\`\`\`📛 | Purchase cancelled. Confirm the purchase during the 5secs delay with (yes)\`\`\``);

          message.channel.send(embedMod)
        };
      };
      if (args[0] == "sell") {
        try {
          const check = userInventory.indexOf(q.capitalize());
          if (check == -1) return message.channel.send("Tu n'as pas cet objet...");
          const embedCod = new MessageEmbed()
            .setDescription(`\`\`\`❔ | Do you wanna sell ${item.name} for ${item.prix}₹. (yes)\`\`\``);

          message.channel.send(embedCod);
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 5000, errors: ['time']
          });

          if (userEntry.first().content.toLowerCase() === 'yes') {
            const userCoins = userInfo.coins + item.prix;
            client.updateUserInfo(message.member, {
              "users.$.coins": userCoins
            });
            const embedMud = new MessageEmbed()
              .setColor("#1DFF00")
              .setDescription(`\`\`\`✅ | Sale successful, your balance is now at ${userInfo.coins + item.prix}₹.\`\`\``);

            message.channel.send(embedMud);
            userInventory.splice(check, 1);
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory
            });
          };
        } catch (e) {
          const embedMod = new MessageEmbed()
            .setColor("#FF0000")
            .setDescription(`\`\`\`📛 | Sale cancelled. Confirm the purchase during the 5secs delay with (yes)\`\`\``);

          message.channel.send(embedMod)
        };
      }
    } else {
      shop.map(e => items.push(`${e.name} (${e.prix}₹)`));
      embed.setDescription(`Available objects: \n${items.map(item => `${item}`).join(', ')}`);
      message.channel.send(embed);
    };
  } catch (e) {
    const embedZyw = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

    message.channel.send(embedZyw);
    console.error(e);
  }
};

module.exports.help = MESSAGES.COMMANDS.ECONOMY.SHOP;