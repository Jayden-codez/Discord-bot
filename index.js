// index.js
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = 'YOUR_BOT_TOKEN'; // replace with your actual bot token
const CLIENT_ID = 'YOUR_CLIENT_ID'; // replace with your bot's application/client ID

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Register slash command (/active)
const commands = [
  new SlashCommandBuilder()
    .setName('active')
    .setDescription("Check if the bot is online.")
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Registering slash command...');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Slash command registered!');
  } catch (err) {
    console.error('Error registering command:', err);
  }
})();

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'active') {
    await interaction.reply("I'm online.");
  }
});

client.login(MTMzNDE1NjQ5NTYyMDkzMTY1NA.G4OlKO.axMFKQmkZ1Y29ITBKUCiLDrtAR6FABCi47VL1g);
