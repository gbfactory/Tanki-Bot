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
    console.log(authorId);

    con.query(`SELECT id, username, crys FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;

        if (rows.length < 1) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                .setColor("#f54242");
            message.channel.send({embed:rgNo});
            return;
        }

        con.query(`SELECT id, gold FROM items WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows[0].gold < 1) {
                let boxNo  = new Discord.RichEmbed()
                    .setAuthor("You don't have gold boxes! Find them in containers")
                    .setColor("#f54242");
                message.channel.send({embed:boxNo});
                return;
            }

            var dropper = message.author.username;

            let dropEmbed = new Discord.RichEmbed()
                .setColor('#ebcc34')
                .setTitle('A Gold Box has just dropped')
                .setDescription('Take it by writing `goldbox` in the chat')
                .setThumbnail('https://en.tankiwiki.com/images/en/thumb/1/10/Gold.png/150px-Gold.png')
                .setFooter(`Dropped by ${dropper}`)

            message.channel.send({embed:dropEmbed}).then(() => {

                message.channel.awaitMessages(response => response.content === 'goldbox', { max: 1, time: 20000, errors: ['time']}).then(collected => {

                    var takenId = collected.first().author.id;

                    let dropTaken = new Discord.RichEmbed()
                        .setColor('#ebcc34')
                        .setAuthor(`${collected.first().author.username} has taken the Gold Box!`)
                        .setThumbnail('https://i.imgur.com/7heALnz.png')
                        .setFooter(`Dropped by ${dropper}`)
                    message.channel.send({embed:dropTaken});
   
                    con.query(`UPDATE items SET gold = ${rows[0].gold - 1} WHERE id = '${authorId}'`);

                    con.query(`SELECT id, crys FROM users WHERE id = '${takenId}'`, (err, rows) => {
                        if (err) throw err;

                        con.query(`UPDATE users SET crys = ${rows[0].crys + 1000} WHERE id = '${takenId}'`);

                    });

                }).catch(collected => {

                    let dropNot = new Discord.RichEmbed()
                        .setColor('#ebcc34')
                        .setTitle('The Gold Box has not been taken')
                        .setFooter(`Dropped by ${dropper}`)
                    
                    message.channel.send({embed:dropNot});
                });

            });

        });

    });

}
