import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Activity, TrendingUp, Settings, Leaf, Sun } from 'lucide-react';
import useStore from '../../store/useStore';
import ProfileForm from './ProfileForm';
import MedicineRecommendations from './MedicineRecommendations';
import SymptomTracker from './SymptomTracker';
import WellnessDashboard from './WellnessDashboard';
import SeasonalGuidance from './SeasonalGuidance';
import DailyRoutine from './DailyRoutine';
import './ProfilePage.css';

const ProfilePage = () => {
    const { userProfile } = useStore();
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: Activity },
        { id: 'profile', label: 'Health Profile', icon: User },
        { id: 'recommendations', label: 'Recommendations', icon: Heart },
        { id: 'symptoms', label: 'Symptoms', icon: TrendingUp },
        { id: 'seasonal', label: 'Seasonal Guide', icon: Leaf },
        { id: 'routine', label: 'Daily Routine', icon: Sun }
    ];

    return (
        <div className="profile-page">
            {/* Tabs Navigation */}
            <div className="profile-tabs">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <Icon size={20} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <motion.div
                className="tab-content"
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {activeTab === 'dashboard' && <WellnessDashboard />}
                {activeTab === 'profile' && <ProfileForm onComplete={() => setActiveTab('recommendations')} />}
                {activeTab === 'recommendations' && <MedicineRecommendations />}
                {activeTab === 'symptoms' && <SymptomTracker />}
                {activeTab === 'seasonal' && <SeasonalGuidance />}
                {activeTab === 'routine' && <DailyRoutine />}
            </motion.div>
        </div>
    );
};

export default ProfilePage;
