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
    cooldown: 3,
    execute(client, message, args, con) {

        if (args[0] === "crystals") {

            snekfetch.get(api).then(cry => {

                let cryEmb = new Discord.RichEmbed()
                    .setAuthor("Tanki Bot")
                    .setTitle("Top Crystals")
                    .setColor("#00c2ff")
                    .setThumbnail("https://i.imgur.com/90wIzOj.png")
                    .setTimestamp()

                for (i = 0; i < 12; i++) {
                    cryEmb.addField(`${i + 1} - ${cry.body.response.crystals[i].uid}`, `💎 ${cry.body.response.crystals[i].value}`, true)
                }

                message.channel.send({ embed: cryEmb });

            });

        } else if (args[0] === "efficiency") {

            snekfetch.get(api).then(eff => {

                let effEmb = new Discord.RichEmbed()
                    .setAuthor("Tanki Bot")
                    .setTitle("Top Efficiency")
                    .setColor("#ffa100")
                    .setThumbnail("https://i.imgur.com/jNPuErF.png")
                    .setTimestamp();

                for (i = 0; i < 12; i++) {
                    effEmb.addField(`${i + 1} - ${eff.body.response.efficiency[i].uid}`, `📈 ${eff.body.response.efficiency[i].value}`, true)
                }

                message.channel.send({ embed: effEmb });

            });

        } else if (args[0] === "golds") {

            snekfetch.get(api).then(gol => {

                let golEmb = new Discord.RichEmbed()
                    .setAuthor("Tanki Bot")
                    .setTitle("Top Golds")
                    .setColor("#fffc00")
                    .setThumbnail("https://i.imgur.com/M6wVUOH.png")
                    .setTimestamp();

                for (i = 0; i < 12; i++) {
                    golEmb.addField(`${i + 1} - ${gol.body.response.golds[i].uid}`, `<:gold:660257810797428776> ${gol.body.response.golds[i].value}`, true)
                }

                message.channel.send({ embed: golEmb });

            });

        } else if (args[0] === "score") {

            snekfetch.get(api).then(sco => {

                let scoEmb = new Discord.RichEmbed()
                    .setAuthor("Tanki Bot")
                    .setTitle("Top Score")
                    .setColor("#00ff19")
                    .setThumbnail("https://i.imgur.com/dcuovHE.png")
                    .setTimestamp();

                for (i = 0; i < 12; i++) {
                    scoEmb.addField(`${i + 1} - ${sco.body.response.score[i].uid}`, `<:xp:661186205458628608> ${sco.body.response.score[i].value}`, true)
                }

                message.channel.send({ embed: scoEmb });

            });

        } else {

            let topEmb = new Discord.RichEmbed()
                .setAuthor("Tanki Bot")
                .setTitle("Weekly Tops")
                .setColor("#87d704")
                .setThumbnail("https://i.imgur.com/ifOqPcp.png")
                .addField("Description", "Display the top players of the week.")
                .addField("Usage", "<:crys:660257474317910026>  >top crystals \n📈  >top efficiency \n<:gold:660257810797428776>  >top golds \n<:tstar:660257945350701066>  >top score")


            message.channel.send({ embed: topEmb });

        };

    },
};