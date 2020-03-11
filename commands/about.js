/**
 * Tanki Bot. GENERAL.
 * 
 * About file with informations about the bot.
 * 
 * @author gbfactory
 * @since  12.07.2017
*/

const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let embed = new Discord.RichEmbed()
        .setAuthor('TankiBot')
        .setColor(`RANDOM`)
        .setThumbnail('https://i.imgur.com/NN3Imra.png')
        .setTitle("Info")
        .addField('Ping', client.ping)
        .addField('Developer', 'gb_factory#5365')
        .addField('Support Server', 'https://discord.gg/cH8Tvbn')
        /*.addField('Members', client.users.size ,true)
        .addField('Channels', client.channels.size ,true)
        .addField('Servers', client.guilds.size ,true)*/
        .setFooter('Coded with 💖 and discord.js by gb_factory#5365', 'https://i.imgur.com/7MpAZZh.png')
        .setTimestamp();

    message.channel.send({embed:embed});
    return;

}
