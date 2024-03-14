import SideBarComp from "./SideBarComp";
import SidebarMenuComp from "./SidebarMenuComp";
import TitleComponent from "./TitleComponent";

const LayoutComponent = ({ children, searchQuery, setSearchQuery }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-stone-500 text-stone-200">
            <TitleComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
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