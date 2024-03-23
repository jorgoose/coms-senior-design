'use client';

import { useState, useEffect } from "react";
import LayoutComponent from "../header/LayoutComponent";
import { getFilteredConcepts } from "@/api/gameConcepts";

interface PersonalConceptsCompProps {
    user: User;
}

const PersonalConceptsComp: React.FC<PersonalConceptsCompProps> = ({ user }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [personalUserConcepts, setPersonalUserConcepts] = useState<GameConcept[]>([]);

    const filteredConcepts = personalUserConcepts.filter((concept) =>
        concept?.Title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        async function fetchUserConcepts(id: string) {
            try {
                const res = await getFilteredConcepts(id);
                console.log(res.data);
                try {
                    console.log("Right before: ", res.data);
                    setPersonalUserConcepts(res.data);
                } catch (setError) {
                    console.error('Setting error: ', setError);
                }
                console.log("Use State: ", personalUserConcepts);
            } catch (error) {
                console.error('Error fetching user games:', error);
            }
        };

        (user.id) && fetchUserConcepts(user.id);
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