/**
 * Tanki Bot
 * 
 * Get the list of all commands and informations about them.
 * 
 * @author gbfactory
 * @since 05 08 2020
 */

const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'List all commands and infos about them.',
    aliases: ['commands'],
    usage: '`>help` - List of all commands \n`>help [command]` - Info about a command',
    cooldown: 1,
    execute(client, message, args, con) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            const helpEmbed = new Discord.MessageEmbed()
                .setAuthor('Tanki Bot')
                .setTitle('Help')
                .setThumbnail('https://i.imgur.com/Kmf068z.png')
                .setColor('#80ca08')
                .setDescription(`📌 Use \`>help [command name]\` to get more info on a specific command.`)
                .addField('Commands List', commands.map(command => command.name).join(', '))
                .setFooter('Bot developed by gb_factory#5365')
                .setTimestamp()

            return message.channel.send({ embed:helpEmbed });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            const errEmbed = new Discord.MessageEmbed()
                .setAuthor('That command is not valid.')
                .setColor('#f54242');
            
            return message.channel.send({ embed:errEmbed });
        }

        const cmdEmbed = new Discord.MessageEmbed()
            .setAuthor('Tanki Bot')
            .setTitle(`Help \`${command.name}\``)
            .setThumbnail('https://i.imgur.com/Kmf068z.png')
            .setColor('#80ca08');

        if (command.description) {
            cmdEmbed.setDescription(`${command.description}`);
        }

        if (command.usage) {
            cmdEmbed.addField('Usage', `${command.usage}`);
        } else {
            cmdEmbed.addField('Usage', `\`>${command.name}\``);
        }

        if (command.aliases) {
            cmdEmbed.addField('Aliases', `${command.aliases.join(', ')}`);
        }

        message.channel.send({ embed:cmdEmbed });

    },
};