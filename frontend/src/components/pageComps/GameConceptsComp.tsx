'use client';

import { useEffect, useState } from "react";
import LayoutComponent from "../header/LayoutComponent";
import { getAllGameConcepts } from "@/api/gameConcepts";
import SubmitButton from "../SubmitButton";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { postReview } from "@/api/reviews";

interface GameConceptsCompProps {
    UserID: string;
}

const initialState = {
    message: '',
}

const GameConceptsComp: React.FC<GameConceptsCompProps> = ({ UserID }) => {
    const [state, formAction] = useFormState(postReview, initialState);
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredConcepts.map((concept, index) => (
                            <div key={index} className="relative">
                                <div className="w-56 h-44 bg-stone-800 rounded-t overflow-auto shadow-lg relative">
                                    <p className="ml-2">Title</p>
                                    <p className="m-2 mt-0 text-sky-500">{concept.Title ? concept.Title : 'No Title Given'}</p>
                                    <p className="ml-2">Description</p>
                                    <p className="m-2 mt-0 text-sky-500">{concept.Description ? concept.Description : 'No Description Given'}</p>
                                    <p className="ml-2">Genres</p>
                                    <p className="m-2 mt-0 text-sky-500">{concept.Genres ? concept.Genres.join(', ') : 'No Genres Given'}</p>
                                    <p className="ml-2">Tags</p>
                                    <p className="m-2 my-0 text-sky-500">{concept.Tags ? concept.Tags.join(', '): 'No Tags Given'}</p>
                                </div>
                                <div className="w-56 bg-stone-800 rounded-b border-t border-t-indigo-500 shadow-lg relative">
                                    <form action={async (formData: FormData) => {
                                        formData.append("UserID", UserID);
                                        if (concept.id) formData.append("ConceptID", concept.id);
                                        formAction(formData);
                                        redirect('/dashboard/gameConcepts');
                                    }}>
                                        <input type="text" className="bg-slate-600 m-2 rounded-md" name="comment" placeholder="Leave Review"/>
                                        <SubmitButton use='Submit' />
                                    </form>
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