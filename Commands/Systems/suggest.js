const {
	CommandInteraction,
	MessageEmbed
} = require('discord.js');

module.exports = {
	name: "suggest",
	description: "Create A Suggestion For Server Or Bot",
	usage: "/suggest [Command] Or [Event] Or [System] then /suggest [Name] And [Functionality",
	options: [{
			name: "type",
			description: "Create A Suggestion For The Bot",
			required: true,
			type: "STRING",
			choices: [{
					name: "Command",
					value: "Command",
				},
				{
					name: "Event",
					value: "Event",
				},
				{
					name: "System",
					value: "System",
				},
			]
		},
		{
			name: "name",
			description: "Provide A Name For Your Suggestion",
			type: "STRING",
			required: true
		},
		{
			name: "functionality",
			description: "Describe The Functionality Of Your Suggestion",
			type: "STRING",
			required: true
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const {
			options
		} = interaction;

		const type = options.getString("type");
		const name = options.getString("name");
		const funcs = options.getString("functionality")

		const suggestEmbed = new MessageEmbed()
			.setColor("RED")
			.setDescription(`${interaction.member} has suggested a ${type}`)
			.addFields({
				name: "Name",
				value: `${name}`
			}, {
				name: "Functionality",
				value: `${funcs}`
			}, )
		const message = await interaction.reply({
			embeds: [suggestEmbed],
			fetchReply: true
		})
		message.react("✔️")
		message.react("❌")
	}
}