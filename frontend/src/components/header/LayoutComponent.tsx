import SideBarComp from "./SideBarComp";
import TitleComponent from "./TitleComponent";

interface LayoutComponentProps {
    children: React.ReactNode;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    showSearchBar: boolean;
    title?: string;
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children, searchQuery, setSearchQuery, showSearchBar }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-stone-500 text-stone-200">
            <TitleComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showSearchBar={showSearchBar}
            />
            <div className="flex flex-grow">
                <SideBarComp />
                <main className="flex-grow p-4 md:p-6 overflow-auto ml-[280px]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default LayoutComponent;