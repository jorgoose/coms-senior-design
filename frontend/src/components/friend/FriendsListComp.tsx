'use client';

import LayoutComponent from "../header/LayoutComponent";
import FriendComp from "../friend/FriendComp"


const FriendListComp = () => {
    return (
    <>
        <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={true}>
                <div className="fixed top-[60px] lg:top-[60px] w-[200px] h-screen overflow-auto py-4 bg-stone-800 border-r border-stone-700 space-y-4">
                    <FriendComp/>
                    <FriendComp/>
                </div>
        </LayoutComponent>
    </>
    );
}

export default FriendListComp;