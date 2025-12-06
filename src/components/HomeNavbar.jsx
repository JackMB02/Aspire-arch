import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--primary-dark);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  max-width: 100vw;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 0.7rem 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  margin-right: 1rem;
  
  img {
    height: 40px;
    width: auto;
    object-fit: contain;
    
    @media (max-width: 768px) {
      height: 35px;
    }
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  min-width: 0;
  max-width: calc(100vw - 300px);
  overflow: visible;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;
  flex-wrap: nowrap;
  overflow: visible;
  position: relative;
  z-index: 1001;
`;

const NavItem = styled.li`
  position: relative;
  cursor: pointer;
  flex-shrink: 1;
  min-width: 0;
`;

const NavButton = styled.button`
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.1)' : 'none'};
  border: none;
  color: white;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
  position: relative;
  z-index: 1002;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
    max-width: 100px;
  }
`;

// Sticky SubMenu without the border line
const StickySubMenu = styled(motion.div)`
  position: sticky;
  top: 60px; /* Same as navbar height */
  left: 0;
  width: 100%;
  background: var(--primary-dark);
  padding: 0.8rem 0;
  z-index: 998;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubMenuContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  padding: 0 1.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

// Clean link style without button appearance
const SubItem = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 0.3rem 0;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: block;
  position: relative;
  font-weight: 100;
  letter-spacing: 0.3px;

  /* Underline effect on hover */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.6);
    transition: width 0.3s ease;
  }

  &:hover {
    color: white;
    transform: none;
    
    &::after {
      width: 100%;
    }
  }

  &.active {
    color: #a8c6ff;
    font-weight: 400;
    
    &::after {
      width: 100%;
      background: #a8c6ff;
      height: 1.5px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    padding: 0.5rem 0;
    font-size: 0.9rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1001;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 0.4rem;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  position: relative;
  z-index: 1002;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MobileMenuButton = styled(IconButton)`
  @media (min-width: 769px) {
    display: none;
  }
`;

const SearchContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--primary-dark);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.8rem;
  width: 280px;
  z-index: 1003;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.9rem;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  @media (max-width: 768px) {
    right: 0;
    left: 0;
    width: auto;
    margin: 0 1rem;
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--primary-dark);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.8rem;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  max-width: 100vw;
  overflow: hidden;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
  box-sizing: border-box;
`;

const MobileNavItem = styled.li`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  box-sizing: border-box;
  
  &:last-child {
    border-bottom: none;
  }
`;

const MobileNavButton = styled.button`
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.1)' : 'none'};
  border: none;
  color: white;
  padding: 0.8rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  box-sizing: border-box;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MobileSubMenu = styled(motion.div)`
  padding-left: 0.5rem;
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  box-sizing: border-box;
`;

