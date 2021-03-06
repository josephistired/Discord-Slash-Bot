console.clear();

process.on('unhandledRejection', error => { console.error()}) 

const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767, partials: ['CHANNEL']});
const { Token, Prefix, Database} = require("./config.json")

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");


client.commands = new Collection();


const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});
module.exports = client;

require(`./Handlers/Commands`)(client, PG, Ascii);
require(`./Handlers/Event`)(client, PG, Ascii);


client.login(Token)