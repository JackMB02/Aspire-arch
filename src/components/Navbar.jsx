import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaSearch,
    FaBars,
    FaTimes,
    FaChevronDown,
    FaUser,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Modern animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(122, 158, 217, 0.3); }
 50% { box-shadow: 0 0 15px rgba(122, 158, 217, 0.5); }
  100% { box-shadow: 0 0 5px rgba(122, 158, 217, 0.3); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Fixed navigation container - always visible
const NavContainer = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--primary-dark);
    backdrop-filter: blur(10px);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease, padding 0.3s ease;
    box-shadow: ${(props) =>
        props.$isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "none"};

    ${(props) =>
        props.$isScrolled &&
        `
    padding: 0.8rem 2rem;
  `}

    @media (max-width: 1024px) {
        padding: 1rem 1.5rem;

        ${(props) =>
            props.$isScrolled &&
            `
      padding: 0.8rem 1.5rem;
    `}
    }

    @media (max-width: 768px) {
        padding: 0.9rem 1rem;

        ${(props) =>
            props.$isScrolled &&
            `
      padding: 0.8rem 1rem;
    `}
    }
`;

const Logo = styled(Link)`
    display: flex;
    align-items: center;
    min-width: 80px;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }

    img {
        height: 32px;
        object-fit: contain;
        transition: all 0.3s ease;
    }

    @media (max-width: 1024px) {
        min-width: 70px;
        img {
            height: 28px;
        }
    }

    @media (max-width: 768px) {
        img {
            height: 26px;
        }
    }
`;

const NavContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    justify-content: center;
    margin-right: 0.2rem;

    @media (max-width: 1024px) {
        gap: 0.4rem;
        margin-right: 0.1rem;
    }

    @media (max-width: 768px) {
        margin-right: 0;
    }
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    gap: 0.2rem;
    margin: 0;
    align-items: center;
    position: relative;

    @media (max-width: 1024px) {
        gap: 0.15rem;
    }

    @media (max-width: 768px) {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--primary-dark);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 1.5rem;
        gap: 1rem;
        display: ${(props) => (props.$isOpen ? "flex" : "none")};
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        animation: ${fadeIn} 0.3s ease;
    }
`;

const NavItem = styled.li`
    position: relative;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.5rem 0;
    transition: all 0.3s ease;
    font-family: "Inter", sans-serif;
    letter-spacing: -0.1px;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--accent-light);
        transition: width 0.3s ease;
    }

    &:hover::after {
        width: 100%;
    }

    &:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-1px);
    }

    @media (max-width: 1024px) {
        font-size: 0.8rem;
    }

    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
        padding: 0.8rem 0;
        font-size: 0.9rem;

        &::after {
            display: none;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.05);
        }
    }
`;

const NavItemButton = styled.div`
    display: flex;
    align-items: center;
    gap: 0.1rem;
    padding: 0.2rem 0.25rem;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.06);
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        justify-content: center;
        padding: 1rem;
        gap: 0.3rem;
    }
`;

const NavItemText = styled.span`
    position: relative;
    z-index: 2;
    white-space: nowrap;
`;

const DropdownIcon = styled.span`
    display: inline-flex;
    align-items: center;
    font-size: 0.6rem;
    transition: transform 0.3s ease;

    ${(props) =>
        props.$isOpen &&
        `
    transform: rotate(180deg);
  `}
`;

const SubMenu = styled(motion.div)`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--primary-dark);
    backdrop-filter: blur(20px);
    padding: 0.8rem 0;
    z-index: 1002;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: flex-start;

    @media (max-width: 768px) {
        position: relative;
        width: 100%;
        background: var(--primary-dark);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 0.5rem;
        border-radius: 8px;
        padding: 0.8rem;
        justify-content: flex-start;
    }
`;

const SubList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 0 2rem;
    display: flex;
    gap: 1.5rem;
    max-width: 1200px;
    justify-content: flex-start;

    @media (max-width: 1024px) {
        gap: 1rem;
        margin-left: 1.5rem;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.6rem;
        margin-left: 0;
    }
