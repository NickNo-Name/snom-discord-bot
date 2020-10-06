module.exports = {
	name: 'help',
	description: 'Help Command',
	execute(client, Discord, fs, prefix, message, args, RedditSimple) {
		message.channel.send(`Type ${prefix}snom for a random Non-NSFW image from r/snom on Reddit\n\nYou can also type ${prefix}snominfo for credits to the creators and such`);
	},
};