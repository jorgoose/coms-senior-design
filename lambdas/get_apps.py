import json
import requests

#Not Working
def lambda_handler(event, context):
    url = "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
    response = requests(url)
    dataset = response.loads(response.text)
    return {
        'statusCode': 200,
        'body': json.dumps(dataset)
    }
