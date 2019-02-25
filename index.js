const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '>';

client.on('message', message => {

 // HANDLER //
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
  console.log(`${message.author.tag} used the command ${cmd}`);
 }

});

// BOT START //
client.on('ready', async () => {
 console.log('Bot Started!');
 client.user.setActivity("Tanki Bot", {
  type: "WATCHING"
 });
});

// TOKEN //
const token = "";
client.login(token);