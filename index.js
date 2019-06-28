const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const prefix = '>';

let xp = require("./storage/xp.json");
let lv = require("./storage/levels.json");

client.on('message', message => {

    // RANKS //

    // Xp aggiungi ogni messaggio scritto.
    let xpMsg = 1;

    // Se un utente è registrato nel database aggiunge xp e lvl.
    if (xp[message.author.id]) {
        xp[message.author.id].xp = xp[message.author.id].xp + xpMsg;
        if (lv[xp[message.author.id].level + 1].exp <= xp[message.author.id].xp) {
            xp[message.author.id].level = xp[message.author.id].level + 1;
            let lvupEmbed = new Discord.RichEmbed()
                .setColor("#ffc300")
                .setThumbnail(lv[xp[message.author.id].level].image)
                .addField("✨ Rank up! ✨", `Congratulazioni **${message.author.username}**! \nOra sei al rank **${lv[xp[message.author.id].level].name}** \n+${lv[xp[message.author.id].level].crystals} 💎`)

            message.channel.send({embed:lvupEmbed});
        }
        fs.writeFile("./storage/xp.json", JSON.stringify(xp), (err) => {
            if (err) console.log(err)
        });
    }


    // COMMAND HANDLER //

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    } catch (e) {
        console.log(e.message);
    } finally {
        console.log(`${message.author.tag} ha usato il comando ${cmd}`);
    }

});

// AVVIO BOT //

client.on('ready', async () => {
    console.log('Bot avviato!');
    client.user.setActivity("TankiBot", {
        type: "WATCHING"
    });
});

// TOKEN //

const token = ""
client.login(token);
