const {
	CommandInteraction,
	MessageEmbed
} = require('discord.js');
const superagent = require("superagent");

module.exports = {
	name: "hug",
	description: "Hugs User!",
	usage: "/HUG @Target",
	cooldown: 2000,
	options: [{
		name: "target",
		description: "Mention The Target",
		type: "USER",
		required: true
	}],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		let {
			body
		} = await superagent
			 .get(`https://purrbot.site/api/img/sfw/hug/gif`)

		const target = interaction.options.getMember("target")
		await target.user.fetch();
		const member = interaction.member.user.username

		const hugeembed = new MessageEmbed()
			.setAuthor(member)
			.setColor("RED")
			.setDescription(`${member} Hugs ${target}!`)
			.setImage(body.link)
			.setTimestamp()
			.setFooter(
				`Requested by: ${interaction.member.user.username}` 
				)

		interaction.reply({
			embeds: [hugeembed]
		})
	}
}