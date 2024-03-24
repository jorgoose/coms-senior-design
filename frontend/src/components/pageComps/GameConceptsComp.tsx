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
        concept?.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <p>Game Concepts</p>
                    <div>
                        {filteredConcepts.map((concept, index) => (
                            <p key={index}>{concept.title}</p>
                        ))}
                    </div>
                </main>
            </LayoutComponent>
        </>
    );
};

export default GameConceptsComp;