import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MultiLevelMenu.scss'; // Import your CSS for styling

const MenuItem = ({ item, path, isActive, isOpen, onClick, hasChildren }) => {
    const handleClick = (e) => {
        if (hasChildren) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <li className={`menu-item ${isActive ? 'active' : ''} ${isOpen ? 'open' : ''}`}>
            <Link 
                to={item.url} 
                onClick={handleClick}
                className="menu-link"
            >
                {item.title}
                {hasChildren && <span className="menu-arrow">▼</span>}
            </Link>
            {hasChildren && isOpen && (
                <ul className="sub-menu">
                    {Object.entries(item.sub).map(([key, subItem]) => (
                        <MenuItem 
                            key={key}
                            item={subItem}
                            path={path}
                            isActive={path.startsWith(subItem.url)}
                            isOpen={path.startsWith(subItem.url)}
                            onClick={() => {}}
                            hasChildren={!!subItem.sub}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

const MultiLevelMenu = ({ list }) => {
    const location = useLocation();
    const [openMenus, setOpenMenus] = useState({});
    const currentPath = location.hash.replace('#', '');

    useEffect(() => {
        // Auto-open parent menus when a child is active
        const newOpenMenus = {};
        
        const checkAndOpenParents = (menu, parentKey = null) => {
            Object.entries(menu).forEach(([key, item]) => {
                if (item.sub) {
                    const hasActiveChild = Object.values(item.sub).some(subItem => 
                        currentPath.startsWith(subItem.url) || 
                        (subItem.sub && checkAndOpenParents({ [key]: subItem }, key))
                    );
                    
                    if (hasActiveChild) {
                        newOpenMenus[key] = true;
                        if (parentKey) newOpenMenus[parentKey] = true;
                    }
                }
            });
            return false;
        };

        checkAndOpenParents(list);
        setOpenMenus(newOpenMenus);
    }, [currentPath, list]);

    const toggleMenu = (key) => {
        setOpenMenus(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <ul className="multi-level-menu">
            {Object.entries(list).map(([key, item]) => (
                <MenuItem
                    key={key}
                    item={item}
                    path={currentPath}
                    isActive={currentPath === item.url || (item.sub && currentPath.startsWith(item.url))}
                    isOpen={!!openMenus[key]}
                    onClick={() => toggleMenu(key)}
                    hasChildren={!!item.sub}
                />
            ))}
        </ul>
    );
};

export default MultiLevelMenu;