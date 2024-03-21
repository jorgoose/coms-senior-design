'use client';

import { postGameConcept } from "@/api/gameConcepts";
import LayoutComponent from "../header/LayoutComponent";
import SubmitButton from "../SubmitButton";
import { useFormState } from "react-dom";
import TagList from "../gameConceptComps/TagList";
import { useState } from "react";

const tags: string[] = [
                            'puzzle', 'dating sim', '3d fighter', 'arcade',
                            'design & illustration', 'grand strategy', 'action-adventure',
                            'walking simulator', 'space sim', 'shooter', 'card game',
                            'farming sim', 'platformer', 'life sim', 'mmorpg', 'visual novel',
                            'utilities', 'esports', 'sandbox', 'rts', 'colony sim', 'point & click',
                            'board game', 'battle royale', 'action rpg', 'strategy rpg', 'word game',
                            'rogue-like', 'web publishing', 'audio production', 'tabletop', 'tower defense',
                            'auto battler', 'turn-based strategy', 'city builder', 'video production',
                            'action roguelike', 'beat\'em up', 'god game', 'interactive fiction', '2d fighter',
                            '4x', 'party-based rpg', 'automobile sim', 'moba', 'education', 'rhythm',
                            'photo editing', 'jrpg', 'animation & modeling', 'trivia'
                        ];

const genres: string[] = [
                            'indie', 'simulation', 'sports', 'action',
                            'rpg', 'racing', 'casual', 'strategy',
                            'software', 'adventure', 'action-adventure'
                        ];

interface CreateGameConceptProps {
    user: User;
}

const initialState = {
    message: '',
}

const CreateGameConceptComp: React.FC<CreateGameConceptProps> = ({ user }) => {
    const [state, formAction] = useFormState(postGameConcept, initialState);
    const [selectedTags, setSelectedTags] = useState<string>('');
    const [selectedGenres, setSelectedGenres] = useState<string>('');

    const handleGenreSelection = (selectedGenres: string[]) => {
        const genres: string = selectedGenres.join(',')

        setSelectedGenres(genres);
    };
    
    const handleTagSelection = (selectedTags: string[]) => {
        const tags: string = selectedTags.join(',')

        setSelectedTags(tags);
    };

    return (
        <>
            <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={false}>
                <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                    <form action={async (formData: FormData) => {
                        if (user.id) {
                            formData.append("developer_id", user.id);
                            formData.append("tags", selectedTags);
                            formData.append("genres", selectedGenres);
                        }
                        formAction(formData);
                    }}>
                        <input className="rounded-md w-1/2 m-2 text-white bg-slate-600 indent-2" name="title" placeholder="Title" required />
                        <input className="rounded-md w-1/2 m-2 text-white bg-slate-600 indent-2" name="description" placeholder="Description" required />
                        <p className="text-blue-500">Genres</p>
                        <div className="m-2">
                            <TagList tags={genres} onTagClick={handleGenreSelection} />
                        </div>
                        <p className="text-blue-500">Tags</p>
                        <div className="m-2">
                            <TagList tags={tags} onTagClick={handleTagSelection} />
                        </div>
                        <p aria-live="polite">
                            {state?.message}
                        </p>
                        <SubmitButton use='Submit' />
                    </form>
                </main>
            </LayoutComponent>
        </>
    );
};

export default CreateGameConceptComp;