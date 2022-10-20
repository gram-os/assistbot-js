require('dotenv').config(); //initialize dotenv
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js'); //import discord.js
const token = process.env.CLIENT_TOKEN;
const http = require('http');

const client = new Client({ 
	intents: [
		"GUILDS", 
		"GUILD_MESSAGES",
		"GUILD_VOICE_STATES"
	], 
}); //create new client

// retrieve command file 
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// retrieve event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);


client.login(token); 