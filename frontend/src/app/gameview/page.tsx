import Image from "next/image"

export default function Gameview() {

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-stone-500">
            <div className="flex flex-col justify-center items-center w-full m-4">
                <Image
                className="rounded-lg"
                src="https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977"
                alt="Example Image"
                width={500}
                height={500}
                />
            </div>
            <p className="text-4xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text text-center">Counter-Strike: Condition Zero</p>
            <p className="m-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text text-center">With its extensive Tour of Duty campaign, a near-limitless number of skirmish modes, updates and new content for Counter-Strike's award-winning multiplayer game play, plus over 12 bonus single player missions, Counter-Strike: Condition Zero is a tremendous offering of single and multiplayer content.</p>
        </div>
    );
}