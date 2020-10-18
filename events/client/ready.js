const { MessageEmbed } = require("discord.js");

module.exports = client => {
    try {
        const embed = new MessageEmbed()
          .setColor("#1DFF00")
          .setDescription(`\`\`\`✅ | ${client.user.tag} is restarted.\`\`\``);
      
        console.log(`${client.user.tag} is restarted`);
        client.channels.cache.get("766674489052102696").send(embed);

        const guild = [];
        client.guilds.cache.map(e => guild.push(e));
        guild.forEach(async g => {
          const data = await client.getGuild(g);
          if (!data) client.createGuild({ guildID: g.id });
        });

        let activities = ['$help', `with ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} peoples`, `in ${client.guilds.cache.size.toString()} servers`, `on ${client.channels.cache.size.toString()} channels`], i = 0;

        setInterval(() => client.user.setPresence({ activity: { name: `${activities[i++ % activities.length]}`, type: 'WATCHING' }, status: 'dnd' }), 6000);
    } catch (e) {
        console.error(e);
    };
}