const { version } = require("discord.js");

module.exports = {
	name: 'snominfo',
	description: 'Shows some info about the Bot',
	execute(client, Discord, fs, prefix, message, args, RedditSimple) {
		const botVersion = `1.1.0`

		message.channel.send({
            "embed": {
                "description": `<@${client.user.id}> is currently on version ${botVersion}\n\nCode based on [wooloo-discord-bot](https://github.com/ricardovogel/wooloo-discord-bot) by [ricardovogel on github](https://github.com/ricardovogel)\n\nCode modified by <@375426257938284544>\n\n[Bot Icon](https://www.deviantart.com/skhy-the-miner/art/Snom-819134036) created by [Skhy-The-Miner on DeviantArt](https://www.deviantart.com/skhy-the-miner)`,
                "title": "Info/Credits",
                "color": 12117231
            }
        });
	},
};