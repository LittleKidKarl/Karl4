const Discord = require('discord.js')
exports.run = async(client, msg, args) => {
    const Fs = require('fs')
    const warnInfo = JSON.parse(Fs.readFileSync('./warnInfo.json'))
    const warningsem = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`You currently have ${warnInfo[msg.author.id.warns]} warnings!`)
    
    
    var member = msg.author
    
    if(!warnInfo[msg.author.id]) {
    msg.channel.send('You have no warnings currently!')
    
    
    
    } else {
        msg.channel.send(warningsem)
    }
    
    
    
    }