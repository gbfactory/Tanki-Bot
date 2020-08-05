/**
 * Tanki Bot
 * 
 * Command to make suggestions
 * 
 * @author gbfactory
 * @since 01 08 2020
 */

const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'suggest',
    description: 'Make a suggestion for the bot.',
    aliases: ['suggestion'],
    usage: '`>suggest [your suggestion]`',
    args: true,
    cooldown: 10,
    execute(client, message, args, con) {

        // Channel settings
        let cmdChannel = config['suggestion']['cmdChannel'];
        let ansChannel = config['suggestion']['ansChannel'];

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
        client.channels.get(ansChannel).send({ embed: suggestionEmbed }).then(msg => {
            // Add reaction to the msg
            msg.react('👍').then(() => msg.react('👎'));
        });

        // Send msg in pm to gb
        client.fetchUser('397387465024864257', false).then(user => {
            user.send({ embed: suggestionEmbed });
        })

    },
};