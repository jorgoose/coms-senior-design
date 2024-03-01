# The purpose of this script is to load in the JSON from comp_ex_steam_game_data.json and upload it to a Supabase table.
# We assume that this table has not yet been created, and thus need to run through all of the entries to get a comprehensive list of column names (based on the keys in the JSON).
# Supabase credentials are stored in an .env file in the same directory as this script.

# Snippet of JSON:
# [
#     {
#         "type": "game",
#         "name": "Counter-Strike",
#         "steam_appid": 10,
#         "required_age": 0,
#         "is_free": false,
#         "detailed_description": "Play the world's number 1 online action game. Engage in an incredibly realistic brand of terrorist warfare in this wildly popular team-based game. Ally with teammates to complete strategic missions. Take out enemy sites. Rescue hostages. Your role affects your team's success. Your team's success affects your role.",
#         "about_the_game": "Play the world's number 1 online action game. Engage in an incredibly realistic brand of terrorist warfare in this wildly popular team-based game. Ally with teammates to complete strategic missions. Take out enemy sites. Rescue hostages. Your role affects your team's success. Your team's success affects your role.",
#         "short_description": "Play the world's number 1 online action game. Engage in an incredibly realistic brand of terrorist warfare in this wildly popular team-based game. Ally with teammates to complete strategic missions. Take out enemy sites. Rescue hostages. Your role affects your team's success. Your team's success affects your role.",
#         "supported_languages": "English<strong>*</strong>, French<strong>*</strong>, German<strong>*</strong>, Italian<strong>*</strong>, Spanish - Spain<strong>*</strong>, Simplified Chinese<strong>*</strong>, Traditional Chinese<strong>*</strong>, Korean<strong>*</strong><br><strong>*</strong>languages with full audio support",
#         "header_image": "https://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg?t=1666823513",
#         "capsule_image": "https://cdn.akamai.steamstatic.com/steam/apps/10/capsule_231x87.jpg?t=1666823513",
#         "capsule_imagev5": "https://cdn.akamai.steamstatic.com/steam/apps/10/capsule_184x69.jpg?t=1666823513",
#         "website": null,
#         "pc_requirements": {
#             "minimum": "\r\n\t\t\t<p><strong>Minimum:</strong> 500 mhz processor, 96mb ram, 16mb video card, Windows XP, Mouse, Keyboard, Internet Connection<br /></p>\r\n\t\t\t<p><strong>Recommended:</strong> 800 mhz processor, 128mb ram, 32mb+ video card, Windows XP, Mouse, Keyboard, Internet Connection<br /></p>\r\n\t\t\t"
#         },
#         "mac_requirements": {
#             "minimum": "Minimum: OS X  Snow Leopard 10.6.3, 1GB RAM, 4GB Hard Drive Space,NVIDIA GeForce 8 or higher, ATI X1600 or higher, or Intel HD 3000 or higher Mouse, Keyboard, Internet Connection"
#         },
#         "linux_requirements": {
#             "minimum": "Minimum: Linux Ubuntu 12.04, Dual-core from Intel or AMD at 2.8 GHz, 1GB Memory, nVidia GeForce 8600/9600GT, ATI/AMD Radeaon HD2600/3600 (Graphic Drivers: nVidia 310, AMD 12.11), OpenGL 2.1, 4GB Hard Drive Space, OpenAL Compatible Sound Card"
#         },
#         "developers": [
#             "Valve"
#         ],
#         "publishers": [
#             "Valve"
#         ],
#         "price_overview": {
#             "currency": "USD",
#             "initial": 999,
#             "final": 999,
#             "discount_percent": 0,
#             "initial_formatted": "",
#             "final_formatted": "$9.99"
#         },
#         "packages": [
#             574941,
#             7
#         ],
#         "package_groups": [
#             {
#                 "name": "default",
#                 "title": "Buy Counter-Strike",
#                 "description": "",
#                 "selection_text": "Select a purchase option",
#                 "save_text": "",
#                 "display_type": 0,
#                 "is_recurring_subscription": "false",
#                 "subs": [
#                     {
#                         "packageid": 7,
#                         "percent_savings_text": " ",
#                         "percent_savings": 0,
#                         "option_text": "Counter-Strike: Condition Zero - $9.99",
#                         "option_description": "",
#                         "can_get_free_license": "0",
#                         "is_free_license": false,
#                         "price_in_cents_with_discount": 999
#                     },
#                     {
#                         "packageid": 574941,
#                         "percent_savings_text": " ",
#                         "percent_savings": 0,
#                         "option_text": "Counter-Strike - Commercial License - $9.99",
#                         "option_description": "",
#                         "can_get_free_license": "0",
#                         "is_free_license": false,
#                         "price_in_cents_with_discount": 999
#                     }
#                 ]
#             }
#         ],
#         "platforms": {
#             "windows": true,
#             "mac": true,
#             "linux": true
#         },
#         "metacritic": {
#             "score": 88,
#             "url": "https://www.metacritic.com/game/pc/counter-strike?ftag=MCD-06-10aaa1f"
#         },
#         "categories": [
#             {
#                 "id": 1,
#                 "description": "Multi-player"
#             },
#             {
#                 "id": 49,
#                 "description": "PvP"
#             },
#             {
#                 "id": 36,
#                 "description": "Online PvP"
#             },
#             {
#                 "id": 37,
#                 "description": "Shared/Split Screen PvP"
#             },
#             {
#                 "id": 8,
#                 "description": "Valve Anti-Cheat enabled"
#             },
#             {
#                 "id": 62,
#                 "description": "Family Sharing"
#             }
#         ],
#         "genres": [
#             {
#                 "id": "1",
#                 "description": "Action"
#             }
#         ],
#         "screenshots": [
#             {
#                 "id": 0,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000132.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000132.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 1,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000133.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000133.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 2,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000134.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000134.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 3,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000135.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000135.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 4,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000136.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000000136.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 5,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002540.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002540.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 6,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002539.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 7,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002538.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002538.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 8,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002537.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002537.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 9,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002536.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002536.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 10,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002541.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002541.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 11,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002542.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002542.1920x1080.jpg?t=1666823513"
#             },
#             {
#                 "id": 12,
#                 "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002543.600x338.jpg?t=1666823513",
#                 "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/10/0000002543.1920x1080.jpg?t=1666823513"
#             }
#         ],
#         "recommendations": {
#             "total": 147198
#         },
#         "release_date": {
#             "coming_soon": false,
#             "date": "Nov 1, 2000"
#         },
#         "support_info": {
#             "url": "http://steamcommunity.com/app/10",
#             "email": ""
#         },
#         "background": "https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated_v6b.jpg?t=1666823513",
#         "background_raw": "https://cdn.akamai.steamstatic.com/steam/apps/10/page_bg_generated.jpg?t=1666823513",
#         "content_descriptors": {
#             "ids": [
#                 2,
#                 5
#             ],
#             "notes": "Includes intense violence and blood."
#         },
#         "ratings": {
#             "usk": {
#                 "rating": "16"
#             }
#         },
#         "id": 10
#     },

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
# In the table in the database, steam_appid and required_age are integers, everything else is a string. The steam_appid is the primary key. The table is called "example_game_data".
# Ex of adding one entry:
# data, count = supabase.table('countries')
#   .upsert({...})
#   .execute()
            
for entry in data:
    # Convert the steam_appid and required_age to integers
    entry["steam_appid"] = int(entry["steam_appid"])
    entry["required_age"] = int(entry["required_age"])
    # Add the entry to the table
    data, count = supabase.table("example_game_data").upsert(entry).execute()

print("Done!")  # Done!