/**
 * Tanki Bot.
 * 
 * Register to the Tanki Bot Database
 * 
 * @author gbfactory
 * @since  12.04.2019
*/

const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {

    var rNum = Math.floor(1000 + Math.random() * 9000);

    var authorId = message.author.id;

    con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            let regAlready  = new Discord.RichEmbed()
                .setAuthor("You are already registered!")
                .setColor("#f54242");
            message.channel.send({embed:regAlready});
            return;
        } else {

            if (!args[0]) {
                let regNonick  = new Discord.RichEmbed()
                    .setAuthor("Choose your nickname with >register (nickname)!")
                    .setColor("#f54242");
                message.channel.send({embed:regNonick});
                return;
            } else {
                userNick = args[0];
            }

            if (userNick.length > 20) {
                let regIllegal  = new Discord.RichEmbed()
                    .setAuthor("You have a maximun of 20 characters!")
                    .setColor("#f54242");
                message.channel.send({embed:regIllegal});
                return;
            }

            if (userNick.length < 3) {
                let short = new Discord.RichEmbed()
                    .setAuthor("Your tanki nickname can't be shorter that 3 characters")
                    .setColor("#f54242")
                message.channel.send({embed:short});
                return;
            }

            if (!userNick.match(/^([0-9]|[a-z])+([0-9a-z]+)$/i)) {
                let regIllegal  = new Discord.RichEmbed()
                    .setAuthor("Your nickname must be alpanumerical!")
                    .setColor("#f54242");
                message.channel.send({embed:regIllegal});
                return;

            }

            let regNum  = new Discord.RichEmbed()
                .setAuthor(`Welcome ${message.member.user.username}! \nWrite ${rNum} to continue, or cancel to exit.`)
                .setColor("#87d704");
            message.channel.send({embed:regNum});

            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 10000,
                errors: ['time'],
            }).then(collected => {
                if ((collected.first().content).toLowerCase() == "cancel") {
                    let regCancel  = new Discord.RichEmbed()
                        .setAuthor("You cancelled the registration!")
                        .setColor("#f54242");
                    message.channel.send({embed:regCancel});
                    return;
                }

                if (collected.first().content == rNum) {
                    
                    let newDate = Date.now();

                    con.query(`INSERT INTO users (id, username, nick, xp, level, crys, tankoins, wins, losses, equipTurret, equipHull, timeDaily, timeWeekly, timePremium) VALUES ('${authorId}', '${userNick}', '', 0, 0, 1500, 0, 0, 0, 'smoky', 'hunter', '${newDate}', '${newDate}', '${newDate}')`, (err) => {
                        if (err) throw err;
                    });
                    con.query(`INSERT INTO items (id, containers, weeklybox, dailybox, coinbox, repair, armor, damage, nitro, mine, battery, gold, rare, epic, legendary, skinTurrets, skinHulls) VALUES ('${authorId}', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)`, (err) => {
                        if (err) throw err;
                    });
                    con.query(`INSERT INTO garage (id, firebird, freeze, isida, hammer, twins, ricochet, smoky, striker, vulcan, thunder, railgun, magnum, gauss, shaft, wasp, hornet, viking, hunter, dictator, titan, mammoth) VALUES ('${authorId}', 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0)`, (err) => {
                        if (err) throw err;
                    });

                    let rgEnd  = new Discord.RichEmbed()
                        .setAuthor(`You registered with the nickname ${userNick}`)
                        .setColor("#1bd9e3")
                    message.channel.send({embed:rgEnd});

                } else {
                    let rgNumErr  = new Discord.RichEmbed()
                        .setAuthor("Wrong code!")
                        .setColor("#1bd9e3")
                    message.channel.send({embed:rgNumErr});
                    return;
                }
            }).catch(err => {
                let redTime  = new Discord.RichEmbed()
                    .setAuthor("Too much time has passed!")
                    .setColor("#f54242");
                message.channel.send({embed:redTime});
                return;
            });

        }
    })
    
}
