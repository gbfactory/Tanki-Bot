/**
 * Tanki Bot
 * 
 * Command to open containers and other boxes.
 * 
 * @author gbfactory
 * @since 11.01.2020
 */

const Discord = require("discord.js");

let container = require('../storage/container.json');
let daily = require('../storage/dailybox.json');
let weekly = require('../storage/weeklybox.json');

module.exports.run = async(client, message, args, con) => {

    let authorId = message.author.id;

    // Select from the "users" table
    con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;

        // Check that the user is registered in the db
        if (rows.length < 1) {
            let rgNo  = new Discord.RichEmbed()
                .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                .setColor("#f54242");
                
            message.channel.send({embed:rgNo});
            return;
        }

        // Rows from the table "users"
        let rowsUsers = rows;

        // Select from the "items" table
        con.query(`SELECT * FROM items WHERE id = '${authorId}'`, (err, rows) => {
            if (err) throw err;

            // Generate random numbers between two given values
            function genRandom(min, max) {
                return Math.floor(Math.random() * (max - min) ) + min;
            }

            // Remove Container
            function delContainer (num) {
                let prev = rows[0].containers;
                con.query(`UPDATE items SET containers = ${prev - num} WHERE id = '${authorId}'`);
            }

            // Remove Daily Box
            function delDailybox(num) {
                let prev = rows[0].dailybox;
                con.query(`UPDATE items SET dailybox = ${prev - num} WHERE id = '${authorId}'`);
            }
            
            // Remove Weekly Box
            function delWeeklybox(num) {
                let prev = rows[0].weeklybox;
                con.query(`UPDATE items SET weeklybox = ${prev - num} WHERE id = '${authorId}'`);
            }

            // Add XP
            function addXp (num) {
                let prev = rowsUsers[0].xp;
                con.query(`UPDATE users SET xp = ${prev + num} WHERE id = '${authorId}'`);
            }

            // Add Crystals
            function addCrys (num) {
                let prev = rowsUsers[0].crys;
                con.query(`UPDATE users SET crys = ${prev + num} WHERE id = '${authorId}'`);
            }

            // Add Tankoins
            function addTankoins (num) {
                let prev = rowsUsers[0].tankoins;
                con.query(`UPDATE users SET tankoins = ${prev + num} WHERE id = '${authorId}'`);
            }

            // Add Supplies
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

            }

            // Add Paints
            function paintRare(num) {
                let prev = rows[0].rare;
                con.query(`UPDATE items SET rare = ${prev + num} WHERE id = '${authorId}'`);
            }

            function paintEpic(num) {
                let prev = rows[0].epic;
                con.query(`UPDATE items SET epic = ${prev + num} WHERE id = '${authorId}'`);
            }

            function paintLegendary(num) {
                let prev = rows[0].legendary;
                con.query(`UPDATE items SET legendary = ${prev + num} WHERE id = '${authorId}'`);
            }

            // Add Equipment
            function addTurret(num) {
                let prev = rows[0].skinTurrets;
                con.query(`UPDATE items SET skinTurrets = ${prev + num} WHERE id = '${authorId}'`);
            }

            function addHull(num) {
                let prev = rows[0].skinHulls;
                con.query(`UPDATE items SET skinHulls = ${prev + num} WHERE id = '${authorId}'`);
            }

            // Add Premium Time
            function addPremium(time) {

                let ms = (time * 24) * 60 * 60 * 1000;

                if (Date.now() <= rowsUsers[0].timePremium) {
                    // premium: true
                    con.query(`UPDATE users SET timePremium = ${Date.now() + (rowsUsers[0].timePremium - Date.now()) + ms} WHERE id = '${authorId}'`);
                } else {
                    // premium false
                    con.query(`UPDATE users SET timePremium = ${Date.now() + ms} WHERE id = '${authorId}'`);
                }
            }

            // Open regular Container
            if (args[0] == "container" || args[0] == "c") {

                // Check if the user has containers
                if (rows[0].containers < 1) {
                    let boxNo  = new Discord.RichEmbed()
                        .setAuthor("You don't have containers! Buy them with >shop")
                        .setColor("#f54242");
                    message.channel.send({embed:boxNo});
                    return;
                }                

                // Vars
                let ranCat = genRandom(0, 300); // Generate a random number to decide the container rarity

                let random;                     // The random number that will be the container item
                let ranRar;                     // The rarity of the container

                let color;                      // The color of the container
                let exp;                        // The experience that the container will give
                let aan;                        // The connective. A or AN

                // Decide the container rairty
                if (ranCat >= 0 && ranCat <= 3) {
                    ranRar = "exotic";
                    let len = Object.keys(container["exotic"]).length;
                    random = genRandom(0, len);
                    
                    color = "#fa8072";
                    exp = 500;
                    aan = "an";

                } else if (ranCat >= 4 && ranCat <= 20) {
                    ranRar = "legendary";
                    let len = Object.keys(container["legendary"]).length;
                    random = genRandom(0, len);
                    
                    color = "#ffd700";
                    exp = 350;
                    aan = "a";

                } else if (ranCat >= 21 && ranCat <= 50) {
                    ranRar = "epic";
                    let len = Object.keys(container["epic"]).length;
                    random = genRandom(0, len);
                    
                    color = "#9400d3";
                    exp = 250;
                    aan = "an";

                } else if (ranCat >= 51 && ranCat <= 100) {
                    ranRar = "rare";
                    let len = Object.keys(container["rare"]).length;
                    random = genRandom(0, len);

                    color = "#4169e1";
                    exp = 150;
                    aan = "a"

                } else if (ranCat >= 101 && ranCat <= 200) {
                    ranRar = "uncommon";
                    let len = Object.keys(container["uncommon"]).length;
                    random = genRandom(0, len);

                    color = "#32cd32";
                    exp = 100;
                    aan = "an";

                } else if (ranCat >= 201 && ranCat <= 300) {
                    ranRar = "common";
                    let len = Object.keys(container["common"]).length;
                    random = genRandom(0, len);
                    
                    color = "#d3d3d3";
                    exp = 50;
                    aan = "a";
                }
                
                // Final container data
                let item = container[ranRar][random];

                let type = item.type;
                let rarity = item.rarity;
                let name = item.name;
                let quantity = item.quantity;
                let image = item.image;
                let equip = item.equip ? item.equip : '';

                // Remove 1 container from the user
                delContainer(1);

                // Add the exp points
                addXp(exp);

                // Switch between all the rewards and add items to the user
                switch (type) {
                    case 'crystals':
                        addCrys(quantity);
                        break;

                    case 'tankoins':
                        addTankoins(quantity);
                        break;

                    case 'repair':
                        addSupplies(quantity, 0, 0, 0, 0, 0, 0);
                        break;

                    case 'armor':
                        addSupplies(0, quantity, 0, 0, 0, 0, 0);
                        break;

                    case 'damage':
                        addSupplies(0, 0, quantity, 0, 0, 0, 0);
                        break;

                    case 'speed':
                        addSupplies(0, 0, 0, quantity, 0, 0, 0);
                        break;

                    case 'mine':
                        addSupplies(0, 0, 0, 0, quantity, 0, 0);
                        break;

                    case 'battery':
                        addSupplies(0, 0, 0, 0, 0, quantity, 0);
                        break;

                    case 'gold':
                        addSupplies(0, 0, 0, 0, 0, 0, quantity);
                        break;

                    case 'sups':
                        addSupplies(quantity, quantity, quantity, quantity, quantity, quantity, 0);
                        break;

                    case 'turret':
                        addTurret(quantity);
                        quantity = "";
                        break;

                    case 'hull':
                        addHull(quantity);
                        quantity = "";
                        break;
                        
                    case 'premium':
                        addPremium(quantity);
                        quantity = quantity + " Days of";
                        break;

                    case 'paint':
                        switch (rarity) {
                            case 'rare':
                                paintRare(1);
                                break;
                            case 'epic':
                                paintEpic(1);
                                break;
                            case 'legendary':
                                paintLegendary(1);
                                break;
                            default:
                                break;
                        }
                        quantity = "";
                        break;
                        
                    default:
                        break;
                }

                // Container embed
                let itemEmbed = new Discord.RichEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('You opened a Container!')
                    .setDescription(`You found ${aan} ${rarity} item: **${quantity} ${name}**`)
                    .setThumbnail(image)
                    .setColor(color)
                    .setFooter(` ${message.author.username} | +${exp}xp`, message.author.avatarURL);
                
                message.channel.send({embed:itemEmbed});
                return;

            // Open Daily Box
            } else if (args[0] == "daily" || args[0] == "d") {

                // Check if the user has a Daily Box
                if (rows[0].dailybox < 1) {
                    let boxNo  = new Discord.RichEmbed()
                        .setAuthor("You don't have any Daily Box! Claim one with >bonus daily")
                        .setColor("#f54242");
                    message.channel.send({embed:boxNo});
                    return;
                }   

                // Vars
                let len = Object.keys(daily).length;        // Number of daily box items
                let random = genRandom(0, len);                // Random number that will be the box content

                let type = daily[random].type;              // Get the type of the item
                let quantity = daily[random].quantity;      // Get the rarity of the item

                // Remove a Daily Box from the user
                delDailybox(1);

                // Switch between the rewards and add items to user
                switch (type) {
                    case 'supplies':
                        addSupplies(quantity, quantity, quantity, quantity, quantity, 0, 0);
                        break;
                    case 'repair':
                        addSupplies(quantity, 0, 0, 0, 0, 0, 0);
                        break;
                    case 'crystals':
                        addCrys(quantity);
                        break;

                    default:
                        break;
                }

                // Daily embed
                let dailyFound = new Discord.RichEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('You opened a Daily Box')
                    .setDescription(`You found "${daily[random].name}"`)
                    .setThumbnail(daily[random].image)
                    .setColor("#e8fc03")
                    .setFooter(` ${message.author.username}`, message.author.avatarURL);

                message.channel.send({embed:dailyFound});
                return;

            // Open Weekly Box
            } else if (args[0] == "weekly" || args[0] == "w") {

                // Check
                if (rows[0].weeklybox < 1) {
                    let boxNo  = new Discord.RichEmbed()
                        .setAuthor("You don't have any Weekly Box! Claim one with >bonus weekly")
                        .setColor("#f54242");
                    message.channel.send({embed:boxNo});
                    return;
                }

                // Get the user rank (the daily box content changes as the user rank changes)
                let rank = rowsUsers[0].level;

                // Daily Box content
                let repair = weekly[rank].repair;       // Repair
                let armor = weekly[rank].armor;         // Armor
                let damage = weekly[rank].damage;       // Damage
                let nitro = weekly[rank].nitro;         // Nitro
                let mine = weekly[rank].mine;           // Mine
                let battery = weekly[rank].battery;     // Battery
                let crystals = weekly[rank].crystals;   // Crystals
                let tankoins = weekly[rank].tankoins;   // Tankoins

                // Delete a weekly box from a container
                delWeeklybox(1);

                // Add supplies to the user
                addSupplies(repair, armor, damage, nitro, mine, battery, 0);

                // Add crystals and tankoins to the user
                addCrys(crystals);
                addTankoins(tankoins);
                
                // Weekly embed
                let weeklyFound = new Discord.RichEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle('You opened a Weekly Box')
                    .setDescription(`You got: \n+${repair} <:Repair_symbol:671631352797331458> Repair Kit \n+${armor} <:DA_symbol:671631353040863262> Double Armor \n+${damage} <:DD_symbol:671631352717639697> Double Damage \n+${nitro} <:Speed_symbol:671631352982011905> Speed Boost \n+${mine} <:Mine_symbol:671631352982011924> Mines \n+${battery} <:Icon_battery_supply:671631352994725898> Batteries \n+${crystals} <:crys:660257474317910026> Crystals \n+${tankoins} <:tankoin:660948390263128124> Tankoins`)
                    .setThumbnail("https://i.imgur.com/SXQ3u8n.png")
                    .setColor("#e8fc03")
                    .setFooter(` ${message.author.username}`, message.author.avatarURL);

                message.channel.send({embed:weeklyFound});
                return;

            // If there is no arg
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