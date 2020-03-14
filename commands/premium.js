/**
 * Tanki Bot
 * Command: premium
 * Category: economy
 * Usage: premium use
 * 
 * @author gbfactory
 * @since 06.03.2020
 */

const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {

    var authorId = message.author.id;

    function dhm(t){
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor( (t - d * cd) / ch),
            m = Math.round( (t - d * cd - h * ch) / 60000),
            pad = function(n){ return n < 10 ? '0' + n : n; };
        if( m === 60 ){
            h++;
            m = 0;
        }
        if( h === 24 ){
            d++;
            h = 0;
        }

        return d + " days " + h + " hours " + m + " minutes";
    }
    
    con.query(`SELECT id, username, timePremium FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;

        if (rows.length < 1) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                .setColor("#f54242");
            message.channel.send({embed:rgNo});
            return;
        }

        var date = Date.now();
        var premiumDate = rows[0].timePremium;

        if (date <= premiumDate) {

            let premiumEmbed = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setTitle('Premium Account')
                .setTimestamp()
                .setThumbnail('https://i.imgur.com/eExZbbo.png')
                .setColor('#ffc619')
                .addField('Premium Account Active', 'Expires in ' + dhm(premiumDate - date));

            message.channel.send({embed:premiumEmbed});

            //message.channel.send("hai il premium - scade tra ");

        } else {

            let inactivePremium = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setTitle('Premium Account')
                .setTimestamp()
                .setThumbnail('https://i.imgur.com/eExZbbo.png')
                .setColor('#ffc619')
                .addField('Premium Account Not Active', 'Get a premium account by opening container');

            message.channel.send({embed:inactivePremium});   
        
        }
    
    });

    
}
