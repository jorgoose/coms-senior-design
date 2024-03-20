'use client';

import { postGameConcept } from "@/api/gameConcepts";
import LayoutComponent from "../header/LayoutComponent";
import SubmitButton from "../SubmitButton";
import { useFormState } from "react-dom";
import TagList from "../gameConceptComps/TagList";
import { useState } from "react";

const tags: string[] = ['shooter', 'first-person-shooter', 'action', 'adventure'];
const genres: string[] = ['rpg', 'shooter', 'roguelite', 'action']

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
                        <input className="rounded-md w-1/2 text-black" name="title" placeholder="Title" required />
                        <input className="rounded-md w-1/2 text-black" name="description" placeholder="Description" required />
                        <div>
                            <TagList tags={genres} onTagClick={handleGenreSelection} />
                        </div>
                        <div>
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