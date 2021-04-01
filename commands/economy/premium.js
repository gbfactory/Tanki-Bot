/**
 * Tanki Bot
 * 
 * Premium command that handle all the premium-related things
 * 
 * @author gbfactory
 * @since 06.03.2020
 */

const Discord = require("discord.js");
const ms = require('ms');

module.exports = {
    name: 'premium',
    description: 'Check whether or not your premium account is active and eventually how much time is left.',
    usage: '`>premium` - Check your premium',
    cooldown: 3,
    execute(client, message, args, con, functions) {

        var authorId = message.author.id;

        con.query(`SELECT id, username, timePremium FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length < 1) {
                return message.channel.send({ embed: functions.embedRegister() });
            }

            var date = Date.now();
            var premiumDate = rows[0].timePremium;

            if (date <= premiumDate) {

                let premiumEmbed = new Discord.MessageEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('Premium Account')
                    .addField('Premium Account Active', `Expires in **${ms(premiumDate - date, { long: true })}**`)
                    .setThumbnail('https://i.imgur.com/eExZbbo.png')
                    .setColor('#ffc619')
                    .setTimestamp()

                message.channel.send({ embed: premiumEmbed });

            } else {

                let inactivePremium = new Discord.MessageEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('Premium Account')
                    .addField('Premium Account Not Active', 'Get premium time by opening containers.')
                    .setThumbnail('https://i.imgur.com/eExZbbo.png')
                    .setColor('#ffc619')
                    .setTimestamp()

                message.channel.send({ embed: inactivePremium });

            }

        });

    },
};