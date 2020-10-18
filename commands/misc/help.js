const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');
//📛 ✅

module.exports.run = (client, message, args) => {
  try {
    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor('#36393F')
        .addField('Commands list', `List of all the categories and commands.\nFor further informations about specific command: \`${client.config.PREFIX}help <command_name>\` \n(<parameter> and [<optional_parameter>])`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());

      for (const category of categoryList) {
        embed.addField(
          `${category.toUpperCase()}`,
          `\`${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(' | ')}\``
        );
      };
      return message.channel.send(embed);
    } else {
      const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
      const embedWow = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription("\`\`\`📛 | This command doesn't exist.\`\`\`");

      if (!command) return message.channel.send(embedWow);

      const embed = new MessageEmbed()
        .setColor('#36393F')
        .setTitle(`Command: \`${command.help.name.toUpperCase()}\``)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
        .addField('Description', `\`${command.help.description} (cd: ${command.help.cooldown} secs)\``)
        .addField('Usage', command.help.usage ? `\`${client.config.PREFIX}${command.help.name} ${command.help.usage}\`` : `\`${client.config.PREFIX}${command.help.name}\``, true)

      if (command.help.aliases.length > 0) embed.addField("Alias(es)", `\`${command.help.aliases.join(", ")}\``, true);
      return message.channel.send(embed);
    }
  } catch (e) {
    const embedZyw = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

    message.channel.send(embedZyw);
    console.error(e);
  }
};

module.exports.help = MESSAGES.COMMANDS.MISC.HELP;