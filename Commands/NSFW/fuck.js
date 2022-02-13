const {
	CommandInteraction,
	MessageEmbed
} = require('discord.js');
const superagent = require("superagent");

module.exports = {
	name: "fuck",
	description: "Fucks User",
	usage: "/fucks @Target",
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
			.get(`https://purrbot.site/api/img/nsfw/fuck/gif`)

		const target = interaction.options.getMember("target")
		await target.user.fetch();
		const member = interaction.member.user.username

		if (!interaction.channel.nsfw)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ NON-NSFW CHANNEL ❌").setColor("RED")
					.setDescription("PLEASE SEND IN A CORRECT NSFW CHANNEL!").setTimestamp()
				],
				ephemeral: true
			});


		const fuckembed = new MessageEmbed()
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
			.setColor("RED")
			.setDescription(`${member} Fucks ${target}!`)
			.setImage(body.link)
			.setTimestamp()
			.setFooter(
				`Requested by: ${interaction.member.user.username}`
			)

		interaction.reply({
			embeds: [fuckembed]
		})
	}
}