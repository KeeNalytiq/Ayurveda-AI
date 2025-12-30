import { motion } from 'framer-motion';
import { Heart, GitCompare, ExternalLink, Pill, BookOpen, Star } from 'lucide-react';
import useStore from '../../store/useStore';
import './FormulationCard.css';

const FormulationCard = ({ formulation, index, onViewDetails }) => {
    const { toggleFavorite, isFavorite, toggleCompare, compareSelection } = useStore();

    const isInFavorites = isFavorite(formulation.id);
    const isInComparison = compareSelection.some(item => item.id === formulation.id);

    const getRiskColor = (score) => {
        if (score <= 1) return 'var(--success-glow)';
        if (score === 2) return 'var(--warning-glow)';
        return 'var(--danger-glow)';
    };

    const getDoshaText = (doshaEffect) => {
        const effects = [];
        if (doshaEffect.vata < 0) effects.push('⬇ Vata');
        if (doshaEffect.pitta < 0) effects.push('⬇ Pitta');
        if (doshaEffect.kapha < 0) effects.push('⬇ Kapha');
        return effects.join(' • ') || 'Balanced';
    };

    return (
        <motion.div
            className="formulation-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.01 }}
        >
            {/* Header */}
            <div className="card-header">
                <div className="card-title-section">
                    <div className="title-with-badges">
                        <h3 className="card-title">{formulation.name}</h3>
                        {formulation.riskScore <= 1 && (
                            <span className="badge badge-safe" title="Safe for most people">
                                ✓ Safe
                            </span>
                        )}
                        {['Churna', 'Vati', 'Avaleha'].includes(formulation.formType) && (
                            <span className="badge badge-easy" title="Easy to consume">
                                ⭐ Easy
                            </span>
                        )}
                    </div>
                    <span className="card-form-type">
                        <Pill size={14} />
                        {formulation.formType}
                    </span>
                </div>
                <div className="card-actions">
                    <motion.button
                        className={`action-btn ${isInFavorites ? 'active' : ''}`}
                        onClick={() => toggleFavorite(formulation.id, formulation)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Add to favorites"
                    >
                        <Heart size={20} fill={isInFavorites ? 'currentColor' : 'none'} />
                    </motion.button>
                    <motion.button
                        className={`action-btn ${isInComparison ? 'active' : ''}`}
                        onClick={() => toggleCompare(formulation)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Add to comparison"
                        disabled={!isInComparison && compareSelection.length >= 3}
                    >
                        <GitCompare size={20} />
                    </motion.button>
                </div>
            </div>

            {/* Description */}
            <p className="card-description">{formulation.description}</p>

            {/* Tags */}
            <div className="card-tags">
                {formulation.tags.slice(0, 5).map((tag, idx) => (
                    <span key={idx} className="tag">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Ingredients */}
            <div className="card-section">
                <h4 className="section-title">Key Ingredients</h4>
                <div className="ingredients-list">
                    {formulation.ingredients.slice(0, 4).map((ingredient, idx) => (
                        <span key={idx} className="ingredient-pill">
                            {ingredient}
                        </span>
                    ))}
                    {formulation.ingredients.length > 4 && (
                        <span className="ingredient-pill more">
                            +{formulation.ingredients.length - 4} more
                        </span>
                    )}
                </div>
            </div>

            {/* Dosha Effect */}
            <div className="card-section">
                <h4 className="section-title">Dosha Effect</h4>
                <div className="dosha-effects">
                    {getDoshaText(formulation.doshaEffect)}
                </div>
            </div>

            {/* Footer */}
            <div className="card-footer">
                <div className="risk-indicator">
                    <Star size={16} style={{ color: getRiskColor(formulation.riskScore) }} />
                    <span style={{ color: getRiskColor(formulation.riskScore) }}>
                        Risk Level: {formulation.riskScore}/5
                    </span>
                </div>

                {formulation.references && formulation.references.length > 0 && (
                    <div className="reference">
                        <BookOpen size={14} />
                        <span>{formulation.references[0].text}</span>
                    </div>
                )}
            </div>

            {/* View Details Button */}
            <motion.button
                className="btn-view-details"
                onClick={() => onViewDetails && onViewDetails(formulation)}
                whileHover={{ x: 5 }}
            >
                View Details <ExternalLink size={16} />
            </motion.button>
        </motion.div>
    );
};

export default FormulationCard;
