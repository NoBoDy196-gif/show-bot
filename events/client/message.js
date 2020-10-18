const { Collection } = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports = async (client, message) => {
  try {
    if (message.channel.type === 'dm') return;
    if (message.author.bot) return;

    const data = await client.getGuild(message.guild);
    const position = data.users.map(e => e.id).indexOf(message.member.id);
    const userInfo = data.users[position];

    if (message.guild && position == -1) client.createUserProfile(message.member, message.guild);

    //const expCd = Math.floor(Math.random() * 19) + 1; //1-20
    //const expToAdd = Math.floor(Math.random() * 25) + 10; //10-35

    //if (expCd >= 5 && expCd <= 15) await client.addExp(client, message.member, expToAdd);

    //const userLevel = Math.floor(0.15 * Math.sqrt(dbUser.experience));
    //const embedMyc = new MessageEmbed()
    //.setDescription(`\`\`\`❔ | You just passed the level ${userLevel}, continue talking to reach the next level.\`\`\``);

    //if (dbUser.level < userLevel) {
    //message.reply(embedMyc);
    //client.updateUser(message.member, { level: userLevel });
    //};

    if (!message.content.startsWith(client.config.PREFIX)) return;

    const args = message.content.slice(client.config.PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const user = message.mentions.users.first();

    const command = client.commands.get(commandName) || client.commands.find(command => command.help.aliases && command.help.aliases.includes(commandName))
    if (!command) return;

    if (command.help.profil && !userInfo) return message.reply("il faut que tu tappes la command \`setup\` pour créer ton personnage.");

    const embedKij = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`📛 | You don't have permissions to use that command.\`\`\`");

    if (command.help.permissions && !message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(embedKij);

    if (command.help.args && !args.length) {
      const embedWow = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription("\`\`\`📛 | Arguments are needed for this command.\`\`\`")
        .addField(`How to use that command:`, `\`\`\`${client.config.PREFIX}${command.help.name} ${command.help.usage}\`\`\``);

      if (command.help.usage) return message.channel.send(embedWow);
    };

    const embedJas = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`📛 | You need to mention a user.\`\`\`");

    const embedMox = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`📛 | You can't use this command on this user.\`\`\`");
    if (command.help.isUserAdmin && !user) return message.reply(embedJas)
    if (command.help.isUserAdmin && message.guild.member(user).hasPermission('MANAGE_MESSAGES')) return message.reply(embedMox);
    if (!client.cooldowns.has(command.help.name)) {
      client.cooldowns.set(command.help.name, new Collection());
    };

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 2) * 1000;

    if (tStamps.has(message.author.id)) {
      const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

      if (timeNow < cdExpirationTime) {
        timeLeft = (cdExpirationTime - timeNow) / 1000;
        const embedPuq = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription(`\`\`\`📛 | Wait ${timeLeft.toFixed(0)} to use ${command.help.name} again.\`\`\``);

        return message.reply(embedPuq);
      };
    };

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    command.run(client, message, args, userInfo);
  } catch (e) {
    const embedZyw = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("\`\`\`❌ | An undefined error occured with (message) event.\`\`\`");

    client.channels.cache.get("766674489052102696").send(embedZyw);
    console.error(e);
  };
}