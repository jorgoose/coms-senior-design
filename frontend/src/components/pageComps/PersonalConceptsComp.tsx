'use client';

import { useState, useEffect } from "react";
import LayoutComponent from "../header/LayoutComponent";
import { getFilteredConcepts } from "@/api/gameConcepts";

interface PersonalConceptsCompProps {
    UserID: string;
}

const PersonalConceptsComp: React.FC<PersonalConceptsCompProps> = ({ UserID }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [personalUserConcepts, setPersonalUserConcepts] = useState<GameConcept[]>([]);

    const filteredConcepts = personalUserConcepts.filter((concept) =>
        concept?.Title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        async function fetchUserConcepts(id: string) {
            try {
                const res = await getFilteredConcepts(id);
                const updateData: GameConcept[] = await res.data;
                setPersonalUserConcepts(updateData);
            } catch (error) {
                console.error('Error fetching user games:', error);
            }
        };

        (UserID) && fetchUserConcepts(UserID);
    }, []);
    
    return (
        <>
            <LayoutComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearchBar={true}>
                <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                    <p>Personal Game Concepts</p>
                    <div>
                        {filteredConcepts.map((concept, index) => (
                            <p key={index}>{concept.Title}</p>
                        ))}
                    </div>
                </main>
            </LayoutComponent>
        </>
    );
};

export default PersonalConceptsComp;