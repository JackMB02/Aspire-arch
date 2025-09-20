import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animation for search bar
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(122, 158, 217, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(122, 158, 217, 0); }
  100% { box-shadow: 0 0 0 0 rgba(122, 158, 217, 0); }
`;

const NavContainer = styled.nav`
  position: fixed;
  top: 0; left: 0; width: 100%;
  background: var(--primary-dark);
  color: white;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem 2rem;
  z-index: 1000;
  box-shadow: ${props => props.$isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;

  @media (max-width: 768px) { padding: 1rem 1.5rem; }
`;

const Logo = styled(Link)`
  font-family: 'Futura PT', sans-serif;
  font-size: 1.5rem; font-weight: bold; color: white; text-decoration: none;
  display: flex; align-items: center;

  @media (max-width: 768px) { font-size: 1.2rem; }
`;

const NavList = styled.ul`
  list-style: none; display: flex; gap: 1.5rem; margin: 0; align-items: center; position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute; top: 100%; left: 0; width: 100%;
    background: var(--primary-dark);
    display: ${props => (props.$isOpen ? 'flex' : 'none')};
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    gap: 0.5rem;
  }
`;

const NavItem = styled.li`
  cursor: pointer; font-size: 0.85rem; transition: color 0.3s, transform 0.3s; /* Reduced from 0.9rem */
  padding: 0.5rem 0; position: relative;

  &:hover { color: var(--accent-light); transform: scale(1.05); }

  @media (max-width: 768px) {
    font-size: 0.8rem; padding: 0.5rem 0; width: 100%; /* Reduced from 0.85rem */
  }
`;

const NavItemButton = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.5rem 0; width: 100%;
  @media (min-width: 769px) { justify-content: center; }
`;

const NavItemText = styled.span`
  @media (max-width: 768px) { flex-grow: 1; }
`;

const SubMenu = styled(motion.div)`
  position: absolute; top: 100%; left: 0; width: 100%;
  background: #ffffff;
  padding: 0.3rem 0;
  display: flex; justify-content: flex-start;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    position: static; width: 100%; box-shadow: none;
    background: var(--primary-dark);
  }
`;

const SubList = styled.ul`
  list-style: none; display: flex; gap: 1.5rem; padding: 0 0 0 15rem; flex-wrap: wrap;

  @media (max-width: 1024px) { padding: 0 0 0 10rem; }
  @media (max-width: 768px) {
    flex-direction: column; align-items: flex-start;
    padding: 0 1rem; gap: 0.5rem;
  }
`;

const SubItem = styled.li`
  font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: #000000; transition: color 0.3s;

  &.active { text-decoration: underline; text-decoration-color: #000000; }
  &:hover { color: var(--accent-light); }

  @media (max-width: 768px) {
    color: rgba(255, 255, 255, 0.9);
    padding: 0.6rem 0.8rem; width: 100%;
    &:hover { background: rgba(255, 255, 255, 0.1); color: white; }
    &.active { background: rgba(255, 255, 255, 0.15); color: white; text-decoration-color: white; }
  }
`;

const IconWrapper = styled.div`
  display: flex; align-items: center; gap: 1rem;
  @media (max-width: 768px) { margin-left: auto; margin-right: 1rem; }
`;

const IconButton = styled.button`
  background: none; border: none; color: white; font-size: 1.1rem; cursor: pointer;
  padding: 0.5rem; border-radius: 50%; transition: all 0.3s ease;
  display: flex; align-items: center; justify-content: center;

  &:hover { color: var(--accent-light); background: rgba(255, 255, 255, 0.1); }
  &.search-active { background: rgba(122, 158, 217, 0.2); color: var(--accent-light); animation: ${pulse} 2s infinite; }
`;

const SearchContainer = styled(motion.div)`
  position: absolute; top: 100%; right: 2rem;
  background: white; border-radius: 4px; padding: 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); z-index: 1001; animation: ${slideIn} 0.3s ease;

  input {
    border: none; outline: none; padding: 0.8rem 1rem; width: 250px; border-radius: 4px; font-size: 0.9rem;
    background: #f8f9fa; transition: all 0.3s ease;
    &:focus { background: white; box-shadow: 0 0 0 2px rgba(122, 158, 217, 0.5); }
  }

  @media (max-width: 768px) {
    right: 1rem; left: 1rem; width: auto;
    input { width: 100%; }
  }
`;

const CloseButton = styled.button`
  position: absolute; top: 0.5rem; right: 0.5rem;
  background: none; border: none; font-size: 0.8rem; color: #6c757d; cursor: pointer;
  padding: 0.2rem; border-radius: 50%;
  &:hover { background: #e9ecef; color: #495057; }
`;

