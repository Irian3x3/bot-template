const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'embed',
	description: 'My awesome embed!',
	execute(message, args, client) {
	const embed = new MessageEmbed()
	.setTitle('Some title')
	.setDescription('Some description')
	.setFooter('Some footer. Timestamp:')
	.setTimestamp()
	.setColor('BLUE')
	.setImage('https://discord.js.org/static/icons/favicon-32x32.png')
	message.channel.send(embed)
	}
};