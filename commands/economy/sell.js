/**
 * Tanki Bot. ECONOMY.
 * 
 * Sell items
 * 
 * @author gbfactory
 * @since 04.03.2020
 */

const Discord = require("discord.js");

module.exports = {
    name: 'sell',
    description: 'Sell your items like paints, supplies or skins to get some crystals!',
    usage: '`>sell all` - Sell all your items \n`>sell supplies` - Sell only your supplies \n`>sell paints` - Sell only your paints \n`>sell skins` - Sell only your skins \n`>sell effects` - Sell only shot effects \n`>sell augments` - Sell only augments',
    args: true,
    cooldown: 3,
    execute(client, message, args, con) {

        const authorId = message.author.id;

        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function embedGenerator(item, price) {
            let embed = new Discord.RichEmbed()
                .setColor("#ff6600")
                .setAuthor("Sell")
                .setThumbnail("https://i.imgur.com/HrJS6eH.png")

            if (price > 0) {
                embed.setDescription(`You sold *${item}* for **${price}** crystals!`);
            } else {
                embed.setDescription(`You don't have *${item}* to sell!`);
            }

            return embed;
        }

        con.query(`SELECT id, crys FROM users WHERE id = ${authorId}`, (err, rows) => {
            if (err) throw err;

            const rowsUsers = rows;

            if (rows.length < 1) {
                let rgNo = new Discord.RichEmbed()
                    .setAuthor("You aren't registered! Use >register (username) to create a profile.")
                    .setColor("#f54242");
                message.channel.send({ embed: rgNo });
                return;
            }

            con.query(`SELECT * FROM items WHERE id = ${authorId}`, (err, rows) => {
                if (err) throw err;

                let price, newPrice;

                let repair, armor, damage, nitro, mine, battery, rare, epic, legendary, turrets, hulls, augments, effects;

                switch (args[0]) {
                    case 'all':
                        repair = rows[0].repair;
                        armor = rows[0].armor;
                        damage = rows[0].damage;
                        nitro = rows[0].nitro;
                        mine = rows[0].mine;
                        battery = rows[0].battery;
                        rare = rows[0].rare;
                        epic = rows[0].epic;
                        legendary = rows[0].legendary;
                        turrets = rows[0].skinTurrets;
                        hulls = rows[0].skinHulls;
                        augments = rows[0].augment;
                        effects = rows[0].effects;

                        price = (repair * 50) + (armor * 25) + (damage * 25) + (nitro * 25) + (mine * 25) + (battery * 60) + (rare * random(2000, 4000)) + (epic * random(4000, 8000)) + (legendary * random(8000, 16000)) + (turrets * 100000) + (hulls * 100000) + (augments * 150000) + (effects + 50000);

                        newPrice = rowsUsers[0].crys + price;

                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);

                        con.query(`UPDATE items SET repair = 0, armor = 0, damage = 0, nitro = 0, mine = 0, battery = 0, rare = 0, epic = 0, legendary = 0, skinTurrets = 0, skinHulls = 0 WHERE id = ${authorId}`);

                        message.channel.send({ embed: embedGenerator('all', price) });
                        
                        break;

                    case 'supplies':
                        repair = rows[0].repair;
                        armor = rows[0].armor;
                        damage = rows[0].damage;
                        nitro = rows[0].nitro;
                        mine = rows[0].mine;
                        battery = rows[0].battery;
    
                        price = (repair * 50) + (armor * 25) + (damage * 25) + (nitro * 25) + (mine * 25) + (battery * 60);
    
                        newPrice = rowsUsers[0].crys + price;
    
                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
    
                        con.query(`UPDATE items SET repair = 0, armor = 0, damage = 0, nitro = 0, mine = 0, battery = 0 WHERE id = ${authorId}`);
    
                        message.channel.send({ embed: embedGenerator('supplies', price) });

                        break;
                    
                    case 'paints':
                        rare = rows[0].rare;
                        epic = rows[0].epic;
                        legendary = rows[0].legendary;

                        price = (rare * random(2000, 4000)) + (epic * random(4000, 8000)) + (legendary * random(8000, 16000));

                        newPrice = rowsUsers[0].crys + price;

                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);

                        con.query(`UPDATE items SET rare = 0, epic = 0, legendary = 0 WHERE id = ${authorId}`);

                        message.channel.send({ embed: embedGenerator('paints', price) });

                        break;

                    case 'skins':
                        turrets = rows[0].skinTurrets;
                        hulls = rows[0].skinHulls;
    
                        price = (turrets * 100000) + (hulls * 100000);
    
                        newPrice = rowsUsers[0].crys + price;
    
                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
    
                        con.query(`UPDATE items SET skinTurrets = 0, skinHulls = 0 WHERE id = ${authorId}`);
    
                        message.channel.send({ embed: embedGenerator('skins', price) });

                        break;
                    
                    case 'augments':
                        augments = rows[0].augment;

                        price = (augments * 150000);

                        newPrice = rowsUsers[0].crys + price;

                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
    
                        con.query(`UPDATE items SET augment = 0 WHERE id = ${authorId}`);
    
                        message.channel.send({ embed: embedGenerator('augments', price) });

                        break;

                     case 'effects':
                        effects = rows[0].effects;

                        price = (effects * 50000);

                        newPrice = rowsUsers[0].crys + price;

                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
    
                        con.query(`UPDATE items SET effects = 0 WHERE id = ${authorId}`);
    
                        message.channel.send({ embed: embedGenerator('effects', price) });

                        break;

                    default:
                        break;
                }

            });
        });

    },
};