const MESSAGES = {
  COMMANDS: {
    ADMIN: {
      EVAL: {
        name: "eval",
        aliases: ['e', 'ev'],
        category: 'admin',
        description: "Return a tested JavaScript code.",
        cooldown: 10,
        usage: "<code_to_test>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },

      CONFIG: {
        name: "config",
        aliases: ['conf'],
        category: 'admin',
        description: "Modify database.",
        cooldown: 10,
        usage: "<key_to_modify> <value>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },

      RELOAD: {
        name: "reload",
        aliases: ['rload', 'break', 'restart'],
        category: 'admin',
        description: "Restart the bot.",
        cooldown: 5,
        usage: "",
        isUserAdmin: false,
        permissions: true,
        args: false,
        profil: false
      }
    },

    ECONOMY: {
      DAILY: {
        name: "daily",
        aliases: ['daypay'],
        category: 'economy',
        description: "Add money daily.",
        cooldown: 1,
        usage: "",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: true
      },

      ADDBALANCE: {
        name: "addbalance",
        aliases: ['addb', 'abalance'],
        category: 'economy',
        description: "Add money to a user.",
        cooldown: 10,
        usage: "<@user> <balance>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },

      REMOVEBALANCE: {
        name: "removebalance",
        aliases: ['removeb', 'rbalance'],
        category: 'economy',
        description: "Remove money to a user.",
        cooldown: 10,
        usage: "<@user> <balance>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },

      SHOP: {
        name: "shop",
        aliases: ['buy'],
        category: 'economy',
        description: "The shop.",
        cooldown: 5,
        usage: "[<objet>]",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: true
      },

      USERBALANCE: {
        name: "userbalance",
        aliases: ['ubalance', 'userb', 'money'],
        category: 'economy',
        description: "Return a user balance.",
        cooldown: 10,
        usage: "[<@user>]",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: true
      },

      PAY: {
        name: "pay",
        aliases: ['give'],
        category: 'economy',
        description: "Pay a user.",
        cooldown: 10,
        usage: "<@user> <balance>",
        isUserAdmin: false,
        permissions: false,
        args: true,
        profil: true
      },
    },

    EXPERIENCE: {
      USEREXPERIENCE: {
        name: "userexperience",
        aliases: ['userxp', 'expuser', 'uexp'],
        category: 'experience',
        description: "Return a user experience.",
        cooldown: 10,
        usage: "",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: true
      },

      LEADERBOARD: {
        name: "leaderboard",
        aliases: ['classement', 'top', 'leadxp'],
        category: 'experience',
        description: "Top 10 users (by xp) in the guild.",
        cooldown: 10,
        usage: "",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: false
      },

      ADDEXPERIENCE: {
        name: "addexperience",
        aliases: ['addexp', 'addxp'],
        category: 'experience',
        description: "Add experience to a user.",
        cooldown: 5,
        usage: "<@user> <exp_to_add>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },

      REMOVEEXPERIENCE: {
        name: "removeexperience",
        aliases: ['removeexp', 'removexp', 'rexp'],
        category: 'experience',
        description: "Remove experience to a user.",
        cooldown: 5,
        usage: "<@user> <exp_to_remove>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      }
    },

    MISC: {
      SAY: {
        name: "say",
        aliases: ['repeat', 'rep'],
        category: 'misc',
        description: "Repeat your message.",
        cooldown: 10,
        usage: "<message>",
        isUserAdmin: false,
        permissions: false,
        args: true,
        profil: false
      },

      EIGHTBALL: {
        name: "8ball",
        aliases: ['eightball', 'ask'],
        category: 'misc',
        description: "Answer a closed-ended question.",
        cooldown: 10,
        usage: "<question>",
        isUserAdmin: false,
        permissions: false,
        args: true,
        profil: false
      },

      POLL: {
        name: "poll",
        aliases: ['sondage'],
        category: 'misc',
        description: "Create a poll.",
        cooldown: 10,
        usage: "<question>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },

      PING: {
        name: "ping",
        aliases: ['banane', "test"],
        category: 'misc',
        description: "Return the ping of the bot and the API.",
        cooldown: 10,
        usage: "",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: false
      },

      HELP: {
        name: "help",
        aliases: ['h'],
        category: 'misc',
        description: "Return the list of commands or informations about a specified one.",
        cooldown: 5,
        usage: "[<command_name>]",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: false
      },

      SERVERINFO: {
        name: "serverinfo",
        aliases: ['sinfo', 'server-i'],
        category: 'misc',
        description: "Return informations about the guild.",
        cooldown: 7,
        usage: "",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: false
      },

      BOTINFO: {
        name: "botinfo",
        aliases: ['binfo', 'bot-i', 'clientinfo'],
        category: 'misc',
        description: "Return informations about the client (bot).",
        cooldown: 7,
        usage: "",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: false
      },

      USERINFO: {
        name: "userinfo",
        aliases: ['uinfo', 'user-i'],
        category: 'misc',
        description: "Return informations about a user.",
        cooldown: 7,
        usage: "[<@user>]",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: false
      },
    },

    MODERATION: {
      BAN: {
        name: "ban",
        aliases: ['b'],
        category: 'moderation',
        description: "Ban a user.",
        cooldown: 5,
        usage: "<@user> <reason>",
        isUserAdmin: true,
        permissions: true,
        args: true,
        profil: false
      },

      KICK: {
        name: "kick",
        aliases: ['k'],
        category: 'moderation',
        description: "Kick a user.",
        cooldown: 5,
        usage: "<@user> <reason>",
        isUserAdmin: true,
        permissions: true,
        args: true,
        profil: false
      },

      LOCK: {
        name: "lock",
        aliases: ['l'],
        category: 'moderation',
        description: "Lock all channels for a role.",
        cooldown: 10,
        usage: "<role_id> <TRUE/FALSE/NULL>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },

      MUTE: {
        name: "mute",
        aliases: ['m'],
        category: 'moderation',
        description: "Mute a user.",
        cooldown: 5,
        usage: "<@user> <time>",
        isUserAdmin: true,
        permissions: true,
        args: true,
        profil: false
      },

      PRUNE: {
        name: "prune",
        aliases: ['prune'],
        category: 'moderation',
        description: "Purge a number of messages of a user.",
        cooldown: 10,
        usage: "<@user> <messages_nmbr>",
        isUserAdmin: true,
        permissions: true,
        args: true,
        profil: false
      },

      PURGE: {
        name: "purge",
        aliases: ['clear', 'supp'],
        category: 'moderation',
        description: "Purge a number of messages.",
        cooldown: 10,
        usage: "<messages_nmbr>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },

      UNBAN: {
        name: "unban",
        aliases: ['ub'],
        category: 'moderation',
        description: "Unban a user.",
        cooldown: 5,
        usage: "<user_id>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },

      UNMUTE: {
        name: "unmute",
        aliases: ['um'],
        category: 'moderation',
        description: "Unmute a user.",
        cooldown: 5,
        usage: "<@user>",
        isUserAdmin: true,
        permissions: true,
        args: true,
        profil: false
      },

      REPORT: {
        name: "report",
        aliases: ['rport', 'signaler'],
        category: 'moderation',
        description: "Report a user.",
        cooldown: 2,
        usage: "<@user> [<message_id>] <reason>",
        isUserAdmin: true,
        permissions: true,
        args: true,
        profil: false
      },

      RENAMEALL: {
        name: "renameall",
        aliases: ['rnameall', 'renomeral'],
        category: 'moderation',
        description: "Rename all the users by the given nickname.",
        cooldown: 5,
        usage: "<new_nickname>",
        isUserAdmin: false,
        permissions: true,
        args: true,
        profil: false
      },
    },

    REACTIONS: {
      EMOJI: {
        name: "emoji",
        aliases: ['emo'],
        category: 'reactions',
        description: "Return emojis on your message.",
        cooldown: 0.1,
        usage: "",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: false
      }
    },

    RPG: {
      SETUP: {
        name: "setup",
        aliases: ['set'],
        category: 'rpg',
        description: "Create your character.",
        cooldown: 5,
        usage: "",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: true
      },
      BATTLE: {
        name: "battle",
        aliases: ['fight'],
        category: 'rpg',
        description: "Batle with another player or an ennemy.",
        cooldown: 5,
        usage: "<ennemy_name>",
        isUserAdmin: false,
        permissions: false,
        args: true,
        profil: true
      },
      EQUIP: {
        name: "equip",
        aliases: ['put'],
        category: 'rpg',
        description: "Equip an object.",
        cooldown: 5,
        usage: "<object_to_equip>",
        isUserAdmin: false,
        permissions: false,
        args: true,
        profil: true
      },
      UNEQUIP: {
        name: "unequip",
        aliases: ['unput'],
        category: 'rpg',
        description: "Unequip an object.",
        cooldown: 5,
        usage: "<object_to_unequip>",
        isUserAdmin: false,
        permissions: false,
        args: true,
        profil: true
      },
      PROFILE: {
        name: "profile",
        aliases: ['profil'],
        category: 'rpg',
        description: "Return a user profile.",
        cooldown: 1,
        usage: "",
        isUserAdmin: false,
        permissions: false,
        args: false,
        profil: true
      }
    }
  }
}

exports.MESSAGES = MESSAGES;