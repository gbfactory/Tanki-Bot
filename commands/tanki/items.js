/**
 * Tanki Bot
 * 
 * Ratings: check users' owneed items
 * 
 * @author gbfactory
 * @since 04.05.2020
 */

const Discord = require('discord.js');
const snekfetch = require('snekfetch');

const api = 'https://ratings.tankionline.com/api/eu/profile/?user=';

module.exports = {
    name: 'items',
    description: 'Check how many items a player owns.',
    usage: '`>items [nickname]`',
    args: true,
    cooldown: 3,
    execute(client, message, args, con) {

        var nickname = args[0];

        snekfetch.get(api + nickname).then(r => {

            if (r.body.responseType === 'NOT_FOUND') {
                let noUser = new Discord.RichEmbed()
                    .setAuthor('Player not found!')
                    .setColor('#f54242');

                return message.channel.send({ embed: noUser });
            } else if (!r.body.responseType) {
                let noApi = new Discord.RichEmbed()
                    .setAuthor('Tanki Online API unavailable. Try again later.')
                    .setColor('#f54242');
                return message.channel.send({ embed: noApi });
            }

            var res = r.body.response;

            // Name
            var name = res.name;

            // Items
            var drones = res.dronesPlayed
            var hulls = res.hullsPlayed;
            var paints = res.paintsPlayed;
            var presents = res.presents;
            var modules = res.resistanceModules;
            var turrets = res.turretsPlayed;

            // Function to remove from array duplicate items with the same name but different level. 
            // Tanki stores all the previous modifications of the items, not only the current one.
            function fixDupes(arr) {
                var newArr = [];
                for (let i = 0; i < arr.length; i++) {
                    if (i == 0) {
                        newArr.push(arr[i]);
                    } else if (arr[i]['name'] != arr[i - 1]['name']) {
                        newArr.push(arr[i]);
                    }
                }
                return newArr;
            }

            // EMBED
            let itemsEmbed = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setTitle(`Ratings - Items`)
                .setDescription(`Items of ${name}`)
                .setColor('#29ad1d')
                .setTimestamp()
                .addField('<:burstDamageIcon:661186313176875031> Turrets', fixDupes(turrets).length, true)
                .addField('<:Hornet:605414772003045395> Hulls', fixDupes(hulls).length, true)
                .addField('<:Complect_paint_tro:706755019365679124> Paints', paints.length, true)
                .addField('<:Icon_battery_supply:605414662506414110> Drones', fixDupes(drones).length, true)
                .addField('<:Spectrum_prot_symbol:706753913461932052> Modules', fixDupes(modules).length, true)
                .addField('<:Teddy_Bear:706754544821862400> Gifts Recived', presents.length, true)

            message.channel.send({ embed: itemsEmbed });


        })

    },
};