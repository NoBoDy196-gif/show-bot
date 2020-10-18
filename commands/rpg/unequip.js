const { MessageEmbed } = require('discord.js');
const getItemInfo = require("../../assets/shop/shop.json")
const { MESSAGES } = require("../../util/constants");
const { capitalize } = require("../../util/Prototypes");

module.exports.run = async (client, message, args, userInfo) => {
  try {
    const q = args.join(" ");
    const userEquipment = userInfo.equipments;
    const userInventory = userInfo.inventory;

    const itemInfoPosition = getItemInfo.map(e => e.name).indexOf(q.capitalize());
    //if (q == -1) return message.channel.send("t as pas cet objet zeeeebi");
    if (userEquipment[getItemInfo[itemInfoPosition].type] !== q.capitalize()) return message.channel.send("Cet objet est pas équipé")

    userEquipment[getItemInfo[itemInfoPosition].type] = "None";
    userInventory.push(q.capitalize())

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

module.exports.help = MESSAGES.COMMANDS.RPG.UNEQUIP;