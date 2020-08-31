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
    execute(client, message, args, con) {

        var rNum = Math.floor(1000 + Math.random() * 9000);

        var authorId = message.author.id;

        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;
            if (rows.length > 0) {
                let regAlready = new Discord.RichEmbed()
                    .setAuthor("You are already registered!")
                    .setColor("#f54242");
                message.channel.send({ embed: regAlready });
                return;
            } else {

                let userNick = args[0];

                // Check if the nickname is valid
                if (!userNick[0].match(/^(?=[a-zA-Z0-9-_]{3,20}$)(?!.*[_-]{2})[^_-].*[^_-]$/i)) {
                    let regIllegal = new Discord.RichEmbed()
                        .setAuthor('Invalid nickname!')
                        .setDescription('Your nickname can contain only letters, numbers and symbols (_, -). It must be between 3 and 20 characters.')
                        .setColor("#f54242");
                    message.channel.send({ embed: regIllegal });
                    return;   
                }
                
                // Registration
                let regNum = new Discord.RichEmbed()
                    .setAuthor(`Welcome ${message.member.user.username}! \nWrite ${rNum} to continue, or cancel to exit.`)
                    .setColor("#87d704");
                message.channel.send({ embed: regNum });

                const filter = m => m.author.id === message.author.id;
                
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 10000,
                    errors: ['time'],
                }).then(collected => {
                    if ((collected.first().content).toLowerCase() == "cancel") {
                        let regCancel = new Discord.RichEmbed()
                            .setAuthor("You cancelled the registration!")
                            .setColor("#f54242");
                        message.channel.send({ embed: regCancel });
                        return;
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

                        let rgEnd = new Discord.RichEmbed()
                            .setAuthor(`You registered with the nickname ${userNick}`)
                            .setColor("#1bd9e3")
                        message.channel.send({ embed: rgEnd });

                    } else {
                        let rgNumErr = new Discord.RichEmbed()
                            .setAuthor("Wrong code!")
                            .setColor("#1bd9e3")
                        message.channel.send({ embed: rgNumErr });
                        return;
                    }
                    
                }).catch(err => {
                    let redTime = new Discord.RichEmbed()
                        .setAuthor("Too much time has passed!")
                        .setColor("#f54242");
                    message.channel.send({ embed: redTime });
                    return;
                });

            }
        })

    },
};