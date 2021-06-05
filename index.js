const config = require('./config.json');
const Discord = require('discord.js')
const ms = require('ms');
const client = new Discord.Client();
const Fs = require('fs')
 
 
client.on('ready',  async() => {
    console.log('I am online and ready to listen to commands!')
    
})
 
 
 
 
 
client.on('message', async(msg) => {
 
    if(msg.author.bot) return;
    if(!msg.guild) return;
    if(msg.content.length >= 300) {
    msg.delete();
   return msg.channel.send(`${msg.author} , you are not allowed to send unnecessarily long and annoying messages in this server!`)
     
    }
 
if(msg.mentions.users.size > 2 && !msg.member.hasPermission('BYPASS PERMISSION GOES HERE') && !msg.channel.id === 'BYPASS CHANNEL ID GOES HERE') {
 
 
msg.delete()
return msg.reply('you cannot mass mention users in this server!')
 
}

try {
var lineArray = msg.content.match(/\n/g);
var number = lineArray.length
 
if(number >= 4) {
    msg.delete()
    return msg.reply('you cannot line spam in this server!')
    
}
}catch(err) {
 
 
}
 
    
    var array = ['fuck' , 'sex', 'nigga' , 'nigger', 'bitch' , 'motherfucker'];
 
        if(array.some(w =>  ` ${msg.content.toLowerCase()} `.includes(` ${w} `))){
            var emojiGuild = client.guilds.cache.find(guild => guild.name === 'Most Wanted')
            var animeBonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'lol')
 
 
            msg.delete()
            msg.reply(`${animeBonk} this server does not tolerate that kind of language! Continuing will result in a mute!`)
 
            var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            
 
            if(!warnsJSON[msg.author.id]) {
                warnsJSON[msg.author.id] = {
                    warns: 0
                }
 
                Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }
 
            warnsJSON[msg.author.id].warns += 1
            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
 
 
            setTimeout(function() {
 
                warnsJSON[msg.author.id].warns -= 1
                Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }, ms('24h'))
 
            var warnEm = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`You have been warned in ${msg.guild.name}`)
            .setDescription('You have recieved a warning from the moderation system')
            .addField('Reason' , '[AutoMod] Using filtered words')
            .addField('Expires' , '24h')
 
            try {
                msg.author.send(warnEm)
 
            } catch(err) {
 
            }
 
 
            if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
                var mutedEm = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`**${msg.member.user.username}** has been muted for continuous infractions`)
                msg.channel.send(mutedEm)
 
                const muteRole = msg.guild.roles.cache.find(r => r.name === 'Mute')
                const user = msg.member
                user.roles.add(muteRole.id)
 
                var yougotmuted = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle(`You have been muted in ${msg.guild.name}`)
                .setDescription('You have been muted after 3 infractions')
                .addField('Reason' , 'Multiple AutoMod Infractions')
                .addField('Expires' , '2h')
 
                try {
 
                    msg.author.send(yougotmuted)
 
                }catch(err) {
 
                }
 
                setTimeout(function () {
                    user.roles.remove(muteRole.id)
                }, ms('2h'));
            
            }
        return;
        }
            
        
        
    
    var prefix = config.prefix;
    if(!msg.content.toLowerCase().startsWith(prefix)) return;
 
    var args = msg.content.split(' ')
    var cmd = args.shift().slice(prefix.length).toLowerCase();
    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, msg, args);
 
    }catch(err) {
        console.warn(err);
    }
 
})
 
client.on('guildMemberAdd' , async(member) => {
 
let warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'));
  warnsJSON[member.id] = {
                warns: 0
            }
            Fs.writeFileSync('./warnInfo.json', JSON.stringify(warnsJSON));
})
 
 
 
 
client.login(config.token);