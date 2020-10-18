const { MESSAGES } = require("../../util/constants");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        let user = message.guild.member(message.mentions.users.first());
        const embedKij = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | You don't have permissions to use that command.\`\`\`");
          
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(embedKij);
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | The user doesn't exist.\`\`\`");

        if (!user) return message.channel.send(embedWow);
        let muteRole = message.guild.roles.cache.find(r => r.name === "MUTEEEE");
        let muteTime = (args[1] || '60s');

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'MUTEEEE',
                    color: '#000',
                    permissions: [],
                }
            });

            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.updateOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    CONNECT: false
                });
            });
        };

        await user.roles.add(muteRole.id);
        const embedPoc = new MessageEmbed()
          .setColor("#1DFF00")
          .setDescription(`\`\`\`✅ | <@${user.id}> is successfully muted for ${ms(ms(muteTime))}.\`\`\``);

        message.channel.send(embedPoc);
        const embedMyc = new MessageEmbed()
          .setDescription(`\`\`\`❔ | <@${user.id}>'s mute time is over.\`\`\``);

        setTimeout(() => {
        user.roles.remove(muteRole.id);
        message.channel.send(embedMyc);
        }, ms(muteTime));

        const embed = new MessageEmbed()
          .setAuthor(`${user.user.username} (${user.id})`)
          .setColor("#ffa500")
          .setDescription(`**Action**: mute\n**Time**: ${ms(ms(muteTime))}`)
          .setThumbnail(user.user.avatarURL())
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        const log_channel = client.channels.cache.get("766674489052102696");
        log_channel.send(embed);
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.MUTE;