const Discord = require("discord.js");
const fs = require("fs");

let db = require("../storage/users.json");

module.exports.run = async (client, message, args) => {

    let authorId = message.author.id;

    if (!db[authorId]) {
        let rgNo  = new Discord.RichEmbed()
            .setAuthor("Non sei registrato!")
            .setColor("#f54242");
        message.channel.send({embed:rgNo});
        return;
    }

    if (!args[0]) {
        let shop = new Discord.RichEmbed()
            .setColor("#f54242")
            .setAuthor("Devi specificare cosa vuoi vendere.")
        message.channel.send({embed:shop});
        return;
    }

    if (args[0] == "paints") {
        var paintRare = db[authorId].paint.rare;
        var paintEpic = db[authorId].paint.epic;
        var paintLegd = db[authorId].paint.legendary;

        var paintPrice = (paintRare * 1000) + (paintEpic * 1500) + (paintLegd * 2000);

        db[authorId].crys += paintPrice;

        if (paintPrice <= 0) {
            let noPaint = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Non hai vernici da vendere.")
            message.channel.send({embed:noPaint});
            return;
        }

        db[authorId].paint.rare = 0;
        db[authorId].paint.epic = 0;
        db[authorId].paint.legendary = 0;

        fs.writeFile("./storage/users.json", JSON.stringify(db), (err) => {
            if(err) console.log(err)
        });

        let soldPaint = new Discord.RichEmbed()
            .setColor("#1dd914")
            .setAuthor("Hai venduto tutte le vernici per " + paintPrice + " 💎!")
           .setThumbnail("https://i.imgur.com/oleyJg5.png")
            .setFooter("Bot by GB Factory")
        message.channel.send({embed:soldPaint});
        return;

    } else if (args[0] == "skins") {
        var equipTurrs = db[authorId].equip.turrets;
        var equipHulls = db[authorId].equip.hulls;

        var skinsPrice = (equipTurrs * 3000) + (equipHulls * 3000);

        db[authorId].crys += skinsPrice;

        if (skinsPrice <= 0) {
            let noSkins = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Non hai skins da vendere.")
            message.channel.send({embed:noSkins});
            return;
        }

        db[authorId].equip.turrets = 0;
        db[authorId].equip.turrets = 0;

        fs.writeFile("./storage/users.json", JSON.stringify(db), (err) => {
            if(err) console.log(err)
        });

        let soldSkins = new Discord.RichEmbed()
            .setColor("#1dd914")
            .setAuthor("Hai venduto tutte le skins per " + skinsPrice + " 💎!")
            .setThumbnail("https://i.imgur.com/d7K0B7S.png")
            .setFooter("Bot by GB Factory")
        message.channel.send({embed:soldSkins});
        return;

    } else if (args[0] == "supplies") {
        var repair = db[authorId].items.repair;
        var armor = db[authorId].items.armor;
        var damage = db[authorId].items.damage;
        var speed = db[authorId].items.speed;
        var mine = db[authorId].items.mine;
        var battery = db[authorId].items.battery;

        var supsPrice = repair * 150 + armor * 50 + damage * 50 + speed * 50 + mine * 50 + battery * 100;

        db[authorId].crys += supsPrice;

        if (supsPrice <= 0) {
            let noSups = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Non hai potenziamenti da vendere.")
            message.channel.send({embed:noSups});
            return;
        }

        db[authorId].items.repair = 0;
        db[authorId].items.armor = 0;
        db[authorId].items.damage = 0;
        db[authorId].items.speed = 0;
        db[authorId].items.mine = 0;
        db[authorId].items.battery = 0;

        fs.writeFile("./storage/users.json", JSON.stringify(db), (err) => {
            if(err) console.log(err)
        });

        let soldSups = new Discord.RichEmbed()
            .setColor("#1dd914")
            .setAuthor("Hai venduto tutti i potenziamenti per " + supsPrice + " 💎!")
            .setThumbnail("https://i.imgur.com/cl039Xx.png")
            .setFooter("Bot by GB Factory")
        message.channel.send({embed:soldSups});
        return;

    }

}
