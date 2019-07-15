exports.run = (client, message, args) => {
    let name = args[0];
    let props = require(`./units/${name}`);
    message.channel.send(props.name).catch(console.error);
}
