/**
 * Tanki Bot
 * 
 * Allow users to claim bonues (ex: weekly, daily)
 * 
 * @author gbfactory
 * @since  11.01.2020
*/

const Discord = require("discord.js");
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

        // TODO: #1 Use one function instead of two for time conversion
        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100),
                seconds = Math.floor((duration / 1000) % 60),
                minutes = Math.floor((duration / (1000 * 60)) % 60),
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            return hours + " hours " + minutes + " minutes and " + seconds + " seconds";
        }

        function dhm(t) {
            var cd = 24 * 60 * 60 * 1000,
                ch = 60 * 60 * 1000,
                d = Math.floor(t / cd),
                h = Math.floor((t - d * cd) / ch),
                m = Math.round((t - d * cd - h * ch) / 60000),
                pad = function (n) { return n < 10 ? '0' + n : n; };
            if (m === 60) {
                h++;
                m = 0;
            }
            if (h === 24) {
                d++;
                h = 0;
            }

            return d + " days " + h + " hours " + m + " minutes";
        }

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
                        .setAuthor("❌ You have to wait " + msToTime(waitMins))
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
                        .setAuthor("❌ You have to wait " + dhm(waitMins));
                    message.channel.send({ embed: weeklyNo });
                }
            }

        });

    },
};