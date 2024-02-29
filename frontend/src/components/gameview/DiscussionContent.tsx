import { useState } from "react";

const DiscussionContent = () => {
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<string[]>([]);

    const handlePostComment = () => {
        if (comment.trim() !== '') {
        setComments(prevComments => [...prevComments, comment]);
        setComment('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handlePostComment();
        }
      };

    return (
        <div className="bg-slate-700 rounded-lg shadow-md p-6">
            <h2 className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text text-lg font-semibold mb-4">Discussion</h2>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={comment}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                        className="bg-slate-800 w-full h-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 pl-2"
                    />
                    <button
                        onClick={handlePostComment}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >Post</button>
                </div>
            </div>
            <div className="mt-4 max-h-48 overflow-y-auto">
                {comments.map((comment, index) => (
                    <div key={index} className="border-b border-gray-200 py-2">
                        <p className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">{comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscussionContent;