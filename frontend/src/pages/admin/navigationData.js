export const INITIAL_NAVBARS = [
    { id: "nav-home", name: "Home", path: "/", order: 1, isActive: true },
    { id: "nav-shop", name: "Shop", path: "/products", order: 2, isActive: true },
    { id: "nav-about", name: "About", path: "/about", order: 3, isActive: true },
    { id: "nav-contact", name: "Contact", path: "/contact", order: 4, isActive: true }
];

export const INITIAL_SUBNAVBARS = [
    { id: "sub-featured", parentId: "nav-shop", name: "Featured", path: "/products/featured", order: 1, isActive: true },
    { id: "sub-new", parentId: "nav-shop", name: "New Arrivals", path: "/products/new", order: 2, isActive: true },
    { id: "sub-best", parentId: "nav-shop", name: "Best Sellers", path: "/products/best-sellers", order: 3, isActive: true }
];
