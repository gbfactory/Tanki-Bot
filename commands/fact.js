/**
 * Tanki Bot
 * 
 * Get a random fact about Tanki Online
 * 
 * @author gbfactory
 * @since  10.08.2017
*/


const Discord = require("discord.js");
let json = require("../storage/facts.json");

module.exports.run = async (client, message, con) => {
    
    var l = Object.keys(json).length;
    var r = Math.floor(Math.random() * l);

    let embed = new Discord.RichEmbed()
    .setColor('#403ddb')
    .setTitle('Did you know that...')
    .setDescription(json[r]["en"]);

    message.channel.send({embed:embed});

}