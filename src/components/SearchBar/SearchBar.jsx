import { motion } from 'framer-motion';
import { Search, Mic } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, onSearch, placeholder = "Search for Ayurvedic formulations..." }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch();
    };

    return (
        <motion.form
            className="search-bar-wrapper"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
        >
            <div className="search-bar-container">
                <Search className="search-icon" size={24} />
                <input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <motion.button
                    type="button"
                    className="voice-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Mic size={20} />
                </motion.button>
            </div>
        </motion.form>
    );
};

export default SearchBar;
