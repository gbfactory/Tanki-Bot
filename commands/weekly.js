const Discord = require("discord.js");
const snekfetch = require("snekfetch");

const api = "https://ratings.tankionline.com/get_stat/profile/?user=";

module.exports.run = async (client, message, args, tools) => {

    nome = args[0];

    if (!nome) {
      let nonUsNome = new Discord.RichEmbed()
        .setAuthor("You didn't put a nickname.")
        .setColor("#87d704");
        message.channel.send({embed:nonUsName});
        return;

    } else {
        snekfetch.get(api + args[0]).then(r =>{

            if (!r.body.response) {
              let nonEsiste = new Discord.RichEmbed()
                .setAuthor("This user doesn't exist.")
                .setColor("#87d704");
              message.channel.send({embed:nonEsiste});
              return;

            } else {

                var nome = r.body.response.name;

                //ratings correnti
                //posizione
                var curPosCry = ((r.body.response.rating.crystals.position).toLocaleString('en')).replace("-1", "—");
                var curPosGold = ((r.body.response.rating.golds.position).toLocaleString('en')).replace("-1", "—");
                var curPosExp = ((r.body.response.rating.score.position).toLocaleString('en')).replace("-1", "—");
                var curPosEff = ((r.body.response.rating.efficiency.position).toLocaleString('en')).replace("-1", "—");

                //valore
                var curValCry = ((r.body.response.rating.crystals.value).toLocaleString('en')).replace("-1", "—");
                var curValGold = ((r.body.response.rating.golds.value).toLocaleString('en')).replace("-1", "—");
                var curValExp = ((r.body.response.rating.score.value).toLocaleString('en')).replace("-1", "—");
                var curValEff = ((r.body.response.rating.efficiency.value).toLocaleString('en')).replace("-1", "—");

                //rating precedenti
                //posizione
                var precPosCry = ((r.body.response.previousRating.crystals.position).toLocaleString('en')).replace("-1", "—");
                var precPosGold = ((r.body.response.previousRating.golds.position).toLocaleString('en')).replace("-1", "—");
                var precPosExp = ((r.body.response.previousRating.score.position).toLocaleString('en')).replace("-1", "—");

                //valore
                var precValCry = ((r.body.response.previousRating.crystals.value).toLocaleString('en')).replace("-1", "—");
                var precValGold = ((r.body.response.previousRating.golds.value).toLocaleString('en')).replace("-1", "—");
                var precValExp = ((r.body.response.previousRating.score.value).toLocaleString('en')).replace("-1", "—");

                //confronto ratings
                if (curValCry > precValCry) {
                  diffCry = "▲";
                } else {
                  diffCry = "▼";
                }

                if (curValGold > precValGold) {
                  diffGold = "▲";
                } else {
                  diffGold = "▼";
                }

                if (curValExp > precValExp) {
                  diffExp = "▲";
                } else {
                  diffExp = "▼";
                }

                //embed
                let embed = new Discord.RichEmbed()
                .setTitle("Tanki Online Ratings - Weekly Positions of " + nome)
                .setURL("https://ratings.tankionline.com/en/user/" + nome)
                .setFooter("Bot by gb_factory")
        				.setThumbnail("https://i.imgur.com/ifOqPcp.png")
                .setColor("#00c2ff")
                .setTimestamp()
                .addField("Experience", `**Place**: ${curPosExp} \n**Value**: ${curValExp} ${diffExp} \n**Previusly**: ${precValExp}`)
                .addField("Gold Boxes", `**Place**: ${curPosGold} \n**Value**: ${curValGold} ${diffGold} \n**Previusly**: ${precValGold}`)
                .addField("Crystals", `**Place**: ${curPosCry} \n**Value**: ${curValCry} ${diffCry} \n**Previusly**: ${precValCry}`)
                .addField("Efficiency", `**Place**: ${curPosEff} \n**Value**: ${curValEff} \n**Previusly**: —`)
                message.channel.send({embed:embed})
            }
        })
    }
}
