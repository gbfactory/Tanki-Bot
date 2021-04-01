/**
 * Tanki Bot
 * 
 * Status commands to check how many players are online
 * 
 * @author gbfactory
 * @since 15.04.2020
 */

const Discord = require("discord.js");
const fetch = require('node-fetch');

const status_main = 'https://tankionline.com/s/status.js';
const status_test = 'https://test.tankionline.com/public_test';
//const status_graf = 'https://tankionline.com/s/statistics.txt';

module.exports = {
    name: 'status',
    description: 'Check how many players are online!',
    aliases: ['server', 'load'],
    usage: '`>status` - Check main servers load \n`>status test` - Check test servers load',
    cooldown: 3,
    execute(client, message, args) {

        switch (args[0]) {
            // Test Server Status
            case 'test':
                fetch(status_test)
                    .then(res => res.json())
                    .then(json => {
                        if (json) {
                            let online = 0;

                            for (var i = 0; i < Object.keys(json).length; i++) {
                                online += json[i].UserCount;
                            }

                            let statusTest = new Discord.MessageEmbed()
                                .setAuthor('Tanki Bot')
                                .setTitle('Test Server Status')
                                .setThumbnail('https://i.imgur.com/NN3Imra.png')
                                .addField('Online', online)
                                .setColor('#e8154a')
                                .setTimestamp();

                            message.channel.send({ embed: statusTest });
                        } else {
                            message.channel.send('Error. Try again later.');
                        }
                    })
                break;

            // Main Server Status
            default:
                fetch(status_main)
                    .then(res => res.json())
                    .then(json => {
                        if (json) {
                            let online = Object.values(json.nodes).reduce((total, obj) => (total + obj.online), 0);
                            let inbattles = Object.values(json.nodes).reduce((total, obj) => (total + obj.inbattles), 0);

                            let statusMain = new Discord.MessageEmbed()
                                .setAuthor('Tanki Bot')
                                .setTitle('Server Status')
                                .setThumbnail('https://i.imgur.com/NN3Imra.png')
                                .addField('Online', online, true)
                                .addField('In Battles', inbattles, true)
                                .addField('Idle', online - inbattles, true)
                                .setColor('#00940f')
                                .setTimestamp();

                            message.channel.send({ embed: statusMain })
                        } else {
                            message.channel.send('Error. Try again later.')
                        }
                    })
                break;
        }

    },
};