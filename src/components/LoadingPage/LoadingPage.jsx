import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import './LoadingPage.css';

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <div className="loading-content">
                {/* Logo Animation */}
                <motion.div
                    className="loading-logo"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        className="logo-circle"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Leaf size={48} />
                    </motion.div>
                </motion.div>

                {/* Brand Name */}
                <motion.h1
                    className="loading-title"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Ayurveda AI
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="loading-tagline"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Your Personal Ayurvedic Health Companion
                </motion.p>

                {/* Loading Bar */}
                <motion.div
                    className="loading-bar-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <motion.div
                        className="loading-bar"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Loading Text */}
                <motion.p
                    className="loading-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    Loading...
                </motion.p>
            </div>
        </div>
    );
};

export default LoadingPage;
