const { MessageEmbed } = require('discord.js');
const {
    blacklistedWords,
} = require('../../Structures/Validation/SwearWords');

module.exports = {
    name: 'messageCreate',

    async execute(message) {
        if (message.author.bot) return;
        member = await message.guild.members.fetch(message.author.id);
        if (member.permissions.has('ADMINISTRATOR')) return;
        let check = false;
        let words = [];
        const cWords = message.content.split(' ');

        for (let cIndex = 0; cIndex < cWords.length; cIndex++) {
            const checkWord = cWords[cIndex];
            for (let bIndex = 0; bIndex < blacklistedWords.length; bIndex++) {
                const blackWord = blacklistedWords[bIndex];
                if (checkWord === blackWord) {
                    words.push(`${checkWord}`);
                    check = true;
                }
            }
        }

        if (check) {
            message.delete();
            member.send({embeds: [new MessageEmbed()
                .setTitle('⚠ WARNING ⚠')
                .setDescription(`${message.author}, your message was removed!`)
                .addFields(
                    {name: "Reason:", value: `\`\`\`Blacklisted Word(s)\`\`\``},
                    {name: "Word(s)", value: `\`\`\`${words.join(", ")}\`\`\``},
                    {name: "Guild:", value: `\`\`\`${message.guild.name}\`\`\``}
                )], 
            }           
            )
        }
    }
}
