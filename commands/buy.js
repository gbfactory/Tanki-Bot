const Discord = require("discord.js");
const fs = require("fs");

let db = require("../storage/users.json");

module.exports.run = async (client, message, args) => {

    if (!db[message.author.id]) {
        let rgNo  = new Discord.RichEmbed()
            .setAuthor("Non sei registrato!")
            .setColor("#f54242");
        message.channel.send({embed:rgNo});
        return;
    }

    if (!args[0]) {
        let shop = new Discord.RichEmbed()
            .setColor("#f54242")
            .setAuthor("Devi specificare cosa vuoi comprare.")
        message.channel.send({embed:shop});
        return;
    }

    if (!isNaN(args[0])) {

        prezzo = args[0] * 10000;

        if(db[message.author.id].crys >= prezzo) {
            let bought = new Discord.RichEmbed()
                .setColor("#87d704")
                .setThumbnail('https://i.imgur.com/CtoiatU.png')
                .setAuthor(`Hai comprato ${args[0]} containers per ${prezzo} 💎`);

            db[message.author.id].crys -= prezzo;
            db[message.author.id].containers.container += args[0];

            fs.writeFile("./storage/users.json", JSON.stringify(db), (err) => {
                if(err) console.log(err)
            });

            message.channel.send({embed:bought});
        } else {
            let noMoney = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Non hai abbastanza cristalli!");
            message.channel.send({embed:noMoney});
        }

    } else if (isNaN(args[0])) {
        let nan = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Devi inserire una quantità valida!");
        message.channel.send({embed:nan});
    } 

}
