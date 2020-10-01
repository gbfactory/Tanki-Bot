/**
 * Tanki Bot.
 * 
 * Register to the Tanki Bot Database
 * 
 * @author gbfactory
 * @since  12.04.2019
*/

const Discord = require("discord.js");

module.exports = {
    name: 'register',
    description: 'Register your account in the Bot Database and unlock all the commands and features of Tanki Bot.',
    usage: '`>register [nickname]` - Register with your nickname.',
    args: true,
    cooldown: 3,
    execute(client, message, args, con, functions) {

        var rNum = Math.floor(1000 + Math.random() * 9000);

        var authorId = message.author.id;

        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;
            if (rows.length > 0) {
                return message.channel.send({ embed: functions.embedFail(
                    'You are already registered!'
                ) });
            } else {

                let userNick = args[0];

                // Advise the user to remove brackets
                if (userNick.includes('(') || userNick.includes(')') || userNick.includes('[') || userNick.includes(']')) {
                    return message.channel.send({ embed: functions.embedInfo(
                        "⚠ Your nickname does not need to include the brackets! \nExample: `>register TankiBot`"
                    ) });
                }

                // Check if the nickname is valid
                if (!userNick.match(/^(?=[a-zA-Z0-9-_]{3,20}$)(?!.*[_-]{2})[^_-].*[^_-]$/i)) {
                    return message.channel.send({ embed: functions.embedFail(
                        'Your nickname contains illegal characters!'
                    ) });
                }
                
                // Registration
                message.channel.send({ embed: functions.embedInfo(
                    `👋 Welcome **${message.member.user.username}**! \nYou are registering with the nickname **${userNick}**. \nWrite **${rNum}** to continue, or **cancel** to exit.`
                ) });

                const filter = m => m.author.id === message.author.id;
                
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 10000,
                    errors: ['time'],
                }).then(collected => {
                    if ((collected.first().content).toLowerCase() == "cancel") {
                        return message.channel.send({ embed: functions.embedFail(
                            "You cancelled the registration!"
                        ) });
                    }

                    if (collected.first().content == rNum) {

                        let newDate = Date.now();

                        con.query(`INSERT INTO users (id, username, nick, xp, level, crys, tankoins, wins, losses, equipTurret, equipHull, timeDaily, timeWeekly, timePremium) VALUES ('${authorId}', '${userNick}', '', 0, 0, 1500, 0, 0, 0, 'smoky', 'hunter', '${newDate}', '${newDate}', '${newDate}')`, (err) => {
                            if (err) throw err;
                        });
                        con.query(`INSERT INTO items (id, containers, weeklybox, dailybox, coinbox, repair, armor, damage, nitro, mine, battery, gold, rare, epic, legendary, skinTurrets, skinHulls, effects, augment) VALUES ('${authorId}', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)`, (err) => {
                            if (err) throw err;
                        });
                        con.query(`INSERT INTO garage (id, firebird, freeze, isida, hammer, twins, ricochet, smoky, striker, vulcan, thunder, railgun, magnum, gauss, shaft, wasp, hornet, viking, hunter, dictator, titan, mammoth) VALUES ('${authorId}', 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0)`, (err) => {
                            if (err) throw err;
                        });

                        return message.channel.send({ embed: functions.embedSuccess(
                            `You registered with the nickname **${userNick}**!`
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

            }
        })

    },
};
