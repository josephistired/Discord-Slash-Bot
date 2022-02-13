const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");


module.exports = {
	name: "say",
	description: "Make The Bot Say What You Want!",
	usage: "/say [Message]",
	cooldown: 10000,
	options: [{
		name: "message",
		description: "Provide The Message You Want The Bot To Send!",
		type: "STRING",
		required: true
	}],

	/**
	 * @param {CommandInteraction} interaction
	 */
	execute(interaction) {

		const say = interaction.options.getString("message")

		if (say.length > 1024) return interaction.reply({
			embeds: [new MessageEmbed().setTitle("❌ Can't Run Code With The Strings Given ❌").setColor("RED")
				.setDescription("Message Can't Be More Than 1024 Characters")
			],
			ephemeral: true
		});

		const Response = new MessageEmbed()
			.setColor("RED")
			.setTimestamp()
			.addFields({
				name: `Your Message:`,
				value: say
			})
			.setFooter(
				`Requested By: ${interaction.member.user.username}`,
				interaction.member.user.displayAvatarURL({
					dynamic: true,
					size: 512
				})
			)

		interaction.reply({
			embeds: [Response]
		});
	}
}