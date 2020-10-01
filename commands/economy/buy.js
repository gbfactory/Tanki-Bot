/**
 * Tanki Bot
 * 
 * Command from buying items from the bot own shop.
 * 
 * @author gbfactory
 * @since  06.01.2020
*/

const Discord = require("discord.js");

module.exports = {
    name: 'buy',
    description: 'Buy new items and equipment from the shop.',
    usage: '`>shop` - List of items \n`>buy [item name]` - Buy an item',
    args: true,
    cooldown: 3,
    execute(client, message, args, con, functions) {

        let authorId = message.author.id;

        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            var rowsUsers = rows;

            // Check if the user is registered in the db
            if (rows.length < 1) {
                return message.channel.send({ embed: functions.embedRegister() });
            }
            
            // Buy container (only a number is required)
            if (!isNaN(args[0]) && args[0] > 0) {

                var quantity = args[0];
                var prezzo = quantity * 5000;

                if (rowsUsers[0].crys >= prezzo) {
                    con.query(`UPDATE users SET crys = ${parseInt(rowsUsers[0].crys) - prezzo} WHERE id = '${authorId}'`);

                    con.query(`SELECT * FROM items WHERE id = '${authorId}'`, (err, rows) => {
                        if (err) throw err;

                        con.query(`UPDATE items SET containers = ${parseInt(rows[0].containers) + parseInt(quantity)} WHERE id = '${authorId}'`);

                        message.channel.send({ embed: functions.embedSuccess(
                            `You bought ${quantity} containers for ${prezzo} 💎`, 
                            'https://i.imgur.com/CtoiatU.png'
                        ) });
                    });

                } else {
                    message.channel.send({ embed: functions.embedFail(
                        "You don't have enough Crystals"
                    ) });
                }

                // Buy rename pass (check for string "rename pass")
            } else if (args[0].toLowerCase() === "rename" && args[1].toLowerCase() === "pass") {

                if (rowsUsers[0].tankoins >= 1000) {
                    con.query(`UPDATE users SET tankoins = ${parseInt(rowsUsers[0].tankoins) - 2000} WHERE id = '${authorId}'`);

                    con.query(`SELECT coinbox FROM items WHERE id = '${authorId}'`, (err, rows) => {
                        if (err) throw err;
                        con.query(`UPDATE items SET coinbox = ${parseInt(rows[0].coinbox) + 1} WHERE id = '${authorId}'`);

                        message.channel.send({ embed: functions.embedSuccess(
                            "You bought a **Rename Pass** for **2000** <:tankoin:660948390263128124>",
                            "https://i.imgur.com/RzBN9DE.png"
                        ) });
                    });

                } else {
                    message.channel.send({ embed: functions.embedFail(
                        "You don't have enough Tankoins"
                    ) });
                }

            }

        });

    },
};