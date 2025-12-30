// Enhanced Recommendation Engine - Better utilizes user profile data
import { formulationsData } from '../data/formulations';

export const generateRecommendations = (userProfile) => {
    // Allow recommendations even without a profile - show general wellness
    const hasMinimalData = !userProfile ||
        (!userProfile.conditions?.length && !userProfile.goals?.length &&
            !userProfile.age && !userProfile.lifestyle);

    const recommendations = [];

    // Helper function to calculate enhanced match score
    const calculateScore = (formulation) => {
        let score = 0;
        let reasons = [];

        // 1. Match health conditions (highest priority - up to 30 points)
        if (userProfile?.conditions && userProfile.conditions.length > 0) {
            userProfile.conditions.forEach(condition => {
                const conditionLower = condition.toLowerCase();
                const indications = (formulation.indications || '').toLowerCase();
                const benefits = (formulation.benefits || '').toLowerCase();

                if (indications.includes(conditionLower) || benefits.includes(conditionLower)) {
                    score += 15;
                    reasons.push(`Addresses ${condition}`);
                }
            });
        }

        // 2. Match health goals (high priority - up to 25 points)
        if (userProfile?.goals && userProfile.goals.length > 0) {
            userProfile.goals.forEach(goal => {
                const goalLower = goal.toLowerCase();
                const indications = (formulation.indications || '').toLowerCase();
                const benefits = (formulation.benefits || '').toLowerCase();
                const name = formulation.name.toLowerCase();

                if (indications.includes(goalLower) || benefits.includes(goalLower) || name.includes(goalLower)) {
                    score += 12;
                    reasons.push(`Supports ${goal}`);
                }
            });
        }

        // 3. Age-based recommendations (up to 15 points)
        if (userProfile?.age) {
            if (userProfile.age < 18 && formulation.category === 'Immunity') {
                score += 10;
                reasons.push('Age-appropriate immunity support');
            } else if (userProfile.age > 50) {
                if (formulation.name.toLowerCase().includes('ashwagandha') ||
                    formulation.name.toLowerCase().includes('brahmi') ||
                    formulation.category === 'Rejuvenation') {
                    score += 10;
                    reasons.push('Supports healthy aging');
                }
            }
        }

        // 4. Lifestyle factors (up to 20 points)
        if (userProfile?.lifestyle) {
            // High stress
            if (userProfile.lifestyle.stressLevel === 'high') {
                if (formulation.name.toLowerCase().includes('brahmi') ||
                    formulation.name.toLowerCase().includes('ashwagandha') ||
                    formulation.name.toLowerCase().includes('shankhpushpi')) {
                    score += 12;
                    reasons.push('Helps manage stress');
                }
            }

            // Poor sleep
            if (userProfile.lifestyle.sleepHours && userProfile.lifestyle.sleepHours < 6) {
                if (formulation.name.toLowerCase().includes('ashwagandha') ||
                    formulation.name.toLowerCase().includes('brahmi')) {
                    score += 10;
                    reasons.push('Promotes better sleep');
                }
            }

            // Low exercise
            if (userProfile.lifestyle.exerciseFrequency === 'none' ||
                userProfile.lifestyle.exerciseFrequency === 'occasional') {
                if (formulation.benefits?.toLowerCase().includes('energy') ||
                    formulation.benefits?.toLowerCase().includes('strength')) {
                    score += 8;
                    reasons.push('Boosts energy levels');
                }
            }

            // Diet type consideration
            if (userProfile.lifestyle.dietType === 'vegetarian' ||
                userProfile.lifestyle.dietType === 'vegan') {
                // Prefer plant-based formulations
                score += 3;
            }
        }

        // 5. Gender-specific (up to 10 points)
        if (userProfile?.gender === 'female') {
            if (formulation.name.toLowerCase().includes('shatavari') ||
                formulation.benefits?.toLowerCase().includes('women')) {
                score += 8;
                reasons.push('Women\'s health support');
            }
        }

        // 6. Weight management (up to 10 points)
        if (userProfile?.weight && userProfile?.height) {
            const bmi = userProfile.weight / Math.pow(userProfile.height / 100, 2);
            if (bmi > 25 && formulation.benefits?.toLowerCase().includes('weight')) {
                score += 10;
                reasons.push('Supports weight management');
            }
        }

        // 7. General wellness for minimal profiles (up to 15 points)
        // Always give some score to popular, safe formulations
        const name = formulation.name.toLowerCase();
        if (hasMinimalData || score === 0) {
            // Recommend popular and safe formulations for general wellness
            if (name.includes('chyawanprash') || name.includes('chyavanaprasha')) {
                score += 15;
                reasons.push('Excellent for immunity and general wellness');
            } else if (name.includes('triphala')) {
                score += 14;
                reasons.push('Supports digestive health and detoxification');
            } else if (name.includes('ashwagandha')) {
                score += 13;
                reasons.push('Enhances energy, strength, and stress relief');
            } else if (name.includes('brahmi')) {
                score += 12;
                reasons.push('Improves memory and mental clarity');
            } else if (formulation.category === 'Immunity') {
                score += 11;
                reasons.push('Boosts immune system');
            } else if (formulation.category === 'Rejuvenation') {
                score += 10;
                reasons.push('Promotes overall vitality and wellness');
            } else if (formulation.category === 'Digestive') {
                score += 9;
                reasons.push('Supports healthy digestion');
            } else {
                // Give at least some score to all formulations
                score += 5;
                reasons.push('General Ayurvedic wellness support');
            }
        }

        return { score, reasons };
    };

    // Score all formulations
    const scored = formulationsData.map(formulation => {
        const { score, reasons } = calculateScore(formulation);
        return {
            ...formulation,
            matchScore: Math.min(100, score), // Cap at 100
            matchReasons: reasons,
            dosageInfo: generateDosage(formulation, userProfile)
        };
    });

    // Sort by score and take top recommendations
    const topRecommendations = scored
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 12); // Top 12 recommendations

    return topRecommendations.map(rec => ({
        formulation: rec,
        matchScore: rec.matchScore,
        dosage: rec.dosageInfo.dosage,
        timing: rec.dosageInfo.timing,
        duration: rec.dosageInfo.duration,
        anupana: rec.dosageInfo.anupana,
        reasoning: rec.matchReasons.join('. ') + (rec.matchReasons.length > 0 ? '.' : 'General wellness support.')
    }));
};

