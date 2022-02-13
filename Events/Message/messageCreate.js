const { Client, Message } = require("discord.js");
const  prefix = require("../../Structures/config.json");


module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
 
 if (
            message.author.bot ||
            !message.guild ||
            !message.content.toLowerCase().startsWith(prefix)
        )
            return;
    
        const [cmd, ...args] = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
    
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    
        if (!command) return;

        if(!message.member.permissions.has(command.permission || [])) return message.channel.send({
            embeds: [resp]
        }).then(msg => {
            setTimeout(function() {
            msg.delete()
            }, 5000)
            }) 
        
        if(!message.guild.me.permissions.has(command.botpermission || [])) return message.channel.send({
            embeds: [embed] 
        }).then(msg => {
            setTimeout(function() {
            msg.delete()
            }, 5000)
            }) 
        }
    }