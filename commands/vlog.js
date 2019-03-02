const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const api = "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCmr0_TWs3mtO0qp64hu2y_g&maxResults=1&key=";
const key = "AIzaSyAOrXgATyGZJWZ6RAaO9QHJPzYwc6I_p3s";>

module.exports.run = async (client, message, args) => {

  snekfetch.get(api + key).then(video => {

    let id = video.body.items[0].id.videoId;

    message.channel.send("https://www.youtube.com/watch?v=" + id);

  });

}
