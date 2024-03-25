import { getAllGames, getFavoriteGame, getGamesByDeveloper, setFavoriteGame } from "@/api/games";
import { useEffect, useState } from "react";
import GameCard from "../GameCardComp";
import { getNews } from "@/api/misc";
import NewsCard from "../NewsCardComp";

interface NewsData {
    title: string;
    author: string;
    contents: string;
}

interface RelatedNewsCompProps {
    game: Game,
}

const RelatedNewsComp: React.FC<RelatedNewsCompProps> = ({ game }) => {

    const [news, setNews] = useState<NewsData[] | null>(null);

    useEffect(() => {
        async function fetchNewsByGame(AppID: number) {
            try {
                const response = await getNews(AppID);
                console.log(response.data);
                setNews(response.data);
            } catch(error1) {
                console.error('Bad Response', error1);
            }
        }
        fetchNewsByGame(game.AppID);
    }, []);

    if (!news) {
        return <div>Loading news...</div>; 
    }

    return (
        <>
            {/* <div className="p-4 bg-stone-800 rounded-xl my-4"> */}
            {news.map((newsItem, index) => (
                <NewsCard key={index} {...newsItem} />
            ))}
        {/* </div> */}
        </>
    );
}

export default RelatedNewsComp;