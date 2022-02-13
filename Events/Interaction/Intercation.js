const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const cooldown = new Map()
module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
      */
     async execute(interaction, client) {
        const cmd = client.commands.get(interaction.commandName);
        if (cmd) {
          if (cmd.cooldown) {
            const cooldwn = cooldown.get(`${cmd.name}${interaction.user.id}`) - Date.now();
            const mth = Math.floor(cooldwn / 1000) + "";
            if (cooldown.has(`${cmd.name}${interaction.user.id}`))
              return interaction.reply({
                embeds: [
                  new MessageEmbed()
                    .setTitle(`\`\`\`❌ Command On Cooldown ❌\`\`\``)
                    .setColor("RED")
                    .addFields({
                      name: "User:", value: `\`\`\`${interaction.user.username}\`\`\``,
                    }, {
                      name: "Command:", value: `\`\`\`${interaction.commandName}\`\`\``,
                    }, {
                      name: "Remaining Time:", value: `\`\`\`${mth.split(".")[0]} Seconds\`\`\``
                    })
                ],
                ephemeral: true,
              });
            cooldown.set(
              `${cmd.name}${interaction.user.id}`,
              Date.now() + cmd.cooldown
            );
            setTimeout(() => {
              cooldown.delete(`${cmd.name}${interaction.user.id}`);
            }, cmd.cooldown);
          }
        }   
        if(interaction.isCommand() || interaction.isContextMenu()) {
             const command = client.commands.get(interaction.commandName);
             if(!command) return interaction.reply({embeds: [
                 new MessageEmbed()
                 .setColor("BLUE")
                 .setDescription("🛑 An Error Occured While Running This Command")
             ]}) && client.commands.delete(interaction.commandName);

             command.execute(interaction, client)
         }
     }
}