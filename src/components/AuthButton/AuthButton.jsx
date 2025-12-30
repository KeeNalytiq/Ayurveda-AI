import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { signInWithGoogle, logOut } from '../../firebase/config';
import useStore from '../../store/useStore';
import './AuthButton.css';

const AuthButton = () => {
    const { user, setUser, syncUserData, clearUserData } = useStore();
    const [loading, setLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        const { user: firebaseUser, error } = await signInWithGoogle();

        if (firebaseUser) {
            const userData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL
            };
            setUser(userData);
            await syncUserData(firebaseUser.uid);
        } else {
            console.error('Sign in error:', error);
            alert('Failed to sign in. Please try again.');
        }

        setLoading(false);
    };

    const handleSignOut = async () => {
        setLoading(true);
        const { error } = await logOut();

        if (!error) {
            clearUserData();
            setUser(null);
        } else {
            console.error('Sign out error:', error);
            alert('Failed to sign out. Please try again.');
        }

        setLoading(false);
        setShowMenu(false);
    };

    if (!user) {
        return (
            <motion.button
                className="auth-button sign-in"
                onClick={handleSignIn}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <LogIn size={18} />
                {loading ? 'Signing in...' : 'Sign in with Google'}
            </motion.button>
        );
    }

    return (
        <div className="user-menu">
            <motion.button
                className="user-avatar"
                onClick={() => setShowMenu(!showMenu)}
                whileHover={{ scale: 1.05 }}
            >
                {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} />
                ) : (
                    <UserIcon size={20} />
                )}
            </motion.button>

            {showMenu && (
                <div className="user-dropdown">
                    <div className="user-info">
                        <p className="user-name">{user.displayName}</p>
                        <p className="user-email">{user.email}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button
                        className="dropdown-item sign-out"
                        onClick={handleSignOut}
                        disabled={loading}
                    >
                        <LogOut size={18} />
                        {loading ? 'Signing out...' : 'Sign Out'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AuthButton;
