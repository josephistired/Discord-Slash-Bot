const {
	CommandInteraction,
	MessageEmbed
} = require('discord.js');
const superagent = require("superagent");

module.exports = {
	name: "dog",
	description: "Returns Image Of Random Dog!",
	usage: "/dog",
	cooldown: 2000,

	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		let {
			body
		} = await superagent
			.get('https://dog.ceo/api/breeds/image/random')

		const dogembed = new MessageEmbed()
			.setTitle(`Random Dog`)
			.setColor("RED")
			.setTimestamp()
			.setImage(body.message)

		interaction.reply({
			embeds: [dogembed],
			ephemeral: true
		})
	}
}