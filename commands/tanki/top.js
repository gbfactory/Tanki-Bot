/**
 * Tanki Bot.
 * 
 * RATINGS: get top ten players in each leaderboard from tanki ratings
 * 
 * @author gbfactory
 * @since  20.06.2019
*/

const Discord = require("discord.js");
const snekfetch = require("snekfetch");

const api = "https://ratings.tankionline.com/api/eu/top";

module.exports = {
    name: 'top',
    description: 'Check the top players in the Tanki leaderboard.',
    usage: '`>top crystals` - Who earned most crystals \n`>top efficiency` - Who is most efficient \n`>top golds` - Who caught most golds \n`>top score` - Who earned more score',
    args: true,
    cooldown: 3,
    execute(client, message, args, con) {

        switch (args[0]) {
            case 'crystals':
                snekfetch.get(api).then(cry => {
                    let crysEmbed = new Discord.RichEmbed()
                        .setAuthor("Tanki Bot")
                        .setTitle("Top Crystals")
                        .setColor("#00c2ff")
                        .setThumbnail("https://i.imgur.com/90wIzOj.png")
                        .setTimestamp()
    
                    for (i = 0; i < 12; i++) {
                        crysEmbed.addField(`${i + 1} - ${cry.body.response.crystals[i].uid}`, `💎 ${cry.body.response.crystals[i].value}`, true)
                    }
    
                    message.channel.send({ embed: crysEmbed });
                });
                break;
        
            case 'efficiency':
                snekfetch.get(api).then(eff => {
                    let effEmbed = new Discord.RichEmbed()
                        .setAuthor("Tanki Bot")
                        .setTitle("Top Efficiency")
                        .setColor("#ffa100")
                        .setThumbnail("https://i.imgur.com/jNPuErF.png")
                        .setTimestamp();
    
                    for (i = 0; i < 12; i++) {
                        effEmbed.addField(`${i + 1} - ${eff.body.response.efficiency[i].uid}`, `📈 ${eff.body.response.efficiency[i].value}`, true)
                    }
    
                    message.channel.send({ embed: effEmbed });
                });
                break;
            
            case 'golds':
                snekfetch.get(api).then(gol => {
                    let goldEmbed = new Discord.RichEmbed()
                        .setAuthor("Tanki Bot")
                        .setTitle("Top Golds")
                        .setColor("#fffc00")
                        .setThumbnail("https://i.imgur.com/M6wVUOH.png")
                        .setTimestamp();
    
                    for (i = 0; i < 12; i++) {
                        goldEmbed.addField(`${i + 1} - ${gol.body.response.golds[i].uid}`, `<:gold:660257810797428776> ${gol.body.response.golds[i].value}`, true)
                    }
    
                    message.channel.send({ embed: goldEmbed });

                });
                break;
            
            case 'score':
                snekfetch.get(api).then(sco => {
                    let expEmbed = new Discord.RichEmbed()
                        .setAuthor("Tanki Bot")
                        .setTitle("Top Score")
                        .setColor("#00ff19")
                        .setThumbnail("https://i.imgur.com/dcuovHE.png")
                        .setTimestamp();
    
                    for (i = 0; i < 12; i++) {
                        expEmbed.addField(`${i + 1} - ${sco.body.response.score[i].uid}`, `<:xp:661186205458628608> ${sco.body.response.score[i].value}`, true)
                    }
    
                    message.channel.send({ embed: expEmbed });
                });
                break;
            
            default:
                break;
        }

    },
};