const {
	CommandInteraction,
	MessageEmbed
} = require('discord.js');
const superagent = require("superagent");

module.exports = {
	name: "slap",
	description: "Slaps User!",
	usage: "/slaps @Target",
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
			 .get(`https://purrbot.site/api/img/sfw/slap/gif`)

		const target = interaction.options.getMember("target")
		await target.user.fetch();
		const member = interaction.member.user.username

		const slapembed = new MessageEmbed()
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
			.setColor("RED")
			.setDescription(`${member} Slaps ${target}!`)
			.setImage(body.link)
			.setTimestamp()
			.setFooter(
				`Requested by: ${interaction.member.user.username}` 
				)

		interaction.reply({
			embeds: [slapembed]
		})
	}
}