// Submenus data with default pages
const subMenus = {
  about: [
    { label: "About", path: "/about", isDefault: true },
    { label: "Mission", path: "/about/mission" },
    { label: "Vision", path: "/about/vision" },
  ],
  design: [
    { label: "Design", path: "/design", isDefault: true },
    { label: "Academic", path: "/design/academic" },
    { label: "Profession", path: "/design/profession" },
    { label: "Competition", path: "/design/competition" },
  ],
  "research-insights": [
    { label: "Research", path: "/research-insights", isDefault: true },
    { label: "Articles & Case Studies", path: "/research-insights/articles-case-studies" },
    { label: "Sustainable Design Practices", path: "/research-insights/sustainable-design" },
    { label: "Resilience & Climate Adaptation", path: "/research-insights/resilience-climate" },
    { label: "Cultural & Social Impact Studies", path: "/research-insights/cultural-social" },
  ],
  "the-colleague-uni": [
    { label: "Archi.Co Lab", path: "/the-colleague-uni", isDefault: true },
    { label: "About", path: "/the-colleague-uni/about" },
    { label: "Mission", path: "/the-colleague-uni/mission" },
    { label: "Team", path: "/the-colleague-uni/team" },
    { label: "Contact", path: "/the-colleague-uni/contact" },
  ],
  education: [
    { label: "Education", path: "/education", isDefault: true },
    { label: "Workshops & Training", path: "/education/workshops-training" },
    { label: "Tutorials & Guides", path: "/education/tutorials-guides" },
    { label: "Exhibitions", path: "/education/exhibitions" },
  ],
  "media-gallery": [
    { label: "Gallery", path: "/media-gallery", isDefault: true },
    { label: "Photo Albums", path: "/media-gallery/photo-albums" },
    { label: "Video Stories", path: "/media-gallery/video-stories" },
    { label: "Design Visualizations", path: "/media-gallery/design-visualizations" },
    { label: "Community Voices", path: "/media-gallery/community-voices" },
  ],
  "get-involved": [
    { label: "Get Involved", path: "/get-involved", isDefault: true },
    { label: "Membership & Partnerships", path: "/get-involved/membership-partnerships" },
    { label: "Donate or Support", path: "/get-involved/donate-support" },
    { label: "Community Feedback & Ideas", path: "/get-involved/community-feedback" },
  ],
};

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const navRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search when clicking outside
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      
      // Close sticky submenu when clicking outside the navbar
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set active menu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const menuWithActiveSubLink = Object.keys(subMenus).find(
      (menuKey) => subMenus[menuKey].some((item) => item.path === currentPath)
    );

    if (menuWithActiveSubLink) {
      setActiveMenu(menuWithActiveSubLink);
    }
  }, [location.pathname]);

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
    setActiveMenu(null);
  };

  const closeAllMenus = () => {
    setIsNavOpen(false);
    setActiveMenu(null);
    setShowSearch(false);
  };

  const handleMenuClick = (menuKey) => {
    // Find the default page for this menu
    const defaultPage = subMenus[menuKey].find(item => item.isDefault);
    
    if (activeMenu === menuKey) {
      // If menu is already active, navigate to its default page
      navigate(defaultPage.path);
    } else {
      // If menu is not active, set it as active and navigate to default page
      setActiveMenu(menuKey);
      navigate(defaultPage.path);
      setShowSearch(false);
      setIsNavOpen(false);
    }
  };

  const handleSubLinkClick = (path) => {
    navigate(path);
    // Close all menus on mobile
    if (window.innerWidth <= 768) {
      closeAllMenus();
    }
  };

  const formatMenuText = (text) => {
    if (text === "the-colleague-uni") {
      return "Archi.Co Lab";
    }
    if (text === "research-insights") {
      return "Research";
    }
    if (text === "media-gallery") {
      return "Gallery";
    }
    if (text === "get-involved") {
      return "Get Involved";
    }
    return text
      .replace(/-/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <>
      <div ref={navRef}>
        <NavContainer>
          <Logo to="/" onClick={closeAllMenus}>
            <img src="images/hero logo.png" alt="ASPIRE Logo" />
          </Logo>

          {/* Desktop Navigation */}
          <NavContent>
            <NavList>
              {Object.keys(subMenus).map((key) => (
                <NavItem key={key}>
                  <NavButton 
                    onClick={() => handleMenuClick(key)}
                    $isActive={activeMenu === key}
                  >
                    {formatMenuText(key)}
                    <FaChevronDown 
                      size={10} 
                      style={{ 
                        transform: activeMenu === key ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s'
                      }} 
                    />
                  </NavButton>
                </NavItem>
              ))}
              <NavItem>
                <NavButton onClick={() => {navigate("/news-events"); closeAllMenus();}}>
                  News & Events
                </NavButton>
              </NavItem>
              <NavItem>
                <NavButton onClick={() => {navigate("/contact"); closeAllMenus();}}>
                  Contact
                </NavButton>
              </NavItem>
            </NavList>
          </NavContent>

          {/* Right side icons */}
          <IconWrapper>
            <IconButton
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

          {/* Search */}
          <AnimatePresence>
            {showSearch && (
              <SearchContainer
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                ref={searchRef}
              >
                <input
                  type="text"
                  placeholder="Search articles, projects, resources..."
                  onKeyDown={handleSearch}
                  autoFocus
                />
              </SearchContainer>
            )}
          </AnimatePresence>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isNavOpen && (
              <MobileMenu
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <MobileNavList>
                  {Object.keys(subMenus).map((key) => (
                    <MobileNavItem key={key}>
                      <MobileNavButton
                        onClick={() => {
                          const defaultPage = subMenus[key].find(item => item.isDefault);
                          navigate(defaultPage.path);
                          setActiveMenu(activeMenu === key ? null : key);
                          setIsNavOpen(false);
                        }}
                        $isActive={activeMenu === key}
                      >
                        {formatMenuText(key)}
                        <FaChevronDown 
                          size={12} 
                          style={{ 
                            transform: activeMenu === key ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s'
                          }} 
                        />
                      </MobileNavButton>
                      <AnimatePresence>
                        {activeMenu === key && (
                          <MobileSubMenu
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            {subMenus[key].map((item) => (
                              <SubItem
                                key={item.path}
                                to={item.path}
                                className={location.pathname === item.path ? "active" : ""}
                                onClick={() => handleSubLinkClick(item.path)}
                              >
                                {item.label}
                              </SubItem>
                            ))}
                          </MobileSubMenu>
                        )}
                      </AnimatePresence>
                    </MobileNavItem>
                  ))}
                  <MobileNavItem>
                    <MobileNavButton onClick={() => { navigate("/news-events"); closeAllMenus(); }}>
                      News & Events
                    </MobileNavButton>
                  </MobileNavItem>
                  <MobileNavItem>
                    <MobileNavButton onClick={() => { navigate("/contact"); closeAllMenus(); }}>
                      Contact
                    </MobileNavButton>
                  </MobileNavItem>
                </MobileNavList>
              </MobileMenu>
            )}
          </AnimatePresence>
        </NavContainer>

        {/* Sticky SubMenu - appears below navbar and moves with it */}
        <AnimatePresence>
          {activeMenu && (
            <StickySubMenu
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SubMenuContent>
                {subMenus[activeMenu].map((item) => (
                  <SubItem
                    key={item.path}
                    to={item.path}
                    className={location.pathname === item.path ? "active" : ""}
                    onClick={() => handleSubLinkClick(item.path)}
                  >
                    {item.label}
                  </SubItem>
                ))}
              </SubMenuContent>
            </StickySubMenu>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;