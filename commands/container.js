const Discord = require("discord.js");
const fs = require("fs");

var container = require('../storage/container.json');

module.exports.run = async(client, message, args, tools) => {
	if (args[0] === "open") {

        // TODO (8 3 19)
        // - add different embeds for paints, premium and packs
        // - profile stats
        // - add items to user
        // - add no args embed
        // - add weekly container
        
        var lenght = Object.keys(container).length;
        var random = Math.floor(Math.random() * lenght);

        var type = container[random].type;
        var rarity = container[random].rarity;
        var name = container[random].name;
        var quantity = container[random].quantity;
        var image = container[random].image;

        var color;
        var exp;
        var con;
        if (rarity == "common") {
            var color = "#d3d3d3";
            var exp = 50;
            var con = "a";
        } else if (rarity == "uncommon") {
            var color = "#32cd32";
            var exp = 100;
            var con = "an";
        } else if (rarity == "rare") {
            var color = "#4169e1";
            var exp = 150;
            var con = "a";
        } else if (rarity == "epic") {
            var color = "#9400d3";
            var exp = 250;
            var con = "an";
        } else if (rarity == "legendary") {
            var color = "#ffd700";
            var exp = 350;
            var con = "a";
        } else if (rarity == "exotic") {
            var color = "#fa8072";
            var exp = 500;
            var con = "an";
        }

        let itemEmbed = new Discord.RichEmbed()
        .setTitle("Tanki Online Container")
        .setDescription(`**You found ${con} ${rarity} item: ** ${quantity} ${name}`)
        .setThumbnail(image)
        .setColor(color)
        .setFooter(` ${message.author.username} | +${exp}xp`, message.author.avatarURL)

        message.channel.send({embed:itemEmbed});

	} else if (args[0] === "us") {

	} else {

	}

}
