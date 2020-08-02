/**
 * Tanki Bot
 * 
 * Profile command that allows a user to check his own profile with bot stats (bot exp, bot crystals, ...)
 * 
 * @author gbfactory
 * @since ?
 */

const Discord = require("discord.js");

let lv = require("../storage/levels.json");

module.exports.run = async (client, message, args, con) => {

    if (!args[0]) {
        var authorId = message.author.id;
    } else if (message.mentions.members.first()) {
        var authorId = message.mentions.users.first().id;
    } else {
        let err  = new Discord.RichEmbed()
            .setAuthor("You didn't mention an user!")
            .setColor("#f54242");
        message.channel.send({embed:err});
        return;
    }
    
    con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;

        if (rows.length < 1 && !args[0]) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                .setColor("#f54242");
            message.channel.send({embed:rgNo});
            return;
        } else if (rows.length < 1 && message.mentions.members.first()) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("This user isn't registered!")
                .setColor("#f54242");
            message.channel.send({embed:rgNo});
            return;
        }

        let profile = new Discord.RichEmbed();
        profile.setAuthor("Tanki Bot");
        profile.setTitle("<:elmetto:660442439441448981> User Profile");
        profile.setColor("#87d704");
        profile.setTimestamp();
    
        con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            if (rows[0].nick == "") {
                tankiNick = "";
            } else {
                tankiNick = "(Tanki Nickname: " + rows[0].nick + ")";
            }

            let rankImg = lv[rows[0].level].image;
            let username = rows[0].username;

            let rank = lv[rows[0].level].name;
            let crys = rows[0].crys;
            let tankoins = rows[0].tankoins;

            let expCur = rows[0].xp;
            let expTot;
            let expDif;
            if (rows[0].level < 30) {
                expTot = lv[rows[0].level + 1].exp;
                expDif = expTot - expCur;
            } else {
                expTot = 0;
                expDif = 0;
            }
        
            let wins = rows[0].wins;
            let losses = rows[0].losses;
            let ratio = wins/losses;

            if (isNaN(ratio)) ratio = 0;

            profile.setThumbnail(rankImg);
            profile.setDescription(`Profile of ${username} ${tankiNick}`);
            profile.addField(`**Info**`, `**Rank:** ${rank} \n**Crystals:** ${crys} 💎 \n**Tankoins:** ${tankoins} <:tankoin:660948390263128124> \n**Experience:** ${expCur}/${expTot} (-${expDif})`, true);
            profile.addField(`**Battles**`, `**Wins:** ${wins} \n**Losses:** ${losses} \n**Ratio:** ${ratio}%`, true);
            
            let getTurret = rows[0].equipTurret;
            let getHull = rows[0].equipHull;

            con.query(`SELECT ${getTurret}, ${getHull} FROM garage WHERE id = ${authorId}`, (err, rows) => {
                if (err) throw err

                let turret = getTurret.charAt(0).toUpperCase() + getTurret.slice(1) + " Mk" + rows[0][getTurret];
                let hull = getHull.charAt(0).toUpperCase() + getHull.slice(1) + " Mk" + rows[0][getHull];
                
                profile.addField("**Equip**", `${turret} \n${hull}`, true);

                message.channel.send({embed:profile});
            })

        });

    });
 
}
