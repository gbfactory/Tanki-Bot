/**
 * Tanki Bot.
 * 
 * Unregister to the Tanki Bot Database
 * 
 * @author gbfactory
 * @since  13.04.2019
*/

const Discord = require("discord.js");
const functions = require("../../utils/functions");

module.exports = {
    name: 'unregister',
    description: 'Unregister and delete your account from the Bot. You will loose access to many commands.',
    cooldown: 3,
    execute(client, message, args, con) {

        var rNum = Math.floor(1000 + Math.random() * 9000);

        var authorId = message.author.id;

        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length < 1) {
                return message.channel.send({ embed: functions.embedRegister() });
            }

            let regNum = new Discord.MessageEmbed()
                .setAuthor("TankiBot - Unregistration")
                .addField(`Attention! Unregistering will deleate all your user data from the database, this cannot be undone!`)
                .setDescription(`If you are sure, write **${rNum}** to unregister, or cancel to exit.`)
                .setColor("#DB5553")
                .setThumbnail("https://i.imgur.com/uZTXTjM.png");
            message.channel.send({ embed: regNum });

            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 10000,
                errors: ['time'],
            }).then(collected => {
                if ((collected.first().content).toLowerCase() == "cancel") {
                    return message.channel.send({ embed: functions.embedInfo(
                        "⚠ You cancelled your unregistration!"
                    ) });
                }

                if (collected.first().content == rNum) {

                    con.query(`DELETE FROM users WHERE id = ${authorId}`);
                    con.query(`DELETE FROM items WHERE id = ${authorId}`);
                    con.query(`DELETE FROM garage WHERE id = ${authorId}`);

                    return message.channel.send({ embed: functions.embedInfo(
                        `👋 You've been removed from the database... Goodbye!`
                    ) });

                } else {
                    return message.channel.send({ embed: functions.embedFail(
                        "Wrong code. Try again!"
                    ) });
                }
            }).catch(err => {
                return message.channel.send({ embed: functions.embedFail(
                    "Too much time has passed!"
                ) });
            });

        })

    },
};