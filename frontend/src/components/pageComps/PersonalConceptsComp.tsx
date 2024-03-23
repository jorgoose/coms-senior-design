'use client';

import LayoutComponent from "../header/LayoutComponent";

const genres: string[] = [
    'indie', 'simulation', 'sports', 'action',
    'rpg', 'racing', 'casual', 'strategy',
    'software', 'adventure', 'action-adventure'
];

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