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
    execute(client, message, args, con, functions) {

        let authorId = message.author.id;

        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length < 1) {
                return message.channel.send({ embed: functions.embedRegister() });
            }

            let newNick = args[0];
            let oldNick = rows[0].nick ? rows[0].nick : 'Not set';

            // Check your actual nickname
            if (!newNick) {
                let checkEmbed = new Discord.MessageEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('Nickname')
                    .setDescription('Set your Tanki Nickname to check your ratings faster and let other people know who you are.')
                    .addField('Your Nickname', oldNick)
                    .addField('Update your Nickname', '`>nickname [new nickname]`')
                    .setThumbnail('https://i.imgur.com/t9aW1ri.png')
                    .setColor('#00eeff')
                
                return message.channel.send({ embed:checkEmbed });
            }

            // Check new nick characters
            if (!newNick.match(/^(?=[a-zA-Z0-9-_]{3,20}$)(?!.*[_-]{2})[^_-].*[^_-]$/i)) {
                return message.channel.send({ embed: functions.embedFail(
                    "Your nickname contains invalid characters!"
                ) });
            }

            // Check if the nickname is differnet
            if (newNick === oldNick) {
                return message.channel.send({ embed: functions.embedFail(
                    "Your nickname must be different from the old one!"
                ) })
            }

            // Update the nickname
            con.query(`UPDATE users SET nick = ? WHERE id = '${authorId}'`, newNick);

            return message.channel.send({ embed: functions.embedSuccess(
                `You new nickname is **${newNick}**!`
            ) });

        })

    },
};