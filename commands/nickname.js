/**
 * Tanki Bot
 * 
 * Command to changhe the bot nickname
 * 
 * @author gbfactory
 * @since ?
 */

const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {

    let authorId = message.author.id;

    con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;

        if (rows.length < 1) {
            let rgNo = new Discord.RichEmbed()
                .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                .setColor("#f54242");         
            message.channel.send({embed:rgNo});
            return;
        }
        
        if (!args[0]) {
            let noArgs = new Discord.RichEmbed()
                .setAuthor("You have to specify a nickname with >nickname (nick).")
                .setColor("#f54242");
            message.channel.send({embed:noArgs});
            return;
        }

        if (args[0].length > 20) {
            let long = new Discord.RichEmbed()
                .setAuthor("Your tanki nickname can't be longer than 20 characters")
                .setColor("#f54242")
            message.channel.send({embed:long});
            return;
        }

        if (args[0].length < 3) {
            let short = new Discord.RichEmbed()
                .setAuthor("Your tanki nickname can't be shorter that 3 characters")
                .setColor("#f54242")
            message.channel.send({embed:short});
            return;
        }

        if (args[0].match(/^([0-9]|[a-z])+([0-9a-z]+)$/i)) {

            con.query(`UPDATE users SET nick = ? WHERE id = '${authorId}'`, [args[0]]);
            
            let set = new Discord.RichEmbed()
                .setColor("#00ffff")
                .setAuthor("You set your nickname to " + args[0])
            message.channel.send({embed:set});
            return;
        } else {
            let regIllegal  = new Discord.RichEmbed()
                .setAuthor("Your nickname must be alpanumerical!")
                .setColor("#f54242");
            message.channel.send({embed:regIllegal});
            return;
        }

    });
    
}