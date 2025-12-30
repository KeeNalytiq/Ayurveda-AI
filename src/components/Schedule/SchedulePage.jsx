import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Clock, Calendar, Check, X } from 'lucide-react';
import useStore from '../../store/useStore';
import './SchedulePage.css';

const SchedulePage = () => {
    const { medicineSchedule, toggleMedicineDose, user } = useStore();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('today'); // 'today' or 'calendar'

    const today = new Date().toDateString();
    const isToday = selectedDate.toDateString() === today;

    // Group medicines by timing
    const groupByTiming = () => {
        const groups = {
            morning: [],
            afternoon: [],
            evening: [],
            night: []
        };

        medicineSchedule.forEach(medicine => {
            medicine.timing.forEach(time => {
                if (groups[time]) {
                    groups[time].push(medicine);
                }
            });
        });

        return groups;
    };

    // Check if dose was taken
    const isDoseTaken = (medicine, timing) => {
        const dateStr = selectedDate.toDateString();
        return medicine.taken?.some(
            entry => entry.date === dateStr && entry.time === timing && entry.completed
        );
    };

    // Calculate adherence
    const calculateAdherence = () => {
        const totalDoses = medicineSchedule.reduce((sum, med) => sum + med.timing.length * 7, 0);
        const takenDoses = medicineSchedule.reduce((sum, med) => {
            return sum + (med.taken?.filter(t => t.completed).length || 0);
        }, 0);
        return totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;
    };

    // Generate last 7 days for calendar
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date);
        }
        return days;
    };

    const getDayAdherence = (date) => {
        const dateStr = date.toDateString();
        const totalForDay = medicineSchedule.reduce((sum, med) => sum + med.timing.length, 0);
        const takenForDay = medicineSchedule.reduce((sum, med) => {
            return sum + (med.taken?.filter(t => t.date === dateStr && t.completed).length || 0);
        }, 0);
        return totalForDay > 0 ? Math.round((takenForDay / totalForDay) * 100) : 0;
    };

    const groups = groupByTiming();
    const adherence = calculateAdherence();

    const TimingSection = ({ timing, title, icon: Icon, medicines }) => (
        <div className="timing-section">
            <div className="timing-header">
                <div className="timing-icon">
                    <Icon size={20} />
                </div>
                <h3>{title}</h3>
                <span className="medicine-count">{medicines.length}</span>
            </div>

            <div className="medicines-list">
                {medicines.length === 0 ? (
                    <p className="no-medicines">No medicines scheduled</p>
                ) : (
                    medicines.map(medicine => {
                        const taken = isDoseTaken(medicine, timing);
                        return (
                            <motion.div
                                key={`${medicine.id}-${timing}`}
                                className={`medicine-item ${taken ? 'taken' : ''}`}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="medicine-info">
                                    <div className="medicine-name">
                                        <Pill size={18} />
                                        <span>{medicine.name}</span>
                                    </div>
                                    <div className="medicine-details">
                                        <span className="dosage">{medicine.dosage}</span>
                                        {medicine.anupana && (
                                            <span className="anupana">with {medicine.anupana}</span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    className={`check-button ${taken ? 'checked' : ''}`}
                                    onClick={() => toggleMedicineDose(medicine.id, timing, selectedDate.toDateString())}
                                    title={taken ? 'Mark as not taken' : 'Mark as taken'}
                                >
                                    {taken ? (
                                        <>
                                            <Check size={18} />
                                            <span className="status-text">Done</span>
                                        </>
                                    ) : (
                                        <>
                                            <X size={18} />
                                            <span className="status-text">Not Done</span>
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );

    return (
        <div className="schedule-page">
            {/* Header with adherence */}
            <div className="schedule-header">
                <div>
                    <h2>Medicine Schedule</h2>
                    <p>Track your daily doses</p>
                </div>
                <div className="adherence-badge">
                    <div className="adherence-circle" style={{ '--percentage': adherence }}>
                        <span>{adherence}%</span>
                    </div>
                    <div>
                        <div className="adherence-label">Adherence</div>
                        <div className="adherence-sublabel">Last 7 days</div>
                    </div>
                </div>
            </div>

            {/* Date selector with calendar */}
            <div className="date-selector">
                <button
                    className={`view-btn ${view === 'today' ? 'active' : ''}`}
                    onClick={() => { setView('today'); setSelectedDate(new Date()); }}
                >
                    <Clock size={18} />
                    Today
                </button>
                <button
                    className={`view-btn ${view === 'calendar' ? 'active' : ''}`}
                    onClick={() => setView('calendar')}
                >
                    <Calendar size={18} />
                    Week View
                </button>
            </div>

            {/* Calendar Week View */}
            {view === 'calendar' && (
                <div className="calendar-week">
                    {getLast7Days().map((date, idx) => {
                        const dayAdherence = getDayAdherence(date);
                        const isCurrentDay = date.toDateString() === new Date().toDateString();
                        return (
                            <div
                                key={idx}
                                className={`calendar-day ${isCurrentDay ? 'today' : ''}`}
                                onClick={() => { setSelectedDate(date); setView('today'); }}
                            >
                                <div className="day-name">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                <div className="day-number">{date.getDate()}</div>
                                <div className={`adherence-dot ${dayAdherence >= 80 ? 'high' : dayAdherence >= 50 ? 'medium' : 'low'}`}>
                                    {dayAdherence}%
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Schedule by timing */}
            <div className="schedule-content">
                <TimingSection
                    timing="morning"
                    title="Morning"
                    icon={Clock}
                    medicines={groups.morning}
                />
                <TimingSection
                    timing="afternoon"
                    title="Afternoon"
                    icon={Clock}
                    medicines={groups.afternoon}
                />
                <TimingSection
                    timing="evening"
                    title="Evening"
                    icon={Clock}
                    medicines={groups.evening}
                />
                <TimingSection
                    timing="night"
                    title="Night"
                    icon={Clock}
                    medicines={groups.night}
                />
            </div>

            {medicineSchedule.length === 0 && (
                <div className="empty-state">
                    <Pill size={64} className="empty-icon" />
                    <h3>No Medicines Scheduled</h3>
                    <p>Add medicines from your recommendations to start tracking</p>
                </div>
            )}
        </div>
    );
};

export default SchedulePage;
