'use client';
import { useState, useEffect } from "react";
import LayoutComponent from "../header/LayoutComponent";
import FriendComp from "../friend/FriendComp"
import { getFriends } from '../../api/friends'

interface User {
    UserID: string;
}

const FriendListComp: React.FC<User> = ({ UserID }) => {

    const [personalFriends, setPersonalFriends] = useState<Friends[]>([]);

    useEffect(() => {
        async function fetchFriends(id: string) {
            try {
                const res = await getFriends(id);
                const Friends: Friends[] = await res.data;
                setPersonalFriends(Friends);
            } catch (error) {
                console.error('Error fetching user friends:', error);
            }
        };
        (UserID) && fetchFriends(UserID);
    }, []);



    return (
    <>
        <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={true}>
                <div className="fixed top-[60px] lg:top-[60px] w-[200px] h-screen overflow-auto py-4 bg-stone-800 border-r border-stone-700 space-y-4 ps-8">
                {personalFriends.map((Friend, index) => (
                    <FriendComp UserID = {UserID} id = {Friend.id} user1 = {Friend.user1} user2 = {Friend.user2}></FriendComp>
                 ))}
                </div>
        </LayoutComponent>
    </>
    );
}

export default FriendListComp;