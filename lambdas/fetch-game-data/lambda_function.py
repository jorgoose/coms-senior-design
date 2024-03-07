import json
import requests

def fetch_game_info(appid: int) -> dict:
    STORE_BASE_URL = "http://store.steampowered.com/api/appdetails"
    params = {"appids": appid}
    response = requests.get(STORE_BASE_URL, params=params)
    try:
        data = response.json()
        return data[str(appid)]  # Access the data using the appid as a string
    except json.decoder.JSONDecodeError:
        print("Oof: JSONDecodeError")
        return None

def lambda_handler(event, context):
    appid = event["appid"]
    game_info = fetch_game_info(appid)
    return game_info

if __name__ == "__main__":
    lambda_handler({"appid": 440}, None)
