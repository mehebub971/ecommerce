import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./css/NavigationManagement.css";

function loadItems(storageKey, fallback) {
    const storedItems = window.localStorage.getItem(storageKey);

    if (!storedItems) return fallback;

    try {
        const parsedItems = JSON.parse(storedItems);
        return Array.isArray(parsedItems) ? parsedItems : fallback;
    } catch {
        return fallback;
    }
}

function NavigationManagement({
    title,
    description,
    storageKey,
    initialItems,
    hasParent = false,
    parentStorageKey,
    initialParents = []
}) {
    const [items, setItems] = useState(() => loadItems(storageKey, initialItems));
    const [parents] = useState(() =>
        hasParent ? loadItems(parentStorageKey, initialParents) : []
    );
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        path: "",
        order: "1",
        isActive: "true",
        parentId: parents[0]?.id || ""
    });

    useEffect(() => {
        window.localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items, storageKey]);

    const parentNames = useMemo(
        () => new Map(parents.map((parent) => [parent.id, parent.name])),
        [parents]
    );

    const filteredItems = useMemo(() => {
        const query = search.trim().toLowerCase();

        return [...items]
            .sort((first, second) => Number(first.order) - Number(second.order))
            .filter((item) => {
                const parentName = parentNames.get(item.parentId) || "";
                return `${item.name} ${item.path} ${parentName}`.toLowerCase().includes(query);
            });
    }, [items, parentNames, search]);

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            name: "",
            path: "",
            order: String(items.length + 1),
            isActive: "true",
            parentId: parents[0]?.id || ""
        });
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            path: item.path,
            order: String(item.order),
            isActive: String(item.isActive),
            parentId: item.parentId || parents[0]?.id || ""
        });
        setShowModal(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedItem = {
            id: editingItem?.id || `${hasParent ? "sub" : "nav"}-${Date.now()}`,
            name: formData.name.trim(),
            path: formData.path.trim(),
            order: Number(formData.order),
            isActive: formData.isActive === "true",
            ...(hasParent ? { parentId: formData.parentId } : {})
        };

        setItems((currentItems) =>
            editingItem
                ? currentItems.map((item) => item.id === editingItem.id ? updatedItem : item)
                : [...currentItems, updatedItem]
        );
        setShowModal(false);
    };

    const handleDelete = (item) => {
        if (!window.confirm(`Delete "${item.name}"?`)) return;
        setItems((currentItems) => currentItems.filter((currentItem) => currentItem.id !== item.id));
    };

    return (
        <AdminLayout>
            <section className="navigation-page">
                <div className="navigation-page-top">
                    <div>
                        <h2>{title} Items</h2>
                        <p>{description}</p>
                    </div>
                    <button className="navigation-add-button" onClick={openAddModal}>
                        + Add {title}
                    </button>
                </div>

                <div className="navigation-toolbar">
                    <label className="navigation-search">
                        <span aria-hidden="true">⌕</span>
                        <input
                            type="search"
                            placeholder={`Search ${title.toLowerCase()}...`}
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </label>
                    <span className="navigation-count">
                        {filteredItems.length} of {items.length} items
                    </span>
                </div>

                <div className="navigation-table-wrap">
                    <table className="navigation-table">
                        <thead>
                            <tr>
                                <th>Order</th>
                                {hasParent && <th>Navbar</th>}
                                <th>Name</th>
                                <th>Link / URL</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={hasParent ? 6 : 5} className="navigation-empty">
                                        No {title.toLowerCase()} items found.
                                    </td>
                                </tr>
                            ) : filteredItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.order}</td>
                                    {hasParent && <td>{parentNames.get(item.parentId) || "—"}</td>}
                                    <td><strong>{item.name}</strong></td>
                                    <td><span className="navigation-path">{item.path}</span></td>
                                    <td>
                                        <span className={`navigation-status ${item.isActive ? "active" : "inactive"}`}>
                                            {item.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="navigation-actions">
                                            <button type="button" aria-label={`Edit ${item.name}`} onClick={() => openEditModal(item)}>✏️</button>
                                            <button type="button" aria-label={`Delete ${item.name}`} onClick={() => handleDelete(item)}>🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className="navigation-modal-overlay" onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setShowModal(false);
                    }}>
                        <div className="navigation-modal" role="dialog" aria-modal="true" aria-labelledby="navigation-modal-title">
                            <div className="navigation-modal-heading">
                                <div>
                                    <h2 id="navigation-modal-title">{editingItem ? `Edit ${title}` : `Add ${title}`}</h2>
                                    <p>Enter the navigation item details.</p>
                                </div>
                                <button type="button" className="navigation-modal-close" aria-label="Close" onClick={() => setShowModal(false)}>×</button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {hasParent && (
                                    <label className="navigation-form-field">
                                        <span>Parent Navbar *</span>
                                        <select
                                            value={formData.parentId}
                                            onChange={(event) => setFormData({ ...formData, parentId: event.target.value })}
                                            required
                                        >
                                            {parents.map((parent) => (
                                                <option key={parent.id} value={parent.id}>{parent.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                )}
                                <label className="navigation-form-field">
                                    <span>Name *</span>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                        placeholder={`Enter ${title.toLowerCase()} name`}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                                <label className="navigation-form-field">
                                    <span>Link / URL *</span>
                                    <input
                                        type="text"
                                        value={formData.path}
                                        onChange={(event) => setFormData({ ...formData, path: event.target.value })}
                                        placeholder="/example"
                                        maxLength={255}
                                        required
                                    />
                                </label>
                                <div className="navigation-form-row">
                                    <label className="navigation-form-field">
                                        <span>Display Order *</span>
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.order}
                                            onChange={(event) => setFormData({ ...formData, order: event.target.value })}
                                            required
                                        />
                                    </label>
                                    <label className="navigation-form-field">
                                        <span>Status</span>
                                        <select
                                            value={formData.isActive}
                                            onChange={(event) => setFormData({ ...formData, isActive: event.target.value })}
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="navigation-modal-actions">
                                    <button type="button" className="navigation-cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="navigation-save-button">{editingItem ? "Save Changes" : `Add ${title}`}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </AdminLayout>
    );
}

export default NavigationManagement;
