import NavigationManagement from "./NavigationManagement";
import { INITIAL_SUBNAVBARS, INITIAL_NAVBARS } from "./navigationData";

function SubNavbar() {
    return (
        <NavigationManagement
            title="Sub Navbar"
            description="Manage dropdown links under each main navigation item."
            storageKey="admin-sub-navbars"
            initialItems={INITIAL_SUBNAVBARS}
            hasParent
            parentStorageKey="admin-navbars"
            initialParents={INITIAL_NAVBARS}
        />
    );
}

export default SubNavbar;
