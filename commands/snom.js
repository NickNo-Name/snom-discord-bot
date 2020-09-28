module.exports = {
	name: 'snom',
	description: 'Sends a random Non-NSFW image from r/snom on Reddit',
	execute(client, Discord, fs, prefix, message, args) {
		const {RedditSimple} = require('reddit-simple');
		var getYouTubeID = require('get-youtube-id');

		var getPostAttempts = 0

		//Creates a "getPost" const that can be activated at any time
		const getPost = () => {
			RedditSimple.RandomPost('snom').then((post) => {
				var data = post[0].data

				//First checks if the post is, NSFW, Pinned, or Text only. If so then it will try 2 more times until the "getPostAttempts' is equal to 4, if that is the case it will display an error message
				if (data.over_18 || data.pinned || data.is_self) {
					if (getPostAttempts !== 3) {
						getPost()
						getPostAttempts = (getPostAttempts + 1);
						return;
					}else {
						getPostAttempts - 0
						message.channel.send("`Error: Post cannot be found!`\nIf this has happened, it means that I couldn't find any posts\nSo please try again")
						return;
					}
				}

				var footer = `Sometimes nothing loads in the preview\nIf that's the case just click on the link above to see the post`
				
				//Checks the content of the post
				if (data.is_video == true) {
					data.url = `https://cdn.discordapp.com/attachments/375830856532754433/758945394104729600/nopreviewsnom.png`
					footer = `Videos cannot be played\nPlease click on the link above to watch it`
				}else if (data.url.endsWith('gifv')) {
					data.url = `${data.url.substring(0, data.url.length -4)}gif`
					footer = `This post has a GIFV, It's a sort of a weird mix of GIF and MP4\nSo if nothing is playing, just click on the post link above to view it`
				}else if (data.is_gallery == true) {
					data.url = `https://cdn.discordapp.com/attachments/375830856532754433/758945394104729600/nopreviewsnom.png`
					footer = `Image Galleries cannot be previewed\nPlease click on the link above to view them`
				}else if (data.domain == "youtube.com" ||data.domain == "youtu.be") {
					var video_id = getYouTubeID(data.url);
					data.url = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`
					footer = `Youtube videos cannot be played\nPlease click on the link above to watch it`
				}else if (data.url.startsWith('https://imgur.com/')) {
					const split = data.url.split("/");
					if (split[1] == "a") {
						data.url = `https://cdn.discordapp.com/attachments/375830856532754433/758945394104729600/nopreviewsnom.png`
						footer = `This is an Imgur Album\nTo view it just click on the post link above`
					}else {
						data.url = `https://i.imgur.com/${split[3]}.png`
					}
				}

				let embPost = new Discord.MessageEmbed()
				.setColor('#B8E4EF')
				.setTitle(`${data.title}`)
				.setAuthor(`Post by u/${data.author}`)
				.setImage(`${data.url}`)
				.setURL(`https://www.reddit.com/${data.id}`)
				.setFooter(`${footer}`);
				message.channel.send(embPost);
			});
		};
			getPost()
			getPostAttempts = (getPostAttempts + 1);
	},
};