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

        if (!args[0]) {

            // main status
            snekfetch.get(status_main).then(data => {

                if (data.body) {

                    var data_json = JSON.parse(data.body)

                    var online = Object.values(data_json.nodes).reduce((total, obj) => (total + obj.online), 0);
                    var inbattles = Object.values(data_json.nodes).reduce((total, obj) => (total + obj.inbattles), 0);

                    let embed_main = new Discord.RichEmbed()
                        .setAuthor('Tanki Bot')
                        .setTitle('Server Status')
                        .setThumbnail('https://i.imgur.com/NN3Imra.png')
                        .addField('Online', online)
                        .addField('In Battles', inbattles)
                        .addField('Idle', online - inbattles)
                        .setTimestamp()

                    message.channel.send({ embed: embed_main })

                } else {
                    message.channel.send('Error. Try again later.')
                }


            })

        } else if (args[0] == 'test') {

            // test servers status
            snekfetch.get(status_test).then(data => {

                if (data.body) {

                    var data_json = JSON.parse(data.body);

                    var online = 0;

                    for (var i = 0; i < Object.keys(data_json).length; i++) {
                        online += data_json[i].UserCount;
                    }

                    let embed_test = new Discord.RichEmbed()
                        .setAuthor('Tanki Bot')
                        .setTitle('Test Server Status')
                        .setThumbnail('https://i.imgur.com/NN3Imra.png')
                        .addField('Online', online)
                        .setTimestamp()

                    message.channel.send({ embed: embed_test })

                } else {
                    message.channel.send('Error. Try again later.')
                }

            })

        } else {
            let help_embed = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setTitle('Status')
                .setThumbnail('https://i.imgur.com/NN3Imra.png')
                .addField('Check main servers status', '>status')
                .addField('Check test servers status', '>status test')

            message.channel.send({ embed: help_embed })
        }

    },
};