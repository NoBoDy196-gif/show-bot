const mongoose = require("mongoose");
const guild = require("../models/guild");
const { Guild } = require("../models/index");

module.exports = async client => {
  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild.save();
  };

  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
  };

  client.getUser = async member => {
    const data = await client.getGuild(member.guild);
    const position = data.users.map(e => e.id).indexOf(member.id);
    return data.users[position];
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    console.log(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  client.createUserProfile = (member, guild) => {
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
            class: "",
            attributs: {},
            inventory: [],
            equipments: {
              "Mh": "None",
              "Oh": "None",
              "Helmet": "None",
              "Chest": "None",
              "Gloves": "None",
              "Legs": "None",
              "Boots": "None"
            }
          }
        }
      }
    ).then(d => console.log("Ok"));
  }

  client.updateUserInfo = (member, options = {}) => {
    Guild.updateOne(
      { "users.id": member.id },
      { $set: options }
    ).then(c => console.log(c));
  };

  client.createMissingInfoOnUser = (member, missingInfo = {}) => {
    Guild.updateOne({ "users.id": member.id }, { $set: missingInfo }).then();
  };
};