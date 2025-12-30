// Firebase Configuration and Initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, updateDoc, deleteField } from 'firebase/firestore';

// Firebase configuration (replace with your actual config from Firebase Console)
// To get your config: https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "AIzaSyBC7LZ-oy061tRuK5AHoC2se5OZCo7mrLQ",
  authDomain: "ayruveda-50dd4.firebaseapp.com",
  projectId: "ayruveda-50dd4",
  storageBucket: "ayruveda-50dd4.firebasestorage.app",
  messagingSenderId: "704524384646",
  appId: "1:704524384646:web:d0e1d28faa196ac7101407",
  measurementId: "G-FTF2QLEF0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { user: result.user, error: null };
    } catch (error) {
        console.error('Error signing in with Google:', error);
        return { user: null, error: error.message };
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        console.error('Error signing out:', error);
        return { error: error.message };
    }
};

// Firestore data functions
export const saveUserData = async (userId, dataType, data) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { [dataType]: data }, { merge: true });
        return { success: true };
    } catch (error) {
        console.error('Error saving user data:', error);
        return { success: false, error: error.message };
    }
};

export const getUserData = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            return { data: docSnap.data(), error: null };
        } else {
            return { data: {}, error: null };
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        return { data: null, error: error.message };
    }
};

export const updateUserFavorites = async (userId, favorites) => {
    return saveUserData(userId, 'favorites', favorites);
};

export const updateUserHistory = async (userId, history) => {
    return saveUserData(userId, 'searchHistory', history);
};

export const updateUserChatHistory = async (userId, chatHistory) => {
    return saveUserData(userId, 'chatHistory', chatHistory);
};

export default app;
