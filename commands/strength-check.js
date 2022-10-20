const { SlashCommandBuilder } = require('@discordjs/builders');
const voiceDiscord = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
            .setName(`strength-check`)
            .setDescription(`Gojo judges your strength...`),
    async run ({client, interaction}) {
        if(!interaction.member.voice.channel){
            return interaction.reply({content:"connect to voice to do this command", ephemeral: true});
        }
        
    }
}