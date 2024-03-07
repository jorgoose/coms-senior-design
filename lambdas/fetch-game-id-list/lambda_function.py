import json
import os
import requests

def fetch_games_list():
    STEAM_API_KEY = os.getenv("STEAM_API_KEY")
    BASE_URL = "http://api.steampowered.com/IStoreService/GetAppList/v1"

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

    # For now, restrict the number of games to 20
    # TODO: Remove in finalized version in production
    return data["apps"][:20], data["have_more_results"], data["last_appid"]

def lambda_handler(event, context):
    game_id_list, have_more_results, last_appid = fetch_games_list()
    return {
        "game_id_list": game_id_list,
        "have_more_results": have_more_results,
        "last_appid": last_appid
    }

if __name__ == "__main__":
    lambda_handler(None, None)
