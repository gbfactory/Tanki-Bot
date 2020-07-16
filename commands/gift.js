/**
 * Tanki Bot
 * 
 * Allows players to send gifts to other players
 * 
 * @author gbfactory
 * @since 25.03.2020
 */

const Discord = require('discord.js');

module.exports.run = async (client, message, args, con) => {

    let authorId = message.author.id;

    con.query(`SELECT id, username, crys FROM users WHERE id = ${authorId}`, (err, rows) => {
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
        
        con.query(`SELECT id, username, crys FROM users WHERE id = ${giftedId}`, (err, rows) => {
            if (err) throw err;

            // check registrazione destinatario
            if (rows.length < 1) {
                message.channel.send("The other user is not registered!");
                return;
            }

            var giftedDb = rows[0];

            // check cristalli
            if (!args[1] || isNaN(args[1]) || args[1] <= 0) {
                message.channel.send("You must input a valid amout of crystals!");
                return;
            } else {
                var crys = parseInt(args[1]);
            }

            // check crys
            if (authorDb.crys < crys) {
                message.channel.send("You don't have enough crystals!");
                return;
            }

            // fine controlli
            // ==============

            var cryAuthor = authorDb.crys;
            var cryGifted = giftedDb.crys;

            // remove crystals from author
            con.query(`UPDATE users SET crys = ${cryAuthor - crys} WHERE id = '${authorId}'`);

            // add crystals to user
            con.query(`UPDATE users SET crys = ${cryGifted + crys} WHERE id = '${giftedId}'`);

            // end message
            message.channel.send(`🎁 <@${authorId}> has sent ${crys} crystals to <@${giftedId}>!`);


        })

    })

}