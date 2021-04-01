/**
 * Tanki Bot
 * 
 * Get the latest news from tanki en wordpress
 * 
 * @author gbfactory
 * @since 08/06/2020
 * 
 */

const fetch = require('node-fetch');

const api = 'https://tankionline.com/en/wp-json/wp/v2/posts/';

module.exports = {
    name: 'news',
    description: 'Get the latest news from the Tanki Website.',
    cooldown: 3,
    execute(client, message) {
        fetch(api)
            .then(res => res.json())
            .then(json => {

                function stripHtml(string) {
                    return string.replace(/(<([^>]+)>)/gi, "");
                }

                message.channel.send(
                    `:one: **${json[0]['title']['rendered']}** \n${stripHtml(json[0]['excerpt']['rendered'])} \n:two: **${json[1]['title']['rendered']}** \n${stripHtml(json[1]['excerpt']['rendered'])} \n:three: **${json[2]['title']['rendered']}** \n${stripHtml(json[2]['excerpt']['rendered'])} \n`
                )
            })
    },
};