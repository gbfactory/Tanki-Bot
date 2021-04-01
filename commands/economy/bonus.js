/**
 * Tanki Bot
 * 
 * Allow users to claim bonues (ex: weekly, daily)
 * 
 * @author gbfactory
 * @since  11.01.2020
*/

const ms = require('ms');

let lv = require("../../storage/levels.json");

module.exports = {
    name: 'bonus',
    description: 'Get a daily or weekly bonus of crystals and supplies.',
    aliases: ['prize', 'b'],
    usage: '`>bonus daily` - Get daily bonus \n`>bonus weekly` - Get weekly bonus',
    args: true,
    cooldown: 3,
    execute(client, message, args, con, functions) {

        var authorId = message.author.id;

        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length < 1) {
                return message.channel.send({ embed: functions.embedRegister() });
            }

            if (args[0] == "daily" || args[0] == "d") {
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

                    message.channel.send({ embed: functions.embedSuccess(
                        `You got **${dailyCrys}** 💎 and **1 Daily Box** <:Supplycrate:684061582443020298>! Open it with \`>open daily\`.`
                    ) });
                } else {
                    let waitMins = dailyTime - Date.now();
                    message.channel.send({ embed: functions.embedFail(
                        `You have to wait **${ms(waitMins, { long: true })}**!`
                    ) });
                }

            } else if (args[0] == "weekly" || args[0] == "w") {
                var weeklyTime = rows[0].timeWeekly;

                if (weeklyTime <= Date.now()) {

                    var cWeekly = Date.now() + 7 * 24 * 60 * 60 * 1000;

                    con.query(`SELECT weeklybox FROM items WHERE id = '${authorId}'`, (err, rows) => {
                        if (err) throw err;

                        let addbox = rows[0].weeklybox + 1;

                        con.query(`UPDATE items SET weeklybox = ${addbox} WHERE id = ${authorId}`);

                    });

                    con.query(`UPDATE users SET timeWeekly = ${cWeekly} WHERE id = ${authorId}`);

                    message.channel.send({ embed: functions.embedSuccess(
                        "You got **1 Weekly Container** <:Container_weekly:684061357351632945>! Open it with `>open weekly`"
                    ) });
                } else {
                    let waitMins = weeklyTime - Date.now();
                    message.channel.send({ embed: functions.embedFail(
                        `You have to wait **${ms(waitMins, { long: true })}**!`
                    ) });
                }
            }

        });

    },
};