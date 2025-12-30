import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserData, saveUserData } from '../firebase/config';

const useStore = create(
    persist(
        (set, get) => ({
            // User Authentication
            user: null,

            setUser: (user) => set({ user }),

            // Sync user data from Firebase
            syncUserData: async (userId) => {
                try {
                    const { data, error } = await getUserData(userId);
                    if (!error && data) {
                        set({
                            favorites: data.favorites || {},
                            searchHistory: data.searchHistory || [],
                            chatHistory: data.chatHistory || [],
                            patientProfile: data.patientProfile || get().patientProfile,
                            medicineSchedule: data.medicineSchedule || [],
                            symptomTracker: data.symptomTracker || []
                        });
                    }
                } catch (error) {
                    console.error('Error syncing user data:', error);
                }
            },

            // Save data to Firebase when user is logged in
            saveToFirebase: async (dataType, data) => {
                const user = get().user;
                if (user) {
                    await saveUserData(user.uid, dataType, data);
                }
            },

            // Clear user data on logout
            clearUserData: () => {
                set({
                    favorites: {},
                    searchHistory: [],
                    chatHistory: [],
                    compareSelection: [],
                    medicineSchedule: [],
                    symptomTracker: []
                });
            },

            // Search state
            searchQuery: '',
            searchResults: [],
            searchHistory: [],
            lastSearchTime: null,

            setSearchQuery: (query) => set({ searchQuery: query }),
            setSearchResults: (results) => set({ searchResults: results }),
            addToSearchHistory: (query) => {
                const history = get().searchHistory;
                if (query && !history.includes(query)) {
                    const newHistory = [query, ...history].slice(0, 10);
                    set({
                        searchHistory: newHistory,
                        lastSearchTime: new Date().toISOString()
                    });
                    // Save to Firebase if logged in
                    get().saveToFirebase('searchHistory', newHistory);
                }
            },
            clearSearchHistory: () => {
                set({ searchHistory: [] });
                get().saveToFirebase('searchHistory', []);
            },

            // Favorites
            favorites: {},

            toggleFavorite: (id, formulation) => {
                const favorites = get().favorites;
                let newFavorites;
                if (favorites[id]) {
                    const { [id]: removed, ...rest } = favorites;
                    newFavorites = rest;
                } else {
                    newFavorites = { ...favorites, [id]: formulation };
                }
                set({ favorites: newFavorites });
                // Save to Firebase if logged in
                get().saveToFirebase('favorites', newFavorites);
            },

            isFavorite: (id) => !!get().favorites[id],

            // Comparison
            compareSelection: [],

            toggleCompare: (formulation) => {
                const selection = get().compareSelection;
                const index = selection.findIndex(item => item.id === formulation.id);

                if (index >= 0) {
                    set({ compareSelection: selection.filter((_, i) => i !== index) });
                } else if (selection.length < 3) {
                    set({ compareSelection: [...selection, formulation] });
                }
            },

            clearCompareSelection: () => set({ compareSelection: [] }),

            // Patient Profile
            patientProfile: {
                age: null,
                weight: null,
                height: null,
                gender: 'Not specified',
                pregnant: false,
                diabetic: false,
                hypertension: false,
                kidney_disease: false,
                liver_disease: false,
                heart_disease: false,
                allergies: [],
                current_medications: [],
                dosha_type: 'Not assessed'
            },

            updatePatientProfile: (updates) => {
                const newProfile = { ...get().patientProfile, ...updates };
                set({ patientProfile: newProfile });
                get().saveToFirebase('patientProfile', newProfile);
            },

            // Chat
            chatHistory: [],
            chatOpen: false,
            geminiApiKey: '',

            setChatOpen: (open) => set({ chatOpen: open }),
            setGeminiApiKey: (key) => set({ geminiApiKey: key }),
            addChatMessage: (message) => {
                const newHistory = [...get().chatHistory, message];
                set({ chatHistory: newHistory });
                // Save to Firebase if logged in
                get().saveToFirebase('chatHistory', newHistory);
            },
            clearChatHistory: () => {
                set({ chatHistory: [] });
                get().saveToFirebase('chatHistory', []);
            },

            // Medicine Schedule
            medicineSchedule: [],

            addMedicineSchedule: (schedule) => {
                const newSchedule = [...get().medicineSchedule, schedule];
                set({ medicineSchedule: newSchedule });
                get().saveToFirebase('medicineSchedule', newSchedule);
            },

            removeMedicineSchedule: (id) => {
                const newSchedule = get().medicineSchedule.filter(s => s.id !== id);
                set({ medicineSchedule: newSchedule });
                get().saveToFirebase('medicineSchedule', newSchedule);
            },

            updateMedicineSchedule: (id, updates) => {
                const newSchedule = get().medicineSchedule.map(s =>
                    s.id === id ? { ...s, ...updates } : s
                );
                set({ medicineSchedule: newSchedule });
                get().saveToFirebase('medicineSchedule', newSchedule);
            },


            // Symptom Tracker
            symptomTracker: [],

            addSymptom: (symptom) => {
                const newSymptoms = [...get().symptomTracker, symptom];
                set({ symptomTracker: newSymptoms });
                get().saveToFirebase('symptomTracker', newSymptoms);
            },

            removeSymptom: (id) => {
                const newSymptoms = get().symptomTracker.filter(s => s.id !== id);
                set({ symptomTracker: newSymptoms });
                get().saveToFirebase('symptomTracker', newSymptoms);
            },

            // User Profile (Enhanced)
            userProfile: null,

            setUserProfile: (profile) => {
                set({ userProfile: profile });
                get().saveToFirebase('userProfile', profile);
            },

            // Symptom Logs (New structured logging)
            symptomLogs: [],

            addSymptomLog: (log) => {
                const newLogs = [...get().symptomLogs, log];
                set({ symptomLogs: newLogs });
                get().saveToFirebase('symptomLogs', newLogs);
            },

            // Medicine Schedule Enhancements
            addToMedicineSchedule: (medicine) => {
                const newSchedule = [...get().medicineSchedule, medicine];
                set({ medicineSchedule: newSchedule });
                get().saveToFirebase('medicineSchedule', newSchedule);
            },

            toggleMedicineDose: (medicineId, timing, date) => {
                const newSchedule = get().medicineSchedule.map(med => {
                    if (med.id === medicineId) {
                        const taken = med.taken || [];
                        const existingIndex = taken.findIndex(
                            t => t.date === date && t.time === timing
                        );

                        let newTaken;
                        if (existingIndex >= 0) {
                            newTaken = taken.map((t, i) =>
                                i === existingIndex ? { ...t, completed: !t.completed } : t
                            );
                        } else {
                            newTaken = [...taken, { date, time: timing, completed: true }];
                        }

                        return { ...med, taken: newTaken };
                    }
                    return med;
                });
                set({ medicineSchedule: newSchedule });
                get().saveToFirebase('medicineSchedule', newSchedule);
            },


            // Filters
            filters: {
                medicineForm: 'All',
                preparationComplexity: 'All',
                costRange: 'All',
                doshaBalance: 'All',
                classicalText: 'All'
            },

            updateFilters: (updates) => {
                set({ filters: { ...get().filters, ...updates } });
            },

            resetFilters: () => {
                set({
                    filters: {
                        medicineForm: 'All',
                        preparationComplexity: 'All',
                        costRange: 'All',
                        doshaBalance: 'All',
                        classicalText: 'All'
                    }
                });
            },

            // Dosha Assessment
            doshaResults: null,
            setDoshaResults: (results) => set({ doshaResults: results }),

            // Theme
            theme: 'light',
            toggleTheme: () => {
                const newTheme = get().theme === 'light' ? 'dark' : 'light';
                set({ theme: newTheme });
                // Apply theme to document
                document.documentElement.setAttribute('data-theme', newTheme);
            },
            setTheme: (theme) => {
                set({ theme });
                document.documentElement.setAttribute('data-theme', theme);
            },

            // UI State
            currentPage: 'home',
            setCurrentPage: (page) => set({ currentPage: page }),

            sidebarOpen: true,
            toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
        }),
        {
            name: 'ayurveda-ai-storage',
            partialize: (state) => ({
                user: state.user, // Persist user to stay logged in
                theme: state.theme, // Persist theme preference
                favorites: state.favorites,
                searchHistory: state.searchHistory,
                chatHistory: state.chatHistory,
                patientProfile: state.patientProfile,
                medicineSchedule: state.medicineSchedule,
                symptomTracker: state.symptomTracker,
                geminiApiKey: state.geminiApiKey,
                filters: state.filters,
            })
        }
    )
);

export default useStore;
