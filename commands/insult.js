const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch")

const insultURL = "https://evilinsult.com/generate_insult.php?lang=en&type=json"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('insult')
		.setDescription('Bot degrades naughty little kittens')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('kitten')
                .setRequired(true)
        ),
	async execute(interaction) {
        let insult = {}
        await fetch(insultURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                insult = data['insult'];
            })
            .catch(error => console.log(error))

        console.log(insult)
		await interaction.reply(`${interaction.options.getUser('target')}, ${insult}`);
	},
}; 