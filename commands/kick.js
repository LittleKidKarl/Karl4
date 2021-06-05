const Discord = require("discord.js");

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('You do not have permission to use this command!')
    
    var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!user) return msg.reply('You did not mention a user for me to punish!');
    var member;
    try {
        member = await msg.guild.members.fetch(user)
    } catch(err) {
        member = null;
    }
    if(member){
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You cannot kick a fellow staff member!');
    }

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('Please make sure to specify a reason for me to punish this user!')
    var channel = msg.guild.channels.cache.find(c => c.name === 'logs');
    var verify = msg.guild.emojis.cache.find(emoji => emoji.name === 'verified')
    var log = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setDescription(`${verify} ${user} has been kicked by ${msg.author} for "**${reason}**"`)
    channel.send(log);

    var userLog = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setDescription(`You have been kicked from the server! Feels bad eh? Here is the reason so that you do not repeat the same mistake: **${reason}**`)
    try {
        await user.send(userLog);
    } catch(err) {
        console.warn(err);
    }
    member.kick(reason)
    var confir = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setDescription(`${verify} ${user} has been kicked by ${msg.author}`)
    msg.channel.send(confir);
    msg.delete();
}