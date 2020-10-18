const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");
const validateFlag = f => f === "true" || f === "false" || f === "null";

module.exports.run = (client, message, args) => {
    try {
        const embedKij = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | This command only needs 2 arguments.\`\`\`");

        if (args.length !== 2) return message.channel.send(embedKij);
        let roleId = args[0];
        let flag = args[1];
        const embedMux = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | A valid number and parameter are needed for this command.\`\`\`");

        if(isNaN(roleId) || !validateFlag(flag.toLowerCase())) return message.channel.send(embedMux);
        if(!isNaN(roleId) && validateFlag(flag.toLowerCase())) {
            if (message.guild.roles.cache.has(roleId)) {
                flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);
                const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
                channels.forEach(channel => {
                channel.updateOverwrite(roleId, {
                    SEND_MESSAGES: !flag
                }).then(g => {
                    console.log(`Updated ${g.name} (${g.id})`);
                    if(flag) {
                        if(!g.name.endsWith('🔒')) {
                            g.edit({ name: g.name + ' 🔒' });
                            const embed = new MessageEmbed()
                              .setColor("#1DFF00")
                              .setDescription(`\`\`\`✅ | You successfully locked all the channels for <@&${roleId}>.\`\`\``);

                            message.channel.send(embed);
                        };
                    } else {
                        g.edit({ name: g.name.replace(/\s*🔒/, '') });
                        const embedBic = new MessageEmbed()
                          .setColor("#1DFF00")
                          .setDescription(`\`\`\`✅ | You successfully unlocked all the channels for <@&${roleId}>.\`\`\``);

                        message.channel.send(embedBic);
                    };
                });
            });
            } else {
                const embedNus = new MessageEmbed()
                  .setColor("#FF0000")
                  .setDescription("\`\`\`📛 | Invalid role.\`\`\`");

                message.channel.send(embedNus);
            };
        };
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");
          
        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.LOCK;