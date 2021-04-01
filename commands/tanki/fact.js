/**
 * Tanki Bot
 *
 * Get a random fact about Tanki Online
 *
 * @author gbfactory
 * @since  10.08.2017
 */

const Discord = require('discord.js')
let json = require('../../storage/facts.json')

module.exports = {
    name: 'fact',
    description: 'Get a random fact about Tanki.',
    cooldown: 3,
    execute(client, message) {
        const l = Object.keys(json).length;
        const r = Math.floor(Math.random() * l);

        let embed = new Discord.MessageEmbed()
            .setColor('#403ddb')
            .setTitle('Did you know that...')
            .setDescription(json[r]['en']);

        message.channel.send({ embed: embed });
    },
}
