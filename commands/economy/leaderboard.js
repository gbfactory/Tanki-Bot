/**
 * Tanki Bot
 * 
 * Command to check the bot's leaderboard (ex: top 10 players by crystals)
 * 
 * @author gbfactory
 * @since ?
 */

const Discord = require("discord.js");

module.exports = {
    name: 'leaderboard',
    description: 'Check who are the Top Players of the Bot.',
    aliases: ['lb'],
    usage: '`>leaderboard crys` - Top Crystals \n`>leaderboard xp` - Top Experience \n`>leaderboard tankoins` - Top Tankoins',
    args: true,
    cooldown: 3,
    execute(client, message, args, con) {

        const authorId = message.author.id;

        // Functions to determinate if the current position is the user or not.
        const pointer = (authorId, checkId) => {
            return authorId == checkId ? " 👈" : "";
        }

        // Functions to determinate the loop cycles.
        const loop = (rows) => {
            return rows < 12 ? rows : 12;
        }

        // Args
        if (args[0] == "crys") {

            con.query(`SELECT id, username, crys FROM users ORDER BY crys DESC`, (err, rows) => {
                if (err) throw err;

                let topCrys = new Discord.RichEmbed()
                    .setAuthor("Tanki Bot")
                    .setTitle("Crystals Leaderboard")

                for (var i = 0; i < loop(rows.length); i++) {
                    topCrys.addField(` ${i + 1} - ${rows[i].username} ${pointer(authorId, rows[i].id)}`, `💎 ${rows[i].crys.toLocaleString()}`, true)
                }

                return message.channel.send({ embed: topCrys });

            });

        } else if (args[0] == "xp") {

            con.query(`SELECT id, username, xp FROM users ORDER BY xp DESC`, (err, rows) => {
                if (err) throw err;

                let topExp = new Discord.RichEmbed()
                    .setAuthor("Tanki Bot")
                    .setTitle("Experience Leaderboard")

                for (var i = 0; i < loop(rows.length); i++) {
                    topExp.addField(` ${i + 1} - ${rows[i].username} ${pointer(authorId, rows[i].id)}`, `<:xp:661186205458628608>  ${rows[i].xp.toLocaleString()}`, true)
                }

                return message.channel.send({ embed: topExp });

            })
        } else if (args[0] == "tankoins") {
            con.query(`SELECT id, username, tankoins FROM users ORDER BY tankoins DESC`, (err, rows) => {
                if (err) throw err;

                let topExp = new Discord.RichEmbed()
                    .setAuthor("Tanki Bot")
                    .setTitle("Tankoins Leaderboard")

                for (var i = 0; i < loop(rows.length); i++) {
                    topExp.addField(` ${i + 1} - ${rows[i].username} ${pointer(authorId, rows[i].id)}`, `<:tankoin:660948390263128124>  ${rows[i].tankoins.toLocaleString()}`, true)
                }

                return message.channel.send({ embed: topExp });

            })
        }

    },
};