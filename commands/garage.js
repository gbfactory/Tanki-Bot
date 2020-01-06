const Discord = require("discord.js");

let db = require("../storage/users.json");
let lv = require("../storage/levels.json");
let eq = require("../storage/equip.json");

module.exports.run = async (client, message, args) => {

    var userid = message.author.id;

    // non registrato
    if (!db[userid]) {
        let rgNo  = new Discord.RichEmbed()
            .setAuthor("Non sei registrato!")
            .setColor("#f54242");
        message.channel.send({embed:rgNo});
        return;
    }
    
    // nome equip. dal db users
    let dTurret = db[userid].turrets.equip;
    let dHull = db[userid].hulls.equip;
    
    // livello equip. dal db users
    let tLevel = db[userid].turrets[dTurret].level;
    let hLevel = db[userid].hulls[dHull].level;

    // nome dal db equip utilizzando i dati dal db users
    let tName = eq[dTurret]["level"][tLevel]["name"];
    let hName = eq[dHull]["level"][hLevel]["name"];

    // danno e difesa dal db equip
    let minDamage = eq[dTurret]["level"][tLevel]["minDamage"];
    let maxDamage = eq[dTurret]["level"][tLevel]["maxDamage"];
    let protection = eq[dHull]["level"][hLevel]["minDamage"];

    // garage main screen
    if (!args[0]) {

        let garageMain = new Discord.RichEmbed()
            .setColor("#87d704")
            .setThumbnail(lv[db[userid].level].image)
            .setAuthor("TankiBot")
            .setTitle("Garage")
            .setDescription(`Garage di ${db[userid].username}`)
            .addField(`**Equipaggiamento**`, `**Torretta** \n${tName} \n<:burstDamageIcon:661186313176875031> da ${minDamage} a ${maxDamage} \n**Carro** \n${hName} \n<:armorIcon:661186313189326848> ${protection}`, true)
            .addField("Garage", "```>garage turrets``` ```>garage hulls``` ```>garage inventory```", true)
            .setFooter("Bot by GB Factory")
            .setTimestamp();
        message.channel.send({embed:garageMain});

    } else if (args[0] == "turrets") {

        let garageTurrets = new Discord.RichEmbed();
        garageTurrets.setColor("#87d704")
        garageTurrets.setThumbnail(lv[db[userid].level].image)
        garageTurrets.setAuthor("TankiBot")
        garageTurrets.setTitle("Garage Torrette")
        garageTurrets.setDescription(`Garage di ${db[userid].username}`)
        garageTurrets.setFooter("Bot by GB Factory")
        garageTurrets.setTimestamp();

        var tLenght = Object.keys(db[userid].turrets).length - 1;

        /*var keys = Object.keys(db[userid].turrets);
        console.log(keys);

        var objName = Object.keys(db[userid].turrets[keys[1]]);
        console.log(objName);

        var objLevel = objName[0];
        console.log(objLevel);*/

        for (let i = 1; i <= tLenght; i++) {
            var loopName = Object.keys(db[userid].turrets)[i];
            var loopLevel = db[userid].turrets[loopName].level;

            garageTurrets.addField(eq[loopName]["level"][loopLevel]["name"], "da " + eq[loopName]["level"][loopLevel]["minDamage"] + " a " + eq[loopName]["level"][loopLevel]["maxDamage"]);
        }

        message.channel.send({embed:garageTurrets});

    } else if (args[0] == "hulls") {

        let garageHulls = new Discord.RichEmbed();
        garageHulls.setColor("#87d704")
        garageHulls.setThumbnail(lv[db[userid].level].image)
        garageHulls.setAuthor("TankiBot")
        garageHulls.setTitle("Garage Carri")
        garageHulls.setDescription(`Garage di ${db[userid].username}`)
        garageHulls.setFooter("Bot by GB Factory")
        garageHulls.setTimestamp();

        var tLenght = Object.keys(db[userid].hulls).length - 1;

        for (let i = 1; i <= tLenght; i++) {
            var loopName = Object.keys(db[userid].hulls)[i];
            var loopLevel = db[userid].hulls[loopName].level;

            garageHulls.addField(eq[loopName]["level"][loopLevel]["name"], "da " + eq[loopName]["level"][loopLevel]["minDamage"] + " a " + eq[loopName]["level"][loopLevel]["maxDamage"]);
        }

        message.channel.send({embed:garageHulls});

    } else if (args[0] == "inventory") {

        let repair = db[userid].items.repair;
        let armor = db[userid].items.armor;
        let damage = db[userid].items.damage;
        let speed = db[userid].items.speed;
        let mine = db[userid].items.mine;
        let gold = db[userid].items.gold;
        let battery = db[userid].items.battery;

        let container = db[userid].containers.container;

        let garageInv = new Discord.RichEmbed()
            .setColor("#87d704")
            .setThumbnail(lv[db[userid].level].image)
            .setAuthor("TankiBot")
            .setTitle("Garage Inventario")
            .setDescription(`Garage di ${db[userid].username}`)
            .setFooter("Bot by GB Factory")
            .setTimestamp()
            .addField(`Potenziamenti`, `**Repair Kit**: ${repair} \n**Double Armor**: ${armor} \n**Double Damage**: ${damage} \n**Speed Boost**: ${speed} \n**Mine**: ${mine} \n**Gold Box**: ${gold} \n**Batterie**: ${battery}`)
            .addField(`Containers`, `**Containers**: ${container}`)
            .addField(`Pass`, ``)

        message.channel.send({embed:garageInv});

    }

}
