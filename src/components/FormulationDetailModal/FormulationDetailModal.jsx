import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, AlertCircle, Info, Clock, Package } from 'lucide-react';
import './FormulationDetailModal.css';

const FormulationDetailModal = ({ formulation, onClose }) => {
    if (!formulation) return null;

    const { detailedInfo } = formulation;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-content"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <div className="modal-body">
                        {/* Header with Image */}
                        <div className="detail-header">
                            <img src={detailedInfo.imageUrl} alt={formulation.name} className="detail-image" />
                            <div className="detail-title-section">
                                <h2>{formulation.name}</h2>
                                <p className="form-type-badge">{formulation.formType}</p>
                                <p className="detail-desc">{formulation.description}</p>
                            </div>
                        </div>

                        {/* Origin Section */}
                        <div className="detail-section">
                            <h3><Info size={20} /> Origin & Historical Context</h3>
                            <div className="detail-card">
                                <p><strong>Classical Reference:</strong> {detailedInfo.origin}</p>
                                <p>{detailedInfo.historicalContext}</p>
                            </div>
                        </div>

                        {/* Primary Use */}
                        <div className="detail-section">
                            <h3>Primary Use</h3>
                            <div className="detail-card primary-use">
                                {detailedInfo.primaryUse}
                            </div>
                        </div>

                        {/* Advantages */}
                        <div className="detail-section">
                            <h3>✨ Key Advantages</h3>
                            <div className="detail-card">
                                <ul className="advantages-list">
                                    {detailedInfo.advantages.map((adv, i) => (
                                        <li key={i}>{adv}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* When to Use */}
                        <div className="detail-section">
                            <h3><Calendar size={20} /> When to Use</h3>
                            <div className="detail-card">
                                <ul className="when-list">
                                    {detailedInfo.whenToUse.map((when, i) => (
                                        <li key={i}>{when}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Dosage Information */}
                        <div className="detail-section highlight">
                            <h3><Package size={20} /> Dosage Information</h3>
                            <div className="detail-card dosage-grid">
                                <div className="dosage-item">
                                    <strong>Adult Dose:</strong>
                                    <p>{detailedInfo.dosage.adult}</p>
                                </div>
                                <div className="dosage-item">
                                    <strong>Child Dose:</strong>
                                    <p>{detailedInfo.dosage.child}</p>
                                </div>
                                <div className="dosage-item">
                                    <strong>Timing:</strong>
                                    <p>{detailedInfo.dosage.timing}</p>
                                </div>
                                <div className="dosage-item">
                                    <strong>Duration:</strong>
                                    <p>{detailedInfo.dosage.duration}</p>
                                </div>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="detail-section">
                            <h3>Key Ingredients</h3>
                            <div className="detail-card">
                                <div className="ingredients-tags">
                                    {formulation.ingredients.map((ing, i) => (
                                        <span key={i} className="ingredient-tag">{ing}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Dosha Effect */}
                        <div className="detail-section">
                            <h3>Dosha Effect</h3>
                            <div className="detail-card dosha-effects">
                                <div className="dosha-item">
                                    <span className="dosha-name">Vata:</span>
                                    <span className={`dosha-value ${formulation.doshaEffect.vata < 0 ? 'decrease' : formulation.doshaEffect.vata > 0 ? 'increase' : 'neutral'}`}>
                                        {formulation.doshaEffect.vata > 0 ? '+' : ''}{formulation.doshaEffect.vata}
                                    </span>
                                </div>
                                <div className="dosha-item">
                                    <span className="dosha-name">Pitta:</span>
                                    <span className={`dosha-value ${formulation.doshaEffect.pitta < 0 ? 'decrease' : formulation.doshaEffect.pitta > 0 ? 'increase' : 'neutral'}`}>
                                        {formulation.doshaEffect.pitta > 0 ? '+' : ''}{formulation.doshaEffect.pitta}
                                    </span>
                                </div>
                                <div className="dosha-item">
                                    <span className="dosha-name">Kapha:</span>
                                    <span className={`dosha-value ${formulation.doshaEffect.kapha < 0 ? 'decrease' : formulation.doshaEffect.kapha > 0 ? 'increase' : 'neutral'}`}>
                                        {formulation.doshaEffect.kapha > 0 ? '+' : ''}{formulation.doshaEffect.kapha}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contraindications */}
                        <div className="detail-section warning">
                            <h3><AlertCircle size={20} /> Contraindications & Precautions</h3>
                            <div className="detail-card">
                                <ul className="contraindications-list">
                                    {detailedInfo.contraindications.map((contra, i) => (
                                        <li key={i}>{contra}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Storage */}
                        <div className="detail-section">
                            <h3><Clock size={20} /> Storage & Shelf Life</h3>
                            <div className="detail-card storage-info">
                                <p><strong>Storage:</strong> {detailedInfo.storage}</p>
                                <p><strong>Shelf Life:</strong> {detailedInfo.shelfLife}</p>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="disclaimer">
                            <AlertCircle size={16} />
                            <p>Always consult a qualified Ayurvedic practitioner before starting any new formulation. This information is for educational purposes only.</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FormulationDetailModal;
