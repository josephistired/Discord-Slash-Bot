const {
	MessageEmbed,
	CommandInteraction
} = require("discord.js");
const ms = require("ms");

module.exports = {
	name: "slowmode",
	description: "Slows Down The Rate At Which Messages Can Be Sent.",
	permission: "MANAGE_MESSAGES",
	usage: "/slowmode [Rate] [Duration] NOT REQUIRED [Reason]",
	options: [{
			name: "rate",
			description: "Provide The Rate At Which The User Can Send A New Message!",
			type: "STRING",
			required: true
		},
		{
			name: "duration",
			description: "Provide A Duration For The Slow Mode, After Which It Will Disable Itself.",
			type: "STRING",
			required: true
		},
		{
			name: "reason",
			description: "Provide A Reason For Why You Activated Slow Mode.",
			type: "STRING",
			required: false
		}
	],
	async execute(interaction) {
		let message;
		const {
			channel,
			options
		} = interaction;
		const minRate = ms("5s");
		const maxRate = ms("6h");
		const minDuration = ms("10s");
		const rate = options.getString("rate") && ms(options.getString("rate")) ? ms(options.getString("rate")) : 0;
		const duration = options.getString("duration") && ms(options.getString("duration")) ? ms(options.getString("duration")) : 0;
		const reason = options.getString("reason") || "None Provided";
		const description = duration ? `Slow Mode Has Been Enabled With A Rate Of ${ms(rate, {long: true})} for ${ms(duration, {long: true})}` :
			`Slow Mode Has Been Enabled With A Rate Of ${ms(rate, {long: true})}`;
		const response = new MessageEmbed()
			.setTitle("🦥 Slow Mode 🦥")
			.setColor("RED")
			.setDescription(`${description}. **Reason:** ${reason}.`)
			.setTimestamp()
			.setFooter(
				`Requested By: ${interaction.member.user.username}`
			)
		if (!rate) {
			channel.rateLimitPerUser ? response.setDescription(`Slow Mode Has Been Disabled.`) : response.setDescription(`Slow Mode Has Been Enabled With A Rate Of ${ms(minRate, {long: true})}.`);
			channel.rateLimitPerUser ? channel.setRateLimitPerUser(0) : channel.setRateLimitPerUser(5);
			message = await interaction.reply({
				embeds: [response],
				fetchReply: true
			});
			return setTimeout(() => message.delete().catch(() => {}), 7000);
		}

		if (rate < minRate || rate > maxRate) {
			response.setDescription(`Rate Must Be Between ${ms(minRate, {long: true})} and ${ms(maxRate, {long: true})}. The Rate Can Be Supplied Like So: *10s, 1m, 2h*, Etc., Or Alternatively In Millisecond.`);
			return interaction.reply({
				embeds: [response],
				fetchReply: true,
				ephemeral: true
			});
		}

		if (duration && duration < minDuration) {
			response.setDescription(`Duration Must Be At Least ${ms(minDuration, {long: true})}. The Duration Can Be Supplied Like So: *10s, 1m, 2h*, Etc., Or Alternatively In Milliseconds.`);
			return interaction.reply({
				embeds: [response],
				fetchReply: true,
				ephemeral: true
			});
		}

		channel.setRateLimitPerUser(rate / 1000, reason);
		message = await interaction.reply({
			embeds: [response],
			fetchReply: true
		});
		setTimeout(() => message.delete().catch(() => {}), 7000);

		if (duration)
			setTimeout(async () => channel.setRateLimitPerUser(0), duration);
	}
}