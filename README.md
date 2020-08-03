<center>
	<a href="https://tankibot.gbfactory.net/">
		<img src="https://i.imgur.com/sWbQcl6.png" title="Tanki Bot Logo" alt="Tanki Bot">
	</a>
</center>

# Tanki Bot
[![Status: Online](https://i.imgur.com/kP9sa2u.png)](https://tankibot.gbfactory.net/) [![Discord](https://img.shields.io/discord/467412783290515456.svg?label=support&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/cH8Tvbn) ![Depfu](https://img.shields.io/depfu/gbfactory/Tanki-Bot?logo=npm) [![CodeFactor](https://www.codefactor.io/repository/github/gbfactory/tanki-bot/badge)](https://www.codefactor.io/repository/github/gbfactory/tanki-bot) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**Tanki Bot**  is a Discord bot made for Tanki Online players. With this bot you can check all your Tanki statistics right from the Discord chat. If you want to have fun you can use the built-in economy system, where you have to level up, gain crystals and open containers to find turrets, hulls and paints!

![https://i.imgur.com/u89l94J.gif](https://i.imgur.com/u89l94J.gif)

>Tanki Bot is used in the official Tanki Online Discord server!

# Commands

Here you can see all the commands that you can do with Tanki Bot!

## Tanki Online

Commands that works with the Tanki Online API or commanda that gives you informations directly from Tanki

|Command | Description|
|-|-|
|`ratings (player)` | Check ratings of the given player.|
|`weekly (player)` | Check weekly ratings of the given player.|
|`gamemodes (player)` | Check time and xp stats in all gamemodes of the given player.|
|`supplies (player)` | Check the supplies usage of a given player. (Single supply and total usage)
|`news` | See the latest news postes in the en tanki website. Works with Wordpress API
|`fact` | Get a random fact about tanki - all the facts are from the Tanki Wiki
|`status (no args / test)` | Check how many players are on Tanki at the moment.

## Economy

Commands of the built-in economy system of the bot. The system is a replica of Tanki Online built in Discord.
A lot of things are still work-in-progress

| Command | Description
| - | - |
| `register (nickname)` | Register your Tanki Bot account in the bot database
| `unregister (nickname)` | Un-register your account. All data will be deleted from the database
| `profile (no args / @mention)`  | With no args you can check your profile. By mentioning a user you will be able to check his profile.
| `garage` | Check your garage. There are sub-commands for each garage section.
| `bonus (daily / weekly)` | You can claim a daily bonus with a 24 hours cooldown with `daily` and a weekly bonus with a cooldown of 7 days with `weekly`
| `open (container / daily / weekly)` | Open respectively a normal container, a daily container and a weekly container. Instead of `container` you can use `c`, the same goes for the other two, you can use `d` and `w`.
| `shop` | In the shop you can buy all the different things. Including containers. There are args for the various shop sections.
| `buy` | Command to buy items from the shop. It doesn't have a "GUI".
| `sell (all / paints / supplies / skins )` | With the sell commands you can sell all your items for crystals. With the arg `all` you sell everything you own. With paints, supplies and skins you sell only the selected category of items.
| `leaderboard` | In the leaderboard you can check who are the best players of the Tanki Bot. It has subcommands for each leaderboard category (crystals, xp, tankoins).
| `drop` | With the drop command you can literally drop a gold box in the discord chat. The first that writes the keyword `goldbox` will take the Gold Box and get 1000 crystals. You can drop a gold if you first find one in a container.
| `premium` | With this command you can check the status of your premium account. You can find premium time in containers. (At the moment premium account doesn't give advantages to players).

## Bot information
Tanki Bot is made in **Javascript** using **Node.JS**. Its uses a **MySQL** database to store users informations and **JSON** to store items informations.

## Bot Support
If you find any bugs you can open a **GitHub Issue** or contact me on Discord **gb_factory#5365**.

## Copyright
GNU General Public License v3.0
