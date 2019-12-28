const Discord = require("discord.js");
const snekfetch = require("snekfetch");
let lv = require("../storage/levels.json");
const api = "https://ratings.tankionline.com/api/eu/profile/?user=";

module.exports.run = async(client, message, args, tools) => {

	nome = args[0];

	if (!nome) {

		let noName  = new Discord.RichEmbed()
		.setAuthor("Devi inserire un nickname!")
		.setColor("#f54242");

		message.channel.send({embed:noName});
	} else {
		snekfetch.get(api + args[0]).then(r => {

			if (!r.body.response) {

				let noUser  = new Discord.RichEmbed()
				.setAuthor("Giocatore non trovato!")
				.setColor("#f54242");

				message.channel.send({embed:noUser});
			} else {

				var nome = r.body.response.name;

				rankNum = r.body.response.rank;

				if ((rankNum) == 1) {
					rank = 'Recruit';
					rankImgN = 'recruit';
				} else if ((rankNum) == 2) {
					rank = 'Private';
					rankImgN = 'private';
				} else if ((rankNum) == 3) {
					rank = "Gefreiter";
					rankImgN = "gefreiter";
				} else if ((rankNum) == 4) {
					rank = "Corporal";
					rankImgN = "corporal";
				} else if ((rankNum) == 5) {
					rank = "Master Corporal";
					rankImgN = "master_corporal";
				} else if ((rankNum) == 6) {
					rank = "Sergeant";
					rankImgN = "sergeant";
				} else if ((rankNum) == 7) {
					rank = "Staff Sergeant";
					rankImgN = "staff_sergeant";
				} else if ((rankNum) == 8) {
					rank = "Master Sergeant";
					rankImgN = "master_sergeant";
				} else if ((rankNum) == 9) {
					rank = "First Sergeant";
					rankImgN = "first_sergeant";
				} else if ((rankNum) == 10) {
					rank = "Sergeant Major";
					rankImgN = "sergeant_major";
				} else if ((rankNum) == 11) {
					rank = "Warrant Officer 1";
					rankImgN = "warrant_officer_1";
				} else if ((rankNum) == 12) {
					rank = "Warrant Officer 2";
					rankImgN = "warrant_officer_2";
				} else if ((rankNum) == 13) {
					rank = "Warrant Officer 3";
					rankImgN = "warrant_officer_3";
				} else if ((rankNum) == 14) {
					rank = "Warrant Officer 4";
					rankImgN = "warrant_officer_4";
				} else if ((rankNum) == 15) {
					rank = "Warrant Officer 5";
					rankImgN = "warrant_officer_5";
				} else if ((rankNum) == 16) {
					rank = "Third Lieutenant";
					rankImgN = "third_lieutenant";
				} else if ((rankNum) == 17) {
					rank = "Second Lieutenant";
					rankImgN = "second_lieutenant";
				} else if ((rankNum) == 18) {
					rank = "First Lieutenant";
					rankImgN = "first_lieutenant";
				} else if ((rankNum) == 19) {
					rank = "Captain";
					rankImgN = "captain";
				} else if ((rankNum) == 20) {
					rank = "Major";
					rankImgN = "major";
				} else if ((rankNum) == 21) {
					rank = "Lieutenant Colonel";
					rankImgN = "lieutenant_colonel";
				} else if ((rankNum) == 22) {
					rank = "Colonel";
					rankImgN = "colonel";
				} else if ((rankNum) == 23) {
					rank = "Brigadier";
					rankImgN = "brigadier";
				} else if ((rankNum) == 24) {
					rank = "Major General";
					rankImgN = "major_general";
				} else if ((rankNum) == 25) {
					rank = "Lieutenant General";
					rankImgN = "lieutenant_general";
				} else if ((rankNum) == 26) {
					rank = "General";
					rankImgN = "general";
				} else if ((rankNum) == 27) {
					rank = "Marshal";
					rankImgN = "marshal";
				} else if ((rankNum) == 28) {
					rank = "Field Marshal";
					rankImgN = "field_marshal";
				} else if ((rankNum) == 29) {
					rank = "Commander";
					rankImgN = "commander";
				} else if ((rankNum) == 30) {
					rank = "Generalissimo";
					rankImgN = "generalissimo";
				} else if ((rankNum) > 31) {
					rankImgN = "legend";
					rankLegNum = (rankNum) - 30;
					rank = "Legend " + rankLegNum;
				} else if ((rankNum) == 31) {
					rank = "Legend";
					rankImgN = "legend";
				}

				if (rankNum > 31) {
					rankNumImg = 30;
				} else {
					rankNumImg = rankNum - 1;
				}

				if ((r.body.response.hasPremium) == true) {
					rankImg = lv[rankNumImg].premium;
					//console.log(rankImg);
				} else {
					rankImg = lv[rankNumImg].image;
					//console.log(rankImg);
				}

				if ((r.body.response.hasPremium) == true) {
					rankName = "<:premium:660445095396376601> " + rank;
				} else {
					rankName = rank;
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
				var xp = (r.body.response.score).toLocaleString('en');
				var xpNext = (r.body.response.scoreNext).toLocaleString('en');
				var xpLeftR = r.body.response.scoreNext - r.body.response.score;
				var xpLeft = (xpLeftR).toLocaleString('en');

				// CRISTALLI
				var cristalli = (r.body.response.earnedCrystals).toLocaleString('en');
				var goldbox = (r.body.response.caughtGolds).toLocaleString('en');

				// GEAR SCORE
				var gs = r.body.response.gearScore;

				// EFFICIENCY
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
				let ratings = new Discord.RichEmbed()
					.setTitle("Tanki Online Ratings - Profile " + nome)
					.setURL("https://ratings.tankionline.com/en/user/" + nome)
					.setFooter("Bot by GB Factory")
					.setColor("ffdd00")
					.setThumbnail(rankImg)
					.setTimestamp()
					.addField("Name", "<:elmetto:660442439441448981>" + nome, true)
					.addField("Rank", rankName, true)
					.addField("Stats", 
					"<:tstar:660257945350701066> Experience " + xp + "/" + xpNext + " (-" + xpLeft + ") \n<:crys:660257474317910026> Cristalli Ottenuti: " + cristalli + "\n<:gold:660257810797428776> Gold Box Prese: " + goldbox + "\n<:sups:660260925546168404> Potenziamenti Usati: " + pott + "\n🕐 Ore di gioco: " + oreForma)
					.addField("Info",
					"<:kd:660443817379495947> K/D: " + dlfix +
					"\n<:kk:660443817014591519> Kills: " + kill +
					"\n<:dd:660443817161392138> Morti: " + morti, true)
					.addField("GearScore", "⚙️ " + gs + "\nEfficiency" + "\n📈 " + effval + "(#" + effpos + ")", true)

				message.channel.send({embed:ratings});
			}
		});
	}
}
