const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let helpEmbed = new Discord.RichEmbed()
    .setTitle("Tanki Bot")
    .setDescription("📖 Commands")
    .addField("🔰 Help", "Use ```>help [command]``` to get more informations about that command.")
    .addField("📔 General", "info : get informations about the bot \nhelp : shows the help menu")
    .addField("<:tank:371321495516872705> Tanki Online", "ratings : shows user profile \nsupplies : supplies used by the user \nweekly : past and present weekly user ratings \ngamemodes : time played by the user \ntop : top players of the week \nnews : get latest tanki news \nvlog : get latest tanki v-log")
    .addField("💰 Economy", "level : info about your discord tanki account \ninventory : show your discord account inventory \nstats : see container statistics \ncontainer : use containers inside discord \ndaily & hourly : get some crystals")

    message.channel.send({embed:helpEmbed});
}