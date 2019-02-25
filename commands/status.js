const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const statusEn = "https://tankionline.com/s/status.js";
const statusUs = "https://tankionline.com/s/status_us.js";

module.exports.run = async(client, message, args, tools) => {
	if (args[0] === "en") {

		snekfetch.get(statusEn).then(en => {
			let sen = JSON.parse(en.body.toString());

			let c01online = sen.nodes['main.c1'].online;
			let c02online = sen.nodes['main.c2'].online;
			let c03online = sen.nodes['main.c3'].online;
			let c04online = sen.nodes['main.c4'].online;
			let c05online = sen.nodes['main.c5'].online;
			let c06online = sen.nodes['main.c6'].online;
			let c07online = sen.nodes['main.c7'].online;
			let c08online = sen.nodes['main.c8'].online;
			let c09online = sen.nodes['main.c9'].online;
			let c10online = sen.nodes['main.c10'].online;
			let c11online = sen.nodes['main.c11'].online;
			let c12online = sen.nodes['main.c12'].online;
			let c13online = sen.nodes['main.c13'].online;
			let c14online = sen.nodes['main.c14'].online;
			let c15online = sen.nodes['main.c15'].online;
			let c16online = sen.nodes['main.c16'].online;
			let c17online = sen.nodes['main.c17'].online;
			let c18online = sen.nodes['main.c18'].online;
			let c19online = sen.nodes['main.c19'].online;
      let c20online = sen.nodes['main.c20'].online;

			let c01inbattles = sen.nodes['main.c1'].inbattles;
			let c02inbattles = sen.nodes['main.c2'].inbattles;
			let c03inbattles = sen.nodes['main.c3'].inbattles;
			let c04inbattles = sen.nodes['main.c4'].inbattles;
			let c05inbattles = sen.nodes['main.c5'].inbattles;
			let c06inbattles = sen.nodes['main.c6'].inbattles;
			let c07inbattles = sen.nodes['main.c7'].inbattles;
			let c08inbattles = sen.nodes['main.c8'].inbattles;
			let c09inbattles = sen.nodes['main.c9'].inbattles;
			let c10inbattles = sen.nodes['main.c10'].inbattles;
			let c11inbattles = sen.nodes['main.c11'].inbattles;
			let c12inbattles = sen.nodes['main.c12'].inbattles;
			let c13inbattles = sen.nodes['main.c13'].inbattles;
			let c14inbattles = sen.nodes['main.c14'].inbattles;
			let c15inbattles = sen.nodes['main.c15'].inbattles;
			let c16inbattles = sen.nodes['main.c16'].inbattles;
			let c17inbattles = sen.nodes['main.c17'].inbattles;
			let c18inbattles = sen.nodes['main.c18'].inbattles;
			let c19inbattles = sen.nodes['main.c19'].inbattles;
			let c20inbattles = sen.nodes['main.c20'].inbattles;

      let c01idle = c01online - c01inbattles;
      let c02idle = c02online - c02inbattles;
      let c03idle = c03online - c03inbattles;
      let c04idle = c04online - c04inbattles;
      let c05idle = c05online - c05inbattles;
      let c06idle = c06online - c06inbattles;
      let c07idle = c07online - c07inbattles;
      let c08idle = c08online - c08inbattles;
      let c09idle = c09online - c09inbattles;
      let c10idle = c10online - c10inbattles;
      let c11idle = c11online - c11inbattles;
      let c12idle = c12online - c12inbattles;
      let c13idle = c13online - c13inbattles;
      let c14idle = c14online - c14inbattles;
      let c15idle = c15online - c15inbattles;
      let c16idle = c16online - c16inbattles;
      let c17idle = c17online - c17inbattles;
      let c18idle = c18online - c18inbattles;
      let c19idle = c19online - c19inbattles;
      let c20idle = c20online - c20inbattles;

			var online = c01online + c02online + c03online + c04online + c05online + c06online + c07online + c08online + c09online + c10online + c11online + c12online + c13online + c14online + c15online + c16online + c17online + c18online + c19online + c20online;
			var inbattles = c01inbattles + c02inbattles + c03inbattles + c04inbattles + c05inbattles + c06inbattles + c07inbattles + c08inbattles + c09inbattles + c10inbattles + c11inbattles + c12inbattles + c13inbattles + c14inbattles + c15inbattles + c16inbattles + c17inbattles + c18inbattles + c19inbattles + c20inbattles;
			var idle = online - inbattles;

			var onlinefix = (online).toLocaleString('en');
			var inbattlesfix = (inbattles).toLocaleString('en');
			var idlefix = (idle).toLocaleString('en');

			var battperc = (inbattles / online) * 100;
			var idleperc = (idle / online) * 100;

			var battpercfix = battperc.toFixed(2);
			var idlepercfix = idleperc.toFixed(2);

			let embedEN = new Discord.RichEmbed()
				.setTitle("**Tanki Online Status - EN**")
				.setURL("https://tankionline.com/en/")
				.setFooter("Bot made by gb_factory#5365")
				.setColor("#87d704")
				.setTimestamp()
				.addField("**Online**", onlinefix, true)
				.addField("**In Battle**", inbattlesfix, true)
				.addField("**Idle**", idlefix, true)
				.addField("**In Battle Percentage**", battpercfix + " %", true)
				.addField("**Idle Percentage**", idlepercfix + " %", true);

			let serverEN = new Discord.RichEmbed()
				.setTitle("**Tanki Online Status - EN Servers**")
				.setURL("https://tankionline.com/en/")
				.setFooter("Bot made by gb_factory#5365")
				.setColor("#87d704")
				.setTimestamp()
				.addField("Server EN 1", "👥 **Online**: " + c01online + "\n⚔ **In Battle**: " + c01inbattles + "\n☕ **Idle**: " + c01idle, true)
				.addField("Server EN 2", "👥 **Online**: " + c02online + "\n⚔ **In Battle**: " + c02inbattles + "\n☕ **Idle**: " + c02idle, true)
				.addField("Server EN 3", "👥 **Online**: " + c03online + "\n⚔ **In Battle**: " + c03inbattles + "\n☕ **Idle**: " + c03idle, true)
				.addField("Server EN 4", "👥 **Online**: " + c04online + "\n⚔ **In Battle**: " + c04inbattles + "\n☕ **Idle**: " + c04idle, true)
				.addField("Server EN 5", "👥 **Online**: " + c05online + "\n⚔ **In Battle**: " + c05inbattles + "\n☕ **Idle**: " + c05idle, true)
				.addField("Server EN 6", "👥 **Online**: " + c06online + "\n⚔ **In Battle**: " + c06inbattles + "\n☕ **Idle**: " + c06idle, true)
				.addField("Server EN 7", "👥 **Online**: " + c07online + "\n⚔ **In Battle**: " + c07inbattles + "\n☕ **Idle**: " + c07idle, true)
				.addField("Server EN 8", "👥 **Online**: " + c08online + "\n⚔ **In Battle**: " + c08inbattles + "\n☕ **Idle**: " + c08idle, true)
				.addField("Server EN 9", "👥 **Online**: " + c09online + "\n⚔ **In Battle**: " + c09inbattles + "\n☕ **Idle**: " + c09idle, true)
				.addField("Server EN 10", "👥 **Online**: " + c10online + "\n⚔ **In Battle**: " + c10inbattles + "\n☕ **Idle**: " + c10idle, true)
				.addField("Server EN 11", "👥 **Online**: " + c11online + "\n⚔ **In Battle**: " + c11inbattles + "\n☕ **Idle**: " + c11idle, true)
				.addField("Server EN 12", "👥 **Online**: " + c12online + "\n⚔ **In Battle**: " + c12inbattles + "\n☕ **Idle**: " + c12idle, true)
				.addField("Server EN 13", "👥 **Online**: " + c13online + "\n⚔ **In Battle**: " + c13inbattles + "\n☕ **Idle**: " + c13idle, true)
				.addField("Server EN 14", "👥 **Online**: " + c14online + "\n⚔ **In Battle**: " + c14inbattles + "\n☕ **Idle**: " + c14idle, true)
				.addField("Server EN 15", "👥 **Online**: " + c15online + "\n⚔ **In Battle**: " + c15inbattles + "\n☕ **Idle**: " + c15idle, true)
				.addField("Server EN 16", "👥 **Online**: " + c16online + "\n⚔ **In Battle**: " + c16inbattles + "\n☕ **Idle**: " + c16idle, true)
				.addField("Server EN 17", "👥 **Online**: " + c17online + "\n⚔ **In Battle**: " + c17inbattles + "\n☕ **Idle**: " + c17idle, true)
				.addField("Server EN 18", "👥 **Online**: " + c18online + "\n⚔ **In Battle**: " + c18inbattles + "\n☕ **Idle**: " + c18idle, true)
				.addField("Server EN 19", "👥 **Online**: " + c19online + "\n⚔ **In Battle**: " + c19inbattles + "\n☕ **Idle**: " + c19idle, true)
				.addField("Server EN 20", "👥 **Online**: " + c20online + "\n⚔ **In Battle**: " + c20inbattles + "\n☕ **Idle**: " + c20idle, true)
				.addField("Server EN TOTAL", "👥 Online: " + online + "\n⚔ **In Battle**: " + inbattles + "\n☕ **Idle**: " + idle, true);

			if (args[1] === "servers") {
				message.channel.send({
					embed: serverEN
				});
			} else {
				message.channel.send({
					embed: embedEN
				});
			}

		});

	} else if (args[0] === "us") {

		snekfetch.get(statusUs).then(us => {
			let sus = JSON.parse(us.body.toString());

			let usc1online = sus.nodes['us-main.c1'].online;
			let usc2online = sus.nodes['us-main.c2'].online;

			let usc1inbatt = sus.nodes['us-main.c1'].inbattles;
			let usc2inbatt = sus.nodes['us-main.c2'].inbattles;

      let usc1idleca = usc1online - usc1inbatt;
      let usc2idleca = usc2online - usc2inbatt;

			var usonline = usc1online + usc2online;
			var usinbattles = usc1inbatt + usc2inbatt;
			var usidle = usonline - usinbattles;

			var usonlinefix = (usonline).toLocaleString('en');
			var usinbattlesfix = (usinbattles).toLocaleString('en');
			var usidlefix = (usidle).toLocaleString('en');

			var usbattperc = (usinbattles / usonline) * 100;
			var usidleperc = (usidle / usonline) * 100;

			var usbattpercfix = usbattperc.toFixed(2);
			var usidlepercfix = usidleperc.toFixed(2);

			let embedUS = new Discord.RichEmbed()
				.setTitle("**Tanki Online Status - US**")
				.setURL("https://tankionline.com/br/")
				.setFooter("Bot made by gb_factory#5365")
				.setColor("#87d704")
				.setTimestamp()
				.addField("**Online**", usonlinefix, true)
				.addField("**In Baattle**", usinbattlesfix, true)
				.addField("**Idle**", usidlefix, true)
				.addField("**In Battle Percentage**", usbattpercfix + " %", true)
				.addField("**Idle Percentage**", usidlepercfix + " %", true);

			let serverUS = new Discord.RichEmbed()
				.setTitle("**Tanki Online Status - US**")
				.setURL("https://tankionline.com/br/")
				.setFooter("Bot made by gb_factory#5365")
				.setColor("#87d704")
				.setTimestamp()
				.addField("Server US 1", "👥 **Online**: " + usc1online + "\n⚔ **In Battle**: " + usc1inbatt + "\n☕ **Idle**: " + usc1idleca, true)
        .addField("Server US 2", "👥 **Online**: " + usc2online + "\n⚔ **In Battle**: " + usc2inbatt + "\n☕ **Idle**: " + usc2idleca, true)
        .addField("Server US TOTAL", "👥 **Online**: " + usonline + "\n⚔ **In Battle**: " + usinbattles + "\n☕ **Idle**: " + usidle, true);

			if (args[1] === "servers") {
				message.channel.send({
					embed: serverUS
				});
			} else {
				message.channel.send({
					embed: embedUS
				});
			}
		});

	} else {

		let noArg = new Discord.RichEmbed()
			.setTitle("**Tanki Online Status**")
			.setURL("https://ratings.tankionline.com/en/")
			.setFooter("Bot made by gb_factory#5365")
			.setColor("#87d704")
			.setThumbnail("https://www.gb-factory.com/tankionline/assets/server.png")
			.addField("Description", "Display the Tanki's server load.")
			.addField("Usage", ">status en \n>status en servers \n>status us \n>status us servers");

		message.channel.send({
			embed: noArg
		});

	}

}
