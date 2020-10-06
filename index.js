const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const config = require('./config.json');

const client = new Discord.Client({
	disableMentions: "everyone" // This is optional.
});

client.config = config;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	client.user.setActivity("status", {
		type: "PLAYING" // Valid fields are "PLAYING", "LISTENING", "WATCHING", and "STREAMING"
	});
	console.log(`Ready on login ${client.user.tag}`);
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();


	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
  // This makes commands not be executable in DMs
	if (message.channel.type === 'dm') {
		return;
	}
	if (command.ownerOnly && !config.owners.includes(message.author.id)) {
	    const nope = new Discord.MessageEmbed()
			.setDescription("Only bot owner can execute this command!")
			.setColor("RED")
		return message.channel.send(nope)
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;


    // This is for cooldowns xd
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.channel.send(`There was an error executing the command \`${command.name}\`: \n \`\`\`${error}\`\`\`);
	}
});


client.login(token);
