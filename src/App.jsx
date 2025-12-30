import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import useStore from './store/useStore';
import SearchBar from './components/SearchBar/SearchBar';
import FormulationCard from './components/FormulationCard/FormulationCard';
import FormulationDetailModal from './components/FormulationDetailModal/FormulationDetailModal';
import DoshaEducation from './components/DoshaEducation/DoshaEducation';
import AuthButton from './components/AuthButton/AuthButton';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import LoadingPage from './components/LoadingPage/LoadingPage';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import ChatBot from './components/ChatBot/ChatBot';
import ProfilePage from './components/Profile/ProfilePage';
import SchedulePage from './components/Schedule/SchedulePage';
import { searchFormulations } from './data/formulations';
import { Search, Heart, GitCompare, Menu, X, Sparkles, User, Calendar, Activity, Home, MessageCircle } from 'lucide-react';
import './App.css';







function App() {
  const {
    user,
    setUser,
    theme,
    setTheme,
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    addToSearchHistory,
    currentPage,
    setCurrentPage,
    compareSelection,
    favorites,
    sidebarOpen,
    toggleSidebar,
    syncUserData
  } = useStore();

  const [selectedFormulation, setSelectedFormulation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Show loading page for 2 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Perform search function
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchFormulations(searchQuery);
      setSearchResults(results);
      addToSearchHistory(searchQuery);
    } else {
      setSearchResults(searchFormulations(''));
    }
  };

  // Initial load
  useEffect(() => {
    if (searchResults.length === 0) {
      setSearchResults(searchFormulations(''));
    }
  }, []);

  // Auto-search on query change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ===== ALL HOOKS CALLED ABOVE - NOW SAFE TO DO CONDITIONAL RENDERS =====

  // Show loading page initially
  if (isLoading) {
    return <LoadingPage />;
  }

  // Show login page if user is not authenticated
  if (!user) {
    return <LoginPage />;
  }

  const NavItem = ({ icon: Icon, label, page, count }) => (
    <motion.button
      className={`nav-item ${currentPage === page ? 'active' : ''}`}
      onClick={() => setCurrentPage(page)}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon size={20} />
      <span>{label}</span>
      {count > 0 && <span className="badge">{count}</span>}
    </motion.button>
  );

  return (
    <div className="app">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="sidebar"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="sidebar-header">
              <div className="logo">
                <Sparkles size={32} className="logo-icon" />
                <div>
                  <h1 className="logo-title">Ayurveda AI</h1>
                  <p className="logo-subtitle">Smart Formulation Suggester</p>
                </div>
              </div>
              <button className="sidebar-toggle mobile-only" onClick={toggleSidebar}>
                <X size={24} />
              </button>
            </div>

            <nav className="sidebar-nav">
              <NavItem icon={Home} label="Home" page="home" />
              <NavItem icon={Search} label="Search" page="search" />
              <NavItem
                icon={Heart}
                label="Favorites"
                page="favorites"
                count={Object.keys(favorites).length}
              />
              <NavItem
                icon={GitCompare}
                label="Compare"
                page="compare"
                count={compareSelection.length}
              />
              <NavItem icon={User} label="Profile" page="profile" />
              <NavItem icon={MessageCircle} label="Ayru Buddie" page="chat" />
              <NavItem icon={Calendar} label="Medicine Schedule" page="schedule" />
            </nav>

            <div className="sidebar-footer">
              <p className="footer-text">
                🌿 Powered by Traditional Ayurvedic Wisdom
              </p>
              <p className="footer-developer">
                Developed by <strong>Keeistu M S</strong>
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="app-header">
          <button className="sidebar-toggle mobile-only" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div className="header-title">
            <h2>
              {currentPage === 'home' && 'Welcome to Ayurveda AI'}
              {currentPage === 'search' && 'Discover Formulations'}
              {currentPage === 'favorites' && 'Your Favorites'}
              {currentPage === 'compare' && 'Compare Formulations'}
              {currentPage === 'profile' && 'Patient Profile'}
              {currentPage === 'chat' && 'Ayru Buddie - Your Health Companion'}
              {currentPage === 'schedule' && 'Medicine Schedule'}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
            <ThemeToggle />
            <AuthButton />
          </div>
        </header>

        <div className="content-wrapper">
          {/* Home Page */}
          {currentPage === 'home' && (
            <HomePage onNavigate={setCurrentPage} />
          )}

          {/* Search Page */}
          {currentPage === 'search' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
              />

              {/* Results Header - Only show if search was performed */}
              {searchResults.length > 0 && (
                <>
                  <div className="results-header">
                    <h3 className="results-count">
                      Found <span className="highlight">{searchResults.length}</span> formulation
                      {searchResults.length !== 1 ? 's' : ''}
                    </h3>
                    <p className="ranking-info">
                      <span className="badge badge-safe">✓ Safe</span> and <span className="badge badge-easy">⭐ Easy</span> formulations ranked first
                    </p>
                  </div>

                  {/* Results Grid */}
                  <div className="results-grid">
                    {searchResults.map((formulation, index) => (
                      <FormulationCard
                        key={formulation.id}
                        formulation={formulation}
                        index={index}
                        onViewDetails={setSelectedFormulation}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Dosha Education - Show when no search performed */}
              {searchResults.length === 0 && !searchQuery && (
                <DoshaEducation />
              )}

              {/* No Results State - Show when search performed but no results */}
              {searchResults.length === 0 && searchQuery && (
                <div className="empty-state">
                  <Search className="empty-icon" size={64} />
                  <h3>No formulations found</h3>
                  <p>Try searching for common conditions like "headache", "cough", "diabetes", or "joint pain"</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Favorites Page */}
          {currentPage === 'favorites' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="page-intro">
                <p>Your saved formulations for quick access</p>
              </div>

              {Object.keys(favorites).length === 0 ? (
                <div className="empty-state">
                  <Heart size={64} className="empty-icon" />
                  <h3>No favorites yet</h3>
                  <p>Start adding formulations to your favorites!</p>
                  <button className="btn btn-primary" onClick={() => setCurrentPage('search')}>
                    Browse Formulations
                  </button>
                </div>
              ) : (
                <div className="results-grid">
                  {Object.values(favorites).map((formulation, index) => (
                    <FormulationCard
                      key={formulation.id}
                      formulation={formulation}
                      index={index}
                      onViewDetails={setSelectedFormulation}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Compare Page */}
          {currentPage === 'compare' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="page-intro">
                <p>Compare up to 3 formulations side by side</p>
              </div>

              {compareSelection.length === 0 ? (
                <div className="empty-state">
                  <GitCompare size={64} className="empty-icon" />
                  <h3>No formulations selected</h3>
                  <p>Add formulations to compare their properties!</p>
                  <button className="btn btn-primary" onClick={() => setCurrentPage('search')}>
                    Browse Formulations
                  </button>
                </div>
              ) : (
                <div className="comparison-grid">
                  {compareSelection.map((formulation, index) => (
                    <FormulationCard
                      key={formulation.id}
                      formulation={formulation}
                      index={index}
                      onViewDetails={setSelectedFormulation}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}


          {/* Profile Page */}
          {currentPage === 'profile' && (
            <ProfilePage />
          )}

          {/* Ayru Buddie Chatbot */}
          {currentPage === 'chat' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChatBot />
            </motion.div>
          )}

          {/* Schedule Page */}
          {currentPage === 'schedule' && (
            <SchedulePage />
          )}
        </div>
      </main >

      {/* Formulation Detail Modal */}
      {
        selectedFormulation && (
          <FormulationDetailModal
            formulation={selectedFormulation}
            onClose={() => setSelectedFormulation(null)}
          />
        )
      }
    </div >
  );
}

export default App;
