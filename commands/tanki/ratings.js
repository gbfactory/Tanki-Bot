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

let lv = require('../../storage/levels.json');

const api = 'https://ratings.tankionline.com/api/eu/profile/?user=';

module.exports = {
    name: 'ratings',
    description: 'Check the Ratings of a Tanki player.',
    aliases: ['r'],
    usage: '`>ratings [nickname]`',
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

            // Stats
            var kills = res.kills;
            var deaths = res.deaths;
            var kd = (kills / deaths).toFixed(2);

            // Exp
            var score = res.score;
            var scoreBase = res.scoreBase;
            var scoreNext = res.scoreNext;
            var scoreLeft = scoreNext - score;

            // Gain
            var caughtGolds = res.caughtGolds;
            var earnedCrystals = res.earnedCrystals;
            var gearScore = res.gearScore;

            // Premium (not working anymore: always on false)
            var hasPremium = res.hasPremium; // boolean

            // Rank
            if (res.rank > 30) {
                var rank = 30;
                var rankName = "Legend " + (res.rank - 30)
            } else {
                var rank = res.rank - 1;
                var rankName = lv[rank].name;
            }

            var rankEmoji = lv[rank].icon;

            if (hasPremium) {
                var rankImg = lv[rank].premium;
            } else {
                var rankImg = lv[rank].image;
            }

            var premiumBanner = hasPremium ? '<:pbanner:720011348217430157> ' : '';

            // Supplies usage
            var suppliesArray = res.suppliesUsage;
            var suppliesUsage = 0;

            for (let i = 0; i < suppliesArray.length; i++) {
                suppliesUsage += suppliesArray[i]['usages'];
            }

            // Hour count
            var gameTimeArray = res.modesPlayed;
            var gameTime = 0;

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
                .addField(`<:xp:661186205458628608> Score`, `${scoreBase} 🔸 ${score} (-${scoreLeft}) 🔸 ${scoreNext}`)
                .addField(`Info`, `💎 Crystals: ${earnedCrystals} \n<:gold:660257810797428776> Gold Boxes ${caughtGolds} \n🕐 Game Time: ${gameTime} \n<:sups:660260925546168404> Supplies: ${suppliesUsage}`, true)
                .addField(`Stats`, `<:Clan_destroyed:660950530096496661> Kills: ${kills} \n<:Clan_death:660950530071461890> Deaths: ${deaths} \n<:Clan_kd:660950530293497866> K/D: ${kd} \n⚙️ GearScore: ${gearScore}`, true)

            message.channel.send({ embed: ratings });

        })

    },
};