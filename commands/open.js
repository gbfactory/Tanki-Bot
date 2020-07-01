/**
 * Tanki Bot
 * 
 * Command to open containers and other boxes.
 * 
 * @author gbfactory
 * @since 11.01.2020
 */

const Discord = require("discord.js");

var container = require('../storage/container.json');
var daily = require('../storage/dailybox.json');
var weekly = require('../storage/weeklybox.json');

module.exports.run = async(client, message, args, con) => {

    let authorId = message.author.id;

    // Selezione tabella "users"
    con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;

        // Controlla che l'utente sia registrato nel db
        if (rows.length < 1) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                .setColor("#f54242");
            message.channel.send({embed:rgNo});
            return;
        }

        // Righe tabella "users"
        var rowsUsers = rows;

        // Selezione tabella "items"
        con.query(`SELECT * FROM items WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            // Genera un numero random compreso tra due valori
            function random(min, max) {
                return Math.floor(Math.random() * (max - min) ) + min;
            }

            // Rimuove un container dall'utente
            function delContainer (num) {
                let prev = rows[0].containers;
                con.query(`UPDATE items SET containers = ${prev - num} WHERE id = '${authorId}'`);
            };

            // Rimuove una daily box dall'utente
            function delDailybox(num) {
                let prev = rows[0].dailybox;
                con.query(`UPDATE items SET dailybox = ${prev - num} WHERE id = '${authorId}'`);
            };
            
            // Rimuove una weekly box dall'utente
            function delWeeklybox(num) {
                let prev = rows[0].weeklybox;
                con.query(`UPDATE items SET weeklybox = ${prev - num} WHERE id = '${authorId}'`);
            };

            // Aggiunge xp all'utente
            function addXp (num) {
                let prev = rowsUsers[0].xp;
                con.query(`UPDATE users SET xp = ${prev + num} WHERE id = '${authorId}'`);
            }

            // Aggiugne cristalli all'utente
            function addCrys (num) {
                let prev = rowsUsers[0].crys;
                con.query(`UPDATE users SET crys = ${prev + num} WHERE id = '${authorId}'`);
            }

            // Aggiunge tankoins all'utente
            function addTankoins (num) {
                let prev = rowsUsers[0].tankoins;
                con.query(`UPDATE users SET tankoins = ${prev + num} WHERE id = '${authorId}'`);
            }

            // Aggiungi supplies
            function addSupplies(repair, armor, damage, nitro, mine, battery, gold) {
                let repairPrev = rows[0].repair;
                con.query(`UPDATE items SET repair = ${repairPrev + repair} WHERE id = '${authorId}'`);

                let armorPrev = rows[0].armor;
                con.query(`UPDATE items SET armor = ${armorPrev + armor} WHERE id = '${authorId}'`);
               
                let damagePrev = rows[0].damage;
                con.query(`UPDATE items SET damage = ${damagePrev + damage} WHERE id = '${authorId}'`);
                
                let nitroPrev = rows[0].nitro;
                con.query(`UPDATE items SET nitro = ${nitroPrev + nitro} WHERE id = '${authorId}'`);
                
                let minePrev = rows[0].mine;
                con.query(`UPDATE items SET mine = ${minePrev + mine} WHERE id = '${authorId}'`);

                let batteryPrev = rows[0].battery;
                con.query(`UPDATE items SET battery = ${batteryPrev + battery} WHERE id = '${authorId}'`);
           
                let goldPrev = rows[0].gold;
                con.query(`UPDATE items SET gold = ${goldPrev + gold} WHERE id = '${authorId}'`);

            };

            // Aggiungi paint rara
            function paintRare(num) {
                let prev = rows[0].rare;
                con.query(`UPDATE items SET rare = ${prev + num} WHERE id = '${authorId}'`);
            };

            function paintEpic(num) {
                let prev = rows[0].epic;
                con.query(`UPDATE items SET epic = ${prev + num} WHERE id = '${authorId}'`);
            };

            function paintLegendary(num) {
                let prev = rows[0].legendary;
                con.query(`UPDATE items SET legendary = ${prev + num} WHERE id = '${authorId}'`);
            };

            function addTurret(num) {
                let prev = rows[0].skinTurrets;
                con.query(`UPDATE items SET skinTurrets = ${prev + num} WHERE id = '${authorId}'`);
            };

            function addHull(num) {
                let prev = rows[0].skinHulls;
                con.query(`UPDATE items SET skinHulls = ${prev + num} WHERE id = '${authorId}'`);
            }


            // premium
            function addPremium(time) {

                var ms = (time * 24) * 60 * 60 * 1000;

                if (Date.now() <= rowsUsers[0].timePremium) {
                    // premium: true
                    con.query(`UPDATE users SET timePremium = ${Date.now() + (rowsUsers[0].timePremium - Date.now()) + ms} WHERE id = '${authorId}'`);
                } else {
                    // premium false
                    con.query(`UPDATE users SET timePremium = ${Date.now() + ms} WHERE id = '${authorId}'`);
                }

            }

            // CONTAINER OPEN

            if (args[0] == "container" || args[0] == "c") {

                if (rows[0].containers < 1) {
                    let boxNo  = new Discord.RichEmbed()
                        .setAuthor("You don't have containers! Buy them with >shop")
                        .setColor("#f54242");
                    message.channel.send({embed:boxNo});
                    return;
                }                

                var ranCat = random(0, 300);
                var random;
                var ranRar;

                var color;
                var exp;
                var aan;
                if (ranCat >= 0 && ranCat <= 3) {
                    ranRar = "exotic";
                    let len = Object.keys(container["exotic"]).length;
                    random = random(0, len);
                    
                    color = "#fa8072";
                    exp = 500;
                    aan = "an";
                } else if (ranCat >= 4 && ranCat <= 20) {
                    ranRar = "legendary";
                    let len = Object.keys(container["legendary"]).length;
                    random = random(0, len);
                    
                    color = "#ffd700";
                    exp = 350;
                    aan = "a";
                } else if (ranCat >= 21 && ranCat <= 50) {
                    ranRar = "epic";
                    let len = Object.keys(container["epic"]).length;
                    random = random(0, len);
                    
                    color = "#9400d3";
                    exp = 250;
                    aan = "an";
                } else if (ranCat >= 51 && ranCat <= 100) {
                    ranRar = "rare";
                    let len = Object.keys(container["rare"]).length;
                    random = random(0, len);

                    color = "#4169e1";
                    exp = 150;
                    aan = "a"
                } else if (ranCat >= 101 && ranCat <= 200) {
                    ranRar = "uncommon";
                    let len = Object.keys(container["uncommon"]).length;
                    random = random(0, len);

                    color = "#32cd32";
                    exp = 100;
                    aan = "an";
                } else if (ranCat >= 201 && ranCat <= 300) {
                    ranRar = "common";
                    let len = Object.keys(container["common"]).length;
                    random = random(0, len);
                    
                    color = "#d3d3d3";
                    exp = 50;
                    aan = "a";
                }
                
                var type = container[ranRar][random].type;
                var rarity = container[ranRar][random].rarity;
                var name = container[ranRar][random].name;
                var quantity = container[ranRar][random].quantity;
                var image = container[ranRar][random].image;

                delContainer(1);

                addXp(exp);
            
                if (type == "crystals") {
                    addCrys(quantity);
                } else if (type == "tankoins") {
                    addTankoins(quantity);
                } else if (type == "repair") {
                    addSupplies(quantity, 0, 0, 0, 0, 0, 0);
                } else if (type == "armor") {
                    addSupplies(0, quantity, 0, 0, 0, 0, 0);
                } else if (type == "damage") {
                    addSupplies(0, 0, quantity, 0, 0, 0, 0);
                } else if (type == "speed") {
                    addSupplies(0, 0, 0, quantity, 0, 0, 0);
                } else if (type == "mine") {
                    addSupplies(0, 0, 0, 0, quantity, 0, 0);
                } else if (type == "battery") {
                    addSupplies(0, 0, 0, 0, 0, quantity, 0);
                } else if (type == "gold") {
                    addSupplies(0, 0, 0, 0, 0, 0, quantity);
                } else if (type == "sups") {
                    addSupplies(quantity, quantity, quantity, quantity, quantity, quantity, 0)
                } else if (type == "paint" && rarity == "rare") {
                    paintRare(1);
                    quantity = "";
                } else if (type == "paint" && rarity == "epic") {
                    paintEpic(1);
                    quantity = "";
                } else if (type == "paint" && rarity == "legendary") {
                    paintLegendary(1);
                    quantity = "";
                } else if (type == "turret") {
                    addTurret(quantity);
                    quantity = "";
                } else if (type == "hull") {
                    addHull(quantity);
                    quantity = "";
                } else if (type == "premium") {
                    addPremium(quantity);
                    quantity = quantity + " Days of"
                }

                /*if (type == "paint" || type == "turret" || type == "hull") {
                    quantity = "";
                }

                if (type == "premium") {
                    quantity = quantity + " Days of"
                }*/

                let itemEmbed = new Discord.RichEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('You opened a Container!')
                    .setDescription(`You found ${aan} ${rarity} item: **${quantity} ${name}**`)
                    .setThumbnail(image)
                    .setColor(color)
                    .setFooter(` ${message.author.username} | +${exp}xp`, message.author.avatarURL);
                message.channel.send({embed:itemEmbed});

            } else if (args[0] == "daily" || args[0] == "d") {

                if (rows[0].dailybox < 1) {
                    let boxNo  = new Discord.RichEmbed()
                        .setAuthor("You don't have any Daily Box! Claim one with >bonus daily")
                        .setColor("#f54242");
                    message.channel.send({embed:boxNo});
                    return;
                }   

                var len = Object.keys(daily).length;
                var random = random(0, len);

                var type = daily[random].type;
                var quantity = daily[random].quantity;

                delDailybox(1);

                if (type == "supplies") {
                    addSupplies(quantity, quantity, quantity, quantity, quantity, 0, 0);
                } else if (type == "repair") {
                    addSupplies(quantity, 0, 0, 0, 0, 0, 0)
                } else if (type == "crystals") {
                    addCrys(quantity);
                }

                let dailyFound = new Discord.RichEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('You opened a Daily Box')
                    .setDescription(`You found "${daily[random].name}"`)
                    .setThumbnail(daily[random].image)
                    .setColor("#e8fc03")
                    .setFooter(` ${message.author.username}`, message.author.avatarURL);
                message.channel.send({embed:dailyFound});

            } else if (args[0] == "weekly" || args[0] == "w") {

                if (rows[0].weeklybox < 1) {
                    let boxNo  = new Discord.RichEmbed()
                        .setAuthor("You don't have any Weekly Box! Claim one with >bonus weekly")
                        .setColor("#f54242");
                    message.channel.send({embed:boxNo});
                    return;
                }

                var rank = rowsUsers[0].level;

                var repair = weekly[rank].repair;
                var armor = weekly[rank].armor;
                var damage = weekly[rank].damage;
                var nitro = weekly[rank].nitro;
                var mine = weekly[rank].mine;
                var battery = weekly[rank].battery;
                var crystals = weekly[rank].crystals;
                var tankoins = weekly[rank].tankoins;

                delWeeklybox(1);

                addSupplies(repair, armor, damage, nitro, mine, battery, 0);

                addCrys(crystals);
                addTankoins(tankoins);
                
                let weeklyFound = new Discord.RichEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('You opened a Weekly Box')
                    .setDescription(`You got: \n+${repair} <:Repair_symbol:671631352797331458> Repair Kit \n+${armor} <:DA_symbol:671631353040863262> Double Armor \n+${damage} <:DD_symbol:671631352717639697> Double Damage \n+${nitro} <:Speed_symbol:671631352982011905> Speed Boost \n+${mine} <:Mine_symbol:671631352982011924> Mines \n+${battery} <:Icon_battery_supply:671631352994725898> Batteries \n+${crystals} <:crys:660257474317910026> Crystals \n+${tankoins} <:tankoin:660948390263128124> Tankoins`)
                    .setThumbnail("https://i.imgur.com/SXQ3u8n.png")
                    .setColor("#e8fc03")
                    .setFooter(` ${message.author.username}`, message.author.avatarURL);
                message.channel.send({embed:weeklyFound});

            } else {
                let noCmdEmbed = new Discord.RichEmbed()
                    .setAuthor("Tanki Bot")
                    .setTitle("Open")
                    .setColor("#87d704")
                    .setThumbnail("https://en.tankiwiki.com/images/en/thumb/3/36/Container_preview_large.png/150px-Container_preview_large.png")
                    .addField("Usage", "<:Container_preview:684061357334593536> >open container \n<:Container_weekly:684061357351632945> >open weekly \n<:Supplycrate:684061582443020298> >open daily")
                message.channel.send({ embed: noCmdEmbed });
                return;
            }

            
        });

    });

}
