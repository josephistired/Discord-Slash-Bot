const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");
const superagent = require("superagent");
module.exports = {
	name: "ip",
	description: "Displays Info About Given IP",
	usage: "/ip [target ip]",
	cooldown: 10000,
	options: [{
		name: "ip",
		description: "What's The IP? Accepts IPs, URLs.",
		type: "STRING",
		required: true
	}],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const ip = interaction.options.getString("ip");

		let {
			body
		} = await superagent
			.get(`https://ipwhois.app/json/${ip}`);

		const country = body.country_code
	
		if(!body.completed_requests > 1000)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
					.setDescription("We Have Surpassed Our Monthly Limit Of Requests... Please Wait Until Next Month To Try This Command Again!").setTimestamp()
				],
				ephemeral: true
			});

		const ipembed = new MessageEmbed()
			.setTitle(`Here's Your Info On **${ip}**!`)
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
			.setColor("RED")
			.addFields({
				name: "Completed Requests With API:",
				value: `\`\`\`${body.completed_requests}\`\`\``
			}, {
				name: "Type Of IP:",
				value: `\`\`\`${body.type}\`\`\``
			}, {
				name: "Continent:",
				value: `\`\`\`${body.continent}\`\`\``
			}, {
				name: "Country:",
				value: `\`\`\`${body.country}\`\`\``
			}, {
				name: "State:",
				value: `\`\`\`${body.region}\`\`\``
			}, {
				name: "City:",
				value: `\`\`\`${body.city}\`\`\``
			}, {
				name: "Timezone:",
				value: `\`\`\`${body.timezone_name}\`\`\``
			}, {
				name: "ISP:",
				value: `\`\`\`${body.isp}\`\`\``
			}, {
				name: "Flag:",
				value: `:flag_${country}:`.toLocaleLowerCase()
			}
			)
		interaction.reply({
			embeds: [ipembed],
		})
	} 
}
