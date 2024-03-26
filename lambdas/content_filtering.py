from openai import OpenAI, types

from typing import List

import requests
from PIL import Image
from transformers import pipeline

# Will use the OpenAI Moderation API to classify text, and will use an open-source classifier model from HuggingFace to classify images
import os
from supabase import create_client, Client

# Load dotenv
from dotenv import load_dotenv
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
openai: OpenAI = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# NSFW Examples
# URL = "https://cdn.akamai.steamstatic.com/steam/apps/1729600/header.jpg?t=1647770856"
# URL = "https://cdn.akamai.steamstatic.com/steam/apps/1800950/header.jpg?t=1636480822"

# Non-NSFW Example (GTA V and DOOM)
# URL = "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg?t=1618856444"
# URL = "https://cdn.akamai.steamstatic.com/steam/apps/379720/header.jpg?t=1593395083"

# text_classifier = pipeline("text-classification", model="michellejieli/inappropriate_text_classifier")
# about = "Hentai is not just 2D girls, this is a whole art. And in this art units understand. The game 'Hot Milf' is a hentai puzzle in which you need to move the elements vertically or horizontally to get the finished image. The game has hot levels, as well as a gallery, after completing a level, you can review your victories here. Hentai girls, this is a whole era of art. The game includes 10 different girls; Realized complex mechanics of games 15; Very hot milfs; "
# about = "When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other. Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second. The game offers players a huge range of PC-specific customization options, including over 25 separate configurable settings for texture quality, shaders, tessellation, anti-aliasing and more, as well as support and extensive customization for mouse and keyboard controls. Additional options include a population density slider to control car and pedestrian traffic, as well as dual and triple monitor support, 3D compatibility, and plug-and-play controller support. Grand Theft Auto V for PC also includes Grand Theft Auto Online, with support for 30 players and two spectators. Grand Theft Auto Online for PC will include all existing gameplay upgrades and Rockstar-created content released since the launch of Grand Theft Auto Online, including Heists and Adversary modes. The PC version of Grand Theft Auto V and Grand Theft Auto Online features First Person Mode, giving players the chance to explore the incredibly detailed world of Los Santos and Blaine County in an entirely new way. Grand Theft Auto V for PC also brings the debut of the Rockstar Editor, a powerful suite of creative tools to quickly and easily capture, edit and share game footage from within Grand Theft Auto V and Grand Theft Auto Online. The Rockstar Editor’s Director Mode allows players the ability to stage their own scenes using prominent story characters, pedestrians, and even animals to bring their vision to life. Along with advanced camera manipulation and editing effects including fast and slow motion, and an array of camera filters, players can add their own music using songs from GTAV radio stations, or dynamically control the intensity of the game’s score. Completed videos can be uploaded directly from the Rockstar Editor to YouTube and the Rockstar Games Social Club for easy sharing. Soundtrack artists The Alchemist and Oh No return as hosts of the new radio station, The Lab FM. The station features new and exclusive music from the production duo based on and inspired by the game’s original soundtrack. Collaborating guest artists include Earl Sweatshirt, Freddie Gibbs, Little Dragon, Killer Mike, Sam Herring from Future Islands, and more. Players can also discover Los Santos and Blaine County while enjoying their own music through Self Radio, a new radio station that will host player-created custom soundtracks. Special access content requires Rockstar Games Social Club account. Visit for details."

image_classifier = pipeline("image-classification", model="LukeJacob2023/nsfw-image-detector")
# image = Image.open(requests.get(URL, stream=True).raw)
# image_res = image_classifier(image)
# img = Image.open(requests.get(URL, stream=True).raw)
# classifier = pipeline("image-classification", model="Falconsai/nsfw_image_detection")
# res = classifier(img)
# print(text_res)

def classify_text(text: str) -> dict:
    response: types.ModerationCreateResponse = openai.moderations.create(input=text)
    result: types.Moderation = response.results[0].categories.sexual
    nsfw: bool = result == True
    return nsfw, response.results[0].category_scores.sexual

def classify_image(image_url: str) -> dict:
    image = Image.open(requests.get(image_url, stream=True).raw)
    return image_classifier(image)

# Get the first 100 games from Supabase, randomly, result returned as JSON, store the data key
response = supabase.table("game_data").select("*").limit(10).execute()

# Run a prediction on the header_image URL of each game as well as the text
for game in response.data:
    
    title = game["name"]
    about_the_game = game["about_the_game"]

    title_res = classify_text(title)
    about_res = classify_text(about_the_game)
    text_nsfw = title_res or about_res
    image_res = classify_image(game["header_image"])

    top_image_pred_label = image_res[0]["label"]
    Image_pred_confidence = image_res[0]["score"]

    # Print the game's name and the prediction, confidence as a percentage
    print(f'{game["name"]}- ID {game['steam_appid']}: Image label {top_image_pred_label} with confidence of {Image_pred_confidence * 100:.2f}%, text label NSFW = {text_nsfw}')
