import time
import os

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

import asyncio
import io
from typing import Tuple

from PIL import Image
import aiohttp
from dotenv import load_dotenv
from openai import OpenAI
from supabase import Client, create_client
from transformers import pipeline

# Set environment variable "TF_ENABLE_ONEDNN_OPTS=0" for the image classifier to work

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
openai: OpenAI = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

image_classifier = pipeline("image-classification", model="LukeJacob2023/nsfw-image-detector", device=0)

# Function to fetch game data from Supabase
async def fetch_data(supabase: Client):
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(None, lambda: supabase.table("game_data").select("*").limit(100).execute())

# Function to fetch an image from a URL as a PIL Image
async def fetch_image(session: aiohttp.ClientSession, url: str) -> Image.Image:
    async with session.get(url) as response:
        data = await response.read()
        return Image.open(io.BytesIO(data))

# Function to classify a string of text using OpenAI's Moderations API, as either NSFW or not
async def classify_text(text: str) -> Tuple[bool, float]:
    loop = asyncio.get_running_loop()
    response = await loop.run_in_executor(
        None, 
        lambda: openai.moderations.create(input=text)
    )
    result = response.results[0].categories.sexual
    nsfw = result == True
    return nsfw, response.results[0].category_scores.sexual

# Function to classify an image using the NSFW image classifier
async def async_classify_image(session: aiohttp.ClientSession, image_url: str) -> dict:
    image = await fetch_image(session, image_url)
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(None, image_classifier, image)

# Main function that fetches data from Supabase, processes each game, and prints the results
# This is done asynchronously to speed up the process significantly
async def main():
    response = await fetch_data(supabase)
    start_time = time.time()

    async with aiohttp.ClientSession() as session:
        async def process_game(game):
            title = game["name"]
            about_the_game: str = game["about_the_game"]

            text_content = f'Game Title: {title}, About the game: {about_the_game}'

            text_nsfw, _ = await classify_text(text_content)
            image_res = await async_classify_image(session, game["header_image"])

            top_image_pred_label = image_res[0]["label"]
            top_image_pred_nsfw = top_image_pred_label in ["hentai", "sexy", "porn"] or about_the_game.find("furries") != -1
            image_pred_confidence = image_res[0]["score"]
 
            # If the image or text is NSFW, return a censored message (asterisks instead of the actual name)
            if top_image_pred_nsfw or text_nsfw:
                return '*' * len(title) + f' - ID {game["steam_appid"]}: Image labeled as inappropriate with confidence of {image_pred_confidence * 100:.2f}%, text labeled as inappropriate= {text_nsfw}'

            return f'{title} - ID {game["steam_appid"]}: Image labeled as appropriate with confidence of {image_pred_confidence * 100:.2f}%, text label as appropriate = {text_nsfw}'

        results = await asyncio.gather(*(process_game(game) for game in response.data))

    for result in results:
        print(result)

    print(f"Total taken: {time.time() - start_time:.2f}s")
    print(f'Time per game: {(time.time() - start_time) / len(response.data):.2f}s')

if __name__ == "__main__":
    asyncio.run(main())