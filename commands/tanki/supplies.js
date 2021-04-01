/**
 * Tanki Bot.
 * 
 * RATINGS: check players' supplies usage
 * 
 * @author gbfactory
 * @since  09.08.2017
*/

const Discord = require("discord.js");
const fetch = require('node-fetch');

const api = "https://ratings.tankionline.com/get_stat/profile/?user=";

module.exports = {
    name: 'supplies',
    description: 'Check how many supplies a player has used.',
    aliases: ['sup'],
    usage: '`>supplies [nickname]`',
    cooldown: 3,
    execute(client, message, args) {
        const nickname = args[0];

        if (!nickname) {
            let noNickname = new Discord.MessageEmbed()
                .setAuthor('You have to specify a nickname >ratings (nickname)')
                .setColor('#f54242');

            return message.channel.send({ embed: noNickname });
        }

        fetch(`${api}${nickname}`)
            .then(res => res.json())
            .then(json => {

                if (json.responseType === 'NOT_FOUND') {
                    let noUser = new Discord.MessageEmbed()
                        .setAuthor('Player not found!')
                        .setColor('#f54242');

                    return message.channel.send({ embed: noUser });
                } else if (!json.responseType) {
                    let noApi = new Discord.MessageEmbed()
                        .setAuthor('Tanki Online API unavailable. Try again later.')
                        .setColor('#f54242');
                    return message.channel.send({ embed: noApi });
                }

                var res = json.response;

                var name = res.name;

                var suppliesArray = res.suppliesUsage;
                var suppliesUsage = 0;

                //embed
                let supplies = new Discord.MessageEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle(`Ratings - Profile`)
                    .setDescription(`Profile of ${name}`)
                    .setColor("#00ff19")
                    .setTimestamp()
                    .setThumbnail("https://i.imgur.com/KSN7NV8.png")

                for (var i = 0; i < suppliesArray.length; i++) {
                    supplies.addField(suppliesArray[i]['name'], suppliesArray[i]['usages'], true)
                    suppliesUsage += suppliesArray[i]['usages'];
                }

                supplies.addField("<:sups:660260925546168404> **Total Supplies Used**", suppliesUsage, true);

                message.channel.send({ embed: supplies });

            })

    },
};
