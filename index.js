require('dotenv').config();
const Discord = require('discord.js');
const { RedditSimple } = require('reddit-simple');
const { Client } = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const prefix = (process.env.prefix);
client.login(process.env.TOKEN);

const fs = require('fs');
client.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandfiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${prefix}help`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command == `snom`) {
		client.commands.get('snom').execute(client, Discord, fs, prefix, message, args, RedditSimple);
	}

	if (command == `help`) {
		client.commands.get('help').execute(client, Discord, fs, prefix, message, args, RedditSimple);
	}

	if (command == `info`) {
		client.commands.get('info').execute(client, Discord, fs, prefix, message, args, RedditSimple);
	}

});