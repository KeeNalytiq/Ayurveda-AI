import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Activity, Target, Save, ChevronRight, ChevronLeft } from 'lucide-react';
import useStore from '../../store/useStore';
import './ProfileForm.css';

const ProfileForm = ({ onComplete }) => {
    const { user, userProfile, setUserProfile } = useStore();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(userProfile || {
        // Basic Info
        age: '',
        gender: '',
        weight: '',
        height: '',
        bloodGroup: '',

        // Health Status
        conditions: [],
        allergies: '',
        currentMedications: '',

        // Lifestyle
        dietType: 'vegetarian',
        sleepHours: '',
        exerciseFrequency: '',
        stressLevel: 'medium',
        waterIntake: '',

        // Health Goals
        goals: [],
        preferences: {
            tasteLikes: [],
            tasteDislikes: []
        }
    });

    const steps = [
        { icon: User, title: 'Basic Info', fields: ['age', 'gender', 'weight', 'height', 'bloodGroup'] },
        { icon: Heart, title: 'Health Status', fields: ['conditions', 'allergies', 'currentMedications'] },
        { icon: Activity, title: 'Lifestyle', fields: ['dietType', 'sleepHours', 'exerciseFrequency', 'stressLevel', 'waterIntake'] },
        { icon: Target, title: 'Health Goals', fields: ['goals', 'preferences'] }
    ];

    const conditionOptions = [
        'Diabetes', 'Hypertension', 'Thyroid', 'PCOD/PCOS', 'Arthritis',
        'Digestive Issues', 'Respiratory Issues', 'Skin Problems', 'Anxiety', 'Insomnia'
    ];

    const goalOptions = [
        'Weight Management', 'Better Digestion', 'Improved Sleep',
        'Stress Relief', 'Boost Immunity', 'Increase Energy',
        'Better Skin', 'Joint Health', 'Mental Clarity'
    ];

    const tasteOptions = ['Sweet', 'Sour', 'Salty', 'Bitter', 'Pungent', 'Astringent'];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayToggle = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const handlePreferenceToggle = (type, value) => {
        setFormData(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [type]: prev.preferences[type].includes(value)
                    ? prev.preferences[type].filter(item => item !== value)
                    : [...prev.preferences[type], value]
            }
        }));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setUserProfile(formData);
        // Save to Firebase will happen automatically via store
        if (onComplete) onComplete();
    };

    return (
        <div className="profile-form-container">
            {/* Progress Bar */}
            <div className="form-progress">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`progress-step ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                    >
                        <div className="progress-icon">
                            <step.icon size={20} />
                        </div>
                        <span className="progress-label">{step.title}</span>
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <motion.div
                className="form-content"
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                <h2>{steps[currentStep].title}</h2>

                {/* Step 0: Basic Info */}
                {currentStep === 0 && (
                    <div className="form-fields">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Age *</label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                    placeholder="Enter your age"
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender *</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Weight (kg) *</label>
                                <input
                                    type="number"
                                    value={formData.weight}
                                    onChange={(e) => handleInputChange('weight', e.target.value)}
                                    placeholder="e.g., 70"
                                />
                            </div>
                            <div className="form-group">
                                <label>Height (cm) *</label>
                                <input
                                    type="number"
                                    value={formData.height}
                                    onChange={(e) => handleInputChange('height', e.target.value)}
                                    placeholder="e.g., 170"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Blood Group</label>
                            <select
                                value={formData.bloodGroup}
                                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Step 1: Health Status */}
                {currentStep === 1 && (
                    <div className="form-fields">
                        <div className="form-group">
                            <label>Current Health Conditions</label>
                            <div className="checkbox-grid">
                                {conditionOptions.map(condition => (
                                    <label key={condition} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.conditions.includes(condition)}
                                            onChange={() => handleArrayToggle('conditions', condition)}
                                        />
                                        <span>{condition}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Allergies</label>
                            <textarea
                                value={formData.allergies}
                                onChange={(e) => handleInputChange('allergies', e.target.value)}
                                placeholder="List any allergies (food, medicine, environmental)"
                                rows={3}
                            />
                        </div>

                        <div className="form-group">
                            <label>Current Medications</label>
                            <textarea
                                value={formData.currentMedications}
                                onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                                placeholder="List medications you're currently taking"
                                rows={3}
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Lifestyle */}
                {currentStep === 2 && (
                    <div className="form-fields">
                        <div className="form-group">
                            <label>Diet Type *</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="dietType"
                                        value="vegetarian"
                                        checked={formData.dietType === 'vegetarian'}
                                        onChange={(e) => handleInputChange('dietType', e.target.value)}
                                    />
                                    <span>Vegetarian</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="dietType"
                                        value="non-vegetarian"
                                        checked={formData.dietType === 'non-vegetarian'}
                                        onChange={(e) => handleInputChange('dietType', e.target.value)}
                                    />
                                    <span>Non-Vegetarian</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="dietType"
                                        value="vegan"
                                        checked={formData.dietType === 'vegan'}
                                        onChange={(e) => handleInputChange('dietType', e.target.value)}
                                    />
                                    <span>Vegan</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Average Sleep (hours) *</label>
                                <input
                                    type="number"
                                    value={formData.sleepHours}
                                    onChange={(e) => handleInputChange('sleepHours', e.target.value)}
                                    placeholder="e.g., 7"
                                    min="0"
                                    max="24"
                                />
                            </div>
                            <div className="form-group">
                                <label>Water Intake (liters) *</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    value={formData.waterIntake}
                                    onChange={(e) => handleInputChange('waterIntake', e.target.value)}
                                    placeholder="e.g., 2.5"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Exercise Frequency *</label>
                            <select
                                value={formData.exerciseFrequency}
                                onChange={(e) => handleInputChange('exerciseFrequency', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="daily">Daily</option>
                                <option value="4-6-week">4-6 times a week</option>
                                <option value="2-3-week">2-3 times a week</option>
                                <option value="occasional">Occasionally</option>
                                <option value="none">None</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Stress Level *</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="stressLevel"
                                        value="low"
                                        checked={formData.stressLevel === 'low'}
                                        onChange={(e) => handleInputChange('stressLevel', e.target.value)}
                                    />
                                    <span>Low</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="stressLevel"
                                        value="medium"
                                        checked={formData.stressLevel === 'medium'}
                                        onChange={(e) => handleInputChange('stressLevel', e.target.value)}
                                    />
                                    <span>Medium</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="stressLevel"
                                        value="high"
                                        checked={formData.stressLevel === 'high'}
                                        onChange={(e) => handleInputChange('stressLevel', e.target.value)}
                                    />
                                    <span>High</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Health Goals */}
                {currentStep === 3 && (
                    <div className="form-fields">
                        <div className="form-group">
                            <label>Health Goals</label>
                            <div className="checkbox-grid">
                                {goalOptions.map(goal => (
                                    <label key={goal} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.goals.includes(goal)}
                                            onChange={() => handleArrayToggle('goals', goal)}
                                        />
                                        <span>{goal}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Taste Preferences (Likes)</label>
                            <div className="checkbox-grid">
                                {tasteOptions.map(taste => (
                                    <label key={taste} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.preferences.tasteLikes.includes(taste)}
                                            onChange={() => handlePreferenceToggle('tasteLikes', taste)}
                                        />
                                        <span>{taste}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Taste Preferences (Dislikes)</label>
                            <div className="checkbox-grid">
                                {tasteOptions.map(taste => (
                                    <label key={taste} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.preferences.tasteDislikes.includes(taste)}
                                            onChange={() => handlePreferenceToggle('tasteDislikes', taste)}
                                        />
                                        <span>{taste}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="form-actions">
                {currentStep > 0 && (
                    <button className="btn btn-secondary" onClick={handleBack}>
                        <ChevronLeft size={20} />
                        Back
                    </button>
                )}
                <div style={{ flex: 1 }} />
                {currentStep < steps.length - 1 ? (
                    <button className="btn btn-primary" onClick={handleNext}>
                        Next
                        <ChevronRight size={20} />
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        <Save size={20} />
                        Save Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfileForm;
