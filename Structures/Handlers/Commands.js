const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");


/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "👎 FAILED", "Missing A Name.")

        if(!command.usage)
        return Table.addRow(command.usage, "Warning: Missing Usage Instructions." )

        if(!command.type && !command.description)
        return Table.addRow(command.name, "👎 FAILED", "Missing A Description.")

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, "👎 FAILED", "Permission Is Invaild.")
        }

        client.commands.set(command.name, command)
        CommandsArray.push(command);

        await Table.addRow(command.name, "👍 Successful Loaded.")

    });

    console.log(Table.toString());

    //PERMISSIONS CHECK // 

    client.on("ready", async () => {
        client.guilds.cache.forEach((g) => {
            g.commands.set(CommandsArray).then(async (command) => {
                const Roles = (commandName) => {
                    const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                    if(!cmdPerms) return null;
    
                    return g.roles.cache.filter((r) => r.permissions.has(cmdPerms) && !r.managed).first(10); 
            
            }        
        
            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return accumulator;
    
                const permissions = roles.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true }]
                }, [])
    
                return [...accumulator, {id: r.id, permissions }]
            }, [])
    
            await g.commands.permissions.set({ fullPermissions });
        })
        })
    })
}