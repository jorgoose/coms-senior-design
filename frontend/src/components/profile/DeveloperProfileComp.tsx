'use client';

import LayoutComponent from '../header/LayoutComponent';
const DeveloperProfileComp: React.FC = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        age: 30,
        skills: ['JavaScript', 'React', 'Node.js'],
        bio: 'I am a passionate developer eager to learn and grow.'
    });

    return (
        <LayoutComponent searchQuery={''} setSearchQuery={() => {}} showSearchBar={true}>
        <main className="flex flex-col md:gap-8 pr-5 pt-[50px] lg:pt-[60px] overflow-auto">
        <h3> Profile </h3>
                    </main>
            </LayoutComponent>
    );
}

export default DeveloperProfileComp;