const HamburgerIcon = styled.div`
  display: none; cursor: pointer; font-size: 1.2rem; color: white; padding: 0.5rem;
  &:hover { color: var(--accent-light); }
  @media (max-width: 768px) { display: block; }
`;

// Submenus data
const subMenus = {
  about: [
    { label: 'Mission', path: '/about/mission' },
    { label: 'Vision', path: '/about/vision' },
  ],
  design: [
    { label: 'Academic', path: '/design/academic' },
    { label: 'Profession', path: '/design/profession' },
    { label: 'Competition', path: '/design/competition' },
  ],
  'research-insights': [
    { label: 'Articles & Case Studies', path: '/research-insights/articles-case-studies' },
    { label: 'Sustainable Design Practices', path: '/research-insights/sustainable-design' },
    { label: 'Resilience & Climate Adaptation', path: '/research-insights/resilience-climate' },
    { label: 'Cultural & Social Impact Studies', path: '/research-insights/cultural-social' },
  ],
  'the-colleague-uni': [
    { label: 'About', path: '/the-colleague-uni/about' },
    { label: 'Mission', path: '/the-colleague-uni/mission' },
    { label: 'Team', path: '/the-colleague-uni/team' },
    { label: 'Contact', path: '/the-colleague-uni/contact' },
  ],
  education: [
    { label: 'Workshops & Training', path: '/education/workshops-training' },
    { label: 'Tutorials & Guides', path: '/education/tutorials-guides' },
    { label: 'Exhibitions', path: '/education/exhibitions' },
  ],
  'media-gallery': [
    { label: 'Photo Albums', path: '/media-gallery/photo-albums' },
    { label: 'Video Stories', path: '/media-gallery/video-stories' },
    { label: 'Design Visualizations', path: '/media-gallery/design-visualizations' },
    { label: 'Community Voices', path: '/media-gallery/community-voices' },
  ],
  'get-involved': [
    { label: 'Membership & Partnerships', path: '/get-involved/membership-partnerships' },
    { label: 'Donate or Support', path: '/get-involved/donate-support' },
    { label: 'Community Feedback & Ideas', path: '/get-involved/community-feedback' },
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) && !event.target.closest('button')) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    if (activeMenu === menu) setActiveSubLink(null);
  };

  const handleSubLinkClick = (path) => {
    setActiveSubLink(path);
    setActiveMenu(null);
    setIsNavOpen(false);
    navigate(path);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Search:', e.target.value);
      setShowSearch(false);
      setIsNavOpen(false);
      e.target.value = '';
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

  const formatMenuText = (text) =>
    text.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <>
      <NavContainer $isScrolled={isScrolled}>
        <Logo to="/" onClick={closeAllMenus}>ASPIRE</Logo>

        <IconWrapper>
          <IconButton
            className={showSearch ? 'search-active' : ''}
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search"
          >
            <FaSearch />
          </IconButton>

          <HamburgerIcon onClick={toggleNav} aria-label="Toggle menu">
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </HamburgerIcon>
        </IconWrapper>

        <NavList $isOpen={isNavOpen}>
          {Object.keys(subMenus).map((key) => (
            <NavItem key={key} onClick={() => toggleMenu(key)}>
              <NavItemButton>
                <NavItemText>{formatMenuText(key)}</NavItemText>
              </NavItemButton>
            </NavItem>
          ))}
          <NavItem onClick={() => { navigate('/news-events'); closeAllMenus(); }}>
            <NavItemButton>News & Events</NavItemButton>
          </NavItem>
          <NavItem onClick={() => { navigate('/contact'); closeAllMenus(); }}>
            <NavItemButton>Contact</NavItemButton>
          </NavItem>
        </NavList>

        {/* Global SubMenu (desktop original behavior, mobile becomes static) */}
        <AnimatePresence>
          {activeMenu && (
            <SubMenu
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SubList>
                {subMenus[activeMenu].map((item) => (
                  <SubItem
                    key={item.path}
                    className={activeSubLink === item.path || location.pathname === item.path ? 'active' : ''}
                  >
                    <Link
                      to={item.path}
                      onClick={() => handleSubLinkClick(item.path)}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {item.label}
                    </Link>
                  </SubItem>
                ))}
              </SubList>
            </SubMenu>
          )}
        </AnimatePresence>

        {/* Search input */}
        <AnimatePresence>
          {showSearch && (
            <SearchContainer
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              ref={searchRef}
            >
              <input
                type="text"
                placeholder="Search articles, projects, resources..."
                onKeyDown={handleSearch}
                autoFocus
              />
              <CloseButton onClick={() => setShowSearch(false)}>
                <FaTimes />
              </CloseButton>
            </SearchContainer>
          )}
        </AnimatePresence>
      </NavContainer>
    </>
  );
}

export default Navbar;
