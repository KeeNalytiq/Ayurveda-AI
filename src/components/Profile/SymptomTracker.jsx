import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, TrendingDown, Minus, Plus } from 'lucide-react';
import useStore from '../../store/useStore';
import './SymptomTracker.css';

const SymptomTracker = () => {
    const { symptomLogs, addSymptomLog, user } = useStore();
    const [showAddForm, setShowAddForm] = useState(false);
    const [newSymptom, setNewSymptom] = useState({
        symptom: '',
        severity: 5,
        notes: '',
        date: new Date().toISOString().split('T')[0]
    });

    const symptomOptions = [
        'Headache', 'Fatigue', 'Pain', 'Nausea', 'Dizziness',
        'Indigestion', 'Bloating', 'Constipation', 'Insomnia',
        'Anxiety', 'Stress', 'Joint Pain', 'Muscle Pain'
    ];

    const handleAddSymptom = () => {
        if (newSymptom.symptom && user) {
            addSymptomLog({
                ...newSymptom,
                id: Date.now().toString(),
                timestamp: new Date().toISOString()
            });
            setNewSymptom({ symptom: '', severity: 5, notes: '', date: new Date().toISOString().split('T')[0] });
            setShowAddForm(false);
        }
    };

    // Get trend for a symptom
    const getSymptomTrend = (symptomName) => {
        const logs = symptomLogs.filter(log => log.symptom === symptomName).slice(-7);
        if (logs.length < 2) return 'stable';

        const recent = logs.slice(-3).reduce((sum, log) => sum + log.severity, 0) / 3;
        const older = logs.slice(0, -3).reduce((sum, log) => sum + log.severity, 0) / (logs.length - 3);

        if (recent < older - 1) return 'improving';
        if (recent > older + 1) return 'worsening';
        return 'stable';
    };

    // Group logs by symptom
    const groupedSymptoms = symptomLogs.reduce((acc, log) => {
        if (!acc[log.symptom]) {
            acc[log.symptom] = [];
        }
        acc[log.symptom].push(log);
        return acc;
    }, {});

    return (
        <div className="symptom-tracker">
            <div className="tracker-header">
                <div>
                    <h2>Symptom Tracker</h2>
                    <p>Monitor your health progress</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                    <Plus size={18} />
                    Log Symptom
                </button>
            </div>

            {/* Add Symptom Form */}
            {showAddForm && (
                <motion.div
                    className="add-symptom-form"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="form-group">
                        <label>Select Symptom</label>
                        <select
                            value={newSymptom.symptom}
                            onChange={(e) => setNewSymptom({ ...newSymptom, symptom: e.target.value })}
                        >
                            <option value="">Choose a symptom</option>
                            {symptomOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Severity (1-10): {newSymptom.severity}</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={newSymptom.severity}
                            onChange={(e) => setNewSymptom({ ...newSymptom, severity: parseInt(e.target.value) })}
                            className="severity-slider"
                        />
                        <div className="severity-labels">
                            <span>Mild</span>
                            <span>Severe</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Notes (Optional)</label>
                        <textarea
                            value={newSymptom.notes}
                            onChange={(e) => setNewSymptom({ ...newSymptom, notes: e.target.value })}
                            placeholder="Any additional details..."
                            rows={3}
                        />
                    </div>

                    <div className="form-actions">
                        <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleAddSymptom}>Add</button>
                    </div>
                </motion.div>
            )}

            {/* Symptom List */}
            <div className="symptoms-list">
                {Object.keys(groupedSymptoms).map(symptomName => {
                    const logs = groupedSymptoms[symptomName];
                    const latestLog = logs[logs.length - 1];
                    const trend = getSymptomTrend(symptomName);

                    return (
                        <motion.div
                            key={symptomName}
                            className="symptom-card"
                            whileHover={{ scale: 1.01 }}
                        >
                            <div className="symptom-header">
                                <div>
                                    <h4>{symptomName}</h4>
                                    <p className="symptom-date">
                                        Last logged: {new Date(latestLog.timestamp).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className={`trend-indicator ${trend}`}>
                                    {trend === 'improving' && <TrendingDown size={20} />}
                                    {trend === 'worsening' && <TrendingUp size={20} />}
                                    {trend === 'stable' && <Minus size={20} />}
                                    <span>{trend}</span>
                                </div>
                            </div>

                            <div className="severity-bar">
                                <div
                                    className="severity-fill"
                                    style={{ width: `${latestLog.severity * 10}%` }}
                                />
                                <span className="severity-value">{latestLog.severity}/10</span>
                            </div>

                            {latestLog.notes && (
                                <p className="symptom-notes">{latestLog.notes}</p>
                            )}

                            <div className="log-count">{logs.length} entries</div>
                        </motion.div>
                    );
                })}
            </div>

            {symptomLogs.length === 0 && !showAddForm && (
                <div className="empty-state">
                    <Activity size={64} className="empty-icon" />
                    <h3>No Symptoms Logged</h3>
                    <p>Start tracking your symptoms to monitor health progress</p>
                </div>
            )}
        </div>
    );
};

export default SymptomTracker;
