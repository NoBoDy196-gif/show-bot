const { MessageEmbed } = require('discord.js');
const { calculateUserAttributs } = require("../../util/rpg");
const { MESSAGES } = require("../../util/constants");
const classes = require("../../assets/rpg/classes.json");

module.exports.run = async (client, message, args, userInfo) => {
  try {
    if (userInfo.class == "") return message.reply("Tu dois d'abord utiliser la commande \`$setup\`");
    const position = classes.map(e => e.name.toLowerCase()).indexOf(userInfo.class.toLowerCase());
    const userAttributs = await calculateUserAttributs(client, message);
    const classe = classes[position];

    const embedMyc = new MessageEmbed()
      .setAuthor(`${message.author.username} | ${userInfo.class} level ${userInfo.level}`, message.author.displayAvatarURL())
      .setDescription(`${userInfo.description !== "" ? userInfo.description : classe.description}`)
      .addField("Stats",
        `${userInfo.experience} exp points
      ${Object.entries(userAttributs).map(([key, value]) => `${key.capitalize()}: ${value}`).join(' | ')}`)
      .setThumbnail(classe.icon)
      .addField("Inventory",
        `${userInfo.coins}
      ${userInfo.inventory.join(", ") || "nothing in inventory"}`
      )
      .addField("Equipments", `${Object.entries(userInfo.equipments).map(([key, value]) => `${key.capitalize()}: ${value}`).join(' | ')}`)

    message.channel.send(embedMyc);
  } catch (e) {
    const embedZyw = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

    message.channel.send(embedZyw);
    console.error(e);
  };
};

module.exports.help = MESSAGES.COMMANDS.RPG.PROFILE;