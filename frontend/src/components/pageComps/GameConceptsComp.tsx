'use client';

import { useEffect, useState } from "react";
import LayoutComponent from "../header/LayoutComponent";
import { getAllGameConcepts } from "@/api/gameConcepts";

interface GameConceptsCompProps {
    UserID: string;
}

const GameConceptsComp: React.FC<GameConceptsCompProps> = ({ UserID }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [gameConcepts, setGameConcepts] = useState<GameConcept[]>([]);
    const [expandedConceptIndex, setExpandedConceptIndex] = useState<number | null>(null);

    const filteredConcepts = gameConcepts.filter((concept) =>
        concept?.Title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        async function fetchGameConcepts(id: string) {
            try {
                const res = await getAllGameConcepts();
                const updateData: GameConcept[] = await res.data;
                setGameConcepts(updateData);
            } catch (error) {
                console.error('Error fetching user games:', error);
            }
        };

        (UserID) && fetchGameConcepts(UserID);
    }, []);

    const handleToggleDropdown = (index: number) => {
        setExpandedConceptIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <>
            <LayoutComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearchBar={true}>
                <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                    <p className="text-sky-500">Game Concepts</p>
                    <div>
                        {filteredConcepts.map((concept, index) => (
                            <div key={index} className="relative">
                                <div
                                    className="flex items-center justify-between p-4 bg-slate-700 rounded-md"
                                    onClick={() => handleToggleDropdown(index)}
                                >
                                    <span className="text-sky-500">{concept.Title}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className={`p-4 bg-slate-800 rounded-md ${expandedConceptIndex === index ? 'block' : 'hidden'}`}>
                                    <p className="text-sky-500">{concept.Description}</p>
                                    <p className="text-sky-500">{concept.Genres ? concept.Genres.join(', ') : ''}</p>
                                    <p className="text-sky-500">{concept.Tags ? concept.Tags.join(', '): ''}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </LayoutComponent>
        </>
    );
};

export default GameConceptsComp;