import { motion } from 'framer-motion';
import { Search, Heart, GitCompare, Sparkles, Activity, Calendar, ArrowRight, CheckCircle2, BookOpen, Leaf, MessageCircle } from 'lucide-react';
import { formulationsData } from '../../data/formulations';
import './HomePage.css';

const HomePage = ({ onNavigate }) => {
    const formulationCount = formulationsData.length;

    const features = [
        {
            icon: Search,
            title: 'Smart Search',
            description: 'Discover Ayurvedic formulations with intelligent search and filtering',
            color: 'var(--primary)'
        },
        {
            icon: Heart,
            title: 'Save Favorites',
            description: 'Bookmark formulations for quick access and future reference',
            color: 'var(--danger)'
        },
        {
            icon: GitCompare,
            title: 'Compare',
            description: 'Side-by-side comparison of up to 3 formulations',
            color: 'var(--primary)'
        },
        {
            icon: MessageCircle,
            title: 'Ayru Buddie',
            description: 'Chat with our AI health companion for personalized guidance',
            color: 'var(--primary)'
        }
    ];

    const benefits = [
        `Access to ${formulationCount} classical Ayurvedic formulations`,
        'Detailed ingredient and dosage information',
        'Dosha balancing recommendations',
        'References to classical Ayurvedic texts',
        'Safe and evidence-based suggestions'
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <motion.section
                className="hero-section"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className="hero-content" variants={itemVariants}>
                    <div className="hero-badge">
                        <Leaf size={16} />
                        <span>Traditional Wisdom Meets Modern Technology</span>
                    </div>

                    <h1 className="hero-title">
                        Ayurveda AI
                    </h1>

                    <h2 className="hero-subtitle">
                        Smart Formulation Suggester
                    </h2>

                    <p className="hero-description">
                        An intelligent platform designed to help practitioners and students discover,
                        compare, and learn about classical Ayurvedic formulations from authentic texts.
                    </p>

                    <div className="hero-buttons">
                        <motion.button
                            className="btn btn-primary btn-lg"
                            onClick={() => onNavigate('search')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Search size={20} />
                            Start Exploring
                            <ArrowRight size={18} />
                        </motion.button>

                        <motion.button
                            className="btn btn-secondary btn-lg"
                            onClick={() => onNavigate('chat')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <MessageCircle size={20} />
                            Chat with Ayru Buddie
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div className="hero-illustration" variants={itemVariants}>
                    <div className="floating-card">
                        <Sparkles className="sparkle-icon" />
                        <h3>{formulationCount}</h3>
                        <p>Classical Formulations</p>
                    </div>
                </motion.div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                className="features-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <motion.div className="section-header" variants={itemVariants}>
                    <h2>Powerful Features</h2>
                    <p>Everything you need to explore Ayurvedic formulations</p>
                </motion.div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            <div className="feature-icon" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                                <feature.icon size={28} />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section
                className="about-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <div className="about-grid">
                    <motion.div className="about-content" variants={itemVariants}>
                        <h2>About This Project</h2>
                        <p className="about-intro">
                            Ayurveda AI is a comprehensive digital platform that bridges the gap between
                            traditional Ayurvedic knowledge and modern technology.
                        </p>

                        <div className="benefits-list">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    className="benefit-item"
                                    variants={itemVariants}
                                >
                                    <CheckCircle2 size={20} />
                                    <span>{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="about-footer">
                            <BookOpen size={20} />
                            <p>
                                All formulations are sourced from classical Ayurvedic texts including
                                Charaka Samhita, Ashtanga Hridaya, and Bhaishajya Ratnavali.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div className="about-stats" variants={itemVariants}>
                        <div className="stat-card">
                            <h3>{formulationCount}</h3>
                            <p>Formulations</p>
                        </div>
                        <div className="stat-card">
                            <h3>100+</h3>
                            <p>Ingredients</p>
                        </div>
                        <div className="stat-card">
                            <h3>10+</h3>
                            <p>Classical Texts</p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="cta-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <motion.div className="cta-content" variants={itemVariants}>
                    <h2>Ready to Begin Your Journey?</h2>
                    <p>Explore the wisdom of Ayurveda with modern tools</p>

                    <div className="cta-buttons">
                        <motion.button
                            className="btn btn-primary btn-lg"
                            onClick={() => onNavigate('search')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Search size={20} />
                            Browse Formulations
                        </motion.button>

                        <motion.button
                            className="btn btn-ghost btn-lg"
                            onClick={() => onNavigate('profile')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Set Up Profile
                        </motion.button>
                    </div>
                </motion.div>
            </motion.section>
        </div>
    );
};

export default HomePage;
