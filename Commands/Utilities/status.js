const {
	CommandInteraction,
	Client,
	MessageEmbed
} = require("discord.js");
const {
	connection
} = require("mongoose");

require("../../Events/Client/ready");

module.exports = {
	name: "status",
	description: "Displays The Status Of The Bot And Database Connection!",
	usage: "/status",
	cooldown: 10000,
	permission: "SEND_MESSAGES",

	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */

	async execute(interaction, client) {

		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);





		const Response = new MessageEmbed()
			.setColor("RED")
			.setTimestamp()
			.setDescription(
				`   **Bot Status**
        \n **Client**: \`🟢 Online!\`
        \n **Client Ping**: \`${client.ws.ping}ms\`
        \n **Number Of Servers**: \`${client.guilds.cache.size}\`
        \n **Message Ping**: \` ${Date.now() - interaction.createdTimestamp}ms \`
        \n **Uptime**: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`)
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


function switchTo(val) {
	var status = " ";
	switch (val) {
		case 0:
			status = `🔴 DISCONNECTED`
			break;
		case 1:
			status = `🟢 CONNECTED`
			break;
		case 2:
			status = `🟡 CONNECTING`
			break;
		case 3:
			status = `🔵 DISCONNECTING`
			break;
	}
	return status;
}