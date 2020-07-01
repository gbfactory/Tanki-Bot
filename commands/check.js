/**
 * Tanki Bot
 * 
 * Ratings: check if a player owns a particular item
 * 
 * @author gbfactory
 * @since 28.05.2020
 */

const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const Jimp = require('jimp');

const api = 'https://ratings.tankionline.com/api/eu/profile/?user=';

module.exports.run = async(client, message, args, tools) => {

    // Args
    var nickname = args[0];
    var category = args[1];
    var item = args[2];

    // Check for a nickname
    if (!nickname) {
        return message.channel.send('You have to specify a nickname **>check (nickname) (category) (item)**')
    }
    
    // Check for a category
    if (!category) {
        return message.channel.send('You have to specify a category **(turret | hull | paint | drone | module)**');
    }

    // Check for an item
    if (!item) {
        return message.channel.send('You have to specify an item! **(Hornet, Ricochet, Traceur)**');
    }

    snekfetch.get(api + nickname).then(r => {

        if (r.body.responseType === 'NOT_FOUND') {
            let noUser = new Discord.RichEmbed()
            .setAuthor('Player not found!')
            .setColor('#f54242');

            return message.channel.send({embed:noUser});
        } else if (!r.body.responseType) {
            let noApi = new Discord.RichEmbed()
            .setAuthor('Tanki Online API unavailable. Try again later.')
            .setColor('#f54242');
            return message.channel.send({embed:noApi});
        }

        var res = r.body.response;

        // Name
        var name = res.name;

        function sortArray(arr) {
            return arr.sort((a, b) => {
                return a['grade'] - b['grade'];
            })
        }

        function biggerGrade(arr) {
            var sorted = sortArray(arr);
            return sorted[sorted.length - 1];
        } 

        // hulls
        if (category == "hull") {
            var hulls = res.hullsPlayed;

            var found = [];

            for (let i = 0; i < hulls.length; i++) {
                if (hulls[i]['name'].toLowerCase() == item.toLowerCase()) {
                    found.push(hulls[i]);
                }
            }

            if (!found.length > 0) {
                return message.channel.send(`**${name}** does not have the item **${item}**`);
            }

            var foundItem = biggerGrade(found);

            var embed = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setAuthor('Tanki Bot')
                .setTitle(`Ratings - Check Items`)
                .setDescription(`🔸 ${name} has ${foundItem['name']} Mk${foundItem['grade'] + 1}`)
                .setColor('#29ad1d')
                .setTimestamp()
                .addField('<:xp:661186205458628608> Score Earned', foundItem['scoreEarned'], true)
                .addField('🕐 Time Played', foundItem['timePlayed'], true)
                .setThumbnail(foundItem['imageUrl'].replace('.tnk', '.png'))

            message.channel.send({embed:embed});

        } else if (category == "turret") {
            var turrets = res.turretsPlayed;

            var found = [];

            for (let i = 0; i < turrets.length; i++) {
                if (turrets[i]['name'].toLowerCase() == item.toLowerCase()) {
                    found.push(turrets[i]);
                }
            }

            if (!found.length > 0) {
                return message.channel.send(`**${name}** does not have the item **${item}**`);
            }

            var foundItem = biggerGrade(found);

            var embed = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setAuthor('Tanki Bot')
                .setTitle(`Ratings - Check Items`)
                .setDescription(`🔸 ${name} has ${foundItem['name']} Mk${foundItem['grade'] + 1}`)
                .setColor('#29ad1d')
                .setTimestamp()
                .addField('<:xp:661186205458628608> Score Earned', foundItem['scoreEarned'], true)
                .addField('🕐 Time Played', foundItem['timePlayed'], true)
                .setThumbnail(foundItem['imageUrl'].replace('.tnk', '.png'))

            message.channel.send({embed:embed});

        } else if (category == "paint") {
            var paints = res.paintsPlayed;

            var found = [];

            for (let i = 0; i < paints.length; i++) {
                if (paints[i]['name'].toLowerCase() == item.toLowerCase()) {
                    found.push(paints[i]);
                }
            }

            if (!found.length > 0) {
                return message.channel.send(`**${name}** does not have the item **${item}**`);
            }

            var foundItem = biggerGrade(found);

            var embed = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setAuthor('Tanki Bot')
                .setTitle(`Ratings - Check Items`)
                .setDescription(`🔸 ${name} has ${foundItem['name']}`)
                .setColor('#29ad1d')
                .setTimestamp()
                .addField('<:xp:661186205458628608> Score Earned', foundItem['scoreEarned'], true)
                .addField('🕐 Time Played', foundItem['timePlayed'], true)
                .setThumbnail(foundItem['imageUrl'].replace('.tnk', '.png'))

            message.channel.send({embed:embed});

        } else if (category == "module") {
            var modules = res.resistanceModules;

            var found = [];

            for (let i = 0; i < modules.length; i++) {
                if (modules[i]['name'].toLowerCase() == item.toLowerCase()) {
                    found.push(modules[i]);
                }
            }

            if (!found.length > 0) {
                return message.channel.send(`**${name}** does not have the item **${item}**`);
            }

            var foundItem = biggerGrade(found);

            // Protection name
            var protection = foundItem['properties'][0];
            var protectionName;
            var fileName;

            if (protection == 'FIREBIRD_RESISTANCE') {
                protectionName = '<:Firebird:605414856233058314> Firebird';
                fileName = 'firebird'
            } else if (protection == 'FREEZE_RESISTANCE') {
                protectionName = '<:Freeze:605414855763165225> Freeze';
                fileName = 'freeze'
            } else if (protection == 'TWINS_RESISTANCE') {
                protectionName = ' <:Twins:605414856027406353> Twins';
                fileName = 'twins'
            } else if (protection == 'SHOTGUN_RESISTANCE') {
                protectionName = '<:Hammer:605414856128069663> Hammer';
                fileName = 'hammer'
            } else if (protection == 'RICOCHET_RESISTANCE') {
                protectionName = '<:Ricochet:605414855905902598> Ricochet';
                fileName = 'ricochet'
            } else if (protection == 'SMOKY_RESISTANCE') {
                protectionName = '<:Smoky:605414855876411424> Smoky';
                fileName = 'smoky'
            } else if (protection == 'ROCKET_LAUNCHER_RESISTANCE') {
                protectionName = '<:Striker:605414856396505088> Striker';
                fileName = 'striker'
            } else if (protection == 'MACHINE_GUN_RESISTANCE') {
                protectionName = '<:Vulcan:605414855981400086> Vulcan';
                fileName = 'vulcan'
            } else if (protection == 'THUNDER_RESISTANCE') {
                protectionName = '<:Thunder:605414856128200716> Thunder';
                fileName = 'thunder'
            } else if (protection == 'RAILGUN_RESISTANCE') {
                protectionName = '<:Railgun:605414855847182348> Railgun';
                fileName = 'railgun'
            } else if (protection == 'ARTILLERY_RESISTANCE') {
                protectionName = '<:Magnum:605414856132132864> Magnum';
                fileName = 'magnum'
            } else if (protection == 'SHAFT_RESISTANCE') {
                protectionName = '<:Shaft:605414855868022837> Shaft';
                fileName = 'shaft'
            } else if (protection == 'GAUSS_RESISTANCE') {
                protectionName = '<:Gauss:605414856207630346> Gauss';
                fileName = 'gauss'
            } else if (protection == 'MINE_RESISTANCE') {
                protectionName = '<:Mine_symbol:605414662405619733> Mine';
                fileName = 'mine'
            } else if (protection == 'ALL_RESISTANCE') {
                protectionName = '<:armorIcon:661186313189326848> All';
                fileName = 'all'
            } else {
                protectionName = '<:Isida:605414855842988043> Isida'
                fileName = 'isida'
            }

            // Module image
            let moduleBackground = foundItem['imageUrl'].replace('.tnk', '.png');
            let moduleForeground = './storage/protections/' + fileName + '.png';
            // let moduleForeground = 'https://ratings.tankionline.com/assets/images/sprite_resists.606121704.png';

            Promise.all([
                Jimp.read(moduleBackground),
                Jimp.read(moduleForeground)
            ]).then(function (results) {
                results[0].composite(results[1], 35, 30)
                        .write('./storage/protections/protection.png')

                const attachment = new Discord.Attachment('./storage/protections/protection.png', 'protection.png');

                var embed = new Discord.RichEmbed()
                    .setAuthor('Tanki Bot')
                    .setAuthor('Tanki Bot')
                    .setTitle(`Ratings - Check Items`)
                    .setDescription(`🔸 ${name} has ${foundItem['name']} Mk${foundItem['grade'] + 1}`)
                    .setColor('#29ad1d')
                    .setTimestamp()
                    .addField('<:armorIcon:661186313189326848> Protection', protectionName, true)
                    .addField('<:xp:661186205458628608> Score Earned', foundItem['scoreEarned'], true)
                    .addField('🕐 Time Played', foundItem['timePlayed'], true)
                    .attachFile(attachment)
                    .setThumbnail('attachment://protection.png');

                message.channel.send({embed:embed});

            }).catch(function (err) {
                console.log(err);
            })

        } else if (category == "drone") {
            var drones = res.dronesPlayed;

            var found = [];

            for (let i = 0; i < drones.length; i++) {
                if (drones[i]['name'].toLowerCase() == item.toLowerCase()) {
                    found.push(drones[i]);
                }
            }

            if (!found.length > 0) {
                return message.channel.send(`**${name}** does not have the item **${item}**`);
            }

            var foundItem = biggerGrade(found);

            var embed = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setAuthor('Tanki Bot')
                .setTitle(`Ratings - Check Items`)
                .setDescription(`🔸 ${name} has ${foundItem['name']}`)
                .setColor('#29ad1d')
                .setTimestamp()
                .addField('<:xp:661186205458628608> Score Earned', foundItem['scoreEarned'], true)
                .addField('🕐 Time Played', foundItem['timePlayed'], true)
                .setThumbnail(foundItem['imageUrl'].replace('.tnk', '.png'))

            message.channel.send({embed:embed});

        } else {
            message.channel.send('Valid categories: turret | hull | paint | drone | module')
        }

    })
}
