/**
 * Tanki Bot
 * 
 * Command to check stats of a given user from tanki ratings.
 * 
 * @author gbfactory
 * @since  08.08.2017
*/

const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const ms = require('ms');

const lv = require('../../storage/levels.json');

const api = 'https://ratings.tankionline.com/api/eu/profile/?user=';

module.exports = {
    name: 'ratings',
    description: 'Check the Ratings of a Tanki player.',
    aliases: ['r'],
    usage: '`>ratings [nickname]`',
    args: true,
    cooldown: 3,
    execute(client, message, args, con) {
        
        snekfetch.get(api + args[0]).then(r => {

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

            const res = r.body.response;

            // Name
            let name = res.name;

            // Stats
            let kills = res.kills;
            let deaths = res.deaths;
            let kd = (kills / deaths).toFixed(2);
                kd = isNaN(kd) ? 0 : kd;

            // Exp
            let score = res.score;
            let scoreBase = res.scoreBase;
            let scoreNext = res.scoreNext;
            let scoreLeft = scoreNext - score;

            // Gain
            let caughtGolds = res.caughtGolds;
            let earnedCrystals = res.earnedCrystals;
            let gearScore = res.gearScore;

            // Premium (not working anymore: always on false)
            let hasPremium = res.hasPremium; // boolean

            // Rank
            let rank, rankName;

            if (res.rank > 30) {
                rank = 30;
                rankName = "Legend " + (res.rank - 30)
            } else {
                rank = res.rank - 1;
                rankName = lv[rank].name;
            }

            let rankEmoji = lv[rank].icon;

            let rankImg = hasPremium ? lv[rank].premium : lv[rank].image;

            let premiumBanner = hasPremium ? '<:pbanner:720011348217430157> ' : '';

            // Supplies usage
            let suppliesArray = res.suppliesUsage;
            let suppliesUsage = 0;

            for (let i = 0; i < suppliesArray.length; i++) {
                suppliesUsage += suppliesArray[i]['usages'];
            }

            // Game time
            let gameTimeArray = res.modesPlayed;
            let gameTime = 0;

            for (let i = 0; i < gameTimeArray.length; i++) {
                gameTime += gameTimeArray[i].timePlayed;
            }

            gameTime = ms(gameTime, { long: true });


            // EMBED
            let ratings = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setTitle(`Ratings - Profile`)
                .setDescription(`Profile of ${name}`)
                .setColor('#29ad1d')
                .setThumbnail(rankImg)
                .setURL(`https://ratings.tankionline.com/en/user/${name}`)
                .setTimestamp()
                .addField(`Name`, `<:elmetto:660442439441448981> ${name}`, true)
                .addField(`Rank`, `${premiumBanner} ${rankEmoji} ${rankName}`, true)
                .addField(`<:xp:661186205458628608> Score`, `${scoreBase.toLocaleString()} 🔸 ${score.toLocaleString()} (-${scoreLeft.toLocaleString()}) 🔸 ${scoreNext.toLocaleString()}`)
                .addField(`Info`, `💎 Crystals: ${earnedCrystals.toLocaleString()} \n<:gold:660257810797428776> Gold Boxes ${caughtGolds.toLocaleString()} \n🕐 Game Time: ${gameTime} \n<:sups:660260925546168404> Supplies: ${suppliesUsage.toLocaleString()}`, true)
                .addField(`Stats`, `<:Clan_destroyed:660950530096496661> Kills: ${kills.toLocaleString()} \n<:Clan_death:660950530071461890> Deaths: ${deaths.toLocaleString()} \n<:Clan_kd:660950530293497866> K/D: ${kd} \n⚙️ GearScore: ${gearScore}`, true)

            message.channel.send({ embed: ratings });

        })

    },
};