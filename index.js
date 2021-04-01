/**
 * Tanki Bot
 * 
 * Main index file.
 * 
 * @author gbfactory
 * @since  12.07.2017
*/

const Discord = require('discord.js');
const mysql = require("mysql");
const fs = require('fs');
const config = require('./config.json');
const functions = require('./utils/functions');

// Enviroment
let env = config['dev'] ? 'development' : 'production';

console.log(`[Tanki Bot] Starting in ${env}`);

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

// Event Handler
const eventsFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    const name = file.split('.')[0];

    client.on(name, event.bind(null, client, con, cooldowns, functions));
}

// Token
client.login(config[env]['token']);