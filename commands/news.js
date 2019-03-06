const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const api = 'https://tankionline.com/en/wp-json/wp/v2/';

module.exports.run = async (client, message, args) => {

  snekfetch.get(api + 'posts/').then(data1 => {

    id1 = data1.body[0].id;
    date1 = data1.body[0].date;
    link1 = data1.body[0].link;
    title1 = data1.body[0].title.rendered;
    desc1 = (((data1.body[0].excerpt.rendered).replace("<p>", "")).replace("[&hellip;]</p>\n", "")).replace(/&nbsp;/g, "");

    // TODO: add week day name
    // TODO: remove 0 in days from 1 to 9

    // there is a better way to do the format date function but this code works
    function formatDate (date1) {
      // months and days names
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      // day
      var day = date1.slice(8, 10);

      // month
      var month = date1.slice(5, 7);
      if (month != 10 && month != 11 && month != 12) {
        var monthFix = date1.slice(6, 7);
      } else {
        var monthFix = date1.slice(5, 7);
      }

      // year
      var year = date1.slice(0, 4);

      //return
      return day + ' ' + monthNames[monthFix - 1] + ' ' + year;
    }
    
    snekfetch.get(api + 'posts/' + id1).then(images => {

      img1id = images.body._links['wp:featuredmedia'][0].href;
  
      snekfetch.get(img1id).then(imagesUrl => {

        img1 = imagesUrl.body.guid.rendered;

        let newsEmbed = new Discord.RichEmbed()
        .setTitle("Tanki Online News")
        .setURL(link1)
        .setImage(img1)
        .setFooter(formatDate(date1))
        .addField(title1, desc1 + "[...]");

        message.channel.send({embed:newsEmbed});

      })
      
    })

  })

}