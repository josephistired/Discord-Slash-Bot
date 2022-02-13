const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");

module.exports = {
	name: "avatar",
	description: "Displays Avatar Of You Or Targeted User!",
	usage: "/avatar @Target" || "/avatar",
	cooldown: 4000,
	options: [{
		name: "target",
		description: "Mention The Target",
		type: "USER",
		required: false
	}],
	/**
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const target = interaction.options.getMember("target") || interaction.member;
		await target.user.fetch();

		const response = new MessageEmbed()
			.setColor("RED")
			.setAuthor(`${target.user.username}'s Avatar`)
			.setImage(target.user.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setTimestamp()
			.setFooter(
				`Requested By: ${interaction.member.user.username}`,
			)
		interaction.reply({
			embeds: [response]
		})

	}
}