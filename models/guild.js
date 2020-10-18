const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    prefix: {
        "type": String,
        "default": "$"
    },
    users: []
});

module.exports = mongoose.model("Guild", guildSchema);