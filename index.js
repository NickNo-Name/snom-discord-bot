const Discord = require('discord.js');
const { RedditSimple } = require('reddit-simple');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

const fs = require('fs');
client.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandfiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${prefix}snomhelp`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command == `snom`) {
		client.commands.get('snom').execute(client, Discord, fs, prefix, message, args, RedditSimple);
	}

	if (command == `snomhelp`) {
		client.commands.get('snomhelp').execute(client, Discord, fs, prefix, message, args, RedditSimple);
	}

	if (command == `snominfo`) {
		client.commands.get('snominfo').execute(client, Discord, fs, prefix, message, args, RedditSimple);
	}

});

client.login(token);