import { Sun, Moon, Coffee, Utensils, Activity, Wind } from 'lucide-react';
import useStore from '../../store/useStore';
import './DailyRoutine.css';

const DailyRoutine = () => {
    const { userProfile } = useStore();

    const routineSchedule = [
        {
            icon: Sun,
            time: '5:00 - 6:00 AM',
            title: 'Wake Up (Brahma Muhurta)',
            activities: [
                'Wake up before sunrise',
                'Drink warm water',
                'Eliminate waste',
                'Brush teeth and tongue scraping'
            ]
        },
        {
            icon: Activity,
            time: '6:00 - 7:00 AM',
            title: 'Morning Cleansing',
            activities: [
                'Oil pulling with sesame or coconut oil',
                'Self-massage (Abhyanga)',
                'Warm shower or bath',
                'Meditation and yoga'
            ]
        },
        {
            icon: Coffee,
            time: '7:00 - 8:00 AM',
            title: 'Breakfast',
            activities: [
                'Light, warm breakfast',
                'Herbal tea or warm milk',
                'Avoid heavy, cold foods'
            ]
        },
        {
            icon: Utensils,
            time: '12:00 - 1:00 PM',
            title: 'Lunch (Main Meal)',
            activities: [
                'Largest meal of the day',
                'Eat in peaceful environment',
                'Include all six tastes',
                'Rest for 10-15 minutes after'
            ]
        },
        {
            icon: Wind,
            time: '4:00 - 5:00 PM',
            title: 'Evening Activities',
            activities: [
                'Light snack if needed',
                'Herbal tea',
                'Light exercise or walk',
                'Avoid heavy physical work'
            ]
        },
        {
            icon: Utensils,
            time: '6:00 - 7:00 PM',
            title: 'Dinner',
            activities: [
                'Light, easily digestible meal',
                'Eat 3 hours before sleep',
                'Avoid raw foods',
                'Warm soup or khichdi recommended'
            ]
        },
        {
            icon: Moon,
            time: '9:00 - 10:00 PM',
            title: 'Evening Wind Down',
            activities: [
                'Light reading or meditation',
                'Foot massage with oil',
                'Avoid screens 1 hour before sleep',
                'Sleep by 10 PM for optimal rest'
            ]
        }
    ];

    return (
        <div className="daily-routine">
            <div className="routine-header">
                <h2>Daily Routine (Dinacharya)</h2>
                <p>Ayurvedic guidelines for optimal health and balance</p>
            </div>

            <div className="routine-timeline">
                {routineSchedule.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="routine-item">
                            <div className="routine-time">
                                <div className="time-icon">
                                    <Icon size={24} />
                                </div>
                                <span>{item.time}</span>
                            </div>
                            <div className="routine-content">
                                <h3>{item.title}</h3>
                                <ul>
                                    {item.activities.map((activity, i) => (
                                        <li key={i}>{activity}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="routine-note">
                <p><strong>Note:</strong> This is a general guideline. Adjust timing based on your lifestyle and constitution. Consistency is more important than perfection.</p>
            </div>
        </div>
    );
};

export default DailyRoutine;
