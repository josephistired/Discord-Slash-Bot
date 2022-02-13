const {
	CommandInteraction,
	MessageEmbed,
	Client
} = require("discord.js");

module.exports = {
	name: "music",
	description: "Music System (:",
	usage: "/music",
	permission: "SEND_MESSAGES",
	options: [{
			name: "play",
			description: "Play A Song",
			type: "SUB_COMMAND",
			options: [{
				name: "query",
				description: "Provide A Name Or URL For Song",
				type: "STRING",
				required: true
			}]
		},
		{
			name: "volume",
			description: "Change The Volume",
			type: "SUB_COMMAND",
			options: [{
				name: "percent",
				description: "10 = 10%",
				type: "NUMBER",
				required: true
			}]
		},
		{
			name: "settings",
			description: "Select An Option",
			type: "SUB_COMMAND",
			options: [{
				name: "options",
				description: "Select An Option.",
				type: "STRING",
				required: true,
				choices: [{
						name: "queue",
						value: "queue"
					},
					{
						name: "skip",
						value: "skip"
					},
					{
						name: "pause",
						value: "pause"
					},
					{
						name: "resume",
						value: "resume"
					},
					{
						name: "loop",
						value: "loop"
					},
					{
						name: "stop",
						value: "stop"
					},
				]
			}]
		}
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const {
			options,
			member,
			guild,
			channel
		} = interaction;
		const VoiceChannel = member.voice.channel;

		if (!VoiceChannel)
			return interaction.reply({
				content: "You Aren't In A Voice Channel To Use The Bot!",
				ephemeral: true
			});

		if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
			return interaction.reply({
				content: `Already Playing Music In <#${guild.me.voice.channelId}>.`,
				ephemeral: true
			});

		try {
			switch (options.getSubcommand()) {
				case "play": {
					client.distube.playVoiceChannel(VoiceChannel, options.getString("query"), {
						textChannel: channel,
						member: member
					});
					return interaction.reply({
						content: "👍 Request Received."
					});
				}
				case "volume": {
					const Volume = options.getNumber("percent");
					if (Volume > 100 || Volume < 1)
						return interaction.reply({
							content: "You Must Specify A Number Between 1 And 100."
						});

					client.distube.setVolume(VoiceChannel, Volume);
					return interaction.reply({
						content: `⚡ Volume Has Been Set To \`${Volume}\``
					});
				}
				case "settings": {
					const queue = await client.distube.getQueue(VoiceChannel)

					if (!queue)
						return interaction.reply({
							content: "🛑 Nothing In Queue."
						});

					switch (options.getString("options")) {
						case "skip":
							await queue.skip(VoiceChannel);
							return interaction.reply({
								content: "⏩ Song Has Been Skipped."
							})
						case "stop":
							await queue.stop(VoiceChannel);
							return interaction.reply({
								content: "⏹️ Song Has Been Stopped."
							})
						case "pause":
							await queue.pause(VoiceChannel);
							return interaction.reply({
								content: "⏸️ Song Has Been Paused."
							})
						case "resume":
							await queue.resume(VoiceChannel);
							return interaction.reply({
								content: "▶️ Song Has Been Resumed."
							})
						case "loop": 
							await client.distube.setRepeatMode(VoiceChannel);
							return interaction.reply({
								content: "▶️ Song Has Been Looped "
							})
						case "queue": 
							return interaction.reply({
								embeds: [new MessageEmbed()
									.setColor("RED")
									.setDescription(`${queue.songs.map(
                        (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)
								]
							});
					}
					return;
				}
			}
		} catch (e) {
			const errorEmbed = new MessageEmbed()
				.setColor("RED")
				.setDescription(`🛑 Error: ${e}`)
			return interaction.reply({
				embeds: [errorEmbed]
			})
		}

	}
}