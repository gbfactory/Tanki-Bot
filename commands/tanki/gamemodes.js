/**
 * Tanki Bot
 * 
 * Command to check gamemodes stats of a given user from tanki ratings.
 * 
 * @author gbfactory
 * @since  10.08.2017
*/

const Discord = require("discord.js");
const fetch = require('node-fetch');
const ms = require('ms');

const api = "https://ratings.tankionline.com/get_stat/profile/?user=";

module.exports = {
    name: 'gamemodes',
    description: 'Check the ratings of a player in the different gamemodes.',
    aliases: ['gm', 'modes'],
    usage: '`>gamemodes [nickname]`',
    args: true,
    cooldown: 3,
    execute(client, message, args, con) {
        const nickname = args[0];

        fetch(`${api}${nickname}`)
            .then(res => res.json())
            .then(json => {

                if (json.responseType === 'NOT_FOUND') {
                    let noUser = new Discord.MessageEmbed()
                        .setAuthor('Player not found!')
                        .setColor('#f54242');

                    return message.channel.send({ embed: noUser });
                } else if (!json.responseType) {
                    let noApi = new Discord.MessageEmbed()
                        .setAuthor('Tanki Online API unavailable. Try again later.')
                        .setColor('#f54242');
                    return message.channel.send({ embed: noApi });
                }

                var res = json.response;

                // Name
                var name = res.name;

                //esperienza guadagnata
                var eDM = (res.modesPlayed[0].scoreEarned).toLocaleString('en'); //dm
                var eTDM = (res.modesPlayed[1].scoreEarned).toLocaleString('en'); //tdm
                var eCTF = (res.modesPlayed[2].scoreEarned).toLocaleString('en'); //ctf
                var eCP = (res.modesPlayed[3].scoreEarned).toLocaleString('en'); //cp
                var eAS = (res.modesPlayed[4].scoreEarned).toLocaleString('en'); //as
                var eRGB = (res.modesPlayed[5].scoreEarned).toLocaleString('en'); //rgb
                var eSJGR = (res.modesPlayed[6].scoreEarned).toLocaleString('en'); //sjgr
                var eJGR = (res.modesPlayed[7].scoreEarned).toLocaleString('en'); //jgr
                var eSGE = (res.modesPlayed[8].scoreEarned).toLocaleString('en'); //sge

                //tempo giocato
                var tDM = ms(res.modesPlayed[0].timePlayed, { long: true }) //dm
                var tTDM = ms(res.modesPlayed[1].timePlayed, { long: true }) //tdm
                var tCTF = ms(res.modesPlayed[2].timePlayed, { long: true }) //ctf
                var tCP = ms(res.modesPlayed[3].timePlayed, { long: true }) //cp
                var tAS = ms(res.modesPlayed[4].timePlayed, { long: true }) //as
                var tRGB = ms(res.modesPlayed[5].timePlayed, { long: true }) //rgb
                var tSJGR = ms(res.modesPlayed[6].timePlayed, { long: true }) //sjgr
                var tJGR = ms(res.modesPlayed[7].timePlayed, { long: true }) //jgr
                var tSGE = ms(res.modesPlayed[8].timePlayed, { long: true }) //sge

                let DM = `<:tstar:660257945350701066> **Score**: ${eDM}   \n🕓 **Time**: ${(tDM).toLocaleString('en')}`
                let TDM = `<:tstar:660257945350701066> **Score**: ${eTDM}  \n🕓 **Time**: ${(tTDM).toLocaleString('en')}`
                let CTF = `<:tstar:660257945350701066> **Score**: ${eCTF}  \n🕓 **Time**: ${(tCTF).toLocaleString('en')}`
                let CP = `<:tstar:660257945350701066> **Score**: ${eCP}   \n🕓 **Time**: ${(tCP).toLocaleString('en')}`
                let AS = `<:tstar:660257945350701066> **Score**: ${eAS}   \n🕓 **Time**: ${(tAS).toLocaleString('en')}`
                let RGB = `<:tstar:660257945350701066> **Score**: ${eRGB}  \n🕓 **Time**: ${(tRGB).toLocaleString('en')}`
                let SJGR = `<:tstar:660257945350701066> **Score**: ${eSJGR} \n🕓 **Time**: ${(tSJGR).toLocaleString('en')}`
                let JGR = `<:tstar:660257945350701066> **Score**: ${eJGR}  \n🕓 **Time**: ${(tJGR).toLocaleString('en')}`
                let SGE = `<:tstar:660257945350701066> **Score**: ${eSGE}  \n🕓 **Time**: ${(tSGE).toLocaleString('en')}`

                //embed
                let gamemodes = new Discord.MessageEmbed()
                    .setAuthor('Tanki Bot')
                    .setTitle(`Ratings - Gamemodes`)
                    .setDescription(`Profile of ${name}`)
                    .setColor("#87d704")
                    .setTimestamp()
                    .setThumbnail("https://i.imgur.com/yHWxaka.png")
                    .addField("<:MM_DM:605414603245223956> Deathmatch", DM, true)
                    .addField("<:MM_TDM:605414603266064438> Team Deathmatch", TDM, true)
                    .addField("<:MM_CTF:605414603228315652> Capture The Flag", CTF, true)
                    .addField("<:MM_CP:605414603190566918> Control Points", CP, true)
                    .addField("<:MM_ASL:605414603207213068> Assault", AS, true)
                    .addField("<:MM_RGB:605414603228184576> Rugby", RGB, true)
                    .addField("<:MM_JGR:605414603064606721> Solo Juggernaut", SJGR, true)
                    .addField("<:MM_JGR:605414603064606721> Juggernaut", JGR, true)
                    .addField("<:sge:660455070814568470> Siege", SGE, true);

                message.channel.send({ embed: gamemodes });

            })

    },
};
