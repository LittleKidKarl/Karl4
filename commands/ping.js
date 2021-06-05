exports.run = async(client, msg, args) => {
    msg.channel.send(`Your current ping is at a whopping \`${client.ws.ping}\` ping`);
}