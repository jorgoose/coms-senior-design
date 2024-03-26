# The purpose of this script is to load in the JSON from comp_ex_steam_game_data.json and upload it to a Supabase table.
# We assume that this table has been created with the correct column names, and thus need to run through all of the entries to get a comprehensive list of column names (based on the keys in the JSON).
# Supabase credentials are stored in an .env file in the same directory as this script.

# Load dotenv
from dotenv import load_dotenv
load_dotenv()

# Import required libraries
import os
import json

from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

table_name = "example_game_data"

# Load in the JSON
with open("comp_ex_steam_game_data.json", "r") as file:
    data = json.load(file)

# Create a list of column names
columns = []
for entry in data:
    for key in entry.keys():
        if key not in columns:
            columns.append(key)

# Store in Supabase           
for entry in data:
    # Convert the steam_appid and required_age to integers
    entry["steam_appid"] = int(entry["steam_appid"])
    entry["required_age"] = int(entry["required_age"])
    # Add the entry to the table
    data, count = supabase.table(table_name).upsert(entry).execute()

print("Done!")  # Done!