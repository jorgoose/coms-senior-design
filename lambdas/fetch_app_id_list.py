import json
import requests


def lambda_handler(event, context):
    url = "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
    response = requests(url)
    return {
        'statusCode': 200,
        'body': response.json()
    }
