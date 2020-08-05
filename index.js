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
const fs = require('fs');

// Json files
const lv = require("./storage/levels.json");
const config = require('./config.json');

// Bot prefix
const prefix = '>';

// New discord client
const client = new Discord.Client();

// Commands Collection
client.commands = new Discord.Collection();

const commandsDirs = fs.readdirSync('./commands');

for (const dir of commandsDirs) {
    const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        client.commands.set(command.name, command);
    }
}

// Cooldowns
const cooldowns = new Discord.Collection();

// Enviroment
let env;
if (config['dev']) {
    env = 'development';
} else {
    env = 'production';
}

console.log('[Tanki Bot] Starting in "' + env + '".');

// Database Connection
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

// Startup
client.on('ready', async () => {
    console.log('[Tanki Bot] Started!');
    client.user.setActivity("Tanki Online", {
        type: "PLAYING"
    });
});

// Message
client.on('message', async message => {

    // ====================
    // Command Handler (https://discordjs.guide/command-handling/)
    // ====================
    
    if (!message.content.startsWith(prefix)) return;    // Check for prefix

    if (message.author.bot) return;                     // Check that author is not a bot

    if (message.channel.type !== 'text') return;        // Check that the message is not in DMs

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    console.log(`[CMD] ${message.author.username} (${message.author.id}) used the command ${command.name}`);

	if (!command) return;

	if (command.args && !args.length) {
        const errEmbed = new Discord.RichEmbed()
            .setAuthor(`❌ Wrong usage of the command ${command.name}!`)
            .setColor('#f54242')
            
		if (command.usage) {
			errEmbed.addField(`Correct usage`, command.usage);
		} else {
            errEmbed.addField(`Correct usage`, `\`>${command.name}\``)
        }

		return message.channel.send({ embed:errEmbed });
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            
            const timeEmbed = new Discord.RichEmbed()
                .setAuthor(`Wait ${timeLeft.toFixed(1)} seconds to use this command again!`)
                .setColor('#f54242');

            message.delete(1000);

            return message.channel.send({ embed:timeEmbed }).then(msg => {
                msg.delete(1000);
            });
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args, con);
	} catch (error) {
        console.error(error);
        
        const msgError = new Discord.RichEmbed()
            .setAuthor(`There was an error while executing this command. Try again later. In the meantime try contacting the bot developer. Thanks.`)
            .setColor('#f54242');

		message.channel.send({ embed:msgError }).then(msg => {
            msg.delete(10000);
        })
    }
    
    
    // =====================
    // Leveling System
    // =====================

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

});

// Token
client.login(config[env]['token']);