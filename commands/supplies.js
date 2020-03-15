/**
 * Tanki Bot.
 * 
 * RATINGS: check players' supplies usage
 * 
 * @author gbfactory
 * @since  09.08.2017
*/

const Discord = require("discord.js");
const snekfetch = require("snekfetch");

const api = "https://ratings.tankionline.com/get_stat/profile/?user=";

module.exports.run = async(client, message, args, tools) => {

	var nickname = args[0];

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
		
		var name = res.name;

		var suppliesArray = res.suppliesUsage;
		var suppliesUsage = 0;

		//embed
		let supplies = new Discord.RichEmbed()
		.setAuthor('Tanki Bot')
        .setTitle(`Ratings - Profile`)
        .setDescription(`Profile of ${name}`)
		.setColor("#00ff19")
		.setTimestamp()
		.setThumbnail("https://i.imgur.com/KSN7NV8.png")

		for (var i = 0; i < suppliesArray.length; i++) {
			supplies.addField(suppliesArray[i]['name'], suppliesArray[i]['usages'], true)
			suppliesUsage += suppliesArray[i]['usages'];
		}

		supplies.addField("<:sups:660260925546168404> **Total Supplies Used**", suppliesUsage, true);

		message.channel.send({embed:supplies});

	})
	
}