// Generate personalized dosage based on profile
const generateDosage = (formulation, profile) => {
    const baseInfo = {
        dosage: formulation.dosage || '1-2 tablets',
        timing: ['morning', 'evening'],
        duration: 30, // days
        anupana: 'Warm water'
    };

    // Adjust based on age
    if (profile.age) {
        if (profile.age < 12) {
            baseInfo.dosage = '½ tablet';
            baseInfo.duration = 21;
        } else if (profile.age < 18) {
            baseInfo.dosage = '1 tablet';
        } else if (profile.age > 60) {
            baseInfo.duration = 45; // Longer duration for elderly
        }
    }

    // Adjust based on weight
    if (profile.weight) {
        if (profile.weight < 50) {
            baseInfo.dosage = '1 tablet';
        } else if (profile.weight > 90) {
            baseInfo.dosage = '2 tablets';
        }
    }

    // Adjust timing based on formulation type
    const name = formulation.name.toLowerCase();
    if (name.includes('triphala')) {
        baseInfo.timing = ['night'];
        baseInfo.anupana = 'Warm water before bed';
    } else if (name.includes('chyawanprash') || name.includes('chyavanaprasha')) {
        baseInfo.timing = ['morning'];
        baseInfo.anupana = 'With warm milk';
    } else if (name.includes('ashwagandha')) {
        baseInfo.timing = ['night'];
        baseInfo.anupana = 'With warm milk before bed';
    } else if (name.includes('brahmi')) {
        baseInfo.timing = ['morning', 'afternoon'];
        baseInfo.anupana = 'With water or ghee';
    } else if (formulation.category === 'Digestive') {
        baseInfo.timing = ['before meals'];
        baseInfo.anupana = 'With warm water 30 min before meals';
    } else if (formulation.category === 'Immunity') {
        baseInfo.timing = ['morning'];
        baseInfo.anupana = 'With warm water or honey';
    }

    return baseInfo;
};

// Calculate wellness score (unchanged)
export const calculateWellnessScore = (userData) => {
    let score = 50; // Base score

    // Medicine adherence (0-20 points)
    if (userData.adherence) {
        score += (userData.adherence / 100) * 20;
    }

    // Symptom improvement (0-20 points)
    if (userData.symptomTrend === 'improving') {
        score += 20;
    } else if (userData.symptomTrend === 'stable') {
        score += 10;
    }

    // Lifestyle factors (0-20 points)
    if (userData.lifestyle) {
        if (userData.lifestyle.exerciseFrequency && userData.lifestyle.exerciseFrequency !== 'none') score += 5;
        if (userData.lifestyle.sleepHours >= 7) score += 5;
        if (userData.lifestyle.waterIntake >= 2) score += 5;
        if (userData.lifestyle.stressLevel === 'low') score += 5;
    }

    // Consistency (0-10 points)
    if (userData.daysTracked > 30) score += 10;
    else if (userData.daysTracked > 14) score += 5;

    return Math.min(100, Math.max(0, Math.round(score)));
};

export default {
    generateRecommendations,
    calculateWellnessScore
};
