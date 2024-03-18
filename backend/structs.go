package main

type userBody struct {
	username			string
	email				string
	password			string
	account_type		string
}


type GameBody struct {
	AppID                      int
	Name                       string
	Release_date               string
	Estimated_owners           string
	Peak_CCU                   int
	Required_age               int
	Price                      float32
	DLC_count                  int
	About_the_game             string
	Supported_languages        []string
	Full_audio_languages       []string
	Reviews                    string
	Header_image               string
	Website                    string
	Support_url                string
	Support_email              string
	Windows                    bool
	Mac                        bool
	Linux                      bool
	Metacritic_score           int
	Metacritic_url             string
	User_score                 int
	Positive                   int
	Negative                   int
	Score_rank                 string
	Achievements               int
	Recommendations            int
	Notes                      string
	Average_playtime_forever   int
	Average_playtime_two_weeks int
	Median_playtime_forever    int
	Median_playtime_two_weeks  int
	Developers                 string
	Publishers                 string
	Categories                 string
	Genres                     []string
	Tags                       string
	Screenshots                string
	Movies                     string
}
