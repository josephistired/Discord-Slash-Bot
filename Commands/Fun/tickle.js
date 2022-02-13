const {
	CommandInteraction,
	MessageEmbed
} = require('discord.js');
const superagent = require("superagent");

module.exports = {
	name: "tickle",
	description: "Tickles User!",
	usage: "/Tickle @Target",
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
			 .get(`https://purrbot.site/api/img/sfw/tickle/gif`)

		const target = interaction.options.getMember("target")
		await target.user.fetch();
		const member = interaction.member.user.username

		const tickleembed = new MessageEmbed()
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
			.setColor("RED")
			.setDescription(`${member} Tickles ${target}!`)
			.setImage(body.link)
			.setTimestamp()
			.setFooter(
				`Requested by: ${interaction.member.user.username}` 
				)

		interaction.reply({
			embeds: [tickleembed]
		})
	}
}