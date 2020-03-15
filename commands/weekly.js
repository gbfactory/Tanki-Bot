/**
 * Tanki Bot.
 * 
 * RATINGS: get players' weekly statistics
 * 
 * @author gbfactory
 * @since  09.08.2017
*/

const Discord = require("discord.js");
const snekfetch = require("snekfetch");

const api = "https://ratings.tankionline.com/get_stat/profile/?user=";

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

        // Current Ratings
        // Position
        var curPosCry = ((res.rating.crystals.position).toLocaleString('en')).replace("-1", "—");
        var curPosGold = ((res.rating.golds.position).toLocaleString('en')).replace("-1", "—");
        var curPosExp = ((res.rating.score.position).toLocaleString('en')).replace("-1", "—");
        var curPosEff = ((res.rating.efficiency.position).toLocaleString('en')).replace("-1", "—");

        // Value
        var curValCry = ((res.rating.crystals.value).toLocaleString('en')).replace("-1", "—");
        var curValGold = ((res.rating.golds.value).toLocaleString('en')).replace("-1", "—");
        var curValExp = ((res.rating.score.value).toLocaleString('en')).replace("-1", "—");
        var curValEff = ((res.rating.efficiency.value).toLocaleString('en')).replace("-1", "—");

        // Old Ratings
        // Position
        var precPosCry = ((res.previousRating.crystals.position).toLocaleString('en')).replace("-1", "—");
        var precPosGold = ((res.previousRating.golds.position).toLocaleString('en')).replace("-1", "—");
        var precPosExp = ((res.previousRating.score.position).toLocaleString('en')).replace("-1", "—");

        // Value
        var precValCry = ((res.previousRating.crystals.value).toLocaleString('en')).replace("-1", "—");
        var precValGold = ((res.previousRating.golds.value).toLocaleString('en')).replace("-1", "—");
        var precValExp = ((res.previousRating.score.value).toLocaleString('en')).replace("-1", "—");

        // Compare

        var diffCry = "";
        var diffGold = "";
        var diffExp = "";
        
        if (curValCry > precValCry) {
            diffCry = "▲";
        } else if (curValCry < precValCry && curValCry > 0) {
            diffCry = "▼";
        }

        if (curValGold > precValGold) {
            diffGold = "▲";
        } else if (curValGold < precValGold && curValGold > 0) {
            diffGold = "▼";
        }

        if (curValExp > precValExp) {
            diffExp = "▲";
        } else if (curValExp < precValExp && curValExp > 0) {
            diffExp = "▼";
        }

        // Embed
        let embed = new Discord.RichEmbed()
            .setAuthor('Tanki Bot')
            .setTitle(`Ratings - Weekly Ratings`)
            .setDescription(`Profile of ${name}`)
            .setThumbnail("https://i.imgur.com/ifOqPcp.png")
            .setColor("#00c2ff")
            .setTimestamp()
            .addField("Experience", `**Place**: ${curPosExp} \n**Value**: ${curValExp} ${diffExp} \n**Previusly**: ${precValExp}`, true)
            .addField("Gold Boxes", `**Place**: ${curPosGold} \n**Value**: ${curValGold} ${diffGold} \n**Previusly**: ${precValGold}`, true)
            .addField("Crystals", `**Place**: ${curPosCry} \n**Value**: ${curValCry} ${diffCry} \n**Previusly**: ${precValCry}`, true)
            .addField("Efficiency", `**Place**: ${curPosEff} \n**Value**: ${curValEff} \n**Previusly**: —`, true)
        
        message.channel.send({ embed: embed })
    
    })

}
