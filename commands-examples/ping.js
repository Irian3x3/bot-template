module.exports = {
	name: 'ping',
	description: 'Pong!',
	execute(message, args, client) {
	
       /* ping example 1 */ message.channel.send("Pong!" + message.client.ws.ping)
       /* ping example 2 */ message.channel.send(`Pong! ${message.client.ws.ping}`)
	}
};