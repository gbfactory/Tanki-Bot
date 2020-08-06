/**
 * Tanki Bot
 * 
 * Status commands to check how many players are online
 * 
 * @author gbfactory
 * @since 15.04.2020
 */

const Discord = require("discord.js");
const snekfetch = require('snekfetch');

const status_main = 'https://tankionline.com/s/status.js';
const status_test = 'https://test.tankionline.com/public_test';
//const status_graf = 'https://tankionline.com/s/statistics.txt';

module.exports = {
    name: 'status',
    description: 'Check how many players are online!',
    aliases: ['server', 'load'],
    usage: '`>status` - Check main servers load \n`>status test` - Check test servers load',
    cooldown: 3,
    execute(client, message, args, con) {

        switch (args[0]) {
            // Test Server Status
            case 'test':
                snekfetch.get(status_test).then(data => {
                    if (data.body) {
                        let data_json = JSON.parse(data.body);

                        let online = 0;

                        for (var i = 0; i < Object.keys(data_json).length; i++) {
                            online += data_json[i].UserCount;
                        }

                        let statusTest = new Discord.RichEmbed()
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
                snekfetch.get(status_main).then(data => {
                    if (data.body) {
                        let data_json = JSON.parse(data.body);

                        let online = Object.values(data_json.nodes).reduce((total, obj) => (total + obj.online), 0);
                        let inbattles = Object.values(data_json.nodes).reduce((total, obj) => (total + obj.inbattles), 0);

                        let statusMain = new Discord.RichEmbed()
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