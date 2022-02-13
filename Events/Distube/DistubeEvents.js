const client = require("../../Structures/index")
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "distubeEvents"
}

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`🎵 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)]})
    
    )
    
    .on("addSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`🎵 | Added ${song.name} - \`${song.formattedDuration}\` To The Queue By ${song.user}`)]})
    
    )

    .on("addList", (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`🎵 | Added \`${playlist.name}\` Playlist (${playlist.songs.length} Songs) To Queue\n${status(queue)}`)]})
    
    )

    .on("error", (channel, e) => {
        channel.send({embeds: [ new MessageEmbed()
        .setColor("RED")
        .setDescription(`🛑 | An Error Encountered: ${e}`)]})}
    
    )
    
    .on("empty", channel => channel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setDescription("Voice Channel Is Empty! Leaving The Channel...")]})
    )

    .on("searchNoResult", message => message.channel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setDescription(" | No Result Found!")]})
    )


    .on("finish", queue => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setDescription("Finished With Queue, Leaving The Channel!")]})
        )
    