/**
 * Tanki Bot. ECONOMY.
 * 
 * Sell items
 * 
 * @author gbfactory
 * @since 04.03.2020
 */

const Discord = require("discord.js");

module.exports.run = async(client, message, args, con) => {
   
   var authorId = message.author.id;

   function random(min, max) {
       return Math.floor(Math.random() * (max - min + 1) + min);
   }

   function embedGenerator(item, price) {
       let embed = new Discord.RichEmbed()
        .setColor("#ff6600")
        .setAuthor("Sell")
        .setThumbnail("https://i.imgur.com/HrJS6eH.png")

       if (price > 0) {
           embed.setDescription(`You sold *${item}* for **${price}** crystals!`);
       } else {
           embed.setDescription(`You don't have *${item}* to sell!`);
       }

       return embed;
   }

   con.query(`SELECT id, crys FROM users WHERE id = ${authorId}`, (err, rows) => {
       if (err) throw err;

       var rowsUsers = rows;

       if (rows.length < 1) {
           let rgNo  = new Discord.RichEmbed()
               .setAuthor("You aren't registered! Use >register (username) to create a profile.")
               .setColor("#f54242");
           message.channel.send({embed:rgNo});
           return;
       }
       
       con.query(`SELECT * FROM items WHERE id = ${authorId}`, (err, rows) => {
           if (err) throw err;

           if (args[0] === 'all') {
                
                var repair = rows[0].repair;
                var armor = rows[0].armor;
                var damage = rows[0].damage;
                var nitro = rows[0].nitro;
                var mine = rows[0].mine;
                var battery = rows[0].battery;
                var rare = rows[0].rare;
                var epic = rows[0].epic;
                var legendary = rows[0].legendary;
                var turrets = rows[0].skinTurrets;
                var hulls = rows[0].skinHulls;
    
                var price = (repair * 50) + (armor * 25) + (damage * 25) + (nitro * 25) + (mine * 25) + (battery * 60) + (rare * random(2000, 4000)) + (epic * random(4000, 8000)) + (legendary * random(8000, 16000)) + (turrets * 100000) + (hulls * 100000);
    
                var newPrice = rowsUsers[0].crys + price;
                    
                con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
                    
                con.query(`UPDATE items SET repair = 0, armor = 0, damage = 0, nitro = 0, mine = 0, battery = 0, rare = 0, epic = 0, legendary = 0, skinTurrets = 0, skinHulls = 0 WHERE id = ${authorId}`);
            
                message.channel.send({embed:embedGenerator('all', price)});

            } else if (args[0] === 'supplies') {

                var repair = rows[0].repair;
                var armor = rows[0].armor;
                var damage = rows[0].damage;
                var nitro = rows[0].nitro;
                var mine = rows[0].mine;
                var battery = rows[0].battery;
    
                var price = (repair * 50) + (armor * 25) + (damage * 25) + (nitro * 25) + (mine * 25) + (battery * 60);
    
                var newPrice = rowsUsers[0].crys + price;
                    
                con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
                    
                con.query(`UPDATE items SET repair = 0, armor = 0, damage = 0, nitro = 0, mine = 0, battery = 0 WHERE id = ${authorId}`);
            
                message.channel.send({embed:embedGenerator('supplies', price)});

            } else if (args[0] === 'paints') {

                var rare = rows[0].rare;
                var epic = rows[0].epic;
                var legendary = rows[0].legendary;

                var price = (rare * random(2000, 4000)) + (epic * random(4000, 8000)) + (legendary * random(8000, 16000));
    
                var newPrice = rowsUsers[0].crys + price;
                    
                con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
                    
                con.query(`UPDATE items SET rare = 0, epic = 0, legendary = 0 WHERE id = ${authorId}`);
            
                message.channel.send({embed:embedGenerator('paints', price)});

            } else if(args[0] === 'skins') {
                
                var turrets = rows[0].skinTurrets;
                var hulls = rows[0].skinHulls;
    
                var price = (turrets * 100000) + (hulls * 100000);
    
                var newPrice = rowsUsers[0].crys + price;
                    
                con.query(`UPDATE users SET crys = ${newPrice} WHERE id = ${authorId}`);
                    
                con.query(`UPDATE items SET skinTurrets = 0, skinHulls = 0 WHERE id = ${authorId}`);
            
                message.channel.send({embed:embedGenerator('skins', price)});
            }

       });
   });

}
