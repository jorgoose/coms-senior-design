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
    ];

    const formattedReleaseDate = new Date(game["Release date"]).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const positiveToNegativeRatio = (game?.Positive/game?.Negative);

    const gameAnalyticsKeys = {
        "Release Date": formattedReleaseDate,
        "Price": game.Price,
        "Positive to Negative Review Ratio": positiveToNegativeRatio.toFixed(2),
        "Recommendations": game.Recommendations,
    };

    return (
        <div className="flex px-5 bg-stone-800 rounded-lg gap-20 w-full" style={{ height: 'fit-content' }}>
            <div className="flex-1 flex flex-col align-start mt-6 py-1 px-5 bg-stone-800 rounded-lg">
                {Object.entries(gameAnalyticsKeys).map(([key, value]) => (
                    <p key={key} className="my-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                        {key}: {String(value)} 
                    </p>
                ))}
            </div>
            <div>
                <div className="py-3 flex-1" style={{ width: '60vh', height: '40vh' }}>
                    <LineGraphComp data={dummyData} />
                </div>
            </div>
        </div>
    );
}

export default AnalyticsComp;