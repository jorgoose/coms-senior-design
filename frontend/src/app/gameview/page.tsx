import Image from "next/image"

export default function Gameview() {
    return (
        <div className="flex flex-col items-center">
            <div className="relative h-1/3">
                <Image
                className="relative"
                src="https://cdn.akamai.steamstatic.com/steam/apps/80/header.jpg?t=1602535977"
                alt="Example Image"
                width={500}
                height={500}
                />
                <p className="mt-4">With its extensive Tour of Duty campaign, a near-limitless number of skirmish modes, updates and new content for Counter-Strike's award-winning multiplayer game play, plus over 12 bonus single player missions, Counter-Strike: Condition Zero is a tremendous offering of single and multiplayer content.</p>
            </div>
        </div>
    );
}