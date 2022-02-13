const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");

module.exports = {
	name: "penis",
	description: "Displays Penis Size Of Targeted User",
	usage: "/penis @Target" || "/penis",
	cooldown: 10000,
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

		const list = [
			"8D",
			"8=D",
			"8==D",
			"8===D",
			"8====D",
			"8=====D",
			"8======D",
			"8========D",
			"8=========D",
			"8==========D",
			"8===========D",
			"8============D",
			"8=============D"
		]

		const random = list[Math.floor(Math.random() * list.length)];

		const penisembed = new MessageEmbed()
			.setTitle(`Penis Size :speaking_head:`)
			.setColor("RED")
			.setDescription(`${target}\'s penis size\n${list, random}`)
			.setFooter(
				`Requested By: ${interaction.member.user.username}`,
				target.user.displayAvatarURL({
					dynamic: true,
					size: 512
				})
			)

		interaction.reply({
			embeds: [penisembed]
		})

	}

}