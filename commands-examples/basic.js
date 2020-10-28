module.exports = {
	name: 'hello',
	description: 'Says hi back!',
	aliases: ["hi", "hey"]
	execute(message, args, client) {

	// Some code here such as
       message.channel.send("Hello world")

	}
}; 
