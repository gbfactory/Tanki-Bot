const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const api = "https://ratings.tankionline.com/api/eu/profile/?user=";

module.exports.run = async(client, message, args, tools) => {

	nome = args[0];

	if (!nome) {
		message.channel.send("Inserisci un nickname");
	} else {
		snekfetch.get(api + args[0]).then(r => {

			if (!r.body.response) {
				message.channel.send("Questo utente non esiste");
			} else {

				var nome = r.body.response.name;

				numrank = r.body.response.rank;

				if ((numrank) == 1) {
					rank = 'Recruit';
					rankimg = 'recruit';
				} else if ((numrank) == 2) {
					rank = 'Private';
					rankimg = 'private';
				} else if ((numrank) == 3) {
					rank = "Gefreiter";
					rankimg = "gefreiter";
				} else if ((numrank) == 4) {
					rank = "Corporal";
					rankimg = "corporal";
				} else if ((numrank) == 5) {
					rank = "Master Corporal";
					rankimg = "master_corporal";
				} else if ((numrank) == 6) {
					rank = "Sergeant";
					rankimg = "sergeant";
				} else if ((numrank) == 7) {
					rank = "Staff Sergeant";
					rankimg = "staff_sergeant";
				} else if ((numrank) == 8) {
					rank = "Master Sergeant";
					rankimg = "master_sergeant";
				} else if ((numrank) == 9) {
					rank = "First Sergeant";
					rankimg = "first_sergeant";
				} else if ((numrank) == 10) {
					rank = "Sergeant Major";
					rankimg = "sergeant_major";
				} else if ((numrank) == 11) {
					rank = "Warrant Officer 1";
					rankimg = "warrant_officer_1";
				} else if ((numrank) == 12) {
					rank = "Warrant Officer 2";
					rankimg = "warrant_officer_2";
				} else if ((numrank) == 13) {
					rank = "Warrant Officer 3";
					rankimg = "warrant_officer_3";
				} else if ((numrank) == 14) {
					rank = "Warrant Officer 4";
					rankimg = "warrant_officer_4";
				} else if ((numrank) == 15) {
					rank = "Warrant Officer 5";
					rankimg = "warrant_officer_5";
				} else if ((numrank) == 16) {
					rank = "Third Lieutenant";
					rankimg = "third_lieutenant";
				} else if ((numrank) == 17) {
					rank = "Second Lieutenant";
					rankimg = "second_lieutenant";
				} else if ((numrank) == 18) {
					rank = "First Lieutenant";
					rankimg = "first_lieutenant";
				} else if ((numrank) == 19) {
					rank = "Captain";
					rankimg = "captain";
				} else if ((numrank) == 20) {
					rank = "Major";
					rankimg = "major";
				} else if ((numrank) == 21) {
					rank = "Lieutenant Colonel";
					rankimg = "lieutenant_colonel";
				} else if ((numrank) == 22) {
					rank = "Colonel";
					rankimg = "colonel";
				} else if ((numrank) == 23) {
					rank = "Brigadier";
					rankimg = "brigadier";
				} else if ((numrank) == 24) {
					rank = "Major General";
					rankimg = "major_general";
				} else if ((numrank) == 25) {
					rank = "Lieutenant General";
					rankimg = "lieutenant_general";
				} else if ((numrank) == 26) {
					rank = "General";
					rankimg = "general";
				} else if ((numrank) == 27) {
					rank = "Marshal";
					rankimg = "marshal";
				} else if ((numrank) == 28) {
					rank = "Field Marshal";
					rankimg = "field_marshal";
				} else if ((numrank) == 29) {
					rank = "Commander";
					rankimg = "commander";
				} else if ((numrank) == 30) {
					rank = "Generalissimo";
					rankimg = "generalissimo";
				} else if ((numrank) > 31) {
					rankimg = "legend";
					legendrank = (numrank) - 30;
					rank = "Legend " + (legendrank);
				} else if ((numrank) == 31) {
					rank = "Legend";
					rankimg = "legend";
				}

				if ((r.body.response.hasPremium) == true) {
					rankimgdef = "https://www.gb-factory.com/tankionline/ranks/" + rankimg + "-premium.png";
				} else {
					rankimgdef = "https://www.gb-factory.com/tankionline/ranks/" + rankimg + ".png";
				}

				if ((r.body.response.hasPremium) == true) {
					rankdef = "<:premium:532190290887573504> " + rank;
				} else {
					rankdef = rank;
				}

				// ORE DI GIOCO
				var puno = r.body.response.modesPlayed[0].timePlayed; //dm
				var pdue = r.body.response.modesPlayed[1].timePlayed; //tdm
				var ptre = r.body.response.modesPlayed[2].timePlayed; //ctf
				var pqua = r.body.response.modesPlayed[3].timePlayed; //cp
				var pcin = r.body.response.modesPlayed[4].timePlayed; //as
				var psei = r.body.response.modesPlayed[5].timePlayed; //rgb
				var pset = r.body.response.modesPlayed[6].timePlayed; //jgr

				var oreSomma = puno + pdue + ptre + pqua + pcin + psei + pset;
        			var oreConve = (oreSomma / (1000 * 60 * 60)).toFixed(0);
				var oreForma = (oreConve).toLocaleString('en');


				// SCORE
				var score = (r.body.response.score).toLocaleString('en');
				var scorenext = (r.body.response.scoreNext).toLocaleString('en');
				var scoreleft = r.body.response.scoreNext - r.body.response.score;
				var scoreleftfix = (scoreleft).toLocaleString('en');

				// CRISTALLI
				var cristalli = (r.body.response.earnedCrystals).toLocaleString('en');
				var goldbox = (r.body.response.caughtGolds).toLocaleString('en');

				// GS E EFFICIENZA
				var gs = r.body.response.gearScore;

				var effpos = (r.body.response.rating.efficiency.position).toLocaleString('en');
				var effval = (r.body.response.rating.efficiency.value).toLocaleString('en');

				// KILL E MORTI
				var kill = (r.body.response.kills).toLocaleString('en');
				var morti = (r.body.response.deaths).toLocaleString('en');
				var dl = r.body.response.kills / r.body.response.deaths;
				var dlfix = dl.toFixed(2);

				// POTENZIAMENTI
				var pot0 = r.body.response.suppliesUsage[0].usages;
				var pot1 = r.body.response.suppliesUsage[1].usages;
				var pot2 = r.body.response.suppliesUsage[2].usages;
				var pot3 = r.body.response.suppliesUsage[3].usages;
				var pot4 = r.body.response.suppliesUsage[4].usages;
				var pot5 = r.body.response.suppliesUsage[5].usages;
				var pot6 = r.body.response.suppliesUsage[6].usages;
				var potn = pot0 + pot1 + pot2 + pot3 + pot4 + pot5 + pot6;
				var pott = (potn).toLocaleString('en');

				// EMBED
				let embed = new Discord.RichEmbed()
					.setTitle("Tanki Online Ratings - Profile " + nome)
					.setURL("https://ratings.tankionline.com/en/user/" + nome)
					.setFooter("Bot sviluppato da GB Factory")
					.setColor("ffdd00")
					.setThumbnail(rankimgdef)
					.setTimestamp()
					.addField("**Nome**", "<:elmetto:531923776015695883>" + nome, true)
					.addField("**Rank**", rankdef, true)
					.addField("**Stats**", "<:expstar:532190290308759552> Esperienza " + score + "/" + scorenext + " (-" + scoreleftfix + ") \n<:crystals:480373293594050562> Cristalli Ottenuti: " + cristalli + "\n<:goldbox:480376775784792071> Gold Box Prese: " + goldbox + "\n<:potenziamenti:481242124176588811> Potenziamenti Usati: " + pott + "\n🕐 Ore di gioco: " + oreForma)
					.addField("**Info**", "<:kd:531920598801055764> K/D: " + dlfix + "\n<:kills:531920598671163401> Kills: " + kill + "\n<:deaths:531920623836856320> Morti: " + morti, true)
					.addField("**GearScore**", "<:bonus:481240753197285377>" + gs + "\n**Efficiency**" + "\n<:sconti:481240708955635743> " + effval + "(#" + effpos + ")", true)

				message.channel.send({embed: embed});
			}
		});
	}
}
