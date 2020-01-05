const Discord = require("discord.js");
const snekfetch = require("snekfetch");

const api = "https://ratings.tankionline.com/api/eu/top";

module.exports.run = async (client, message, args, tools) => {

	if (args[0] === "crystals") {

		snekfetch.get(api).then(cry => {

			let cryEmb = new Discord.RichEmbed()
				.setTitle("Tanki Online Ratings - Top Crystals")
				.setURL("https://ratings.tankionline.com/en/")
				.setFooter("Bot made by gb_factory")
				.setColor("#00c2ff")
				.setThumbnail("https://i.imgur.com/90wIzOj.png")

				.addField("**1** - " + cry.body.response.crystals[0].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[0].value, true)
				.addField("**6** - " + cry.body.response.crystals[5].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[5].value, true)
				.addBlankField(true)
				.addField("**2** - " + cry.body.response.crystals[1].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[1].value, true)
				.addField("**7** - " + cry.body.response.crystals[6].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[6].value, true)
				.addBlankField(true)
				.addField("**3** - " + cry.body.response.crystals[2].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[2].value, true)
				.addField("**8** - " + cry.body.response.crystals[7].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[7].value, true)
				.addBlankField(true)
				.addField("**4** - " + cry.body.response.crystals[3].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[3].value, true)
				.addField("**9** - " + cry.body.response.crystals[8].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[8].value, true)
				.addBlankField(true)
				.addField("**5** - " + cry.body.response.crystals[4].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[4].value, true)
				.addField("**10** - " + cry.body.response.crystals[9].uid, "<:crys:660257474317910026> " + cry.body.response.crystals[9].value, true)
				.addBlankField(true)

				.setTimestamp()

			message.channel.send({ embed: cryEmb });

		});

	} else if (args[0] === "efficiency") {

		snekfetch.get(api).then(eff => {

			let effEmb = new Discord.RichEmbed()
				.setTitle("Tanki Online Ratings - Top Efficiency")
				.setURL("https://ratings.tankionline.com/en/")
				.setFooter("Bot made by gb_factory")
				.setColor("#ffa100")
				.setThumbnail("https://i.imgur.com/jNPuErF.png")

				.addField("**1** - " + eff.body.response.efficiency[0].uid, "📈 " + eff.body.response.efficiency[0].value, true)
				.addField("**6** - " + eff.body.response.efficiency[5].uid, "📈 " + eff.body.response.efficiency[5].value, true)
				.addBlankField(true)
				.addField("**2** - " + eff.body.response.efficiency[1].uid, "📈 " + eff.body.response.efficiency[1].value, true)
				.addField("**7** - " + eff.body.response.efficiency[6].uid, "📈 " + eff.body.response.efficiency[6].value, true)
				.addBlankField(true)
				.addField("**3** - " + eff.body.response.efficiency[2].uid, "📈 " + eff.body.response.efficiency[2].value, true)
				.addField("**8** - " + eff.body.response.efficiency[7].uid, "📈 " + eff.body.response.efficiency[7].value, true)
				.addBlankField(true)
				.addField("**4** - " + eff.body.response.efficiency[3].uid, "📈 " + eff.body.response.efficiency[3].value, true)
				.addField("**9** - " + eff.body.response.efficiency[8].uid, "📈 " + eff.body.response.efficiency[8].value, true)
				.addBlankField(true)
				.addField("**5** - " + eff.body.response.efficiency[4].uid, "📈 " + eff.body.response.efficiency[4].value, true)
				.addField("**10** - " + eff.body.response.efficiency[9].uid, "📈 " + eff.body.response.efficiency[9].value, true)
				.addBlankField(true)

				.setTimestamp();

			message.channel.send({ embed: effEmb });

		});

	} else if (args[0] === "golds") {

		snekfetch.get(api).then(gol => {

			let golEmb = new Discord.RichEmbed()
				.setTitle("Tanki Online Ratings - Top Golds")
				.setURL("https://ratings.tankionline.com/en/")
				.setFooter("Bot made by gb_factory")
				.setColor("#fffc00")
				.setThumbnail("https://i.imgur.com/M6wVUOH.png")

				.addField("**1** - " + gol.body.response.golds[0].uid, "<:gold:660257810797428776> " + gol.body.response.golds[0].value, true)
				.addField("**6** - " + gol.body.response.golds[5].uid, "<:gold:660257810797428776> " + gol.body.response.golds[5].value, true)
				.addBlankField(true)
				.addField("**2** - " + gol.body.response.golds[1].uid, "<:gold:660257810797428776> " + gol.body.response.golds[1].value, true)
				.addField("**7** - " + gol.body.response.golds[6].uid, "<:gold:660257810797428776> " + gol.body.response.golds[6].value, true)
				.addBlankField(true)
				.addField("**3** - " + gol.body.response.golds[2].uid, "<:gold:660257810797428776> " + gol.body.response.golds[2].value, true)
				.addField("**8** - " + gol.body.response.golds[7].uid, "<:gold:660257810797428776> " + gol.body.response.golds[7].value, true)
				.addBlankField(true)
				.addField("**4** - " + gol.body.response.golds[3].uid, "<:gold:660257810797428776> " + gol.body.response.golds[3].value, true)
				.addField("**9** - " + gol.body.response.golds[8].uid, "<:gold:660257810797428776> " + gol.body.response.golds[8].value, true)
				.addBlankField(true)
				.addField("**5** - " + gol.body.response.golds[4].uid, "<:gold:660257810797428776> " + gol.body.response.golds[4].value, true)
				.addField("**10** - " + gol.body.response.golds[9].uid, "<:gold:660257810797428776> " + gol.body.response.golds[9].value, true)
				.addBlankField(true)

				.setTimestamp();

			message.channel.send({ embed: golEmb });

		});

	} else if (args[0] === "score") {

		snekfetch.get(api).then(sco => {

			let scoEmb = new Discord.RichEmbed()
				.setTitle("Tanki Online Ratings - Top Score")
				.setURL("https://ratings.tankionline.com/en/")
				.setFooter("Bot made by gb_factory")
				.setColor("#00ff19")
				.setThumbnail("https://i.imgur.com/dcuovHE.png")

				.addField("**1** - " + sco.body.response.score[0].uid, "<:tstar:660257945350701066> " + sco.body.response.score[0].value, true)
				.addField("**6** - " + sco.body.response.score[5].uid, "<:tstar:660257945350701066> " + sco.body.response.score[5].value, true)
				.addBlankField(true)
				.addField("**2** - " + sco.body.response.score[1].uid, "<:tstar:660257945350701066> " + sco.body.response.score[1].value, true)
				.addField("**7** - " + sco.body.response.score[6].uid, "<:tstar:660257945350701066> " + sco.body.response.score[6].value, true)
				.addBlankField(true)
				.addField("**3** - " + sco.body.response.score[2].uid, "<:tstar:660257945350701066> " + sco.body.response.score[2].value, true)
				.addField("**8** - " + sco.body.response.score[7].uid, "<:tstar:660257945350701066> " + sco.body.response.score[7].value, true)
				.addBlankField(true)
				.addField("**4** - " + sco.body.response.score[3].uid, "<:tstar:660257945350701066> " + sco.body.response.score[3].value, true)
				.addField("**9** - " + sco.body.response.score[8].uid, "<:tstar:660257945350701066> " + sco.body.response.score[8].value, true)
				.addBlankField(true)
				.addField("**5** - " + sco.body.response.score[4].uid, "<:tstar:660257945350701066> " + sco.body.response.score[4].value, true)
				.addField("**10** - " + sco.body.response.score[9].uid, "<:tstar:660257945350701066> " + sco.body.response.score[9].value, true)
				.addBlankField(true)

				.setTimestamp();

			message.channel.send({ embed: scoEmb });

		});

	} else {

		let topEmb = new Discord.RichEmbed()
			.setTitle("Tanki Online Ratings - Top")
			.setURL("https://ratings.tankionline.com/en/")
			.setFooter("Bot by gb_factory")
			.setColor("#87d704")
			.setThumbnail("https://i.imgur.com/ifOqPcp.png")
			.addField("Description", "Display the top players of the week.")
			.addField("Usage", "<:crys:660257474317910026>  >top crystals \n📈  >top efficiency \n<:gold:660257810797428776>  >top golds \n<:tstar:660257945350701066>  >top score")


		message.channel.send({ embed: topEmb });

	};
}
