const getItemInfo = require("../assets/shop/shop.json");
const hostile = require("../assets/npc/hostile.json");
const classes = require("../assets/rpg/classes.json");

const calculateUserAttributs = async (client, message) => {
  const userInfo = await client.getUser(message.member);

  const userAttributs = userInfo.attributs;
  const userEquipment = userInfo.equipments;

  for (const property in userEquipment) {
    if (userEquipment[property] == "None") continue;

    const itemInfoPosition = getItemInfo.map(e => e.name).indexOf(userEquipment[property]);
    const itemAttributs = getItemInfo[itemInfoPosition].attributs;

    for (attribut in itemAttributs) {
      switch (attribut) {
        case "strength":
          userAttributs.strength += itemAttributs[attribut];
          break;
        case "agility":
          userAttributs.agility += itemAttributs[attribut];
          break;
        case "intelligence":
          userAttributs.intelligence += itemAttributs[attribut];
          break;
        case "spirit":
          userAttributs.spirit += itemAttributs[attribut];
          break;
      }
    }
  }

  return userAttributs;
};

const battle = (client, message, playerStats, player, hostile) => {
  let monsterHealth = hostile.attributs.hp;
  const position = classes.map(e => e.name.toLowerCase()).indexOf(player.class);
  const classe = classes[position];

  for (let i = 1; monsterHealth > 0; i++) {
    monsterHealth -= playerStats.strength;
    playerStats.hp -= hostile.attributs.strength;

    if (monsterHealth <= 0) {
      player.coins += hostile.coins;
      player.experience += hostile.experience;

      const userStats = classe.attributs;
      userStats["hp"] = playerStats.hp;

      client.updateUserInfo(message.member, {
        "users.$.attributs": userStats,
        "users.$.coins": player.coins,
        "users.$.experience": player.experience
      });

      return message.channel.send(`Vous avez vaincu ${hostile.name} après ${i} tours, il te reste ${playerStats.hp}hp et tu gagnes ${hostile.coins} ainsi que ${hostile.experience} points d'exp!`)
    }

    message.channel.send(`Tour ${i}: la bataille fait rage. ${hostile.name} attaque pour ${hostile.attributs.strength} de dégats, tu ripostes pour ${playerStats.strength} dégats! Il reste ${monsterHealth}hp à ${hostile.name}.`);

  }
};

module.exports = {
  calculateUserAttributs,
  battle
}