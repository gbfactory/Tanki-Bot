/**
 * Tanki Bot
 * 
 * Allow users to claim bonues (ex: weekly, daily)
 * 
 * @author gbfactory
 * @since  11.01.2020
*/

const Discord = require("discord.js");
const ms = require('ms');

let lv = require("../../storage/levels.json");

module.exports = {
    name: 'bonus',
    description: 'Get a daily or weekly bonus of crystals and supplies.',
    aliases: ['prize'],
    usage: '`>bonus daily` - Get daily bonus \n`>bonus weekly` - Get weekly bonus',
    args: true,
    cooldown: 3,
    execute(client, message, args, con) {

        var authorId = message.author.id;

        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length < 1) {
                let rgNo = new Discord.RichEmbed()
                    .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                    .setColor("#f54242");
                message.channel.send({ embed: rgNo });
                return;
            }

            if (args[0] == "daily") {
                var dailyTime = rows[0].timeDaily;

                if (dailyTime <= Date.now()) {
                    var cooldown = Date.now() + 24 * 60 * 60 * 1000;

                    var dailyCrys = lv[rows[0].level].bonus;
                    con.query(`UPDATE users SET crys = ${rows[0].crys + dailyCrys} WHERE id = ${authorId}`);
                    con.query(`UPDATE users SET timeDaily = ${cooldown} WHERE id = ${authorId}`);

                    con.query(`SELECT dailybox FROM items WHERE id = ${authorId}`, (err, rows) => {
                        if (err) throw err;
                        prev = rows[0].dailybox;
                        con.query(`UPDATE items SET dailybox = ${prev + 1} WHERE id = ${authorId}`);
                    })


                    let dailyBonus = new Discord.RichEmbed()
                        .setColor("#00c3ff")
                        .setAuthor("✅ You got " + dailyCrys + " 💎 and 1 Daily Box! Open it with >open daily")
                    message.channel.send({ embed: dailyBonus });
                } else {
                    let waitMins = dailyTime - Date.now();
                    let dailyNo = new Discord.RichEmbed()
                        .setColor("#00c3ff")
                        .setAuthor("❌ You have to wait " + ms(waitMins, { long: true }))
                    message.channel.send({ embed: dailyNo });
                }

            } else if (args[0] == "weekly") {
                var weeklyTime = rows[0].timeWeekly;

                if (weeklyTime <= Date.now()) {

                    var cWeekly = Date.now() + 7 * 24 * 60 * 60 * 1000;

                    con.query(`SELECT weeklybox FROM items WHERE id = '${authorId}'`, (err, rows) => {
                        if (err) throw err;

                        let addbox = rows[0].weeklybox + 1;

                        con.query(`UPDATE items SET weeklybox = ${addbox} WHERE id = ${authorId}`);

                    });

                    con.query(`UPDATE users SET timeWeekly = ${cWeekly} WHERE id = ${authorId}`);

                    let weeklyBonus = new Discord.RichEmbed()
                        .setColor("#00c3ff")
                        .setAuthor("✅ You got a weekly container! Open it with >open weekly")
                    message.channel.send({ embed: weeklyBonus });
                } else {
                    let waitMins = weeklyTime - Date.now();
                    let weeklyNo = new Discord.RichEmbed()
                        .setColor("#00c3ff")
                        .setAuthor("❌ You have to wait " + ms(waitMins, { long: true }));
                    message.channel.send({ embed: weeklyNo });
                }
            }

        });

    },
};