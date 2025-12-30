import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, Heart, Brain, Shield } from 'lucide-react';
import { signInWithGoogle } from '../../firebase/config';
import useStore from '../../store/useStore';
import './LoginPage.css';

const LoginPage = () => {
    const { setUser, syncUserData } = useStore();
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        console.log('Starting Google sign-in...');
        const { user, error } = await signInWithGoogle();

        if (user) {
            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            };
            console.log('✅ User signed in successfully:', userData);
            setUser(userData);
            console.log('✅ User set in store');
            await syncUserData(user.uid);
            console.log('✅ User data synced');
            setLoading(false);
            // React will auto re-render when user state changes
        } else {
            console.error('❌ Sign in error:', error);
            alert('Failed to sign in. Please try again.');
            setLoading(false);
        }
    };

    const features = [
        {
            icon: Brain,
            title: 'AI-Powered Assistant',
            description: 'Get instant Ayurvedic advice'
        },
        {
            icon: Heart,
            title: '290+ Formulations',
            description: 'Comprehensive health database'
        },
        {
            icon: Sparkles,
            title: 'Personalized Care',
            description: 'Synced across all devices'
        }
    ];

    return (
        <div className="login-page">
            <div className="login-container">
                <motion.div
                    className="login-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/*  Brand */}
                    <div className="login-brand">
                        <motion.div
                            className="brand-logo"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Leaf size={40} />
                        </motion.div>
                        <h1>Ayurveda AI</h1>
                        <p>Your Personal Health Companion</p>
                    </div>

                    {/* Welcome */}
                    <div className="login-welcome">
                        <h2>Welcome</h2>
                        <p>Sign in to access personalized Ayurvedic care</p>
                    </div>

                    {/* Google Sign-in */}
                    <motion.button
                        className="google-signin-btn"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                        <svg className="google-icon" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
                    </motion.button>

                    {/* Features */}
                    <div className="login-features">
                        <div className="features-list">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="feature-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    >
                                        <div className="feature-icon">
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h3>{feature.title}</h3>
                                            <p>{feature.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="trust-badges">
                        <div className="trust-badge">
                            <Shield size={14} />
                            <span>Secure</span>
                        </div>
                        <div className="trust-badge">
                            <Sparkles size={14} />
                            <span>Cloud Sync</span>
                        </div>
                        <div className="trust-badge">
                            <Leaf size={14} />
                            <span>100% Ayurvedic</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="login-footer">
                        <p>
                            By signing in, you agree to our Terms of Service and Privacy Policy.
                            Your data is encrypted and secure.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;
