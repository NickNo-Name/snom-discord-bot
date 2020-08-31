module.exports = {
	name: 'snom',
	description: 'Sends a random Non-NSFW image from r/snom on Reddit',
	execute(client, Discord, fs, prefix, message, args, RedditSimple) {
		const getPost = () => {
			RedditSimple.RandomPost('snom').then((post) => {
				const data = post[0].data;
				if (data.over_18 || data.pinned || data.is_self) {
					getPost();
					return;
				}
				message.channel.send({
					'embed': {
						'title': `${data.title}`,
						'author': {
							'name': `Post by ${data.author}`,
							'url': `https://www.reddit.com/user/${data.author}`,
						},
						'image': {
							'url': `${data.url}`,
						},
						'url': `https://www.reddit.com/${data.id}`,
						'footer': {
							'text': 'It seems that videos (and some images) don\'t load properly, so you\'ll need to click on the post link in order to see them',
						},
						'color': 12117231,
					},
				});
			});
		};
		getPost();
	},
};