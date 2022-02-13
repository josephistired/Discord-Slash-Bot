console.clear();

const { Client } = require("discord.js")
module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {

        console.log("Name Of Bot:", `${client.user.username}`);
		console.log("Number Of Guilds:", `${client.guilds.cache.size}`);
		console.log("Number Of Members In Guilds:", `${client.users.cache.size}`);
        client.user.setActivity("Hi!", {type: "LISTENING"});

    }
}