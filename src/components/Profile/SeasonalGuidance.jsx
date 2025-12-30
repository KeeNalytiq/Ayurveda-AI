import { Leaf, Cloud, Snowflake, Sun, Wind } from 'lucide-react';
import useStore from '../../store/useStore';
import './SeasonalGuidance.css';

const SeasonalGuidance = () => {
    const { userProfile } = useStore();

    // Detect current season
    const getCurrentSeason = () => {
        const month = new Date().getMonth();
        if (month >= 3 && month <= 6) return 'summer';
        if (month >= 7 && month <= 9) return 'monsoon';
        if (month >= 10 || month <= 1) return 'winter';
        return 'spring';
    };

    const season = getCurrentSeason();

    const seasonalData = {
        summer: {
            icon: Sun,
            name: 'Summer (Grishma)',
            color: '#f59e0b',
            tips: [
                'Stay hydrated - drink plenty of water and cooling beverages',
                'Avoid hot, spicy foods',
                'Prefer sweet, cold, and liquid foods',
                'Take cool showers',
                'Avoid excessive physical exertion',
                'Wear light, breathable clothing'
            ],
            diet: ['Coconut water', 'Cucumber', 'Watermelon', 'Mint', 'Coriander', 'Sweet fruits'],
            avoid: ['Spicy food', 'Fried food', 'Sour foods', 'Alcohol', 'Excessive salt']
        },
        monsoon: {
            icon: Cloud,
            name: 'Monsoon (Varsha)',
            color: '#3b82f6',
            tips: [
                'Boost immunity with warming spices',
                'Avoid dampness and getting wet',
                'Drink warm water',
                'Keep digestive fire strong',
                'Maintain cleanliness',
                'Avoid day sleep'
            ],
            diet: ['Ginger tea', 'Turmeric', 'Honey', 'Warm soups', 'Light grains', 'Garlic'],
            avoid: ['Raw vegetables', 'Heavy foods', 'Curd', 'Leafy vegetables', 'Street food']
        },
        winter: {
            icon: Snowflake,
            name: 'Winter (Hemanta & Shishira)',
            color: '#06b6d4',
            tips: [
                'Strengthen immunity and build strength',
                'Oil massage before bath',
                'Consume warm, nourishing foods',
                'Stay physically active',
                'Protect from cold winds',
                'Get adequate sunlight'
            ],
            diet: ['Ghee', 'Sesame oil', 'Nuts', 'Warm milk', 'Root vegetables', 'Whole grains'],
            avoid: ['Cold drinks', 'Cold foods', 'Excessive fasting', 'Light foods only']
        },
        spring: {
            icon: Leaf,
            name: 'Spring (Vasanta)',
            color: '#10b981',
            tips: [
                'Reduce heavy, oily foods',
                'Exercise regularly',
                'Wake up early',
                'Light and easy to digest diet',
                'Detoxify the body',
                'Avoid day sleep'
            ],
            diet: ['Honey', 'Barley', 'Bitter vegetables', 'Light grains', 'Ginger', 'Green vegetables'],
            avoid: ['Heavy foods', 'Excessive sweet', 'Sour foods', 'Oily foods', 'Day sleep']
        }
    };

    const currentSeasonData = seasonalData[season];
    const Icon = currentSeasonData.icon;

    return (
        <div className="seasonal-guidance">
            <div className="seasonal-header" style={{ '--season-color': currentSeasonData.color }}>
                <Icon size={48} />
                <h2>{currentSeasonData.name}</h2>
                <p>Current Season Guidance</p>
            </div>

            <div className="guidance-sections">
                <div className="guidance-card">
                    <h3>Lifestyle Tips</h3>
                    <ul>
                        {currentSeasonData.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>

                <div className="guidance-card">
                    <h3>Recommended Foods</h3>
                    <div className="food-tags">
                        {currentSeasonData.diet.map((food, index) => (
                            <span key={index} className="food-tag recommended">{food}</span>
                        ))}
                    </div>
                </div>

                <div className="guidance-card">
                    <h3>Foods to Avoid</h3>
                    <div className="food-tags">
                        {currentSeasonData.avoid.map((food, index) => (
                            <span key={index} className="food-tag avoid">{food}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeasonalGuidance;
