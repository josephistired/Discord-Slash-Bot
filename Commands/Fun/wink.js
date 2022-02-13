const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");
const superagent = require("superagent");

module.exports = {
	name: "wink",
	description: "Winks At User!",
	usage: "/wink @Target",
	cooldown: 10000,
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
			.get(`https://some-random-api.ml/animu/wink`);

		let target = interaction.options.getMember("target")
		await target.user.fetch();
		const member = interaction.member.user.username


		const winkembed = new MessageEmbed()
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
			.setColor("RED")
			.setDescription(`${member} Winks At ${target}!`)
			.setImage(body.link)
			.setTimestamp()
			.setFooter(
				`Requested By: ${interaction.member.user.username}`,
				interaction.member.user.displayAvatarURL({
					dynamic: true,
					size: 512
				})
			)

		interaction.reply({
			embeds: [winkembed]
		})
	}
}