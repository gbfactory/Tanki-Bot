const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let embed = new Discord.RichEmbed()
        .setAuthor('TankiBot')
        .setColor(`RANDOM`)
        .setThumbnail('https://i.imgur.com/NN3Imra.png')
        .addField('Informazioni', 'Bot di Tanki Online.')
        .addField('Membri', client.users.size ,true)
        .addField('Canali', client.channels.size ,true)
        .addField('Server', client.guilds.size ,true)
        .setFooter('Coded with 💖 and discord.js', 'https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png')
        .setTimestamp();

    message.channel.send({embed:embed});
    return;

}
