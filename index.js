/**
 * Tanki Bot
 * 
 * Main index file.
 * 
 * @author gbfactory
 * @since  12.07.2017
*/

// Dependencies
const Discord = require('discord.js');
const mysql = require("mysql");

// New discord client
const client = new Discord.Client();

// Bot prefix
const prefix = '>';

// Json files
let lv = require("./storage/levels.json");
let config = require('./config.json');

// Mysql connection to db
let env;
if (config['dev']) {
    env = 'development';
} else {
    env = 'production';
}

console.log('[Tanki Bot] Starting in "' + env + '".');

var con = mysql.createConnection({
    host: config[env]['database']['host'],
    user: config[env]['database']['user'],
    password: config[env]['database']['password'],
    database: config[env]['database']['database']
});

con.connect(err => {
    if (err) throw err;
    console.log("[Tanki Bot] Connected to the database!");
})

// On message event
client.on('message', async message => {

    // LEVELING SYSTEM
    // commands don't give xp!
    var authorId = message.author.id;
    var authorName = message.author.username;

    var xpMsg = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

    con.query(`SELECT * FROM users WHERE id = '${authorId}'`, (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {

            // exp 
            let xp = rows[0].xp;
            con.query(`UPDATE users SET xp = ${xp + xpMsg} WHERE id = '${authorId}'`);
        
            // ranks
            let lvl = rows[0].level;

            if (lvl < 30) {
                if (lv[lvl + 1].exp <= xp) {
                    let crys = rows[0].crys;
                    let addCrys = lv[lvl + 1].crystals;
                    
                    con.query(`UPDATE users SET level = ${lvl + 1} WHERE id = '${authorId}'`);
                    con.query(`UPDATE users SET crys = ${crys + addCrys} WHERE id = '${authorId}'`);
        
                    let lvupEmbed = new Discord.RichEmbed()
                        .setColor("#ffc300")
                        .setThumbnail(lv[lvl + 1].image)
                        .addField("✨ Rank up! ✨", `🎉 Congratulations **${authorName}**! \nNow you are **${lv[lvl + 1].name}** \n+${lv[lvl + 1].crystals} 💎`)
        
                    message.channel.send({embed:lvupEmbed});
                }
            }
        }
    });

    // Vars
    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Check if the author is a bot
    if (message.author.bot) return;

    // Check if the message doesn't start with the prefix
    if (!message.content.startsWith(prefix)) return;

    // Check if the message is from dm
    if (message.channel.type !== 'text') return;

    // Command handler
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, con);
    } catch (e) {
        //console.log(e.message);
        console.log(`[Command Handler] ${message.author.tag} used a non existing cmd (${cmd})`);
    } finally {
        console.log(`[Command Handler] ${message.author.tag} used ${cmd}`);
    }

});

// Bot on start
client.on('ready', async () => {
    console.log('[Tanki Bot] Started!');
    client.user.setActivity("Tanki Online", {
        type: "PLAYING"
    });
});

// Token
client.login(config[env]['token']);