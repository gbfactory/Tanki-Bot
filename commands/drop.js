/**
 * Tanki Bot. ECONOMY.
 * 
 * Drop gold boxes in the discord chat.
 * 
 * @author gbfactory
 * @since  27.06.2019
*/

const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {

    let authorId = message.author.id;

    con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;

        var rowsUsers = rows;

        if (rows.length < 1) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                .setColor("#f54242");
            message.channel.send({embed:rgNo});
            return;
        }

        con.query(`SELECT * FROM items WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows[0].gold < 1) {
                let boxNo  = new Discord.RichEmbed()
                    .setAuthor("You don't have gold boxes! Find them in containers")
                    .setColor("#f54242");
                message.channel.send({embed:boxNo});
                return;
            }

            var dropper = message.author.username;
            var dropperId = message.author.id;

            let dropEmbed = new Discord.RichEmbed()
                .setColor('#ebcc34')
                .setTitle('A Gold Box has just dropped')
                .setDescription('Take it by writing `goldbox` in the chat')
                .setThumbnail('https://en.tankiwiki.com/images/en/thumb/1/10/Gold.png/150px-Gold.png')
                .setFooter(`Dropped by ${dropper}`)

            message.channel.send({embed:dropEmbed}).then(() => {

                message.channel.awaitMessages(response => response.content === 'goldbox', { max: 1, time: 20000, errors: ['time']}).then(collected => {

                    let dropTaken = new Discord.RichEmbed()
                        .setColor('#ebcc34')
                        .setAuthor(`${collected.first().author.username} has taken the Gold Box!`)
                        .setThumbnail('https://i.imgur.com/7heALnz.png')
                        .setFooter(`Dropped by ${dropper}`)
                    message.channel.send({embed:dropTaken});

                    con.query(`UPDATE items SET gold = ${rows[0].gold - 1} WHERE id = '${dropperId}'`);

                    con.query(`UPDATE users SET crys = ${rowsUsers[0].crys + 1000} WHERE id = '${collected.first().author.id}'`);

                }).catch(collected => {

                    let dropNot = new Discord.RichEmbed()
                        .setColor('#ebcc34')
                        .setTitle('The Gold Box has not been taken')
                        .setFooter(`Dropped by ${dropper}`)
                    
                    message.channel.send({embed:dropNot});
                })
            })


        });

    });

}
