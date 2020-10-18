const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require("../../util/constants");
const { calculateUserAttributs, battle } = require("../../util/rpg");
const hostile = require("../../assets/npc/hostile.json")

module.exports.run = async (client, message, args, userInfo) => {
  try {
    const player = await client.getUser(message.member);
    const playerStats = await calculateUserAttributs(client, message);
    const position = hostile.map(e => e.name).indexOf(args[0]);
    const monster = hostile[position];

    battle(client, message, playerStats, player, monster);
  } catch (e) {
    const embedZyw = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

    message.channel.send(embedZyw);
    console.error(e);
  };
};

module.exports.help = MESSAGES.COMMANDS.RPG.BATTLE;