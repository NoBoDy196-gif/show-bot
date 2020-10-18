const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require("../../util/constants");
const { capitalize } = require("../../util/Prototypes");
const getItemInfo = require("../../assets/shop/shop.json");

module.exports.run = async (client, message, args, userInfo) => {
  try {
    const q = args.join(" ");
    const userEquipment = userInfo.equipments;
    const userInventory = userInfo.inventory;
    const userInventoryItemPosition = userInventory.indexOf(q.capitalize());

    if (userInventoryItemPosition == -1) return message.channel.send("t as pas cet objet zeeeebi");

    const itemInfoPosition = getItemInfo.map(e => e.name).indexOf(q.capitalize());

    userEquipment[getItemInfo[itemInfoPosition].type] = userInventory[userInventoryItemPosition];
    userInventory.splice(userInventoryItemPosition, 1)

    client.updateUserInfo(message.member, {
      "users.$.equipments": userEquipment,
      "users.$.inventory": userInventory
    });
  } catch (e) {
    const embedZyw = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

    message.channel.send(embedZyw);
    console.error(e);
  };
};

module.exports.help = MESSAGES.COMMANDS.RPG.EQUIP;