'use client';

import { postGameConcept } from "@/api/gameConcepts";
import LayoutComponent from "../header/LayoutComponent";
import SubmitButton from "../SubmitButton";
import { useFormState } from "react-dom";

interface CreateGameConceptProps {
    user: User;
}

const initialState = {
    message: '',
}

const CreateGameConceptComp: React.FC<CreateGameConceptProps> = ({ user }) => {
    const [state, formAction] = useFormState(postGameConcept, initialState);

    return (
        <>
            <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={false}>
                    <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                        <form action={async (formData: FormData) => {
                            if (user.id) {
                                formData.append("developer_id", user.id)
                                formAction(formData);
                            }
                        }}>
                            <input className="rounded-md w-1/2 text-black" name="title" placeholder="Title" required />
                            <input className="rounded-md w-1/2 text-black" name="description" placeholder="Description" required />
                            <input className="rounded-md w-1/2 text-black" name="genre" placeholder="Genre" required />
                            <input className="rounded-md w-1/2 text-black" name="tags" placeholder="Tags" required />
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