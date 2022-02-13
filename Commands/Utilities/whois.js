const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");

module.exports = {
	name: "whois",
	description: "Displays Info On You Or Targeted User!",
	usage: "/whois @Target" || "/whois",
	cooldown: 5000,
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
			.setColor(target.user.accentColor || "RANDOM")
			.setThumbnail(target.user.displayAvatarURL({
				dynamic: true,
				size: 512
			}))
			.setTimestamp()
			.setImage(target.user.bannerURL({
				dynamic: true,
				size: 512
			}) || "")
			.addFields({
				name: `What Is ${target.user.username}'s ID?`,
				value: target.user.id
			}, {
				name: `What Is ${target.user.username}'s Tag?`,
				value: target.user.tag
			}, {
				name: `When Did ${target.user.username} Join The Server?`,
				value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
				inline: true
			}, {
				name: `When Did ${target.user.username} Created Their Account?`,
				value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`,
				inline: true
			}, {
				name: `What Roles Do ${target.user.username} Have? If Any?`,
				value: target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "No Roles"
			}, {
				name: `What Accent Color Does ${target.user.username} Have?`,
				value: target.user.accentColor ? `#${target.user.accentColor.toString(16)}` : "No Accent Color"
			}, {
				name: `What Is ${target.user.username}'s Banner?`,
				value: target.user.bannerURL() ? "** **" : " No Banner "
			}, )
			.setFooter(
				`Requested By: ${interaction.member.user.username}`,
				target.user.displayAvatarURL({
					dynamic: true,
					size: 512
				})
			)

		interaction.reply({
			embeds: [response]
		})
	}
}