package main

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

type GameConcepts struct {
	Title       string   `json:"title"`
	UserID      string   `json:"UserID"`
	Description string   `json:"description"`
	Genre       []string `json:"genre"`
	Tags        []string `json:"tags"`
}

type FavoriteGame struct {
	AppID  int
	UserID string
}

type Friend struct {
	User1 string
	User2 string
}

type Comment struct {
	AppID    int    // commenting on steam game
	UserID   string // who is commenting
	ParentID string // if its replying to another comment (null if not)
	Comment  string // Actual comment
}

type Review struct {
	UserID    string `json:"UserID"`
	ConceptID string `json:"ConceptID"`
	Comment   string `json:"comment"`
	Vote      int    `json:"vote"`
}

type User struct {
	UserID   string
	Username string
	Email    string
}

type News struct {
	Appnews struct {
		Appid     int `json:"appid"`
		Newsitems []struct {
			Title    string `json:"title"`
			Author   string `json:"author"`
			Contents string `json:"contents"`
		}
		Count int `json:"count"`
	}
}
