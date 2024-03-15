'use client';

import LayoutComponent from "./header/LayoutComponent";

const GamingRoundupComp: React.FC<{}> = () => {

    return (
        <>
            <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={true}>
                    <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                        <h3>Gaming Roundup Comp</h3>
                    </main>
            </LayoutComponent>
        </>
    );
};

export default GamingRoundupComp;