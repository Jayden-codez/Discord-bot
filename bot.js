const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.DISCORD_TOKEN; // safer than hardcoding
const clientId = process.env.CLIENT_ID;

// File to store passwords
const PASSWORD_FILE = "passwords.json";

// Load saved passwords
let passwords = {};
if (fs.existsSync(PASSWORD_FILE)) {
    passwords = JSON.parse(fs.readFileSync(PASSWORD_FILE));
}

client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// Slash commands
const commands = [
    new SlashCommandBuilder()
        .setName("save")
        .setDescription("Save a username and password")
        .addStringOption(option =>
            option.setName("username").setDescription("The username").setRequired(true))
        .addStringOption(option =>
            option.setName("password").setDescription("The password").setRequired(true)),
    new SlashCommandBuilder()
        .setName("list")
        .setDescription("List all saved usernames and passwords"),
].map(command => command.toJSON());

// Register commands
const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
        console.log("⌛ Refreshing slash commands...");
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log("✅ Slash commands registered!");
    } catch (error) {
        console.error(error);
    }
})();

// Handle commands
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "save") {
        const username = interaction.options.getString("username");
        const password = interaction.options.getString("password");

        passwords[username] = password;
        fs.writeFileSync(PASSWORD_FILE, JSON.stringify(passwords, null, 2));

        await interaction.reply(`🔐 Saved password for **${username}**`);
    }

    if (interaction.commandName === "list") {
        if (Object.keys(passwords).length === 0) {
            await interaction.reply("⚠️ No passwords saved yet.");
        } else {
            let list = Object.entries(passwords)
                .map(([u, p]) => `👤 ${u} → 🔑 ${p}`)
                .join("\n");
            await interaction.reply(list);
        }
    }
});

client.login(MTMzNDE1NjQ5NTYyMDkzMTY1NA.G4OlKO.axMFKQmkZ1Y29ITBKUCiLDrtAR6FABCi47VL1g);
