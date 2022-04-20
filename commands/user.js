const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Display info about yourself.'),
	async execute(interaction) {
		console.log(`${interaction.user.tag} requested information about themselves`);
		return interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
	},
};