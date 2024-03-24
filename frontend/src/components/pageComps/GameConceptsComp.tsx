'use client';

import { useEffect, useState } from "react";
import LayoutComponent from "../header/LayoutComponent";

interface GameConceptsCompProps {
    UserID: string;
}

const GameConceptsComp: React.FC<GameConceptsCompProps> = ({ UserID }) => {

    return (
        <>
            <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={false}>
                <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                    Game Concepts Comp
                </main>
            </LayoutComponent>
        </>
    );
};

export default GameConceptsComp;