const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
const commandObject = {
  "info": "./commands/info.js"
};
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

client.on("message", message => {
  if (message.author.bot) return;
  // This is where we'll put our code.
  if (message.content.indexOf(config.prefix) !== 0) return;
 
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
  // Grab the command data from the client.commands Enmap
  const cmd = commandObject[command];

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
  }
});
 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
