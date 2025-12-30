import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Info } from 'lucide-react';
import { generateRecommendations } from '../../services/RecommendationEngine';
import useStore from '../../store/useStore';
import './MedicineRecommendations.css';

const MedicineRecommendations = () => {
    const { userProfile, addToMedicineSchedule, medicineSchedule } = useStore();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userProfile) {
            setLoading(true);
            const recs = generateRecommendations(userProfile);
            setRecommendations(recs);
            setLoading(false);
        }
    }, [userProfile]);

    const handleAddToSchedule = (recommendation) => {
        const medicine = {
            id: Date.now().toString(),
            formulationId: recommendation.formulation.id,
            name: recommendation.formulation.name,
            dosage: recommendation.dosage,
            timing: recommendation.timing,
            anupana: recommendation.anupana,
            duration: recommendation.duration,
            startDate: new Date().toISOString(),
            taken: [],
            notes: recommendation.reasoning
        };
        addToMedicineSchedule(medicine);
    };

    const isAlreadyScheduled = (formId) => {
        return medicineSchedule.some(med => med.formulationId === formId);
    };

    if (!userProfile) {
        return (
            <div className="recommendations-empty">
                <Info size={64} className="empty-icon" />
                <h3>Complete Your Profile First</h3>
                <p>Fill out your health profile to get personalized medicine recommendations</p>
            </div>
        );
    }

    if (loading) {
        return <div className="recommendations-loading">Generating recommendations...</div>;
    }

    return (
        <div className="medicine-recommendations">
            <div className="recommendations-header">
                <div>
                    <h2>Personalized Recommendations</h2>
                    <p>Based on your health profile and goals</p>
                </div>
                <div className="match-score-legend">
                    <Star size={16} />
                    <span>Match scores indicate relevance to your profile</span>
                </div>
            </div>

            <div className="recommendations-grid">
                {recommendations.map((rec, index) => (
                    <motion.div
                        key={rec.formulation.id}
                        className="recommendation-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {/* Match Score Badge */}
                        <div className="match-badge">
                            <Star size={14} fill="currentColor" />
                            <span>{rec.matchScore}% Match</span>
                        </div>

                        {/* Medicine Info */}
                        <div className="recommendation-header">
                            <h3>{rec.formulation.name}</h3>
                            <span className="category-badge">{rec.formulation.category}</span>
                        </div>

                        <p className="formulation-description">{rec.formulation.benefits}</p>

                        {/* Dosage Info */}
                        <div className="dosage-info">
                            <div className="info-item">
                                <span className="label">Dosage:</span>
                                <span className="value">{rec.dosage}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Timing:</span>
                                <span className="value">{rec.timing.join(', ')}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">With:</span>
                                <span className="value">{rec.anupana}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Duration:</span>
                                <span className="value">{rec.duration} days</span>
                            </div>
                        </div>

                        {/* Reasoning */}
                        <div className="recommendation-reasoning">
                            <strong>Why this is recommended:</strong>
                            <p>{rec.reasoning}</p>
                        </div>

                        {/* Action Button */}
                        <button
                            className={`btn ${isAlreadyScheduled(rec.formulation.id) ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={() => handleAddToSchedule(rec)}
                            disabled={isAlreadyScheduled(rec.formulation.id)}
                        >
                            {isAlreadyScheduled(rec.formulation.id) ? (
                                'Already in Schedule'
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Add to Schedule
                                </>
                            )}
                        </button>
                    </motion.div>
                ))}
            </div>

            {recommendations.length === 0 && (
                <div className="recommendations-empty">
                    <Info size={64} className="empty-icon" />
                    <h3>No Recommendations Found</h3>
                    <p>Update your profile with more health information to get better recommendations</p>
                </div>
            )}
        </div>
    );
};

export default MedicineRecommendations;
