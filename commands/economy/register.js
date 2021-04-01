/**
 * Tanki Bot.
 * 
 * Register to the Tanki Bot Database
 * 
 * @author gbfactory
 * @since  12.04.2019
*/

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
                    `👋 Welcome **${message.author.username}**! \nYou are registering with the nickname **${userNick}**. \nWrite **${rNum}** to continue, or **cancel** to exit.`
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

                        const users = {
                            "id": authorId,
                            "username": userNick,
                            "nick": "",
                            "xp": 0,
                            "level": 0,
                            "crys": 1500,
                            "tankoins": 0,
                            "wins": 0,
                            "losses": 0,
                            "equipTurret": "smoky",
                            "equipHull": "hunter",
                            "timeDaily": newDate,
                            "timeWeekly": newDate,
                            "timePremium": newDate,
                        }

                        const items = {
                            "id": authorId,
                            "containers": 0,
                            "weeklybox": 0,
                            "dailybox": 0,
                            "coinbox": 0,
                            "ultrabox": 0,
                            "repair": 0,
                            "armor": 0,
                            "damage": 0,
                            "nitro": 0,
                            "mine": 0,
                            "battery": 0,
                            "gold": 0,
                            "rare": 0,
                            "epic": 0,
                            "legendary": 0,
                            "skinTurrets": 0,
                            "skinHulls": 0,
                            "effects": 0,
                            "augments": 0,
                        }

                        const garage = {
                            "id": authorId,
                            "firebird": 0,
                            "freeze": 0,
                            "isida": 0,
                            "hammer": 0,
                            "twins": 0,
                            "ricochet": 0,
                            "smoky": 0,
                            "striker": 0,
                            "vulcan": 0,
                            "thunder": 0,
                            "railgun": 0,
                            "magnum": 0,
                            "gauss": 0,
                            "shaft": 0,
                            "wasp": 0,
                            "hornet": 0,
                            "viking": 0,
                            "hunter": 0,
                            "dictator": 0,
                            "titan": 0,
                            "mammoth": 0,
                        }

                        con.query(`INSERT INTO users SET ?`, users, (err) => {
                            if (err) throw err;
                        });
                        con.query(`INSERT INTO items SET ?`, items, (err) => {
                            if (err) throw err;
                        });
                        con.query(`INSERT INTO garage SET ?`, garage, (err) => {
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
                    
                }).catch(() => {
                    return message.channel.send({ embed: functions.embedFail(
                        "Too much time has passed!"
                    ) });
                });

            }
        })

    },
};
