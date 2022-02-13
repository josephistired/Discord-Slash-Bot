const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");


module.exports = {
	name: "ban",
	description: "Bans Target",
	permission: "BAN_MEMBERS",
	usage: "/ban [Target] [REASON] [MESSAGES]",
	options: [{
			name: "user",
			description: "Provide A User To Ban.",
			type: "USER",
			required: true
		},
		{
			name: "reason",
			description: "Provide A Reason For The Ban.",
			type: "STRING",
			required: true
		},
		{
			name: "messages",
			description: "Provide A Number Of Days For Their To Messages To Be Deleted Up To.",
			type: "STRING",
			required: true,
			choices: [{
					name: "Don't Delete Any",
					value: "0"
				},
				{
					name: "Delete Up To Seven Days",
					value: "7"
				}
			]
		}
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const options = interaction.options
		const target = options.getMember("user");


		if (target.id === interaction.member.id)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
				.setDescription(`Hey... ${interaction.user.username} Why Are You Trying To Ban Yourself....?`).setTimestamp()
				],
				ephemeral: true
			});

		if (target.permissions.has("BAN_MEMBERS"))
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
				.setDescription(`${target.user.username} Is An Admin....?`).setTimestamp()
				],
				ephemeral: true
			});


		const reason = options.getString("reason");

		if (reason.length > 512)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
					.setDescription("Reason Can't Be More Than 512 Characters").setTimestamp()
				],
				ephemeral: true
			});
		target.send(
			new MessageEmbed()
			.setTitle(`You've Been Banned From ${interaction.guild.name}!`)
			.setColor("RED")
			.setTimestamp()
			.addFields({
				name: "Reason:",
				value: `\`\`\`${reason}\`\`\``
			}, {
				name: "Banned By:",
				value: `\`\`\`${interaction.member.user.tag}\`\`\``
			}).catch(console.error)
		)
		const Amount = options.getString("messages")

		await target.ban({
			days: Amount,
			reason: reason
		})

		interaction.reply({
			embeds: [new MessageEmbed().setColor("GREEN").setDescription(`🟢 **${target.user.username}** Has Been Banned From ${interaction.guild.name} 🟢`)],
			ephemeral: true

		})
	}
}