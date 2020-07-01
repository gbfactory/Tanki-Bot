/**
 * Tanki Bot
 * 
 * About command to get general informations about the bot
 * 
 * @author gbfactory
 * @since 12.07.2017
 */

const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // TODO: if the bot become public (can be added on servers by anyone) add stats like number of servers, channels, users

    let embed = new Discord.RichEmbed()
        .setAuthor('TankiBot')
        .setColor(`RANDOM`)
        .setThumbnail('https://i.imgur.com/NN3Imra.png')
        .setTitle("📜 Info")
        .addField('📌 Ping', client.ping)
        .addField('📌 Developer', 'gb_factory#5365')
        .addField('📌 Support Server', 'https://discord.gg/cH8Tvbn')
        .addField('📌 Bot website', 'https://tankibot.gbfactory.net/')
        .setFooter('Coded with 💖 and discord.js by gb_factory#5365', 'https://i.imgur.com/7MpAZZh.png')
        .setTimestamp();

    message.channel.send({embed:embed});
    return;

}
