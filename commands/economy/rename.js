/**
 * Tanki Bot
 * 
 * Command to change the user bot registration username
 * 
 * @author gbfactory
 * @since 06 08 2020
 */

const Discord = require("discord.js");

module.exports = {
    name: 'rename',
    description: 'Change the username you used to register to the Bot. Requires a Rename Pass',
    usage: '`>rename [new username]`',
    args: true,
    cooldown: 3,
    execute(client, message, args, con) {

        let authorId = message.author.id;

        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length < 1) {
                let rgNo = new Discord.MessageEmbed()
                    .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                    .setColor("#f54242");
                message.channel.send({ embed: rgNo });
                return;
            }

            // Check if the nickname is valid
            if (!args[0].match(/^(?=[a-zA-Z0-9-_]{3,20}$)(?!.*[_-]{2})[^_-].*[^_-]$/i)) {
                let regIllegal = new Discord.MessageEmbed()
                    .setAuthor('Invalid nickname!')
                    .setDescription('Your nickname can contain only letters, numbers and symbols (_, -). It must be between 3 and 20 characters.')
                    .setColor("#f54242");
                message.channel.send({ embed: regIllegal });
                return;
            }

            // Update the nickname
            con.query(`UPDATE users SET nick = ? WHERE id = '${authorId}'`, [args[0]]);

            let set = new Discord.MessageEmbed()
                .setColor("#00ffff")
                .setAuthor(`You set your nickname to ${args[0]}`)
            message.channel.send({ embed: set });
            return;

        })
        
    },
};