'use client'

const FriendComp: React.FC<Friends> = (Friend: {id : string, UserID : string, user1 : string, user2 : string}) => {

    if(Friend.user1 === Friend.UserID){
        const F = Friend.user2;
    }
    else if(Friend.user2 === Friend.UserID){
        const F = Friend.user1
    }

    return (
        <>
            <div className="ps-8">
                <h2>{Friend.id}</h2>
            </div>
        </>
    );
}

export default FriendComp;