`;

const SubItem = styled.li`
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease;
    font-family: "Inter", sans-serif;
    white-space: nowrap;
    position: relative;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-1px);
    }

    &.active {
        color: var(--accent-light);
        font-weight: 600;
    }

    /* Underline for active sub nav item (desktop only) */
    @media (min-width: 769px) {
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: ${(props) => (props.$isActive ? "100%" : "0")};
            height: 2px;
            background: var(--accent-light);
            transition: width 0.3s ease;
        }

        &:hover::after {
            width: 100%;
        }
    }

    @media (max-width: 768px) {
        color: white;
        padding: 0.6rem 1rem;
        text-align: center;

        &:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
        }

        &.active {
            color: white;
            background: rgba(255, 255, 255, 0.15);
        }
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2rem;
    position: relative;
    z-index: 100;

    @media (max-width: 768px) {
        gap: 0.15rem;
    }
`;

const IconButton = styled.button`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    min-width: 36px;
    min-height: 36px;

    &:hover {
        color: var(--accent-light);
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        opacity: 1;
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.4);
    }

    &.search-active {
        color: var(--accent-light);
        background: rgba(122, 158, 217, 0.4);
        animation: ${glow} 2s infinite;
        opacity: 1;
        box-shadow: 0 0 15px rgba(122, 158, 217, 0.4);
        border-color: rgba(122, 158, 217, 0.6);
    }

    @media (max-width: 1024px) {
        font-size: 0.9rem;
        padding: 0.45rem;
        min-width: 34px;
        min-height: 34px;
    }

    @media (max-width: 768px) {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        padding: 0.4rem;
        min-width: 32px;
        min-height: 32px;
        font-size: 0.85rem;

        &:hover {
            background: rgba(255, 255, 255, 0.25);
        }
    }
`;

// Advanced Search Container with modern design
const SearchContainer = styled(motion.div)`
    position: fixed;
    right: 5rem;
    top: 2rem;
    background: linear-gradient(
        135deg,
        rgba(23, 23, 42, 0.95) 0%,
        rgba(30, 30, 60, 0.95) 100%
    );
    backdrop-filter: blur(25px);
    border-radius: 16px;
    padding: 1.2rem;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(255, 255, 255, 0.1);
    z-index: 9999;
    border: 1px solid rgba(255, 255, 255, 0.15);
    width: 320px;
    min-width: 280px;
    max-width: calc(100vw - 4rem);
    // overflow: hidden;
    transform: translateZ(0);
    box-sizing: border-box;

    &::before {
        content: "";
        position: absolute;
        top: 10rem;
        left: 0;
        right: 10rem;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(122, 158, 217, 0.5),
            transparent
        );
    }

    input {
        width: 100%;
        border: none;
        outline: none;
        padding: 1.2rem 1.2rem 1.2rem 3rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.08);
        font-size: 1rem;
        color: white;
        font-family: "Inter", sans-serif;
        transition: all 0.3s ease;
        position: relative;
        box-sizing: border-box;

        &::placeholder {
            color: rgba(255, 255, 255, 0.6);
            font-weight: 400;
        }

        &:focus {
            background: rgba(255, 255, 255, 0.12);
            box-shadow: 0 0 0 2px rgba(122, 158, 217, 0.4),
                0 5px 20px rgba(122, 158, 217, 0.2);
        }
    }

    .search-icon {
        position: absolute;
        left: 2rem;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.1rem;
        z-index: 2;
    }

    @media (max-width: 1024px) {
        right: 0;
        width: 300px;
        max-width: calc(100vw - 3rem);

        input {
            padding: 1.1rem 1.1rem 1.1rem 2.8rem;
        }

        .search-icon {
            left: 1.8rem;
        }
    }

    @media (max-width: 768px) {
        right: 0;
        width: 280px;
        max-width: calc(100vw - 2rem);
        padding: 1rem;

        input {
            padding: 1rem 1rem 1rem 2.5rem;
            min-width: 0;
        }

        .search-icon {
            left: 1.5rem;
        }
    }

    @media (max-width: 480px) {
        right: 0;
        width: 260px;
        max-width: calc(100vw - 1rem);
        padding: 0.8rem;

        input {
            padding: 0.9rem 0.9rem 0.9rem 2.2rem;
            font-size: 0.9rem;
        }

        .search-icon {
            left: 1.3rem;
            font-size: 1rem;
        }
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 50%;
    transition: all 0.3s ease;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        transform: rotate(90deg);
    }
