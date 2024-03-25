
interface NewsCardProps {
    title: string;
    author?: string;
    contents: string;
}

const extractImageSrc = (htmlContent: string): string | null => {
    const imgRegex = /<img.*?src="(.*?)"/;
    const match = htmlContent.match(imgRegex);
    return match ? match[1] : null;
};

const NewsCard: React.FC<NewsCardProps> = ({ title, author, contents }) => {
    const imageSrc = extractImageSrc(contents);

    return (
        <div className="bg-stone-800 text-white p-4 rounded-xl mb-4 shadow-lg">
            {imageSrc && <img src={imageSrc} alt={title} className="max-w-full h-auto rounded" />}
            <h3 className="text-xl font-bold mt-2">{title}</h3>
            {author && <p className="text-md mt-1">By {author}</p>}
        </div>
    );
};

export default NewsCard;