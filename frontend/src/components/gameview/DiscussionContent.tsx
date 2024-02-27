const DiscussionContent = () => {
    return (
        <div className="bg-slate-700 rounded-lg shadow-md p-6">
            <h2 className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text text-lg font-semibold mb-4">Discussion</h2>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <textarea className="bg-slate-800 w-full h-20 rounded-md border-blue-400 focus:ring-purple-500 focus:border-purple-500" placeholder="Write your comment here..."></textarea>
                    <button className="mt-2 px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-500">Post</button>
                </div>
            </div>
        </div>
    );
}

export default DiscussionContent;