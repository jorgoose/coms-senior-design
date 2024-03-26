'use client'
import { useState, useEffect } from "react";
import { getFriends } from '../../api/friends'

const FriendComp: React.FC<Friends> = (Friend: {id : string, UserID : string, user1 : string, user2 : string}) => {

    if(Friend.user1 === Friend.UserID){
        const F = Friend.user2;
    }
    else if(Friend.user2 === Friend.UserID){
        const F = Friend.user1
        
    }

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
            <div className="ps-8">
                <h2>{Friend.id}</h2>
            </div>
        </>
    );
}

export default FriendComp;