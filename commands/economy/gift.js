/**
 * Tanki Bot
 * 
 * Allows players to send gifts to other players
 * 
 * @author gbfactory
 * @since 25.03.2020
 */

module.exports = {
    name: 'gift',
    description: 'Send crystals as a gift to another user.',
    usage: '`>gift [@user] [crystals]`',
    args: true,
    cooldown: 3,
    execute(client, message, args, con, functions) {

        let authorId = message.author.id;

        con.query(`SELECT id, username, crys FROM users WHERE id = ${authorId}`, (err, rows) => {
            if (err) throw err;

            // Check if a user is registered
            if (rows.length < 1) {
                return message.channel.send({ embed: functions.embedRegister() });
            }

            var authorDb = rows[0];

            // Check if a user is mentioned
            if (!message.mentions.members.first()) {
                return message.channel.send({ embed: functions.embedFail(
                    "You didn't mentioned a user."
                ) });
            } else {
                var giftedId = message.mentions.users.first().id;
            }

            con.query(`SELECT id, username, crys FROM users WHERE id = ${giftedId}`, (err, rows) => {
                if (err) throw err;

                // Check if the mentioned user is registered
                if (rows.length < 1) {
                    return message.channel.send({ embed: functions.embedFail(
                        "The other user is not registered!"
                    ) });
                }

                var giftedDb = rows[0];

                // Check crystals
                if (!args[1] || isNaN(args[1]) || args[1] <= 0) {
                    return message.channel.send({ embed: functions.embedFail(
                        "You must input a valid amout of crystals!"
                    )} );
                } else {
                    var crys = parseInt(args[1]);
                }

                // Check user crystals
                if (authorDb.crys < crys) {
                    return message.channel.send({ embed: functions.embedFail(
                        "You don't have enough crystals!"
                    ) });
                }

                // Moving crys from one user to the other and success msg.
                var cryAuthor = authorDb.crys;
                var cryGifted = giftedDb.crys;

                // remove crystals from author
                con.query(`UPDATE users SET crys = ${cryAuthor - crys} WHERE id = '${authorId}'`);

                // add crystals to user
                con.query(`UPDATE users SET crys = ${cryGifted + crys} WHERE id = '${giftedId}'`);

                // end message
                message.channel.send({ embed: functions.embedSuccess(
                    `**<@${authorId}>** has sent **${crys}** 💎 to **<@${giftedId}>**!`
                ) });


            })

        })

    },
};