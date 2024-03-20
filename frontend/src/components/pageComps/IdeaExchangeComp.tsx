'use client';

import LayoutComponent from "../header/LayoutComponent";

const IdeaExchangeComp: React.FC<{}> = () => {

    return (
        <>
            <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={false}>
                    <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                        <h3>Idea Exchange</h3>
                    </main>
            </LayoutComponent>
        </>
    );
};

export default IdeaExchangeComp;