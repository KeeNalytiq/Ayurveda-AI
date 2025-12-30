import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader } from 'lucide-react';
import useStore from '../../store/useStore';
import { formulationsData } from '../../data/formulations';
import './ChatBot.css';

const ChatBot = () => {
    const { chatHistory, addChatMessage } = useStore();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const findRelevantFormulations = (question) => {
        const lower = question.toLowerCase();
        const matches = [];

        formulationsData.forEach(f => {
            const name = f.name.toLowerCase();
            const benefits = (f.benefits || '').toLowerCase();
            const indications = (f.indications || '').toLowerCase();

            // Check for keyword matches
            if (lower.includes('cough') || lower.includes('cold')) {
                if (name.includes('tulsi') || benefits.includes('cough') || indications.includes('respiratory')) {
                    matches.push(f);
                }
            }
            if (lower.includes('stress') || lower.includes('anxiety')) {
                if (name.includes('ashwagandha') || name.includes('brahmi') || benefits.includes('stress')) {
                    matches.push(f);
                }
            }
            if (lower.includes('digest') || lower.includes('stomach') || lower.includes('acidity')) {
                if (f.category === 'Digestive' || name.includes('triphala')) {
                    matches.push(f);
                }
            }
            if (lower.includes('immunity') || lower.includes('immune')) {
                if (f.category === 'Immunity' || name.includes('chyawanprash')) {
                    matches.push(f);
                }
            }
            if (lower.includes('joint') || lower.includes('pain') || lower.includes('arthritis')) {
                if (benefits.includes('joint') || benefits.includes('pain') || name.includes('guggulu')) {
                    matches.push(f);
                }
            }
            if (lower.includes('sleep') || lower.includes('insomnia')) {
                if (name.includes('ashwagandha') || benefits.includes('sleep')) {
                    matches.push(f);
                }
            }
        });

        return [...new Set(matches)].slice(0, 3); // Return up to 3 unique formulations
    };

    const getDemoResponse = (question) => {
        const lower = question.toLowerCase();
        const formulations = findRelevantFormulations(question);
        let response = '';

        if (lower.includes('cough') || lower.includes('cold')) {
            response = '**For Cough & Cold Relief:**\n\n';
            if (formulations.length > 0) {
                formulations.forEach(f => {
                    response += `🌿 **${f.name}**\n${f.benefits || f.indications}\n${f.dosage ? `Dosage: ${f.dosage}` : ''}\n\n`;
                });
            } else {
                response += '🌿 **Tulsi (Holy Basil)** - Boil fresh tulsi leaves with ginger and honey\n';
                response += '🌿 **Turmeric Milk** - Mix 1 tsp turmeric in warm milk before bed\n';
                response += '🌿 **Steam Inhalation** - Add eucalyptus oil for relief\n\n';
            }
            response += '💡 **Lifestyle Tips:**\n✅ Drink warm water frequently\n✅ Avoid cold foods and drinks\n✅ Get adequate rest\n\n';
            response += '⚠️ Consult an Ayurvedic practitioner for personalized treatment.';
            return response;
        }

        if (lower.includes('stress') || lower.includes('anxiety')) {
            response = '**Managing Stress & Anxiety:**\n\n';
            if (formulations.length > 0) {
                formulations.forEach(f => {
                    response += `🌿 **${f.name}**\n${f.benefits || f.indications}\n${f.dosage ? `Dosage: ${f.dosage}` : ''}\n\n`;
                });
            } else {
                response += '🌿 **Ashwagandha** - Adaptogen for stress relief\n';
                response += '🌿 **Brahmi** - Calms the mind and improves focus\n\n';
            }
            response += '💡 **Lifestyle Practices:**\n✅ Practice daily meditation (15min)\n✅ Pranayama (breathing exercises)\n✅ Avoid caffeine after 2 PM\n✅ Maintain regular sleep schedule\n\n';
            response += '⚠️ Always consult a qualified practitioner.';
            return response;
        }

        if (lower.includes('digest') || lower.includes('stomach') || lower.includes('acidity')) {
            response = '**For Digestive Health:**\n\n';
            if (formulations.length > 0) {
                formulations.forEach(f => {
                    response += `🌿 **${f.name}**\n${f.benefits || f.indications}\n${f.dosage ? `Dosage: ${f.dosage}` : ''}\n\n`;
                });
            } else {
                response += '🌿 **Triphala** - Supports digestion and detoxification\n';
                response += '🌿 **Hingvastak Churna** - Relieves gas and bloating\n\n';
            }
            response += '💡 **Dietary Tips:**\n✅ Eat warm, cooked foods\n✅ Include ginger, cumin, coriander\n✅ Avoid heavy, fried foods\n✅ Eat at regular times\n\n';
            response += '⚠️ Consult an Ayurvedic doctor for chronic issues.';
            return response;
        }

        if (lower.includes('immunity') || lower.includes('immune')) {
            response = '**Boost Your Immunity:**\n\n';
            if (formulations.length > 0) {
                formulations.forEach(f => {
                    response += `🌿 **${f.name}**\n${f.benefits || f.indications}\n${f.dosage ? `Dosage: ${f.dosage}` : ''}\n\n`;
                });
            } else {
                response += '🌿 **Chyawanprash** - Complete immunity booster\n';
                response += '🌿 **Tulsi** - Natural immune enhancer\n\n';
            }
            response += '💡 **Daily Habits:**\n✅ Morning sun exposure (15min)\n✅ Adequate sleep (7-8 hours)\n✅ Balanced diet with seasonal fruits\n✅ Regular exercise\n\n';
            response += '⚠️ Always consult a healthcare professional.';
            return response;
        }

        if (lower.includes('joint') || lower.includes('pain') || lower.includes('arthritis')) {
            response = '**For Joint Pain Relief:**\n\n';
            if (formulations.length > 0) {
                formulations.forEach(f => {
                    response += `🌿 **${f.name}**\n${f.benefits || f.indications}\n${f.dosage ? `Dosage: ${f.dosage}` : ''}\n\n`;
                });
            } else {
                response += '🌿 **Yogaraja Guggulu** - Classical formulation for joints\n';
                response += '🌿 **Ashwagandha** - Strengthens joints and muscles\n\n';
            }
            response += '💡 **Self-Care:**\n✅ Warm sesame oil massage daily\n✅ Gentle yoga and stretching\n✅ Avoid cold, damp environments\n✅ Stay hydrated\n\n';
            response += '⚠️ Consult a qualified Ayurvedic practitioner.';
            return response;
        }

        if (lower.includes('dosha') || lower.includes('vata') || lower.includes('pitta') || lower.includes('kapha')) {
            response = '**Understanding the Three Doshas:**\n\n';
            response += '🌬️ **Vata** (Air + Space)\n▫️ Governs movement and communication\n▫️ Qualities: Light, dry, cold, mobile\n▫️ When balanced: Creative and energetic\n\n';
            response += '🔥 **Pitta** (Fire + Water)\n▫️ Governs digestion and metabolism\n▫️ Qualities: Hot, sharp, intense\n▫️ When balanced: Intelligent and focused\n\n';
            response += '🌊 **Kapha** (Water + Earth)\n▫️ Governs structure and stability\n▫️ Qualities: Heavy, slow, steady, cool\n▫️ When balanced: Calm and loving\n\n';
            response += '💡 Everyone has a unique combination of all three doshas!\n\n';
            response += '⚠️ For personalized dosha assessment, consult an Ayurvedic expert.';
            return response;
        }

        // Default response with general formulations
        response = "**🙏 Namaste! I'm Ayru Buddie, your Ayurvedic health companion.**\n\n";
        response += "I can help you with:\n";
        response += "🌿 Ayurvedic remedies and formulations\n";
        response += "🍽️ Diet and lifestyle recommendations\n";
        response += "🧘 Stress management and wellness tips\n";
        response += "⚕️ Understanding doshas and constitution\n\n";
        response += "**Try asking about:**\n";
        response += "• Cough, cold, or respiratory issues\n";
        response += "• Stress, anxiety, or sleep problems\n";
        response += "• Digestive health or immunity\n";
        response += "• Joint pain or general wellness\n\n";
        response += "⚠️ Remember: This is for educational purposes. Always consult a qualified Ayurvedic practitioner for medical advice.";

        return response;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: input,
            timestamp: new Date().toISOString()
        };

        addChatMessage(userMessage);
        const userQuestion = input;
        setInput('');
        setIsLoading(true);

        try {
            if (geminiApiKey && geminiApiKey.length > 30) {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{ text: `You are Ayru Buddie, an expert Ayurvedic health assistant. Provide helpful, well-structured answers about Ayurvedic health, formulations, diet plans, and remedies. Always include:\n1. Specific Ayurvedic formulations when relevant\n2. Lifestyle and dietary recommendations\n3. Use **bold** for medicines and important terms\n4. Use emojis (🌿 for herbs, ✅ for tips, ⚠️ for warnings)\n5. Always add a disclaimer to consult a qualified practitioner\nQuestion: ${userQuestion}` }]
                            }]
                        })
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

                    if (aiResponse) {
                        addChatMessage({
                            id: Date.now() + 1,
                            role: 'assistant',
                            content: aiResponse,
                            timestamp: new Date().toISOString()
                        });
                        setIsLoading(false);
                        return;
                    }
                }
            }

            const demoResponse = getDemoResponse(userQuestion);
            addChatMessage({
                id: Date.now() + 1,
                role: 'assistant',
                content: demoResponse,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            const demoResponse = getDemoResponse(userQuestion);
            addChatMessage({
                id: Date.now() + 1,
                role: 'assistant',
                content: demoResponse,
                timestamp: new Date().toISOString()
            });
        } finally {
            setIsLoading(false);
        }
    };

    const formatText = (text) => {
        // Convert **bold** to HTML
        return text.split('**').map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        );
    };

    const suggestedPrompts = [
        "What Ayurvedic remedies help with cough?",
        "How can I reduce stress naturally?",
        "Formulations for better digestion",
        "How to boost immunity?"
    ];

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <div className="chat-header-content">
                    <div className="chat-header-icon"><Bot size={32} /></div>
                    <div>
                        <h2>Ayru Buddie</h2>
                        <p>Your Ayurvedic Health Companion</p>
                    </div>
                </div>
            </div>

            <div className="chat-messages">
                {chatHistory.length === 0 ? (
                    <div className="chat-welcome">
                        <div className="welcome-icon"><Sparkles size={48} /></div>
                        <h3>Welcome to Ayru Buddie!</h3>
                        <p>Ask me about Ayurvedic health, formulations, and wellness tips.</p>
                        <div className="suggested-prompts">
                            <p className="prompts-label">Try asking:</p>
                            {suggestedPrompts.map((prompt, i) => (
                                <motion.button key={i} className="prompt-suggestion" whileHover={{ scale: 1.02 }} onClick={() => setInput(prompt)}>{prompt}</motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="messages-list">
                        {chatHistory.map((msg) => (
                            <motion.div key={msg.id} className={`message ${msg.role}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="message-avatar">{msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}</div>
                                <div className="message-content">
                                    <div className="message-text">
                                        {msg.content.split('\n').map((line, i) => (
                                            <span key={i}>
                                                {formatText(line)}
                                                {i < msg.content.split('\n').length - 1 && <br />}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="message-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </div>
                            </motion.div>
                        ))}
                        {isLoading && (
                            <motion.div className="message assistant" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="message-avatar"><Bot size={20} /></div>
                                <div className="message-content">
                                    <div className="typing-indicator"><span></span><span></span><span></span></div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <div className="chat-input-container">
                <form onSubmit={handleSubmit} className="chat-input-form">
                    <input type="text" className="chat-input" placeholder="Ask about Ayurveda..." value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} />
                    <button type="submit" className="chat-send-btn" disabled={!input.trim() || isLoading}>
                        {isLoading ? <Loader className="spinning" size={20} /> : <Send size={20} />}
                    </button>
                </form>
                <p className="chat-disclaimer">Always consult a qualified practitioner for medical advice.</p>
            </div>
        </div>
    );
};

export default ChatBot;
