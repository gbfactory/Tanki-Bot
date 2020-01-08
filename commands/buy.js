const Discord = require("discord.js");
const fs = require("fs");

let db = require("../storage/users.json");

module.exports.run = async (client, message, args) => {

    if (!db[message.author.id]) {
        let rgNo  = new Discord.RichEmbed()
            .setAuthor("You aren't registered! Use >register (username) to create a profile.")
            .setColor("#f54242");
        message.channel.send({embed:rgNo});
        return;
    }

    if (!args[0]) {
        let shop = new Discord.RichEmbed()
            .setColor("#f54242")
            .setAuthor("Wrong command usage! Use >help for more informations.")
        message.channel.send({embed:shop});
        return;
    }

    if (!isNaN(args[0]) && args[0] > 0) {

        prezzo = args[0] * 1000;

        if(db[message.author.id].crys >= prezzo) {
            let bought = new Discord.RichEmbed()
                .setColor("#87d704")
                .setThumbnail('https://i.imgur.com/CtoiatU.png')
                .setAuthor(`You bought ${args[0]} containers for ${prezzo} 💎`);

            db[message.author.id].crys -= prezzo;
            db[message.author.id].containers.container += args[0];

            fs.writeFile("./storage/users.json", JSON.stringify(db), (err) => {
                if(err) console.log(err)
            });

            message.channel.send({embed:bought});
        } else {
            let noMoney = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("You don't have crystals!");
            message.channel.send({embed:noMoney});
        }

    } else {
        let nan = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Not a valid input!");
        message.channel.send({embed:nan});
    } 

}
