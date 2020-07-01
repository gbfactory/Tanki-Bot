/**
 * Tanki Bot
 * 
 * TODO: Allows players to send gifts to other players
 * 
 * @author gbfactory
 * @since 25.03.2020
 */

const Discord = require('discord.js');

module.exports.run = async (client, message, args, con) => {

    let authorId = message.author.id;

    con.query(`SELECT id, username, crystals FROM users WHERE id = ${authorId}`, (err, rows) => {
        if (err) throw err;

        // check registrazione
        if (rows.length < 1) {
            message.channel.send("You are not registered!")
            return;
        }

        var authorDb = rows[0];

        // check menzione utente
        if (!message.mentions.members.first()) {
            message.channel.send("You didn't mentioned a user.");
            return;
        } else {
            var giftedId = message.mentions.users.first().id;
        }
        
        con.query(`SELECT id, username, crystals FROM users WHERE id = ${giftedId}`, (err, rows) => {
            if (err) throw err;

            // check registrazione destinatario
            if (rows.length < 1) {
                message.channel.send("The other user is not registered!");
                return;
            }

            var giftedDb = rows[0];

            // check cristalli
            if (!args[1] || isNaN(args[0]) || args[0] <= 0) {
                message.channel.send("Insert a valid numbers of crystals to dante.");
                return;
            } else {
                var crys = parseInt(args[1]);
            }

            // check crys
            if (authorDb.crystals < crys) {
                message.channel.send("You don't have enought crystals to donate").
                return;
            }

            


        })

    })

    if (!args[0]) {
        let err = new Discord.RichEmbed()
            .setAuthor("You didn't mention a user!")
            .setColor("#f54242")
        message.channel.send({embed:err});
        return;
    }

    

}