const {
	CommandInteraction,
	MessageEmbed
} = require("discord.js");

module.exports = {
	name: 'purge',
	description: "Purges Requested Amount From Channel Or Targeted User",
	permission: "MANAGE_MESSAGES",
	usage: "/purge [Amount] NOT REQUIRED [Target]",
	options: [{
			name: "amount",
			description: "Provide An Amount To Delete From A User Or Channel! Less Than Or Equal To 100!",
			type: "NUMBER",
			required: true
		},
		{
			name: "target",
			description: "Provide The Target",
			type: "USER",
			required: false
		}
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const {
			channel,
			options
		} = interaction
		const target = options.getMember("user");
		const amount = options.getNumber("amount");

		if (amount > 100) return interaction.reply({
			content: "Only Numbers Between 0-100"
		})

		const Messages = await channel.messages.fetch();

		const Embed2 = new MessageEmbed()
			.setColor("RED")

		if (target) {
			let i = 0;
			const filtered = [];
			(await Messages).filter((n) => {
				if (m.author.id === target.id && Amount > i) {
					filtered.push(n)
					i++;
				}
			})

			await channel.bulkDelete(filtered, true).then(messages => {
				Embed2.setDescription(`✂️ Cleared ${messages.size} from ${target} ✂️.`);
				interaction.reply({
					embeds: [Embed]
				});
			})
		} else {
			await channel.bulkDelete(amount, true).then(messages => {
				Embed2.setDescription("Purged Messages");
				Embed2.setFooter(
					`Requested By: ${interaction.member.user.username}`,
					interaction.user.displayAvatarURL({
						dynamic: true,
						size: 512
					}));
				interaction.reply({
					embeds: [Embed2],
					ephemeral: true
				})

			})
		}
	}

}