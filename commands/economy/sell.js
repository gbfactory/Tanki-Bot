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
    execute(client, message, args, con, functions) {

        const authorId = message.author.id;

        // TODO: #3 Move "random" function to the functions.js file
        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        con.query(`SELECT id, crys FROM users WHERE id = ${authorId}`, (err, rows) => {
            if (err) throw err;

            const rowsUsers = rows;

            if (rows.length < 1) {
                return message.channel.send({ embed: functions.embedRegister() });
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

                        price = (repair * 50) + (armor * 25) + (damage * 25) + (nitro * 25) + (mine * 25) + (battery * 60) + (rare * random(2000, 4000)) + (epic * random(4000, 8000)) + (legendary * random(8000, 16000)) + (turrets * 100000) + (hulls * 100000) + (augments * 150000) + (effects * 50000);

                        if (price <= 0) {
                            return message.channel.send({ embed: functions.embedFail(
                                "You don't have any item to sell."
                            ) })
                        }

                        newPrice = rowsUsers[0].crys + price;

                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);

                        con.query(`UPDATE items SET 
                        repair = 0, 
                        armor = 0, 
                        damage = 0, 
                        nitro = 0, 
                        mine = 0, 
                        battery = 0, 
                        rare = 0, 
                        epic = 0, 
                        legendary = 0, 
                        skinTurrets = 0, 
                        skinHulls = 0, 
                        augments = 0,
                        effects = 0
                        WHERE id = ${authorId}`);

                        return message.channel.send({ embed: functions.embedSuccess(
                            `You sold all your items for **${price}** 💎`
                        ) });
                        
                    case 'supplies':
                        repair = rows[0].repair;
                        armor = rows[0].armor;
                        damage = rows[0].damage;
                        nitro = rows[0].nitro;
                        mine = rows[0].mine;
                        battery = rows[0].battery;
    
                        price = (repair * 50) + (armor * 25) + (damage * 25) + (nitro * 25) + (mine * 25) + (battery * 60);
    
                        if (price <= 0) {
                            return message.channel.send({ embed: functions.embedFail(
                                "You don't have any supply to sell."
                            ) })
                        }

                        newPrice = rowsUsers[0].crys + price;
    
                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
    
                        con.query(`UPDATE items SET repair = 0, armor = 0, damage = 0, nitro = 0, mine = 0, battery = 0 WHERE id = ${authorId}`);
    
                        return message.channel.send({ embed: functions.embedSuccess(
                            `You sold all your supplies for **${price}** 💎`
                        ) });
                    
                    case 'paints':
                        rare = rows[0].rare;
                        epic = rows[0].epic;
                        legendary = rows[0].legendary;

                        price = (rare * random(2000, 4000)) + (epic * random(4000, 8000)) + (legendary * random(8000, 16000));

                        if (price <= 0) {
                            return message.channel.send({ embed: functions.embedFail(
                                "You don't have any paint to sell."
                            ) })
                        }

                        newPrice = rowsUsers[0].crys + price;

                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);

                        con.query(`UPDATE items SET rare = 0, epic = 0, legendary = 0 WHERE id = ${authorId}`);

                        return message.channel.send({ embed: functions.embedSuccess(
                            `You sold all your paints for **${price}** 💎`
                        ) });

                    case 'skins':
                        turrets = rows[0].skinTurrets;
                        hulls = rows[0].skinHulls;
    
                        price = (turrets * 100000) + (hulls * 100000);
    
                        if (price <= 0) {
                            return message.channel.send({ embed: functions.embedFail(
                                "You don't have any skin to sell."
                            ) })
                        }

                        newPrice = rowsUsers[0].crys + price;
    
                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
    
                        con.query(`UPDATE items SET skinTurrets = 0, skinHulls = 0 WHERE id = ${authorId}`);
    
                        return message.channel.send({ embed: functions.embedSuccess(
                            `You sold all your skins for **${price}** 💎`
                        ) });
                    
                    case 'augments':
                        augments = rows[0].augment;

                        price = (augments * 150000);

                        if (price <= 0) {
                            return message.channel.send({ embed: functions.embedFail(
                                "You don't have any augment to sell."
                            ) })
                        }

                        newPrice = rowsUsers[0].crys + price;

                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
    
                        con.query(`UPDATE items SET augments = 0 WHERE id = ${authorId}`);
    
                        return message.channel.send({ embed: functions.embedSuccess(
                            `You sold all your augments for **${price}** 💎`
                        ) });

                     case 'effects':
                        effects = rows[0].effects;

                        price = (effects * 50000);

                        if (price <= 0) {
                            return message.channel.send({ embed: functions.embedFail(
                                "You don't have any effect to sell."
                            ) })
                        }

                        newPrice = rowsUsers[0].crys + price;

                        con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
    
                        con.query(`UPDATE items SET effects = 0 WHERE id = ${authorId}`);
    
                        return message.channel.send({ embed: functions.embedSuccess(
                            `You sold all your effects for **${price}** 💎!`
                        ) });

                    default:
                        break;
                }

            });
        });

    },
};