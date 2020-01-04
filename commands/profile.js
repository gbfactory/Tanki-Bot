const Discord = require("discord.js");

let db = require("../storage/users.json");
let lv = require("../storage/levels.json");

module.exports.run = async (client, message, args) => {

    if (!args[0]) {
        var username = message.author.username;
        var userid = message.author.id;

        // se non ci sono args e l'utente non è registrato
        if (!db[userid]) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("Non sei registrato!")
                .setColor("#f54242");
            message.channel.send({embed:rgNo});
            return;
        }

    } else if (message.mentions.members.first()) {
        // se ci sono args l'username è la persona menzionata
        var username = message.mentions.users.first().username;
        var userid = message.mentions.users.first().id;

        // se l'utente menzionato non è registrato
        if (!db[userid]) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("Questo utente non è registrato!")
                .setColor("#f54242");
            message.channel.send({embed:rgNo});
            return;
        }
    } else {
        let err  = new Discord.RichEmbed()
            .setAuthor("Non hai menzionato un utente!")
            .setColor("#f54242");
        message.channel.send({embed:err});
        return;
    }

    let rankImg = lv[db[userid].level].image;
    let rank = lv[db[userid].level].name;
    let crys = db[userid].crys;
    let tankoins = db[userid].tankoins;

    let expCur = db[userid].xp;
    let expTot = lv[db[userid].level + 1].exp;
    let expDif = expTot - expCur;

    let getTurret = db[userid].turrets.equip;
    let getHull = db[userid].hulls.equip;

    let turret = getTurret.charAt(0).toUpperCase() + getTurret.slice(1) + " M" + db[userid].turrets[getTurret].level;
    let hull = getHull.charAt(0).toUpperCase() + getHull.slice(1) + " M" + db[userid].hulls[getHull].level;
    
    let wins = db[userid].battles.wins;
    let losses = db[userid].battles.loss;
    let ratio = wins/losses;

    if (isNaN(ratio)) {
        ratio = 0;
    }

    if (db[userid].nick == "") {
        tankiNick = "Non impostato";
    } else {
        tankiNick = db[userid].nick;
    }

    let profile = new Discord.RichEmbed()
        .setAuthor("Tanki Bot")
        .setTitle("User Profile")
        .setColor("#87d704")
        .setThumbnail(rankImg)
        .addField(`**Profilo di ${username}**`, `**Rank:** ${rank} \n**Crystals:** ${crys} <:crystal:660948418746777613> \n**Tankoins:** ${tankoins} <:tankoin:660948390263128124> \n**Experience:** ${expCur}/${expTot} (-${expDif})`, true)
        .addField(`**Battaglie**`, `**Vittore:** ${wins} \n**Sconfitte:** ${losses} \n**Ratio:** ${ratio}%`, true)
        .addField("**Nickname Tanki**", tankiNick + " \nApri il garage con \n>garage", true)
        .setFooter("Bot by GB Factory")
        .setTimestamp();

    message.channel.send({embed:profile});

}
