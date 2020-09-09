/**
 * Tanki Bot
 * 
 * About command to get general informations about the bot
 * 
 * @author gbfactory
 * @since 12.07.2017
 */

const Discord = require("discord.js");

module.exports = {
    name: 'about',
    description: 'Get informations about the Bot.',
    cooldown: 1,
    execute(client, message, args, con) {

        let embed = new Discord.RichEmbed()
            .setAuthor('TankiBot')
            .setColor('#982b82')
            .setThumbnail('https://i.imgur.com/pQAtVhk.png')
            .setTitle("Info about the bot")

            .addField('<:developer:741331374484619366> Developer', 'gb_factory#5365')
            .addField('<:earlysupporter:741331772939436123> Support', 'https://discord.gg/cH8Tvbn')
            .addField('GitHub', 'https://github.com/gbfactory/Tanki-Bot/')

            .setFooter('Coded with 💖 and discord.js by gb_factory#5365', 'https://i.imgur.com/7MpAZZh.png')

        return message.channel.send({ embed: embed });

    },
};