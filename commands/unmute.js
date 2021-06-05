const Discord = require("discord.js");
const ms = require('ms');

exports.run = async(client, msg, args) => {
    var verify = msg.guild.emojis.cache.find(emoji => emoji.name === 'verified');
    var target = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!target) return msg.reply('you need to mention a user for me to unmute them!')
    var targetID = msg.guild.members.cache.get(target.id)

    var main = msg.guild.roles.cache.find(role => role.name === 'Verified');
    var muteRole = msg.guild.roles.cache.find(role => role.name === 'Mute');

    targetID.roles.remove(muteRole)
    targetID.roles.add(main)

    var confirmation = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setDescription(`${verify} <@${targetID.user.id}> has been successfully unmuted by ${msg.author}`)
    msg.channel.send(confirmation);
}