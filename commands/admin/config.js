const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
    const getSetting = args[0];
    const newSetting = args.slice(1).join(" ");

    switch(getSetting) {
        case "prefix": {
            if (newSetting) {
                await client.updateGuild(message.guild, { prefix: newSetting });
                const embedWow = new MessageEmbed()
                  .setColor("#1DFF00")
                  .setDescription(`\`\`\`✅ | Prefix mis à jour [${settings.prefix}] -> [${newSetting}].\`\`\``);

                return message.channel.send(embedWow);
            };
            const embedCod = new MessageEmbed()
                  .setDescription(`\`\`\`❔ | Prefix actuel [${settings.prefix}].\`\`\``);

            message.channel.send(embedCod);
            break;
        };
        case "logChannel": {
            if (newSetting) {
                await client.updateGuild(message.guild, { logChannel: newSetting });
                const embedWow = new MessageEmbed()
                  .setColor("#1DFF00")
                  .setDescription(`\`\`\`✅ | LogChannel mis à jour [${settings.logChannel}] -> [${newSetting}].\`\`\``);

                return message.channel.send(embedWow);
            };
            const embedCod = new MessageEmbed()
                  .setDescription(`\`\`\`❔ | LogChannel actuel [${settings.logChannel}].\`\`\``);

            message.channel.send(embedCod);
            break;
        };
        case "welcomeMessage": {
            if (newSetting) {
                await client.updateGuild(message.guild, { welcomeMessage: newSetting });
                const embedWow = new MessageEmbed()
                  .setColor("#1DFF00")
                  .setDescription(`\`\`\`✅ | WelcomeMessage mis à jour [${settings.welcomeMessage}] -> [${newSetting}].\`\`\``);

                return message.channel.send(embedWow);
            };
            const embedCod = new MessageEmbed()
                  .setDescription(`\`\`\`❔ | WelcomeMessage actuel [${settings.welcomeMessage}].\`\`\``);
                  
            message.channel.send(embedCod);
            break;
        };
    }
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.CONFIG;