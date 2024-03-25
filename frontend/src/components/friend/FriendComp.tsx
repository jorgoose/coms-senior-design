'use client'

const FriendComp = () => {
    return (
        <>
            <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
                <h3>FriendsList</h3>
                <p>Does this wokr</p>
                <FriendComp></FriendComp>
            </main>
    </>
    );
}

export default FriendComp;