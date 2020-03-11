/**
 * Tanki Bot. ECONOMY.
 * 
 * Command from buying items from the bot own shop.
 * 
 * @author gbfactory
 * @since  06.01.2020
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

        if (!args[0]) {
            let shop = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Wrong command usage! Use >help for more informations.")
            message.channel.send({embed:shop});
            return;
        }

        if (!isNaN(args[0]) && args[0] > 0) {

            prezzo = args[0] * 5000;

            if(rowsUsers[0].crys >= prezzo) {

                let bought = new Discord.RichEmbed()
                    .setColor("#87d704")
                    .setThumbnail('https://i.imgur.com/CtoiatU.png')
                    .setAuthor(`You bought ${args[0]} containers for ${prezzo} 💎`);

                con.query(`UPDATE users SET crys = ${rowsUsers[0].crys - prezzo} WHERE id = '${authorId}'`);

                con.query(`SELECT * FROM items WHERE id = '${authorId}'`, (err, rows) => {
                    if (err) throw err;
                    con.query(`UPDATE items SET containers = ${rows[0].containers + args[0]} WHERE id = '${authorId}'`);
                    
                    message.channel.send({embed:bought});
                });

            } else {
                let noMoney = new Discord.RichEmbed()
                    .setColor("#f54242")
                    .setAuthor("You don't have enough Crystals!");
                message.channel.send({embed:noMoney});
            }
        } else if (args[0].toUpperCase() === "RENAME" && args[1].toUpperCase() === "PASS") {

            if (rowsUsers[0].tankoins >= 1000) {

                let bought = new Discord.RichEmbed()
                    .setColor("#87d704")
                    .setThumbnail('https://en.tankiwiki.com/images/en/9/9c/Rename_pass_preview.png')
                    .setAuthor(`You bought a Rename Pass for 2000 Tankoins`);

                con.query(`UPDATE users SET tankoins = ${rowsUsers[0].tankoins - 2000} WHERE id = '${authorId}'`);

                con.query(`SELECT coinbox FROM items WHERE id = '${authorId}'`, (err, rows) => {
                    if (err) throw err;
                    con.query(`UPDATE items SET coinbox = ${rows[0].coinbox + 1} WHERE id = '${authorId}'`);
                    
                    message.channel.send({embed:bought});
                });
                
            } else {
                let noMoney = new Discord.RichEmbed()
                    .setColor("#f54242")
                    .setAuthor("You don't have enough Tankoins!");
                message.channel.send({embed:noMoney});
            }

        } else {
            let nan = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Use >shop to see what you can buy!");
            message.channel.send({embed:nan});
        } 

    });

}
