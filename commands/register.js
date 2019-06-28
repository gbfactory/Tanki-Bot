const Discord = require("discord.js");
let xp = require("../storage/xp.json");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    var rNum = Math.floor(1000 + Math.random() * 9000);

    let rgNum  = new Discord.RichEmbed()
    .setAuthor(`Benvenuto ${message.member.user.username}! \nScrivi ${rNum} per continuare o cancel per annullare.`)
    .setColor("#87d704");

    let rgAlr  = new Discord.RichEmbed()
    .setAuthor("Sei già registrato!")
    .setColor("#87d704");

    let rgCan  = new Discord.RichEmbed()
    .setAuthor("Hai cancellato la registrazione!")
    .setColor("#87d704");

    let rgEnd  = new Discord.RichEmbed()
    .setAuthor("Ti sei registrato con successo!")
    .setColor("#87d704");

    if(!xp[message.author.id]) {

        message.channel.send({embed:rgNum})
        .then(function(){
            message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 5000,
                errors: ['time'],
            })
            .then ((collected) => {
                if (collected.first().content == "cancel") {
                    message.channel.send({embed:alReg});
                }
                if (collected.first().content == rNum) {
                    if (args[0]) {
                        message.channel.send(`Ti sei registrato con il nickname ${args[0]}`);

                        xp[message.member.user.id] = {
                            username: args[0],
                            xp: 0,
                            level: 0,
                            cry: 0,
                            redCry: 0,
                            premium: false,
                            premiumTime: 0,
                            turrets: [],
                            hulls: [],
                            wins: 0,
                            loss: 0,
                            sVite: 0,
                            sDanno: 0,
                            sScudo: 0,
                            sNos: 0,
                            sMina: 0,
                            sGold: 0,
                            sBatt: 0,
                            scatole: 0,
                            clan: "",
                            clanRank: "Private",
                            paintRare: 0,
                            paintEpcic: 0,
                            paintLegend: 0,
                            turrXT: 0,
                            hullXT: 0,
                            rep: 0
                        };

                        fs.writeFile("./storage/xp.json", JSON.stringify(xp), (err) => {
                            if(err) console.log(err)
                        });

                    } else {
                        message.channel.send(`Ti sei registrato con il nickname ${message.member.user.username}`);

                        xp[message.member.user.id] = {
                            username: message.member.user.username,
                            xp: 0,
                            level: 0,
                            cry: 0,
                            redCry: 0,
                            premium: false,
                            premiumTime: 0,
                            turrets: [],
                            hulls: [],
                            wins: 0,
                            loss: 0,
                            sVite: 0,
                            sDanno: 0,
                            sScudo: 0,
                            sNos: 0,
                            sMina: 0,
                            sGold: 0,
                            sBatt: 0,
                            scatole: 0,
                            clan: "",
                            clanRank: "Private",
                            paintRare: 0,
                            paintEpcic: 0,
                            paintLegend: 0,
                            turrXT: 0,
                            hullXT: 0,
                            rep: 0
                        };

                        fs.writeFile("./storage/xp.json", JSON.stringify(xp), (err) => {
                            if(err) console.log(err)
                        });

                    }
                } else {
                    message.channel.send("Hai sbagliato ad inserire il numero!");
                };
            });
        });

    } else {
        message.channel.send({embed:rgAlr});
    } 
    
}
