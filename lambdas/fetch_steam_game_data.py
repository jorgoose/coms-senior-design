import json
import os
import time
import requests
import warnings
from bs4 import BeautifulSoup, MarkupResemblesLocatorWarning
from dotenv import load_dotenv

load_dotenv()

STEAM_API_KEY = os.getenv("STEAM_API_KEY")
BASE_URL = "http://api.steampowered.com/IStoreService/GetAppList/v1"
STORE_BASE_URL = "http://store.steampowered.com/api/appdetails"

session = requests.Session()

def fetch_games_list():
    params = {
        "key": STEAM_API_KEY,
        "include_dlc": 0,
        "include_software": 0,
        "include_videos": 0,
        "include_hardware": 0,
        "max_results": 1500
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()["response"]
    
    return data["apps"], data["have_more_results"], data["last_appid"]


def fetch_game_info(appid: int) -> dict:
    params = {"appids": appid}
    response = session.get(STORE_BASE_URL, params=params)
    try:
        data = response.json()
        return data[str(appid)]  # Access the data using the appid as a string
    except json.decoder.JSONDecodeError:
        print("Oof: JSONDecodeError")
        return None

def cleanse_games_data(games_data: list) -> list:
    for game in games_data:
        cleanse_supported_languages(game)
        cleanse_descriptions(game)
        cleanse_requirements(game)
        if game.get("recommendations"):
            game["recommendations"] = game["recommendations"]["total"]
    return games_data


def cleanse_supported_languages(game: dict):
    # Convert comma-separated list of languages to a list
    game["supported_languages"] = BeautifulSoup(game["supported_languages"], "html.parser").get_text()
    game["supported_languages"] = game["supported_languages"].replace("*languages with full audio support", "")
    game["supported_languages"] = game["supported_languages"].replace("*", "")
    game["supported_languages"] = game["supported_languages"].split(", ")


def cleanse_descriptions(game):
    # Remove HTML tags from descriptions
    game["detailed_description"] = BeautifulSoup(game["detailed_description"], "html.parser").get_text()
    game["short_description"] = BeautifulSoup(game["short_description"], "html.parser").get_text()


def cleanse_requirements(game):
    warnings.filterwarnings("ignore", category=MarkupResemblesLocatorWarning)
    for platform in ["pc_requirements", "mac_requirements", "linux_requirements"]:
        if game.get(platform):
            if game[platform].get("minimum"):
                game[f"{platform}_min"] = extract_requirements_text(game[platform]["minimum"])
                if "Recommended:" in game[f"{platform}_min"]:
                    game[f"{platform}_rec"], game[f"{platform}_min"] = game[f"{platform}_min"].split("Recommended: ")
            if game[platform].get("recommended"):
                game[f"{platform}_rec"] = extract_requirements_text(game[platform]["recommended"])
            game.pop(platform)
    warnings.filterwarnings("default", category=MarkupResemblesLocatorWarning)


def extract_requirements_text(requirements_html):
    requirements_text = BeautifulSoup(requirements_html, "html.parser").get_text()
    requirements_text = requirements_text.replace("Minimum: ", "")
    requirements_text = requirements_text.replace("\n", "")
    return requirements_text

def print_progress_bar(current, total, bar_length=20):
    progress = current / total
    arrow = "=" * int(progress * bar_length - 1) + ">"
    spaces = " " * (bar_length - len(arrow))
    print(f"\rProgress: [{arrow + spaces}] {current}/{total}", end="", flush=True)


def main():
    game_id_list, have_more_results, last_appid = fetch_games_list()
    fetched_game_data = []
    num_games_to_fetch = 100
    start_time = time.time()

    for i, game in enumerate(game_id_list[:num_games_to_fetch]):
        appid = game["appid"]
        game_info = fetch_game_info(appid)
        if game_info and game_info.get("success"):
            fetched_game_data.append(game_info["data"])
        print_progress_bar(i + 1, num_games_to_fetch)

    cleansed_game_data = cleanse_games_data(fetched_game_data)
    
    print(f"\nTime taken: {time.time() - start_time:.2f}s")


    with open("ex_steam_game_data.json", "w") as file:
        json.dump(cleansed_game_data, file, indent=4)


if __name__ == "__main__":
    main()
