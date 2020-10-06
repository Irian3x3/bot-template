module.exports = {
	name: 'example',
	description: 'Description Example',
	aliases: ["alias1", "alias2"],
	execute(message, args, client) {
		// Some code here...
		message.channel.send('Hello world');
	}
};
