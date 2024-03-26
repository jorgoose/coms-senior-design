'use client'

const FriendComp: React.FC<Friends> = (Friend: {id : string, user1 : string, user2 : string}) => {
    return (
        <>
            <div className="ps-8">
                <h2>{Friend.id}</h2>
            </div>
        </>
    );
}

export default FriendComp;