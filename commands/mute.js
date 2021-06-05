const Discord = require("discord.js");
const ms = require('ms');
 
 
exports.run = async(client, msg, args) => {
    var logs = msg.guild.channels.cache.find(c => c.name === 'logs');
    var verify = msg.guild.emojis.cache.find(emoji => emoji.name === 'verified');
    
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return;
 
    var target = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!target) return msg.reply('you need to mention a user for me to mute them!')
 
    var main = msg.guild.roles.cache.find(role => role.name === 'Verified');
    var muteRole = msg.guild.roles.cache.find(role => role.name === 'Mute');
 
    var targetID = msg.guild.members.cache.get(target.id)
 
    if(!args[1]) {
        
        targetID.roles.add(muteRole)
        targetID.roles.remove(main)
        var confirmation = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${verify} <@${targetID.user.id}> has been succesfully muted by ${msg.author} until you unmute them using the \`unmute\` command!`)
        msg.channel.send(confirmation);
 
        var log = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setDescription(`${verify} <@${targetID.user.id}> has been **hard-muted** by ${msg.author}. They will not be unmuted until you unmute them manually!`)
    logs.send(log);
 
    var userLog = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setTitle(`You have been hard muted in ${msg.guild.name}!`)
    
 
    try {
        await target.send(userLog);
    } catch(err) {
        console.warn(err);
    }
 
    
        return
    }
    
    targetID.roles.add(muteRole)
    targetID.roles.remove(main)
    
    var confirmation = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setDescription(`${verify} <@${targetID.user.id}> has been succesfully muted by ${msg.author} for ${ms(ms(args[1]))}.`)
    msg.channel.send(confirmation);
 
    
    var log = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setDescription(`${verify} <@${targetID.user.id}> has been muted by ${msg.author} for ${ms(ms(args[1]))}.`)
    logs.send(log);
 
    var userLog = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setTitle(`You have been muted in ${msg.guild.name}!`)
    .addField('Expires in:' , ms(ms(args[1])))
 
    try {
        await target.send(userLog);
    } catch(err) {
        console.warn(err);
    }
 
    setTimeout(function () {
        targetID.roles.remove(muteRole)
        targetID.roles.add(main)
    } , ms(args[1]));
 
}
