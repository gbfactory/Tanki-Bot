const Discord = require("discord.js");
const fs = require("fs");

let db = require("../storage/users.json");

module.exports.run = async (client, message, args) => {

    var rNum = Math.floor(1000 + Math.random() * 9000);

    if(!db[message.author.id]) {

        let rgNum  = new Discord.RichEmbed()
            .setAuthor(`Benvenuto ${message.member.user.username}! \nScrivi ${rNum} per continuare o cancel per annullare.`)
            .setColor("#87d704");
        message.channel.send({embed:rgNum})
        .then(function(){
            message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 5000,
                errors: ['time'],
            })
            .then ((collected) => {
                if (collected.first().content == "cancel") {

                    let rgExit  = new Discord.RichEmbed()
                        .setAuthor("Sei uscito dalla registrazione!")
                        .setColor("#f54242");
                    message.channel.send({embed:rgExit});
                }
                if (collected.first().content == rNum) {

                    if (args[0]) {
                        userNick = args[0];
                    } else {
                        userNick = message.member.user.username;
                    }

                    db[message.member.user.id] = {
                        username: userNick,
                        nick: "",
                        xp: 0,
                        level: 0,
                        crys: 1000,
                        tankoins: 0,
                        battles: {
                            wins: 0,
                            loss: 0,
                        },
                        clan: {
                            id: null,
                            rank: 0
                        },
                        items: {
                            repair: 0,
                            armor: 0,
                            damage: 0,
                            speed: 0,
                            mine: 0,
                            gold: 0,
                            battery: 0
                        },
                        containers: {
                            container: 0,
                            supplybox: 0,
                            weekly: 0,
                            xt: 0,
                            coinbox: 0
                        },
                        paint: {
                            rare: 0,
                            epic: 0,
                            legendary: 0
                        },
                        equip: {
                            turrets: 0,
                            hulls: 0
                        },
                        turrets: {
                            equip: "smoky",
                            smoky: {
                                level: 0,
                                ups: 0,
                                skin: [0, 0, 0, 0, 0]
                            }
                        },
                        hulls: {
                            equip: "hunter",
                            hunter: {
                                level: 0,
                                ups: 0,
                                skin: [0, 0, 0, 0]
                            }
                        }
                    };

                    fs.writeFile("./storage/users.json", JSON.stringify(db), (err) => {
                        if(err) console.log(err)
                    });

                    let rgEnd  = new Discord.RichEmbed()
                        .setAuthor(`Ti sei registrato con il nickname ${userNick}`)
                        .setColor("#1bd9e3")
                    message.channel.send({embed:rgEnd});

                } else {
                    let rgNumErr  = new Discord.RichEmbed()
                        .setAuthor("Hai sbagliato a scrivere il numero!")
                        .setColor("#1bd9e3")
                    message.channel.send({embed:rgNumErr});
                };
            });
        });

    } else {
        let rgAlr  = new Discord.RichEmbed()
            .setAuthor("Sei già registrato!")
            .setColor("#f54242");
        message.channel.send({embed:rgAlr});
    } 
    
}
