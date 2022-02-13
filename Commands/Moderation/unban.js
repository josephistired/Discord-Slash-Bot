const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");


module.exports = {
	name: "unban",
	description: "Unbans Target",
	permission: "BAN_MEMBERS",
	usage: "/unban [Target] [REASON]",
	options: [{
			name: "id",
			description: "Provide A User To Unban.",
			type: "STRING",
			required: true
		},
		{
			name: "reason",
			description: "Provide A Reason For The Unban.",
			type: "STRING",
			required: true
		}
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	execute(interaction) {
		const options = interaction.options
		const userID = options.getString("id");
	
		const reason = options.getString("reason");

		if (reason.length > 512)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
					.setDescription("Reason Can't Be More Than 512 Characters").setTimestamp()
				],
				ephemeral: true
			});

		const SuccessEmbed = new MessageEmbed()
			.setTitle(`🟢 Unbanned **[${userID}]** Successfully From ${interaction.guild.name} 🟢`)
			.setColor("RED")
			.setTimestamp()
			.addFields({
				name: "Reason:",
				value: `\`\`\`${reason}\`\`\``
			})

		const ErrorEmbed = new MessageEmbed()
			.setTitle(`❌ Couldn't Unban [${userID}] From ${interaction.guild.name} ❌`)
			.setColor("RED")
			.setTimestamp()
			.addFields({
				name: "Reason It Failed:",
				value: error
			})

		interaction.guild.members.unban(userID)
			.then(() => {
				interaction.reply({
					embeds: [SuccessEmbed],
					ephemeral: true
				})
			})
			.catch(() => {
				interaction.reply({
					embeds: [ErrorEmbed],
					ephemeral: true
				})
			})
	}
}