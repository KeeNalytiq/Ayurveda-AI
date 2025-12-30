import { motion } from 'framer-motion';
import { Wind, Flame, Droplet, Info } from 'lucide-react';
import './DoshaEducation.css';

const DoshaEducation = () => {
    const doshas = [
        {
            name: 'Vata',
            icon: Wind,
            element: 'Air + Space',
            color: '#8B5CF6',
            qualities: ['Dry', 'Light', 'Cold', 'Rough', 'Subtle', 'Mobile'],
            governs: ['Movement', 'Breathing', 'Circulation', 'Nervous System', 'Creativity'],
            balanced: ['Energetic', 'Creative', 'Flexible', 'Enthusiastic'],
            imbalanced: ['Anxiety', 'Insomnia', 'Dry skin', 'Constipation', 'Joint pain'],
            foods: {
                favor: 'Warm, moist, grounding foods - cooked grains, root vegetables, ghee',
                avoid: 'Cold, dry, raw foods - salads, crackers, beans'
            }
        },
        {
            name: 'Pitta',
            icon: Flame,
            element: 'Fire + Water',
            color: '#EF4444',
            qualities: ['Hot', 'Sharp', 'Light', 'Oily', 'Liquid'],
            governs: ['Digestion', 'Metabolism', 'Body Temperature', 'Intelligence', 'Vision'],
            balanced: ['Focused', 'Intelligent', 'Good digestion', 'Radiant skin'],
            imbalanced: ['Anger', 'Inflammation', 'Acidity', 'Skin rashes', 'Digestive issues'],
            foods: {
                favor: 'Cool, sweet, bitter foods - cucumber, coconut, leafy greens',
                avoid: 'Spicy, sour, salty foods - chilies, citrus, fermented foods'
            }
        },
        {
            name: 'Kapha',
            icon: Droplet,
            element: 'Water + Earth',
            color: '#10B981',
            qualities: ['Heavy', 'Slow', 'Cool', 'Oily', 'Smooth', 'Stable'],
            governs: ['Structure', 'Lubrication', 'Immunity', 'Strength', 'Stamina'],
            balanced: ['Strong', 'Calm', 'Loving', 'Stable', 'Good immunity'],
            imbalanced: ['Weight gain', 'Lethargy', 'Congestion', 'Water retention', 'Depression'],
            foods: {
                favor: 'Light, dry, warming foods - spices, beans, vegetables',
                avoid: 'Heavy, oily, cold foods - dairy, fried foods, sweets'
            }
        }
    ];

    return (
        <div className="dosha-education">
            <div className="education-header">
                <h2>Understanding the Three Doshas</h2>
                <p>The foundation of Ayurvedic medicine - learn about your mind-body constitution</p>
            </div>

            <div className="doshas-grid">
                {doshas.map((dosha, index) => {
                    const Icon = dosha.icon;
                    return (
                        <motion.div
                            key={dosha.name}
                            className="dosha-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="dosha-header" style={{ borderLeftColor: dosha.color }}>
                                <div className="dosha-icon" style={{ background: `${dosha.color}20`, color: dosha.color }}>
                                    <Icon size={32} />
                                </div>
                                <div>
                                    <h3 style={{ color: dosha.color }}>{dosha.name}</h3>
                                    <p className="dosha-element">{dosha.element}</p>
                                </div>
                            </div>

                            <div className="dosha-section">
                                <h4>Qualities</h4>
                                <div className="quality-tags">
                                    {dosha.qualities.map((q, i) => (
                                        <span key={i} className="quality-tag">{q}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="dosha-section">
                                <h4>Governs</h4>
                                <ul className="dosha-list">
                                    {dosha.governs.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="dosha-section">
                                <h4>When Balanced</h4>
                                <ul className="dosha-list balanced">
                                    {dosha.balanced.map((item, i) => (
                                        <li key={i}>✓ {item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="dosha-section">
                                <h4>When Imbalanced</h4>
                                <ul className="dosha-list imbalanced">
                                    {dosha.imbalanced.map((item, i) => (
                                        <li key={i}>⚠ {item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="dosha-section foods">
                                <h4>Dietary Guidelines</h4>
                                <div className="food-guideline">
                                    <strong>Favor:</strong> {dosha.foods.favor}
                                </div>
                                <div className="food-guideline avoid">
                                    <strong>Avoid:</strong> {dosha.foods.avoid}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="dosha-footer">
                <div className="info-card">
                    <Info size={24} />
                    <div>
                        <h4>Not sure about your dosha?</h4>
                        <p>Most people are a combination of doshas. Consult an Ayurvedic practitioner for a personalized assessment. Start by searching for conditions you want to address above!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoshaEducation;
