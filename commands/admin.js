/**
 * Tanki Bot
 * 
 * Admin command to perform some useful stuff
 * 
 * @author gbfactory
 * @since ?
 */

const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {

    if (message.author.id != "397387465024864257") {
        return message.delete;
    } else {

        if (args[0] == "slowmode") {
            message.channel.setRateLimitPerUser(3);
        }

    }

}