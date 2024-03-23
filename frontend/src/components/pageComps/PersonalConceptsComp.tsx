'use client';

import LayoutComponent from "../header/LayoutComponent";

const PersonalConceptsComp: React.FC = () => {

    return (
        <>
            <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={false}>
                <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                    <p>Personal Game Concepts</p>
                </main>
            </LayoutComponent>
        </>
    );
};

export default PersonalConceptsComp;