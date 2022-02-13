const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");
const superagent = require("superagent");

module.exports = {
	name: "8ball",
	description: "Answers All Your Questions",
	usage: "/8ball [question]",
	cooldown: 10000,
	options: [{
		name: "question",
		description: "Ask The Question",
		type: "STRING",
		required: true
	}],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		let {
			body
		} = await superagent
			.get(`https://nekos.life/api/v2/8ball`)

		const question = interaction.options.getString("question");

		if (question.length > 2000) return interaction.reply({
			embeds: [new MessageEmbed().setTitle("❌ Can't Run Code With The Strings Given ❌").setColor("RED").setDescription("Question Can't Be More Than 2000 Characters")],
			ephemeral: true
		});

		const Response = new MessageEmbed()
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
			.setColor("RED")
			.setTimestamp()
			.setFields({
				name: "Question",
				value: question
			})
			.setImage(body.url)
			.setFooter(
				`Requested by: ${interaction.member.user.username} | Provided by: nekos.life`)

		interaction.reply({
			embeds: [Response],
			ephemeral: true
		});
	}
}