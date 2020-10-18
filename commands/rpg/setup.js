const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require("../../util/constants");
const { Guild } = require("../../models/index");
const classes = require("../../assets/rpg/classes.json");

module.exports.run = async (client, message, args, userInfo) => {
  try {
    if (userInfo && userInfo.class !== '') return message.reply("tu ne peux pas taper plusieurs fois cette commande.");

    const q = args.join(" ");
    const position = classes.map(e => e.name.toLowerCase()).indexOf(q.toLowerCase());
    if (q && position == -1) return message.reply("cette classe n'existe pas.");

    if (q && position !== -1) {
      try {
        const classe = classes[position];
        message.channel.send(`Voulez-vous vraiment choisir \`${classe.name}\` ? (oui)`);
        const filter = m => (message.author.id === m.author.id);
        const userEntry = await message.channel.awaitMessages(filter, {
          max: 1, time: 5000, errors: ['time']
        });

        if (userEntry.first().content.toLowerCase() === 'oui') {
          message.channel.send(`Votre profil a été créé, vous êtes maintenant un \`${classe.name}\``);
          if (!userInfo) {
            Guild.updateOne(
              { guildID: guild.id },
              {
                $push: {
                  users: {
                    id: member.id,
                    experience: 0,
                    level: 1,
                    coins: 0,
                    wins: 0,
                    loses: 0,
                    description: "",
                    class: classe.name,
                    attributs: classe.attributs,
                    inventory: [],
                    equipments: {
                      "Mh": "None",
                      "Oh": "None",
                      "Helmet": "None",
                      "Chest": "None",
                      "Gloves": "None",
                      "Legs": "None",
                      "Boots": "None"
                    },
                  },
                },
              }
            ).then(d => console.log("Ok"));
          } else {
            client.updateUserInfo(message.member, {
              "users.$.class": classe.name,
              "users.$.attributs": classe.attributs
            });
          };
        };
      } catch (e) {
        message.channel.send("Choisissez la classe plus vite.")
      };
    } else {
      message.channel.send(`Veuillez choisir votre classe (syntax: \`<setup> <class_name>\`) Les classes disponibles: ${classes.map(e => `\`${e.name}\``).join(", ")}`);
    };
  } catch (e) {
    const embedZyw = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

    message.channel.send(embedZyw);
    console.error(e);
  };
};

module.exports.help = MESSAGES.COMMANDS.RPG.SETUP;