const { MessageEmbed, MessageAttachment } = require("discord.js");
//const message = require("../../events/message/message");

module.exports.run = async (client, message, args) => {
    try {
        message.delete();
        function clean(text) {
        if (typeof text === "string") 
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        return text;
        };
     
        if (message.author.id !== "386223676619489284") return;
        const code = args.join(" ");
        const embedWow = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`📛 | The code to eval cannot include \"token\".\`\`\`");
          
        if (code.toLowerCase().includes("token")) return message.channel.send(embedWow);
        const evaled = eval(code);
        const cleanCode = await clean(evaled);
        const embed = new MessageEmbed()
          .setColor("#1DFF00")
          .setDescription(`\`\`\`✅ | A code has been evaluated.\`\`\` \n\`\`\`Code: ${code}\`\`\``);

        message.channel.send(embed);
        message.channel.send(cleanCode, { code: "js" });
    } catch (e) {
        const embedZyw = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription("\`\`\`❌ | An undefined error occured.\`\`\`");

        message.channel.send(embedZyw);
        console.error(e);
    };
};

module.exports.help = {
  name: "eval",
  aliases: ['e', 'ev'],
  category: 'admin',
  description: "Return a tested JavaScript code.",
  cooldown: 10,
  usage: "<code_to_test>",
  isUserAdmin: false,
  permissions: true,
  args: true
};