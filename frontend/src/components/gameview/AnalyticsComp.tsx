'use client'

import LineGraphComp from "../LineGraphComp";

interface AnalyticsCompProps {
    game: Game; 
}

const AnalyticsComp: React.FC<AnalyticsCompProps> = ({ game }) => {

    const dummyData = [
        { month: 'Jan', playerCount: 1200 },
        { month: 'Feb', playerCount: 1350 },
        { month: 'Mar', playerCount: 1300 },
        { month: 'Apr', playerCount: 1500 },
        { month: 'May', playerCount: 1000 },
        { month: 'Jun', playerCount: 1250 },
        { month: 'Jul', playerCount: 1850 },
        { month: 'Aug', playerCount: 1150 },
        { month: 'Sep', playerCount: 1650 },
        // Add more data points as needed
    ];

    const formattedReleaseDate = new Date(game["Release date"]).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="flex px-5 bg-stone-800 rounded-lg gap-20 w-full" style={{ height: 'fit-content' }}>
            <div className="flex-1 flex flex-col align-start mt-6 py-1 px-5 bg-stone-800 rounded-lg">
                <p className="my-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Release Date: {formattedReleaseDate}</p>
                <p className="my-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Price: ${game.Price}</p>
                <p className="my-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Positive Ratings: {game.Positive}</p>
                <p className="my-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Negative Ratings: {game.Negative}</p>
            </div>
            <div>
                <div className="py-3 flex-1" style={{ width: '60vh', height: '40vh' }}>
                    {/* Adjust the max-w-lg to control the maximum width and h-96 for the height */}
                    <LineGraphComp data={dummyData} />
                </div>
            </div>
        </div>
    );
}

export default AnalyticsComp;