import { motion } from 'framer-motion';
import { TrendingUp, Activity, Calendar, Award, Target, Heart, Zap, Trophy } from 'lucide-react';
import { calculateWellnessScore } from '../../services/RecommendationEngine';
import useStore from '../../store/useStore';
import './WellnessDashboard.css';

const WellnessDashboard = () => {
    const { userProfile, medicineSchedule, symptomLogs, user } = useStore();

    // Calculate metrics
    const wellnessScore = calculateWellnessScore({
        adherence: calculateAdherence(),
        symptomTrend: getOverallSymptomTrend(),
        lifestyle: userProfile?.lifestyle,
        daysTracked: calculateDaysTracked()
    });

    function calculateAdherence() {
        const totalDoses = medicineSchedule.reduce((sum, med) => sum + med.timing.length * 7, 0);
        const takenDoses = medicineSchedule.reduce((sum, med) => {
            return sum + (med.taken?.filter(t => t.completed).length || 0);
        }, 0);
        return totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;
    }

    function getOverallSymptomTrend() {
        if (symptomLogs.length < 2) return 'stable';
        const recentAvg = symptomLogs.slice(-7).reduce((sum, log) => sum + log.severity, 0) / Math.min(7, symptomLogs.length);
        const olderAvg = symptomLogs.slice(0, -7).reduce((sum, log) => sum + log.severity, 0) / Math.max(1, symptomLogs.length - 7);

        if (recentAvg < olderAvg - 1) return 'improving';
        if (recentAvg > olderAvg + 1) return 'worsening';
        return 'stable';
    }

    function calculateDaysTracked() {
        if (symptomLogs.length === 0) return 0;
        const dates = [...new Set(symptomLogs.map(log => log.date))];
        return dates.length;
    }

    const adherence = calculateAdherence();
    const trend = getOverallSymptomTrend();
    const daysTracked = calculateDaysTracked();

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    const getScoreMessage = (score) => {
        if (score >= 80) return { emoji: '🎉', text: 'Excellent! You\'re doing great!' };
        if (score >= 60) return { emoji: '👍', text: 'Good progress! Keep it up!' };
        if (score >= 40) return { emoji: '💪', text: 'Making progress! Stay committed!' };
        return { emoji: '🌱', text: 'Let\'s start your wellness journey!' };
    };

    const scoreInfo = getScoreMessage(wellnessScore);

    return (
        <div className="wellness-dashboard">
            <div className="dashboard-header">
                <div>
                    <h2>Your Wellness Journey</h2>
                    <p>Track your health progress and achievements</p>
                </div>
            </div>

            {/* Main Score Section */}
            <div className="dashboard-grid">
                {/* Large Wellness Score Card */}
                <motion.div
                    className="wellness-score-main"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="score-header">
                        <Trophy className="score-trophy" size={32} />
                        <h3>Wellness Score</h3>
                    </div>

                    <div className="score-display">
                        <svg className="score-ring" viewBox="0 0 200 200">
                            <circle
                                className="score-ring-bg"
                                cx="100"
                                cy="100"
                                r="85"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.1)"
                                strokeWidth="12"
                            />
                            <circle
                                className="score-ring-progress"
                                cx="100"
                                cy="100"
                                r="85"
                                fill="none"
                                stroke={getScoreColor(wellnessScore)}
                                strokeWidth="12"
                                strokeLinecap="round"
                                style={{
                                    strokeDasharray: `${wellnessScore * 5.34} 534`,
                                    transform: 'rotate(-90deg)',
                                    transformOrigin: '50% 50%'
                                }}
                            />
                        </svg>
                        <div className="score-content">
                            <div className="score-number">{wellnessScore}</div>
                            <div className="score-max">/100</div>
                        </div>
                    </div>

                    <div className="score-message">
                        <span className="score-emoji">{scoreInfo.emoji}</span>
                        <p>{scoreInfo.text}</p>
                    </div>
                </motion.div>

                {/* Metrics Cards */}
                <motion.div
                    className="metric-card adherence"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="metric-header">
                        <div className="metric-icon">
                            <Target size={24} />
                        </div>
                        <span className="metric-label">Medicine Adherence</span>
                    </div>
                    <div className="metric-value-large">{adherence}%</div>
                    <div className="metric-progress">
                        <div className="progress-bar" style={{ width: `${adherence}%` }} />
                    </div>
                    <p className="metric-description">
                        {adherence > 80 ? 'Great consistency!' : adherence > 50 ? 'Keep going!' : 'Let\'s improve!'}
                    </p>
                </motion.div>

                <motion.div
                    className="metric-card symptoms"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="metric-header">
                        <div className="metric-icon">
                            <Activity size={24} />
                        </div>
                        <span className="metric-label">Symptom Trend</span>
                    </div>
                    <div className={`metric-trend ${trend}`}>
                        {trend === 'improving' && <TrendingUp size={32} />}
                        {trend === 'stable' && <Activity size={32} />}
                        {trend === 'worsening' && <TrendingUp size={32} style={{ transform: 'scaleY(-1)' }} />}
                    </div>
                    <div className="metric-value-text">
                        {trend.charAt(0).toUpperCase() + trend.slice(1)}
                    </div>
                    <p className="metric-description">
                        {symptomLogs.length} symptoms logged
                    </p>
                </motion.div>

                <motion.div
                    className="metric-card tracking"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="metric-header">
                        <div className="metric-icon">
                            <Calendar size={24} />
                        </div>
                        <span className="metric-label">Tracking Streak</span>
                    </div>
                    <div className="metric-value-large">{daysTracked}</div>
                    <div className="metric-value-unit">days</div>
                    <p className="metric-description">
                        {daysTracked > 30 ? '🔥 Amazing streak!' : daysTracked > 14 ? '⭐ Great habit!' : '🌱 Keep building!'}
                    </p>
                </motion.div>

                <motion.div
                    className="metric-card goals"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="metric-header">
                        <div className="metric-icon">
                            <Heart size={24} />
                        </div>
                        <span className="metric-label">Active Goals</span>
                    </div>
                    <div className="metric-value-large">{userProfile?.goals?.length || 0}</div>
                    <div className="metric-value-unit">goals</div>
                    <p className="metric-description">
                        {medicineSchedule.length} medicines scheduled
                    </p>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-actions">
                <motion.div
                    className="action-card"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Zap size={24} />
                    <div>
                        <h4>Next Steps</h4>
                        <p>
                            {!userProfile && 'Complete your health profile'}
                            {userProfile && medicineSchedule.length === 0 && 'Get personalized recommendations'}
                            {medicineSchedule.length > 0 && adherence < 80 && 'Check your medicine schedule'}
                            {medicineSchedule.length > 0 && adherence >= 80 && 'Log any new symptoms'}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WellnessDashboard;
