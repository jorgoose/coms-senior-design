import json
import warnings
from bs4 import BeautifulSoup, MarkupResemblesLocatorWarning

def cleanse_games_data(game_data: dict) -> dict:
    cleanse_supported_languages(game_data)
    cleanse_descriptions(game_data)
    cleanse_requirements(game_data)
    if game_data.get("recommendations"):
        game_data["recommendations"] = game_data["recommendations"]["total"]
    return game_data

def cleanse_supported_languages(game: dict):
    game["supported_languages"] = BeautifulSoup(game["supported_languages"], "html.parser").get_text()
    game["supported_languages"] = game["supported_languages"].replace("*languages with full audio support", "")
    game["supported_languages"] = game["supported_languages"].replace("*", "")
    game["supported_languages"] = game["supported_languages"].split(", ")

def cleanse_descriptions(game):
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

def lambda_handler(event, context):
    game_data = event["game_data"]
    cleansed_game_data = cleanse_games_data(game_data)
    
    # TODO: Store cleansed_game_data in an S3 bucket

    return cleansed_game_data

if __name__ == "__main__":
    sample_game_data = {"supported_languages": "<strong>English</strong>, <strong>French</strong>", "detailed_description": "<p>This is a detailed description.</p>", "short_description": "<p>This is a short description.</p>", "pc_requirements": {"minimum": "<strong>Minimum:</strong><br><ul class=\"bb_ul\"><li><strong>OS:</strong> Windows 7</li><li><strong>Processor:</strong> 2.0 GHz</li><li><strong>Memory:</strong> 4 GB RAM</li><li><strong>Graphics:</strong> DirectX 9 Compatible Graphics Card</li><li><strong>DirectX:</strong> Version 9.0</li><li><strong>Storage:</strong> 500 MB available space</li></ul>"}}
    lambda_handler({"game_data": sample_game_data}, None)
