package main

type GameBody struct {
	AppID                      string `json: "AppID"`
	Name                       string `json: "Name"`
	Release_date               string `json: "release date"`
	Estimated_owners           string `json: "Estimated owners"`
	Peak_CCU                   string `json: "Peak CCU"`
	Required_age               string `json: "Required age"`
	Price                      string `json: "Price"`
	DLC_count                  string `json: "DLC count"`
	About_the_game             string `json: "About the game"`
	Supported_languages        string `json: "Supported languages"`
	Full_audio_languages       string `json: "Full audio languages"`
	Reviews                    string `json: "Reviews"`
	Header_image               string `json: "Header image"`
	Website                    string `json: "Website"`
	Support_url                string `json: "Support url"`
	Support_email              string `json: "Support email"`
	Windows                    string `json: "Windows"`
	Mac                        string `json: "Mac"`
	Linux                      string `json: "Linux"`
	Metacritic_score           string `json: "Metacritic score"`
	Metacritic_url             string `json: "Metacritic url"`
	User_score                 string `json: "User score"`
	Positive                   string `json: "Positive"`
	Negative                   string `json: "Negative"`
	Score_rank                 string `json: "Score rank"`
	Achievements               string `json: "Achievements"`
	Recommendations            string `json: "Recommendations"`
	Notes                      string `json: "Notes"`
	Average_playtime_forever   string `json: "Average playtime forever"`
	Average_playtime_two_weeks string `json: "Average playtime two_weeks"`
	Median_playtime_forever    string `json: "Median playtime forever"`
	Median_playtime_two_weeks  string `json: "Median playtime two weeks"`
	Developers                 string `json: "Developers"`
	Publishers                 string `json: "Publishers"`
	Categories                 string `json: "Categories"`
	Genres                     string `json: "Genres"`
	Tags                       string `json: "Tags"`
	Screenshots                string `json: "Screenshots"`
	Movies                     string `json: "Movies"`
}
