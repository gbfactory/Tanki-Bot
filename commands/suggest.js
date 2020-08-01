/**
 * Tanki Bot
 * 
 * Command to make suggestions
 * 
 * @author gbfactory
 * @since 01 08 2020
 */

const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // Channel settings
    // TODO: Move to config.json
    let cmdChannel = '664486215327940618';
    let ansChannel = '739152478377082951';
    
    // Allow command only in selected channel
    if (message.channel.id != cmdChannel) {
        message.delete();
        return message.channel.send('You can\'t use this commad here!').then(msg => {
            msg.delete(1500);
        });
    }

    // Author and suggestion info
    let author = message.author.username;
    let suggestion = args.join(' ');

    // Check if there is a suggestion
    if (!suggestion) {
        message.delete;
        return message.channel.send('You have to make a suggestion!').then(msg => {
            msg.delete(3000);
        });
    }
    
    // Delete the suggestion message
    message.delete();

    // Send thanks message
    message.channel.send('Thanks for your suggestion!').then(msg => {
        msg.delete(1000);
    });

    // Create the embed
    let suggestionEmbed = new Discord.RichEmbed()
        .setAuthor('Tanki Bot')
        .setTitle('Suggestion by ' + author)
        .setDescription(suggestion)
        .setTimestamp()
        .setFooter('ID ' + Math.random().toString(36).substr(2, 9))
    
    // Send the msg to the configured channel
    client.channels.get(ansChannel).send({embed:suggestionEmbed}).then(msg => {
        // Add reaction to the msg
        msg.react('👍').then(() => msg.react('👎'));
    });

    // Send msg in pm to gb
    client.fetchUser('397387465024864257',false).then(user => {
        user.send({embed:suggestionEmbed}); 
    })

}