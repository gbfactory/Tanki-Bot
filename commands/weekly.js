const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const api = "https://ratings.tankionline.com/get_stat/profile/?user=";

module.exports.run = async (client, message, args, tools) => {

    nome = args[0];

    let nonUsNome = new Discord.RichEmbed()
      .setAuthor("You didn't put a nickname.")
      .setColor("#87d704");

    let nonEsiste = new Discord.RichEmbed()
      .setAuthor("This user doesn't exist.")
      .setColor("#87d704");

    if (!nome) {
        message.channel.send({embed:nonUsName});
    } else {
        snekfetch.get(api + args[0]).then(r =>{

            if (!r.body.response) {
                message.channel.send({embed:nonEsiste});
            } else {

                var nome = r.body.response.name;

                //ratings correnti
                //posizione
                var poscry = ((r.body.response.rating.crystals.position).toLocaleString('en')).replace("-1", "0");
                var posgol = ((r.body.response.rating.golds.position).toLocaleString('en')).replace("-1", "0");
                var possco = ((r.body.response.rating.score.position).toLocaleString('en')).replace("-1", "0");
                var poseff = ((r.body.response.rating.efficiency.position).toLocaleString('en')).replace("-1", "0");

                //valore
                var valcry = ((r.body.response.rating.crystals.value).toLocaleString('en')).replace("-1", "0");
                var valgol = ((r.body.response.rating.golds.value).toLocaleString('en')).replace("-1", "0");
                var valsco = ((r.body.response.rating.score.value).toLocaleString('en')).replace("-1", "0");
                var valeff = ((r.body.response.rating.efficiency.value).toLocaleString('en')).replace("-1", "0");

                //rating precedenti
                //posizione
                var pposcry = ((r.body.response.previousRating.crystals.position).toLocaleString('en')).replace("-1", "0");
                var pposgol = ((r.body.response.previousRating.golds.position).toLocaleString('en')).replace("-1", "0");
                var ppossco = ((r.body.response.previousRating.score.position).toLocaleString('en')).replace("-1", "0");

                //valore
                var pvalcry = ((r.body.response.previousRating.crystals.value).toLocaleString('en')).replace("-1", "0");
                var pvalgol = ((r.body.response.previousRating.golds.value).toLocaleString('en')).replace("-1", "0");
                var pvalsco = ((r.body.response.previousRating.score.value).toLocaleString('en')).replace("-1", "0");

                //embed
                let embed = new Discord.RichEmbed()
                .setTitle("Tanki Online Ratings - Weekly " + nome)
                .setURL("https://ratings.tankionline.com/en/user/" + nome)
                .setFooter("Bot sviluppato da GB Factory")
        				.setThumbnail("https://www.gb-factory.com/tankionline/images/weekly.png")
                .setColor("#00c2ff")
                .setTimestamp()
                .addField("Experience", "**Place**: " + possco + "\n**Value**: " + valsco + "\n**Previusly**: " + pvalsco, true)
                .addField("Gold Boxes", "**Place**: " + posgol + "\n**Value**: " + valgol + "\n**Previusly**: " + pvalgol, true)
                .addField("Crystals", "**Place**: " + poscry + "\n**Value**: " + valcry + "\n**Previusly**: " + pvalcry, true)
                .addField("Efficiency", "**Place**: " + poseff + "\n**Value**: " + valeff + "\n**Previusly**: —", true);

                message.channel.send({embed:embed})
            }


        })
    }


}
