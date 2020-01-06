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

        if (paintRare <= 0 || paintEpic <= 0 || paintLegd <= 0) {
            let noPaint = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Non hai vernici da vendere.")
            message.channel.send({embed:noPaint});
            return;
        }

        var paintPrice = (paintRare * 1500) + (paintEpic * 3000) + (paintLegd * 4500);

        db[authorId].crys += paintPrice;

        db[authorId].paint.rare = 0;
        db[authorId].paint.epic = 0;
        db[authorId].paint.legendary = 0;

        fs.writeFile("./storage/users.json", JSON.stringify(db), (err) => {
            if(err) console.log(err)
        });

        let soldPaint = new Discord.RichEmbed()
            .setColor("#f54242")
            .setAuthor("Hai venduto tutte le vernici per " + paintPrice + " <:crystal:660948418746777613>!")
            .setThumbnail("https://i.imgur.com/oleyJg5.png")
            .setFooter("Bot by GB Factory")
        message.channel.send({embed:soldPaint});
        return;

    } else if (args[0] == "skins") {
        var equipTurrs = db[authorId].equip.turrets;
        var equipHulls = db[authorId].equip.turrets;

        if (equipTurrs <= 0 || equipHulls <= 0) {
            let noSkins = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Non hai skins da vendere.")
            message.channel.send({embed:noSkins});
            return;
        }

        var skinsPrice = (equipTurrs * 3800) + (equipHulls * 3800);

        db[authorId].crys += skinsPrice;

        db[authorId].equip.turrets = 0;
        db[authorId].equip.turrets = 0;

        fs.writeFile("./storage/users.json", JSON.stringify(db), (err) => {
            if(err) console.log(err)
        });

        let soldSkins = new Discord.RichEmbed()
            .setColor("#f54242")
            .setAuthor("Hai venduto tutte le skins per " + skinsPrice + " <:crystal:660948418746777613>!")
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

        if (repair <= 0 || armor <= 0 || damage <= 0 || speed <= 0 || mine <= 0 || battery <= 0) {
            let noSups = new Discord.RichEmbed()
                .setColor("#f54242")
                .setAuthor("Non hai potenziamenti da vendere.")
            message.channel.send({embed:noSups});
            return;
        }

        var supsPrice = repair * 150 + armor * 50 + damage * 50 + speed * 50 + mine * 50 + battery * 100;

        db[authorId].crys += supsPrice;

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
            .setColor("#f54242")
            .setAuthor("Hai venduto tutti i potenziamenti per " + supsPrice + " <:crystal:660948418746777613>!")
            .setThumbnail("https://i.imgur.com/cl039Xx.png")
            .setFooter("Bot by GB Factory")
        message.channel.send({embed:soldSups});
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
