const Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return;
    var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!user) return msg.reply('you did not mention a user for me to punish!')

    var member;
    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }
    if(!member) return msg.reply('the user that you mentoined is not currently in the server!');

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('you forgot to include a reason!');
    if(msg.author.id === user.id) return msg.reply('you cannot warn yourself!')
    
    var warnEmbed = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setDescription(`${user} has been succesfully warned by ${msg.author}!`)
    .setFooter('This message will auto delete after 5 seconds!')
    var sendEmbed = await msg.channel.send(warnEmbed);
    msg.delete();

    setTimeout(() => {
        sendEmbed.delete()
    }, 5000);

    var embed = new Discord.MessageEmbed()
    .setColor('0xff3030')
    .setTitle('You were warned by **Karls Utilities**!')
    .setDescription('Server: **Most Wanted**')
    .addField('Reason:' , reason)
    .setThumbnail('https://media.discordapp.net/attachments/811099971557261322/850354561557463110/bd90b0649224014bbd55c7195c7c3ad1.png');

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }


}