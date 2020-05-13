/**
 * Tanki Bot
 * 
 * Ratings: check users' owneed items
 * 
 * @author gbfactory
 * @since 04.05.2020
 */

import Discord from 'discord.js';
import snektetch from 'snekfetch';

module.exports.run = async(client, message, args, tools) => {

    var nickname = args[0];

    if (!nickname) {
        let noNickname = new Discord.RichEmbed()
        .setAuthor('You have to specify a nickname >ratings (nickname)')
        .setColor('#f54242');

        return message.channel.send({embed:noNickname});
    }

    snekfetch.get(api + nickname).then(r => {

        if (r.body.responseType === 'NOT_FOUND') {
            let noUser = new Discord.RichEmbed()
            .setAuthor('Player not found!')
            .setColor('#f54242');

            return message.channel.send({embed:noUser});
        } else if (!r.body.responseType) {
            let noApi = new Discord.RichEmbed()
            .setAuthor('Tanki Online API unavailable. Try again later.')
            .setColor('#f54242');
            return message.channel.send({embed:noApi});
        }

        var res = r.body.response;

        // Name
        var name = res.name;

        // Items
        var drones = res.dronesPlayed
        var hulls = res.hullsPlayed;
        var paints = res.paintsPlayed;
        var presents = res.presents;
        var modules = res.resistanceModules;
        var turrets = res.turretsPlayed;

        // EMBED
        let itemsEmbed = new Discord.RichEmbed()
            .setAuthor('Tanki Bot')
            .setTitle(`Ratings - Items`)
            .setDescription(`Items of ${name}`)
            .setColor('#29ad1d')
            .setTimestamp()
            .addField('<:Icon_battery_supply:605414662506414110> Drones', drones.length, true)
            .addField('<:burstDamageIcon:661186313176875031> Turrets', turrets.length, true)
            .addField('<:Hornet:605414772003045395> Hulls', hulls.length, true)
            .addField('<:Complect_paint_tro:706755019365679124> Paints', paints.length, true)
            .addField('<:Spectrum_prot_symbol:706753913461932052> Modules', modules.length, true)
            .addField('<:Teddy_Bear:706754544821862400> Gifts Recived', presents.length, true)        

        message.channel.send({embed:itemsEmbed});


    })
}
