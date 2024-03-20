import { useState } from 'react';

interface TagListProps {
  tags: string[];
  onTagClick: (selectedTags: string[]) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onTagClick }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    let updatedTags: string[];
  
    if (isSelected) {
      updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    } else {
      updatedTags = [...selectedTags, tag];
    }
    
    setSelectedTags(updatedTags);
    onTagClick(updatedTags);
  };

  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`rounded-lg px-4 py-2 m-2 ${selectedTags.includes(tag) ? 'bg-blue-500 text-white border border-blue-500' : 'text-blue-500 border border-blue-500'}`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagList;
