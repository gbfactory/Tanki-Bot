/**
 * Tanki Bot
 * 
 * Get the latest news from tanki en wordpress
 * 
 * @author gbfactory
 * @since 08/06/2020
 * 
 */

const Discord = require('discord.js');
const snekfetch = require('snekfetch');

const api = 'https://tankionline.com/en/wp-json/wp/v2/posts/';

module.exports = {
    name: 'news',
    description: 'Get the latest news from the Tanki Website.',
    cooldown: 3,
    execute(client, message, args, con) {

        function stripHtml(data) {
            return data.replace(/<[^>]*>?/gm, '');
        }

        snekfetch.get(api).then(data => {

            let res = data.body;


            let count = parseInt(args[0]);

            if (count > 10) {
                count = 0;
            }

            snekfetch.get(res[0]['_links']['wp:featuredmedia'][0]['href']).then(dataImg => {

                let embed = new Discord.RichEmbed()
                    .setAuthor('Tanki Online News')

                    .setTitle(':one: ' + res[0]['title']['rendered'])
                    .setURL(res[0]['link'])
                    .setDescription(stripHtml(res[0]['excerpt']['rendered']))

                    .setColor('#fff')
                    .setTimestamp()

                let numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':keycap_ten:'];

                for (let index = 1; index < count; index++) {
                    if (index == 1 || count == 2) {
                        embed.addField(numbers[index] + res[index]['title']['rendered'], stripHtml(res[index]['excerpt']['rendered']))
                    } else {
                        embed.addField(numbers[index] + res[index]['title']['rendered'], 'Read more: ' + res[index]['guid']['rendered'])
                    }
                }

                if (count > 0) {
                    embed.setThumbnail(dataImg.body['source_url']);
                } else {
                    embed.setImage(dataImg.body['source_url']);
                }

                message.channel.send({ embed: embed });

            })
        })

    },
};