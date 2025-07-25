import os
import discord
from discord import app_commands
from discord.ext import commands

TOKEN = os.getenv("DISCORD_TOKEN")

intents = discord.Intents.default()
client = commands.Bot(command_prefix="!", intents=intents)

@client.event
async def on_ready():
    print(f"Logged in as {client.user}")
    try:
        synced = await client.tree.sync()
        print(f"Synced {len(synced)} command(s)")
    except Exception as e:
        print(e)

@client.tree.command(name="active", description="Check if the bot is online")
async def active_command(interaction: discord.Interaction):
    await interaction.response.send_message("I'm online.")

client.run(TOKEN)
