// file should be ran whenever we update or create new slash commands

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const testGuildId = process.env.GUILD_ID;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, testGuildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);