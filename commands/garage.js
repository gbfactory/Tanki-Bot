/**
 * Tanki Bot.
 * 
 * Bot garage where you can see your currently equipped combo and commands to navigate in other garage sections.
 * 
 * >garage          : done
 * >garage turrets  : work (to be tested when shop is active)
 * >garage hulls    : work (to be tested when shop is active)
 * >garage skins    : done
 * >garage supplies : done
 * >garage paints   : done
 * >garage special  : done
 *  
 * @author gbfactory
 * @since  11.01.2020
*/


const Discord = require("discord.js");

let lv = require("../storage/levels.json");
let eq = require("../storage/equip.json");

module.exports.run = async (client, message, args, con) => {

    var authorId = message.author.id;

    con.query(`SELECT username, equipTurret, equipHull FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;
        var rowsUsers = rows;
        var nickname = rowsUsers[0].username;

        if (rows.length < 1) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                .setColor("#f54242");
            message.channel.send({embed:rgNo});
            return;
        };

        // nome equip dalla tabella users
        let dTurret = rows[0].equipTurret;
        let dHull = rows[0].equipHull;
        
        // table garage
        con.query(`SELECT * FROM garage WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;
            var rowsGarage = rows;

            //let tName = dTurret.charAt(0).toUpperCase() + dTurret.substring(1) + " Mk" + rows[0][dTurret];
            //let hName = dHull.charAt(0).toUpperCase() + dHull.substring(1) + " Mk" + rows[0][dHull];

            // livello equip dalla tabella garage
            let tLevel = rows[0][dTurret];
            let hLevel = rows[0][dHull];

            // nome equip dal file db
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
                    .setThumbnail("https://i.imgur.com/znIW6uG.png")
                    .setAuthor("TankiBot")
                    .setTitle("<:MenuGarage:661186114916188200> Garage")
                    .setDescription(`Garage of ${nickname}`)
                    .addField(`**Equip**`, `**Turret** \n${tName} \n<:burstDamageIcon:661186313176875031> ${minDamage} / ${maxDamage} \n**Hull** \n${hName} \n<:armorIcon:661186313189326848> ${protection}`, true)
                    .addField("**Navigation**", "`>garage turrets` \n`>garage hulls` \n`>garage skins` \n`>garage supplies` \n`>garage paints` \n`>garage special`", true)
                    .setTimestamp();
                message.channel.send({embed:garageMain});

                
            } else if (args[0] == "turrets") {
                let garageTurrets = new Discord.RichEmbed();
                    garageTurrets.setColor("#87d704")
                    garageTurrets.setThumbnail("https://i.imgur.com/znIW6uG.png")
                    garageTurrets.setAuthor("TankiBot")
                    garageTurrets.setTitle("<:MenuGarage:661186114916188200> Garage - Turrets")
                    garageTurrets.setDescription(`Garage of ${nickname}`)
                    garageTurrets.setTimestamp();

                // ciclare da 0 a n per tutte le colonne della tabella garage
                for (let i = 0; i <= 13; i++) {

                    let name;
                    let icon;

                    if (i == 0) {
                        name = "firebird";
                        icon = "<:Firebird:605414856233058314>";
                    } else if (i == 1) {
                        name = "freeze";
                        icon = "<:Freeze:605414855763165225>";
                    } else if (i == 2) {
                        name = "isida";
                        icon = "<:Isida:605414855842988043>";
                    } else if (i == 3) {
                        name = "hammer";
                        icon = "<:Hammer:605414856128069663>";
                    } else if (i == 4) {
                        name = "twins";
                        icon = "<:Twins:605414856027406353>";
                    } else if (i == 5) {
                        name = "ricochet";
                        icon = "<:Ricochet:605414855905902598>";
                    } else if (i == 6) {
                        name = "smoky";
                        icon = "<:Smoky:605414855876411424>";
                    } else if (i == 7) {
                        name = "striker";
                        icon = "<:Striker:605414856396505088>";
                    } else if (i == 8) {
                        name = "vulcan";
                        icon = "<:Vulcan:605414855981400086>";
                    } else if (i == 9) {
                        name = "thunder";
                        icon = "<:Thunder:605414856128200716>";
                    } else if (i == 10) {
                        name = "railgun";
                        icon = "<:Railgun:605414855847182348>";
                    } else if (i == 11) {
                        name = "magnum";
                        icon = "<:Magnum:605414856132132864>";
                    } else if (i == 12) {
                        name = "gauss";
                        icon = "<:Gauss:605414856207630346>";
                    } else if (i == 13) {
                        name = "shaft";
                        icon = "<:Shaft:605414855868022837>";
                    }

                    let tName = name.charAt(0).toUpperCase() + name.slice(1);
                    let tLevel = rows[0][name];
                    
                    if (tLevel > 0) {   // se il lvl è minore di 0 nel json va a prendere un numero negativo. nel json gli mk1 sono all'indice 0 dell'array
                        let tMinDamage = eq[dTurret]["level"][tLevel - 1]["minDamage"];
                        let tMaxDamage = eq[dTurret]["level"][tLevel - 1]["maxDamage"];

                        garageTurrets.addField(`${icon} ${tName} Mk${tLevel}`, `<:burstDamageIcon:661186313176875031> ${tMinDamage}/${tMaxDamage}`, true)
                    }
                }
                message.channel.send({embed:garageTurrets});

            } else if (args[0] == "hulls") {

                let garageHulls = new Discord.RichEmbed();
                    garageHulls.setColor("#87d704")
                    garageHulls.setThumbnail("https://i.imgur.com/znIW6uG.png")
                    garageHulls.setAuthor("TankiBot")
                    garageHulls.setTitle("<:MenuGarage:661186114916188200> Garage - Hulls")
                    garageHulls.setDescription(`Garage of ${nickname}`)
                    garageHulls.setTimestamp();

                    for (let i = 0; i < 7; i++) {

                        let name;
                        let icon; 

                        if (i == 0) {
                            name = "wasp";
                            icon = "<:Wasp:605414771579420712>";
                        } else if (i == 1) {
                            name = "hornet";
                            icon = "<:Hornet:605414772003045395>";
                        } else if (i == 2) {
                            name = "viking";
                            icon = "<:Viking:605414771608780850>";
                        } else if (i == 3) {
                            name = "hunter";
                            icon = "<:Hunter:605414771478495252>";
                        } else if (i == 4) {
                            name = "dictator";
                            icon = "<:Dictator:605414771541671947>";
                        } else if (i == 5) {
                            name = "titan";
                            icon = "<:Titan:605414771361316885>";
                        } else if (i == 6) {
                            name = "mammoth";
                            icon = "<:Mammoth:605414771583352842>";
                        }
    
                        let hName = name.charAt(0).toUpperCase() + name.slice(1);
                        let hLevel = rows[0][name];
    
                        if (hLevel > 0) {
                            let tMinDamage = eq[dHull]["level"][hLevel - 1]["minDamage"];
    
                            garageHulls.addField(`${icon} ${hName} Mk${hLevel}`, `<:armorIcon:661186313189326848> ${tMinDamage}`, true)
                        }
                    }

                message.channel.send({embed:garageHulls});

            } else if (args[0] == "supplies") {

                con.query(`SELECT id, repair, armor, damage, nitro, mine, battery, gold FROM items WHERE id = '${authorId}'`, (err, rows) => {
                    if (err) throw err;

                    let repair = rows[0].repair;
                    let armor = rows[0].armor;
                    let damage = rows[0].damage;
                    let speed = rows[0].nitro;
                    let mine = rows[0].mine;
                    let battery = rows[0].battery;
                    let gold = rows[0].gold;

                    let garageSups = new Discord.RichEmbed()
                        .setColor("#87d704")
                        .setThumbnail("https://i.imgur.com/znIW6uG.png")
                        .setAuthor("TankiBot")
                        .setTitle("<:MenuGarage:661186114916188200> Garage - Supplies")
                        .setDescription(`Garage of ${nickname}`)
                        .setTimestamp()
                        .addField(`**Supplies**`, `<:Repair_symbol:605414662397493268> Repair Kit: ${repair} \n<:DA_symbol:605414662414270489> Double Armor: ${armor} \n<:DD_symbol:605414662170738709> Double Damage: ${damage} \n<:Speed_symbol:605414662405619732> Speed Boost: ${speed} \n<:Mine_symbol:605414662405619733> Mine: ${mine} \n<:Gold_symbol:605414662434979850> Gold Box: ${gold} \n<:Icon_battery_supply:605414662506414110> Batteries: ${battery}`)

                    message.channel.send({embed:garageSups});

                });

            } else if (args[0] == "paints") {

                con.query(`SELECT id, rare, epic, legendary FROM items WHERE id = '${authorId}'`, (err, rows) => {
                    if (err) throw err;

                    let paintRare = rows[0].rare;
                    let paintEpic = rows[0].epic;
                    let paintLegend = rows[0].legendary;

                    let garagePaints = new Discord.RichEmbed()
                        .setColor("#87d704")
                        .setThumbnail("https://i.imgur.com/znIW6uG.png")
                        .setAuthor("TankiBot")
                        .setTitle("<:MenuGarage:661186114916188200> Garage -  Paints")
                        .setDescription(`Garage of ${nickname}`)
                        .setTimestamp()
                        .addField(`**Paints**`, `<:box_royalblue:660948536627822602> Rare: ${paintRare} \n<:box_darkviolet:660948536413650970> Epic: ${paintEpic} \n<:box_salmon:660948536581423154> Legendary: ${paintLegend}`)

                    message.channel.send({embed:garagePaints});

                });

                
            } else if (args[0] == "special") {
                con.query(`SELECT id, containers, weeklybox, dailybox, coinbox FROM items WHERE id = '${authorId}'`, (err, rows) => {
                    if (err) throw err;

                    // containers
                    let cContainers = rows[0].containers;
                    let cDaily = rows[0].dailybox;
                    let cWeekly = rows[0].weeklybox;

                    // passes
                    let pRename = rows[0].coinbox;

                    let garageSkins = new Discord.RichEmbed()
                        .setColor("#87d704")
                        .setThumbnail("https://i.imgur.com/znIW6uG.png")
                        .setAuthor("TankiBot")
                        .setTitle("<:MenuGarage:661186114916188200> Garage -  Special")
                        .setDescription(`Garage of ${nickname}`)
                        .setTimestamp()
                        .addField(`**Containers**`, `<:Container_preview:684061357334593536> Containers: ${cContainers} \n<:Supplycrate:684061582443020298> Daily: ${cDaily} \n<:Container_weekly:684061357351632945> Weekly: ${cWeekly}`)
                        .addField(`**Passess**`, `<:Probitva2:684069669585682498> Pro Battle: ❌ \n<:Clan_license:684069669191155728> Clan License: ❌ \n<:Rename_pass:684069669208064177> Rename Pass: ${pRename} \n<:Battle_Pass:684069669069520925> Battle Pass: ❌`)
                    message.channel.send({embed:garageSkins});
                });

            } else if (args[0] == "skins") {
                con.query(`SELECT id, skinTurrets, skinHulls FROM items WHERE id = '${authorId}'`, (err, rows) => {
                    if (err) throw err;

                    let turrs = rows[0].skinTurrets;
                    let hulls = rows[0].skinHulls;

                    let garageSkins = new Discord.RichEmbed()
                        .setColor("#87d704")
                        .setThumbnail("https://i.imgur.com/znIW6uG.png")
                        .setAuthor("TankiBot")
                        .setTitle("<:MenuGarage:661186114916188200> Garage -  Skins")
                        .setDescription(`Garage of ${nickname}`)
                        .setTimestamp()
                        .addField(`**Skins**`, `Turret Skins: ${turrs} \nHull Skins: ${hulls}`)
                    message.channel.send({embed:garageSkins});
                });
            } else {
                let noArgs  = new Discord.RichEmbed()
                    .setAuthor("Use >garage to see all the different categories")
                    .setColor("#f54242");
                message.channel.send({embed:noArgs});
                return;
            }

        });

    });

}
