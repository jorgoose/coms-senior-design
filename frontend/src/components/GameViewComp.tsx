'use client';

import Link from "next/link";

import LayoutComponent from "./header/LayoutComponent";
import Image from "next/image";
import ButtonBar from "./gameview/ButtonBar";
import { GetServerSideProps } from "next";

const dummyData = [
    {
        "About the game":"With its extensive Tour of Duty campaign, a near-limitless number of skirmish modes, updates and new content for Counter-Strike's award-winning multiplayer game play, plus over 12 bonus single player missions, Counter-Strike: Condition Zero is a tremendous offering of single and multiplayer content.",
        "Achievements":"0",
        "AppID":"80",
        "Average playtime forever":"1523",
        "Average playtime two weeks":"18",
        "Categories":"Single-player,Multi-player,Valve Anti-Cheat enabled",
        "DLC count":"0",
        "Developers":"Valve",
        "Estimated owners":"5000000 - 10000000",
        "Full audio languages":"[]",
        "Genres":"Action",
        "Header image":"https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977",
        "Linux":"TRUE",
        "Mac":"TRUE",
        "Median playtime forever":"36",
        "Median playtime two weeks":"22",
        "Metacritic score":"65",
        "Metacritic url":"https://www.metacritic.com/game/pc/counter-strike-condition-zero?ftag=MCD-06-10aaa1f",
        "Movies":null,
        "Name":"Counter-Strike: Condition Zero",
        "Negative":"1871",
        "Notes":null,
        "Peak CCU":"425",
        "Positive":"19314",
        "Price":"9.99",
        "Publishers":"Valve",
        "Recommendations":"15155",
        "Release date":"1-Mar-04",
        "Required age":"0",
        "Reviews":null,
        "Score rank":null,
        "Screenshots":null,
        "Support email":null,
        "Support url":"http://steamcommunity.com/app/80",
        "Supported languages":"['English', 'French', 'German', 'Italian', 'Spanish - Spain', 'Simplified Chinese', 'Traditional Chinese', 'Korean']",
        "Tags":"Action,FPS,Shooter,Multiplayer,First-Person,Singleplayer,Classic,Tactical,Team-Based,Competitive,Military,Strategy,Online Co-Op,Adventure,Survival,Atmospheric,Open World,Old School,Simulation,Dark",
        "User score":"0",
        "Website":null,
        "Windows":"TRUE"
    }
]

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Retrieve gameId or other query parameters
    const { gameId } = context.query;

    // Perform necessary operations with gameId, like fetching game details
    // For demo, just passing it as a prop
    return {
        props: {
            gameId, // This will be passed as a prop to your page component
        },
    };
};

interface GameViewProps {
    gameId: number;
}

const GameViewComp: React.FC<GameViewProps> = ({ gameId }) => {

    console.log(gameId);

    return (
        <>
            <LayoutComponent searchQuery={''} setSearchQuery={()=>{}} showSearchBar={false}>
                    <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                        <div className="w-full max-w-screen-xl">
                            <Image
                                className="rounded-lg w-full"
                                src="https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977"
                                alt="Example Image"
                                width={500}
                                height={500}
                            />
                        </div>
                        <div className="m-4">
                            <p className="text-4xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-6">
                                Counter-Strike: Condition Zero
                            </p>
                            <ButtonBar 
                            data={dummyData}/>
                        </div>
                    </main>
            </LayoutComponent>
        </>
    );
};

export default GameViewComp;