`;

const MobileMenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-right: 0;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--accent-light);
    }

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

// Submenus data remains the same
const subMenus = {
    about: [
        { label: "Mission", path: "/about/mission" },
        { label: "Vision", path: "/about/vision" },
    ],
    design: [
        { label: "Academic", path: "/design/academic" },
        { label: "Profession", path: "/design/profession" },
        { label: "Competition", path: "/design/competition" },
    ],
    "research-insights": [
        {
            label: "Articles & Case Studies",
            path: "/research-insights/articles-case-studies",
        },
        {
            label: "Sustainable Design Practices",
            path: "/research-insights/sustainable-design",
        },
        {
            label: "Resilience & Climate Adaptation",
            path: "/research-insights/resilience-climate",
        },
        {
            label: "Cultural & Social Impact Studies",
            path: "/research-insights/cultural-social",
        },
    ],
    "the-colleague-uni": [
        { label: "About", path: "/the-colleague-uni/about" },
        { label: "Mission", path: "/the-colleague-uni/mission" },
        { label: "Team", path: "/the-colleague-uni/team" },
        { label: "Contact", path: "/the-colleague-uni/contact" },
    ],
    education: [
        {
            label: "Workshops & Training",
            path: "/education/workshops-training",
        },
        { label: "Tutorials & Guides", path: "/education/tutorials-guides" },
        { label: "Exhibitions", path: "/education/exhibitions" },
    ],
    "media-gallery": [
        { label: "Photo Albums", path: "/media-gallery/photo-albums" },
        { label: "Video Stories", path: "/media-gallery/video-stories" },
        {
            label: "Design Visualizations",
            path: "/media-gallery/design-visualizations",
        },
        { label: "Community Voices", path: "/media-gallery/community-voices" },
    ],
    "get-involved": [
        {
            label: "Membership & Partnerships",
            path: "/get-involved/membership-partnerships",
        },
        { label: "Donate or Support", path: "/get-involved/donate-support" },
        {
            label: "Community Feedback & Ideas",
            path: "/get-involved/community-feedback",
        },
    ],
};

function Navbar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [activeSubLink, setActiveSubLink] = useState(null);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchRef = useRef(null);
    const searchInputRef = useRef(null);

    // Handle scroll effect for styling changes only
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 10);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowSearch(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when opened
    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    // Keep submenu open if a sub link is active (desktop only)
    useEffect(() => {
        if (window.innerWidth > 768) {
            // Check if current path matches any submenu item
            const currentPath = location.pathname;
            const menuWithActiveSubLink = Object.keys(subMenus).find(
                (menuKey) =>
                    subMenus[menuKey].some((item) => item.path === currentPath)
            );

            if (menuWithActiveSubLink) {
                setActiveMenu(menuWithActiveSubLink);
                setActiveSubLink(currentPath);
            }
        }
    }, [location.pathname]);

    const toggleMenu = (menu, path) => {
        if (activeMenu === menu) {
            setActiveMenu(null);
            setActiveSubLink(null);
        } else {
            setActiveMenu(menu);
            navigate(path);
        }
    };

    const handleSubLinkClick = (path) => {
        setActiveSubLink(path);
        // Don't close the menu on desktop when a sub link is clicked
        if (window.innerWidth <= 768) {
            setActiveMenu(null);
            setIsNavOpen(false);
        }
        navigate(path);
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            console.log("Search:", e.target.value);
            setShowSearch(false);
            setIsNavOpen(false);
            e.target.value = "";
        }
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
        if (activeMenu) setActiveMenu(null);
    };

    const closeAllMenus = () => {
        setIsNavOpen(false);
        setActiveMenu(null);
        setShowSearch(false);
    };

    const formatMenuText = (text) => {
        if (text === "the-colleague-uni") {
            return "TheArchi.Co. Lab";
        }
        return text
            .replace(/-/g, " ")
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    };

    return (
        <div>
            <NavContainer $isScrolled={isScrolled}>
                <Logo to="/" onClick={closeAllMenus}>
                    <img src="/office.jpg" alt="ASPIRE Logo" />
                </Logo>

                <NavContent>
                    <NavList $isOpen={isNavOpen}>
                        {Object.keys(subMenus).map((key) => (
                            <NavItem
                                key={key}
                                onClick={() => toggleMenu(key, `/${key}`)}
                            >
                                <NavItemButton>
                                    <NavItemText>
                                        {formatMenuText(key)}
                                    </NavItemText>
                                    <DropdownIcon $isOpen={activeMenu === key}>
                                        <FaChevronDown />
                                    </DropdownIcon>
                                </NavItemButton>

                                {/* Mobile submenu - positioned inline */}
                                {isNavOpen && activeMenu === key && (
                                    <SubMenu
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <SubList>
                                            {subMenus[key].map((item) => (
                                                <SubItem
                                                    key={item.path}
                                                    $isActive={
                                                        activeSubLink ===
                                                            item.path ||
                                                        location.pathname ===
                                                            item.path
                                                    }
                                                    className={
                                                        activeSubLink ===
                                                            item.path ||
                                                        location.pathname ===
                                                            item.path
                                                            ? "active"
                                                            : ""
                                                    }
                                                >
                                                    <Link
                                                        to={item.path}
                                                        onClick={() =>
                                                            handleSubLinkClick(
                                                                item.path
                                                            )
                                                        }
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            color: "inherit",
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </SubItem>
                                            ))}
                                        </SubList>
                                    </SubMenu>
                                )}
                            </NavItem>
                        ))}
                        <NavItem
                            onClick={() => {
                                navigate("/news-events");
                                closeAllMenus();
                            }}
                        >
                            <NavItemButton>
                                <NavItemText>News & Events</NavItemText>
                            </NavItemButton>
                        </NavItem>
                        <NavItem
                            onClick={() => {
                                navigate("/contact");
                                closeAllMenus();
                            }}
                        >
                            <NavItemButton>
                                <NavItemText>Contact</NavItemText>
                            </NavItemButton>
                        </NavItem>
                    </NavList>
                </NavContent>

                <IconWrapper>
                    <IconButton
                        className={showSearch ? "search-active" : ""}
                        onClick={() => setShowSearch(!showSearch)}
                        aria-label="Search"
                    >
                        <FaSearch />
                    </IconButton>

                    <MobileMenuButton
                        onClick={toggleNav}
                        aria-label="Toggle menu"
                    >
                        {isNavOpen ? <FaTimes /> : <FaBars />}
                    </MobileMenuButton>
                </IconWrapper>

                {/* Desktop submenu - full width and stays visible when sub link is active */}
                <AnimatePresence>
                    {activeMenu && !isNavOpen && (
                        <SubMenu
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <SubList>
                                {subMenus[activeMenu].map((item) => (
                                    <SubItem
                                        key={item.path}
                                        $isActive={
                                            activeSubLink === item.path ||
                                            location.pathname === item.path
                                        }
                                        className={
                                            activeSubLink === item.path ||
                                            location.pathname === item.path
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() =>
                                                handleSubLinkClick(item.path)
                                            }
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                    </SubItem>
                                ))}
                            </SubList>
                        </SubMenu>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {showSearch && (
                        <SearchContainer
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            ref={searchRef}
                        >
                            <div className="search-icon">
                                <FaSearch />
                            </div>
                            <input
                                type="text"
                                placeholder="Search articles, projects, resources..."
                                onKeyDown={handleSearch}
                                ref={searchInputRef}
                                autoFocus
                            />
                            <CloseButton onClick={() => setShowSearch(false)}>
                                <FaTimes />
                            </CloseButton>
                        </SearchContainer>
                    )}
                </AnimatePresence>
            </NavContainer>
        </div>
    );
}

export default Navbar;
