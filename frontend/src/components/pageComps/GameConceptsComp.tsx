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

    return (
        <>
            <LayoutComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearchBar={true}>
                <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                    <p className="text-sky-500">Game Concepts</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredConcepts.map((concept, index) => (
                            <div key={index} className="relative">
                                <div className="w-56 h-44 bg-stone-800 rounded-t overflow-auto shadow-lg relative">
                                    <p className="m-2 text-sky-500">{concept.Title}</p>
                                    <p className="m-2 text-sky-500">{concept.Description}</p>
                                    <p className="m-2 text-sky-500">{concept.Genres ? concept.Genres.join(', ') : ''}</p>
                                    <p className="m-2 text-sky-500">{concept.Tags ? concept.Tags.join(', '): ''}</p>
                                </div>
                                <div className="w-56 bg-stone-800 rounded-b shadow-lg relative">
                                    <input type="text" className="bg-slate-600 m-2" placeholder="Leave Review"/>
                                    <button className="ml-2">Submit</button>
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