const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const api = "https://ratings.tankionline.com/get_stat/profile/?user=";

module.exports.run = async(client, message, args, tools) => {

	nome = args[0];

	// let noNome = new Discord.RichEmbed()
	// .setTitle("Tanki Online Ratings - Gamemodes")
	// .setURL("https://ratings.tankionline.com/en/")
	// .setFooter("Bot made by gb_factory#5365")
	// .setColor("#87d704")
	// .setTimestamp()
	// .setThumbnail("https://www.gb-factory.com/tankionline/images/gamemodes.png")
	// .addField("Description", "Display the statistics of a user in the differents gamemodes")
	// .addField("Usage", ">gamemodes *user nickname*")
	// .addField("Linking", "If you don't want to type your nickname every time you can link your account using the **>link** command.");

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

				//esperienza guadagnata
				var euno = (r.body.response.modesPlayed[0].scoreEarned).toLocaleString('en'); //dm
				var edue = (r.body.response.modesPlayed[1].scoreEarned).toLocaleString('en'); //tdm
				var etre = (r.body.response.modesPlayed[2].scoreEarned).toLocaleString('en'); //ctf
				var equa = (r.body.response.modesPlayed[3].scoreEarned).toLocaleString('en'); //cp
				var ecin = (r.body.response.modesPlayed[4].scoreEarned).toLocaleString('en'); //as
				var esei = (r.body.response.modesPlayed[5].scoreEarned).toLocaleString('en'); //rgb
				var eset = (r.body.response.modesPlayed[6].scoreEarned).toLocaleString('en'); //jgr

				//tempo giocato
				var puno = (r.body.response.modesPlayed[0].timePlayed).toLocaleString('en'); //dm
				var pdue = (r.body.response.modesPlayed[1].timePlayed).toLocaleString('en'); //tdm
				var ptre = (r.body.response.modesPlayed[2].timePlayed).toLocaleString('en'); //ctf
				var pqua = (r.body.response.modesPlayed[3].timePlayed).toLocaleString('en'); //cp
				var pcin = (r.body.response.modesPlayed[4].timePlayed).toLocaleString('en'); //as
				var psei = (r.body.response.modesPlayed[5].timePlayed).toLocaleString('en'); //rgb
				var pset = (r.body.response.modesPlayed[6].timePlayed).toLocaleString('en'); //jgr

				var ac = "\n";

				var dmo = "<:expstar:532190290308759552> **Score**: " + euno + ac + "🕓 **Time**: " + puno;
				var tdm = "<:expstar:532190290308759552> **Score**: " + edue + ac + "🕓 **Time**: " + pdue;
				var ctf = "<:expstar:532190290308759552> **Score**: " + etre + ac + "🕓 **Time**: " + ptre;
				var cpo = "<:expstar:532190290308759552> **Score**: " + equa + ac + "🕓 **Time**: " + pqua;
				var aso = "<:expstar:532190290308759552> **Score**: " + ecin + ac + "🕓 **Time**: " + pcin;
				var rgb = "<:expstar:532190290308759552> **Score**: " + esei + ac + "🕓 **Time**: " + psei;
				var jgr = "<:expstar:532190290308759552> **Score**: " + eset + ac + "🕓 **Time**: " + pset;

				//embed
				let embed = new Discord.RichEmbed()
					.setTitle("Tanki Online Ratings - Gamemodes " + nome)
					.setURL("https://ratings.tankionline.com/en/user/" + nome)
					.setFooter("Bot made by gb_factory#5365")
					.setColor("#87d704")
					.setTimestamp()
					.setThumbnail("https://www.gb-factory.com/tankionline/images/gamemodes.png")
					.addField("<:dm:532232815392325634> Deathmatch", dmo, true)
					.addField("<:tdm:532232815429943305> Team Deathmatch", tdm, true)
					.addField("<:ctf:532232815186542593> Capture The Flag", ctf, true)
					.addField("<:cp:532232815530606596> Control Points", cpo, true)
					.addField("<:as:532232815325085706> Assault", aso, true)
					.addField("<:rgb:532232815434006529> Rugby", rgb, true)
					.addField("<:jgr:532232815383805952> Juggernaut", jgr, true);

				message.channel.send({
					embed: embed
				});
			}


		})
	}


}
