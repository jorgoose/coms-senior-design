import requests
import json
import time
import os

import warnings
from bs4 import BeautifulSoup, MarkupResemblesLocatorWarning

# Load dotenv
from dotenv import load_dotenv
load_dotenv()

STEAM_API_KEY = os.getenv("STEAM_API_KEY")

session = requests.Session()

def get_games_list():
    base_url = "http://api.steampowered.com/IStoreService/GetAppList/v1"
    params = {
        "key": STEAM_API_KEY,
        "include_dlc": 0,
        "include_software": 0,
        "include_videos": 0,
        "include_hardware": 0,
        "max_results": 1500
    }

    response = requests.get(base_url, params=params)
    data = response.json()["response"]
    return data["apps"], data["have_more_results"], data["last_appid"]

def get_game_info(appid):
    base_url = "http://store.steampowered.com/api/appdetails"
    params = {"appids": appid}

    response = session.get(base_url, params=params)
    try:
        data = response.json()
        return data[str(appid)]  # Access the data using the appid as a string
    except json.decoder.JSONDecodeError:
        print("Oof: JSONDecodeError")
        return None
    
def cleanse_games_data(games_data):
    for game in games_data:

        # The key "supported_languages" is a string with a comma-separated list of languages
        # We want to convert it into a list of languages. First remove the HTML tags from the string
        game["supported_languages"] = BeautifulSoup(game["supported_languages"], "html.parser").get_text()

        # Remove "*languages with full audio support" and "*"'s from the string
        game["supported_languages"] = game["supported_languages"].replace("*languages with full audio support", "")
        game["supported_languages"] = game["supported_languages"].replace("*", "")

        # Then store the array of languages in the key "supported_languages"
        game["supported_languages"] = game["supported_languages"].split(", ")

        # The keys "detailed_description" and "short_description" contain HTML tags which we want to remove
        # We need to remove the HTML tags from the string
        game["detailed_description"] = BeautifulSoup(game["detailed_description"], "html.parser").get_text()
        game["short_description"] = BeautifulSoup(game["short_description"], "html.parser").get_text()

        # For the keys "pc_requirements", "mac_requirements", and "linux_requirements", we want to extract the "minimum" and "recommended" values into separate keys (ex: "pc_requirements_min", "pc_requirements_rec", etc.)
        # Then remove the original keys
        # For each platform, there's a possibility that the requirements value is an empty array, so we need to check for that
        # For minimum or recommended, there's a possibility that the key doesn't exist, so we need to check for that as well.

        # Ignore the warning about the markup resembling a locator
        warnings.filterwarnings("ignore", category=MarkupResemblesLocatorWarning)

        for platform in ["pc_requirements", "mac_requirements", "linux_requirements"]:
            if game.get(platform):
                if game[platform].get("minimum"):
                    game[f"{platform}_min"] = game[platform]["minimum"]
                    # Remove non-text elements from the string (ex: <strong>, <br>, etc.)
                    game[f"{platform}_min"] = BeautifulSoup(game[f"{platform}_min"], "html.parser").get_text()

                    # If "Minimum:" is in the string, remove it
                    game[f"{platform}_min"] = game[f"{platform}_min"].replace("Minimum: ", "")

                    # Remove newlines from the string
                    game[f"{platform}_min"] = game[f"{platform}_min"].replace("\n", "")

                    # There is a special case where the minimum requirements string actually also contains the recommended requirements
                    # This is indicated by the string "Recommended:" in the string
                    # If this is the case, we need to split the string into two separate strings and assign accordingly
                    if "Recommended:" in game[f"{platform}_min"]:
                        game[f"{platform}_rec"] = game[f"{platform}_min"].split("Recommended: ")[1]
                        game[f"{platform}_min"] = game[f"{platform}_min"].split("Recommended: ")[0]

                if game[platform].get("recommended"):
                    game[f"{platform}_rec"] = game[platform]["recommended"]
                    # Remove non-text elements from the string (ex: <strong>, <br>, etc.)
                    game[f"{platform}_rec"] = BeautifulSoup(game[f"{platform}_rec"], "html.parser").get_text()
                game.pop(platform)

        # Re-enable the warning about the markup resembling a locator
        warnings.filterwarnings("default", category=MarkupResemblesLocatorWarning)

        # "recommendations" should be set to the value of recommendations["total"]
        if game.get("recommendations"):
            game["recommendations"] = game["recommendations"]["total"]

    return games_data

def print_progress_bar(current, total, bar_length=20):
    progress = current / total
    arrow = "=" * int(progress * bar_length - 1) + ">"
    spaces = " " * (bar_length - len(arrow))
    print(f"\rProgress: [{arrow + spaces}] {current}/{total}", end="", flush=True)

def main():

    game_id_list, have_more_results, last_appid = get_games_list()

    # Initialize an empty list to store game data
    fetched_game_data = []

    num_games_to_fetch = 10

    start_time = time.time()

    for i, game in enumerate(game_id_list[:num_games_to_fetch]):
        appid = game["appid"]
        game_info = get_game_info(appid)
        if game_info and game_info.get("success"):  # Check if the game info is valid and successful
            fetched_game_data.append(game_info["data"])  # Append the game data object to the list

        print_progress_bar(i + 1, num_games_to_fetch)

    end_time = time.time()
    print(f"\nTime taken: {end_time - start_time} seconds for {num_games_to_fetch} games")

    # Cleanse the game data
    cleansed_game_data = cleanse_games_data(fetched_game_data)

    # Save to JSON file
    with open("ex_steam_game_data.json", "w") as file:
        json.dump(cleansed_game_data, file, indent=4)

if __name__ == "__main__":
    main()
