/**
 * Tanki Bot. ECONOMY.
 * 
 * Command from buying items from the bot own shop.
 * 
 * @author gbfactory
 * @since  06.01.2020
*/

const Discord = require("discord.js");
let color = require('../storage/colors.json');
let emoji = require('../storage/emoji.json');

module.exports.run = async (client, message, args, con) => {

    let authorId = message.author.id;

    con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;

        var rowsUsers = rows;

        if (rows.length < 1) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("Tanki Bot")
                .setDescription("❗️ You aren't registered! \nUse `>register (username)` to create a profile")
                .setColor(color.red);
            message.channel.send({embed:rgNo});
            return;
        }

        if (!isNaN(args[0]) && args[0] > 0) {

            var quantity = args[0];
            var prezzo = quantity * 5000;

            if(rowsUsers[0].crys >= prezzo) {

                let bought = new Discord.RichEmbed()
                    .setThumbnail('https://i.imgur.com/CtoiatU.png')
                    .setAuthor(`✔️ You bought ${quantity} containers for ${prezzo} 💎`)
                    .setColor(color.green);

                con.query(`UPDATE users SET crys = ${parseInt(rowsUsers[0].crys) - prezzo} WHERE id = '${authorId}'`);

                con.query(`SELECT * FROM items WHERE id = '${authorId}'`, (err, rows) => {
                    if (err) throw err;             
                    
                    con.query(`UPDATE items SET containers = ${parseInt(rows[0].containers) + parseInt(quantity)} WHERE id = '${authorId}'`);
                    
                    message.channel.send({embed:bought});
                });

            } else {
                let noMoney = new Discord.RichEmbed()
                    .setAuthor("❌ You don't have enough Crystals 💎!")
                    .setColor(color.red)
                message.channel.send({embed:noMoney});
            }
        } else if (args[0].toUpperCase() === "RENAME" && args[1].toUpperCase() === "PASS") {

            if (rowsUsers[0].tankoins >= 1000) {

                let bought = new Discord.RichEmbed()
                    .setThumbnail('https://en.tankiwiki.com/images/en/9/9c/Rename_pass_preview.png')
                    .setAuthor(`✔️ You bought a Rename Pass for 2000 Tankoins ${emoji.tankoins}`)
                    .setColor(color.green)

                con.query(`UPDATE users SET tankoins = ${parseInt(rowsUsers[0].tankoins) - 2000} WHERE id = '${authorId}'`);

                con.query(`SELECT coinbox FROM items WHERE id = '${authorId}'`, (err, rows) => {
                    if (err) throw err;
                    con.query(`UPDATE items SET coinbox = ${parseInt(rows[0].coinbox) + 1} WHERE id = '${authorId}'`);
                    
                    message.channel.send({embed:bought});
                });
                
            } else {
                let noMoney = new Discord.RichEmbed()
                    .setAuthor(`❌ You don't have enough Tankoins ${emoji.tankoins} 💎!`)
                    .setColor(color.red)
                message.channel.send({embed:noMoney});
            }

        } else {
            let gethelp = new Discord.RichEmbed()
                .setAuthor("Tanki Bot")
                .setTitle("💰 Shop")
                .setThumbnail("https://i.imgur.com/ZOclxPD.png")
                .addField("📁 Usage", "📌 `>shop`: list of available items \n📌 `>buy (item)`: buy a specific item")
                .setColor(color.darkBlue)
            message.channel.send({embed:gethelp});
        } 

    });

}
