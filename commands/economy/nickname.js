/**
 * Tanki Bot
 * 
 * Command to changhe the bot nickname
 * 
 * @author gbfactory
 * @since ?
 */

const Discord = require("discord.js");

module.exports = {
    name: 'nickname',
    description: 'Set your real Tanki nickname so people can see who you are in the game.',
    usage: '`>nickname` Check your nickname \n`>nickname [nickname]` Set your nickname',
    cooldown: 3,
    execute(client, message, args, con) {

        let authorId = message.author.id;
        let userNick = args[0];

        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length < 1) {
                let rgNo = new Discord.RichEmbed()
                    .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                    .setColor("#f54242");
                message.channel.send({ embed: rgNo });
                return;
            }

            // Check your actual nickname
            if (!userNick) {

                let oldNick = rows[0].nick ? rows[0].nick : 'Not set';
                
                let checkEmbed = new Discord.RichEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('Nickname')
                    .setDescription('Set your Tanki Nickname to check your ratings faster and let other people know who you are.')
                    .addField('Your Nickname', oldNick)
                    .addField('Update your Nickname', '`>nickname [new nickname]`')
                    .setThumbnail('https://i.imgur.com/t9aW1ri.png')
                
                return message.channel.send({ embed:checkEmbed });

            }

            // Check if the nickname is valid
            if (!userNick.match(/^(?=[a-zA-Z0-9-_]{3,20}$)(?!.*[_-]{2})[^_-].*[^_-]$/i)) {
                let regIllegal = new Discord.RichEmbed()
                    .setAuthor('Invalid nickname!')
                    .setDescription('Your nickname can contain only letters, numbers and symbols (_, -). It must be between 3 and 20 characters.')
                    .setColor("#f54242");
                message.channel.send({ embed: regIllegal });
                return;   
            }

            // Update the nickname
            con.query(`UPDATE users SET nick = ? WHERE id = '${authorId}'`, userNick);

            let set = new Discord.RichEmbed()
                .setColor("#00ffff")
                .setAuthor("You set your nickname to " + userNick)
            message.channel.send({ embed: set });
            return;

        })

    },
};