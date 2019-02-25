const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const api = "https://ratings.tankionline.com/get_stat/profile/?user=";

module.exports.run = async(client, message, args, tools) => {

	nome = args[0];

	let nonUsNome = new Discord.RichEmbed()
		.setAuthor("You didn't put a nickname.")
		.setColor("#87d704");

	let nonEsiste = new Discord.RichEmbed()
		.setAuthor("This user doesn't exist.")
		.setColor("#87d704");

	if (!nome) {
		message.channel.send({
			embed: nonUsNome
		});
	} else {
		snekfetch.get(api + args[0]).then(r => {

			if (!r.body.response) {
				message.channel.send({
					embed: nonEsiste
				});
			} else {

				var nome = r.body.response.name;

				var nuno = (r.body.response.suppliesUsage[0].name).toLocaleString('en');
				var ndue = (r.body.response.suppliesUsage[1].name).toLocaleString('en');
				var ntre = (r.body.response.suppliesUsage[2].name).toLocaleString('en');
				var nqua = (r.body.response.suppliesUsage[3].name).toLocaleString('en');
				var ncin = (r.body.response.suppliesUsage[4].name).toLocaleString('en');
				var nsei = (r.body.response.suppliesUsage[5].name).toLocaleString('en');
				var nset = (r.body.response.suppliesUsage[6].name).toLocaleString('en');

				var uuno = (r.body.response.suppliesUsage[0].usages).toLocaleString('en');
				var udue = (r.body.response.suppliesUsage[1].usages).toLocaleString('en');
				var utre = (r.body.response.suppliesUsage[2].usages).toLocaleString('en');
				var uqua = (r.body.response.suppliesUsage[3].usages).toLocaleString('en');
				var ucin = (r.body.response.suppliesUsage[4].usages).toLocaleString('en');
				var usei = (r.body.response.suppliesUsage[5].usages).toLocaleString('en');
				var uset = (r.body.response.suppliesUsage[6].usages).toLocaleString('en');

				var ac = "\n";
				var dp = ": ";

				var uno = nuno + dp + uuno;
				var due = ac + ndue + dp + udue;
				var tre = ac + ntre + dp + utre;
				var qua = ac + nqua + dp + uqua
				var cin = ac + ncin + dp + ucin;
				var sei = ac + nsei + dp + usei;
				var set = ac + nset + dp + uset;

				var lista = uno + due + tre + qua + cin + sei + set;

				//embed
				let potEmb = new Discord.RichEmbed()
					.setTitle("Tanki Online Ratings - Supplies " + nome)
					.setURL("https://ratings.tankionline.com/en/user/" + nome)
					.setFooter("Bot made by gb_factory#5365")
					.setColor("#00ff19")
					.setTimestamp()
					.setThumbnail("https://www.gb-factory.com/tankionline/images/supplies.png")
					.addField("Supplies Used", lista);

				message.channel.send({
					embed: potEmb
				});
			}


		})
	}


}
