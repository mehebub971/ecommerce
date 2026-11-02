import NavigationManagement from "./NavigationManagement";
import { INITIAL_NAVBARS } from "./navigationData";

function Navbar() {
    return (
        <NavigationManagement
            title="Navbar"
            description="Manage the main navigation links shown in your store."
            storageKey="admin-navbars"
            initialItems={INITIAL_NAVBARS}
        />
    );
}

export default Navbar;
