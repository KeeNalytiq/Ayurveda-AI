import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useStore();

    return (
        <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <Moon size={20} />
            ) : (
                <Sun size={20} />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
