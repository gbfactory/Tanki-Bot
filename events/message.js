const Discord = require('discord.js');
const config = require('../config.json');
const lv = require("../storage/levels.json");
const ms = require('ms');

module.exports = (client, con, cooldowns, functions, message) => {

    // ============================================================
    // Command Handler (https://discordjs.guide/command-handling/)
    // ============================================================
    
    if (!message.content.startsWith(config.prefix)) return;     // Check that the msg starts with the prefix

    if (message.author.bot) return;                             // Check that author is not a bot

    if (message.channel.type !== 'text') return;                // Check that the message is not in DMs

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
    console.log(`[CMD] ${message.author.username} (${message.author.id}) used the command ${command.name} ${args.join(' ')}`);

    if (command.args && !args.length) {
        const errEmbed = new Discord.MessageEmbed()
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

    if (timestamps.has(message.author.id) /*&& message.author.id != '397387465024864257'*/) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = ms(expirationTime - now, { long: true });
            
            const timeEmbed = new Discord.MessageEmbed()
                .setAuthor(`Wait ${timeLeft} to use this command again!`)
                .setColor('#f54242');

            message.delete({ timeout: 1000 });

            return message.channel.send({ embed:timeEmbed }).then(msg => {
                msg.delete({ timeout: 1000 });
            });
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(client, message, args, con, functions);
    } catch (error) {
        console.error(error);
        
        const msgError = new Discord.MessageEmbed()
            .setAuthor(`There was an error while executing this command. Try again later. In the meantime try contacting the bot developer. Thanks.`)
            .setColor('#f54242');

        message.channel.send({ embed:msgError }).then(msg => {
            msg.delete({ timeout: 1000 });
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
        
                    let lvupEmbed = new Discord.MessageEmbed()
                        .setColor("#ffc300")
                        .setThumbnail(lv[lvl + 1].image)
                        .addField("✨ Rank up! ✨", `🎉 Congratulations **${authorName}**! \nNow you are **${lv[lvl + 1].name}** \n+${lv[lvl + 1].crystals} 💎`)
        
                    message.channel.send({embed:lvupEmbed});
                }
            }
        }
    });
    
}