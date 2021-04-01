const Discord = require('discord.js');

const embedSuccess = (msg, img) => {
  let embed = new Discord.MessageEmbed();
  embed.setColor('#87d704');
  if (msg)
    embed.setDescription(`✅ ${msg}`);
  if (img)
    embed.setThumbnail(img);
  return embed;
}

const embedFail = (msg, img) => {
  let embed = new Discord.MessageEmbed();
  embed.setColor('#f54242');
  if (msg)
    embed.setDescription(`❌ ${msg}`);
  if (img)
    embed.setThumbnail(img);
  return embed;
}

const embedInfo = (msg, img) => {
  let embed = new Discord.MessageEmbed();
  embed.setColor('#00c3ff');
  if (msg)
    embed.setDescription(msg);
  if (img)
    embed.setThumbnail(img);
  return embed;
}

const embedRegister = () => {
  let embed = new Discord.MessageEmbed();
  embed.setColor('#f54242');
  embed.setDescription("❗️ You are not registered! Use `>register` followed \nby your desired **username** to create a profile.")
  return embed;
}

module.exports = {
  embedSuccess: embedSuccess,
  embedFail: embedFail,
  embedInfo: embedInfo,
  embedRegister: embedRegister
}