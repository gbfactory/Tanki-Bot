const Discord = require("discord.js");

let db = require("../storage/users.json");

module.exports.run = async (client, message, args) => {

    if (!db[message.author.id]) {
        let rgNo  = new Discord.RichEmbed()
            .setAuthor("Non sei registrato!")
            .setColor("#f54242");
        message.channel.send({embed:rgNo});
        return;
    }

    let inArrivo = new Discord.RichEmbed()
        .setColor("#00ffff")
        .setAuthor("Tanki Bot")
        .setTitle("Benvenuto nel Tanki Bot Shop!")
        .setDescription("Questa categoria sarà disponibile prossimamente!")
        .setThumbnail('https://en.tankiwiki.com/images/en/thumb/3/39/Shop_logo.jpg/400px-Shop_logo.jpg.png')

    if (args[0] == "turrets") {
        message.channel.send({embed:inArrivo});
    } else if (args[0] == "hulls") {
        message.channel.send({embed:inArrivo});
    } else if (args[0] == "containers") {

        let shopContainers = new Discord.RichEmbed()
            .setColor("#00ffff")
            .setThumbnail('https://i.imgur.com/CtoiatU.png')
            .setAuthor("Tanki Bot")
            .setTitle("<:MenuShop:661186115310583808> Shop Containers")
            .setDescription("Quanti containers vuoi acquistare?")
            .addField("<:MenuContainers:661186115147137056> 1 Container", "10.000 💎", true)
            .addField("<:MenuContainers:661186115147137056> 5 Containers", "50.000 💎", true)
            .addField("<:MenuContainers:661186115147137056> 15 Containers", "150.000 💎", true)
            .addField("<:MenuContainers:661186115147137056> 30 Containers", "300.000 💎", true)
            .addField("<:MenuContainers:661186115147137056> 50 Containers", "500.000 💎", true)
            .addField("<:MenuContainers:661186115147137056> Quanti ne vuoi?", ">buy <quantità>", true)
            .setFooter("Bot by gb_factory");

        message.channel.send({embed:shopContainers});
    } else {
        
        let shop = new Discord.RichEmbed()
            .setColor("#00ffff")
            .setAuthor("Tanki Bot")
            .setTitle("<:MenuShop:661186115310583808> Tanki Bot Shop!")
            .setDescription("Cosa vorresti acquistare?")
            .addField("Categorie:", "```>shop turrets``` ```>shop hulls``` ```>shop containers``` ```>shop passes```")
            .setThumbnail('https://en.tankiwiki.com/images/en/thumb/3/39/Shop_logo.jpg/400px-Shop_logo.jpg.png')
            .setFooter("Bot by gb_factory");

        message.channel.send({embed:shop})
    }

}
