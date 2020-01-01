const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const prefix = '>';

let db = require("./storage/users.json");
let lv = require("./storage/levels.json");

client.on('message', async message => {

    // xp x msg
    var xpMsg = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    //console.log(xpMsg);

    // LIVELLI v2019//

    // Se un utente è registrato nel database aggiunge xp e lvl.
    if (db[message.author.id]) {
        db[message.author.id].xp += xpMsg;  //aumenta xp ogni msg

        // rankup
        if (lv[db[message.author.id].level + 1].exp <= db[message.author.id].xp) {
            db[message.author.id].level ++;  // aumenta lvl
            db[message.author.id].cry +=lv[db[message.author.id].level].crystals    // aumenta crys

            let lvupEmbed = new Discord.RichEmbed()
                .setColor("#ffc300")
                .setThumbnail(lv[db[message.author.id].level].image)
                .addField("✨ Rank up! ✨", `Congratulazioni **${message.author.username}**! \nOra sei al rank **${lv[db[message.author.id].level].name}** \n+${lv[db[message.author.id].level].crystals} 💎`)

            message.channel.send({embed:lvupEmbed});
        }

        fs.writeFile("./storage/users.json", JSON.stringify(db), (err) => {
            if (err) console.log(err)
        });

    }


    // COMMAND HANDLER v2018//

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let youCant = new Discord.RichEmbed()
    .setAuthor("Non puoi usare il bot in questo canale!")
    .setColor("#87d704");

    // blocco msg nel canale general di italian culture server
    if (message.channel.id === '488001350320259076'){
        message.channel.send({embed:youCant});
        return;
    }
    // end blocco msg

    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    } catch (e) {
        console.log(e.message);
    } finally {
        console.log(`${message.author.tag} used ${cmd}`);
    }

});


// AVVIO BOT //

client.on('ready', async () => {
    console.log('Bot avviato!');
    client.user.setActivity("Tanki Online", {
        type: "PLAYING"
    });
});


// TOKEN //

const token = ""
client.login(token);
