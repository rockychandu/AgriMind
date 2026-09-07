import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, Globe } from 'lucide-react';
import { ChatMessage, DiagnosisResult, Language, WeatherData } from '../types';
import { getTranslation } from '../services/i18n';

interface AIChatAssistantProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  latestDiagnosis: DiagnosisResult | null;
  weatherData: WeatherData;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  language,
  setLanguage,
  latestDiagnosis,
  weatherData,
}) => {
  const t = (key: string) => getTranslation(language, key);

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Namaste Farmer! 🌱 I am AgriMind AI. How can I help your crop or farm today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Why are my leaves turning yellow?',
        'Can I spray today?',
        'What should I do after heavy rain?',
        'How can I prevent leaf spot?',
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputText('');

    // Simulate AI response logic
    setTimeout(() => {
      let aiText = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('yellow') || lower.includes('पीले') || lower.includes('పసుపు')) {
        aiText = 'Yellow leaves often indicate Nitrogen deficiency or early fungal infection from high humidity. Make sure the soil is not waterlogged and check for dark spots on the leaf underside.';
      } else if (lower.includes('spray') || lower.includes('छिड़काव') || lower.includes('పిచికారీ')) {
        const rainTomm = weatherData.forecast[1]?.rainProbability || 20;
        if (rainTomm >= 50) {
          aiText = `It is NOT recommended to spray today or tomorrow. High rain chance (${rainTomm}%) will wash away the chemical spray. Wait for the dry window starting Day 3 morning (6:00 AM – 9:00 AM).`;
        } else {
          aiText = 'Weather conditions look good for spraying! The best window is early morning (6:00 AM – 9:00 AM) when wind speed is gentle and sunlight is soft.';
        }
      } else if (lower.includes('rain') || lower.includes('बारिश') || lower.includes('వర్షం')) {
        aiText = 'After heavy rain: 1) Clear clogged field drainage channels immediately, 2) Avoid stepping on wet soil to prevent compaction, and 3) Inspect lower leaves for mud-splash fungal spots.';
      } else if (lower.includes('prevent') || lower.includes('बचाव') || lower.includes('నివారణ')) {
        aiText = 'Top 3 prevention tips: 1) Treat seeds with Trichoderma bio-fungicide before sowing, 2) Maintain proper spacing for sunlight airflow, and 3) Apply balanced NPK fertilizers with potash.';
      } else {
        if (latestDiagnosis) {
          aiText = `Based on your recent ${latestDiagnosis.crop} diagnosis (${latestDiagnosis.diseaseName}): Keep monitoring foliage daily. Follow the 3-step action plan in your report and ensure proper drainage.`;
        } else {
          aiText = 'KisanMitra is here to assist! Upload a crop photo in the Crop Doctor section for instant AI diagnosis and weather-aware advice.';
        }
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Can I spray today?',
          'When should I check my crop again?',
        ]
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-gradient-to-r from-agri-deep to-agri-fresh text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 flex items-center space-x-2.5 border-2 border-white/20 group"
          aria-label="Open AI Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-agri-yellow text-agri-dark flex items-center justify-center font-bold shadow group-hover:rotate-12 transition-transform">
            🌱
          </div>
          <span className="font-extrabold text-sm hidden sm:inline">{t('askKisanMitra')}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-agri-yellow animate-ping"></span>
        </button>
      )}

      {/* Chat Window Modal / Panel */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[540px] z-50 bg-white sm:rounded-3xl shadow-2xl border border-agri-fresh/30 flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Top Header */}
          <div className="bg-agri-dark text-white p-4 flex items-center justify-between border-b border-agri-fresh/20">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-agri-leaf to-agri-fresh flex items-center justify-center text-agri-dark font-bold shadow">
                🌱
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  {t('aiAssistantTitle')}
                  <span className="text-[10px] bg-agri-fresh/20 text-agri-leaf px-2 py-0.5 rounded-full font-mono">
                    24/7 AGRI AI
                  </span>
                </h3>
                <p className="text-[11px] text-agri-leaf">{t('aiSubtitle')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Quick Language Switch inside chat */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-white/10 text-white text-[11px] font-bold px-2 py-1 rounded focus:outline-none"
              >
                <option value="en" className="bg-agri-dark text-white">EN</option>
                <option value="hi" className="bg-agri-dark text-white">हिंदी</option>
                <option value="te" className="bg-agri-dark text-white">తెలుగు</option>
              </select>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-agri-cream/40 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 ${
                    msg.sender === 'user' ? 'bg-agri-deep' : 'bg-agri-fresh text-agri-dark'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-agri-deep text-white rounded-tr-none'
                      : 'bg-white text-agri-dark border border-agri-fresh/20 shadow-sm rounded-tl-none'
                  }`}>
                    <p className="leading-relaxed font-medium">{msg.text}</p>
                    <span className={`text-[9px] block mt-1 ${msg.sender === 'user' ? 'text-agri-leaf' : 'text-gray-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>

                {/* Chips Suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 pl-9">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sug)}
                        className="bg-white hover:bg-agri-fresh/20 text-agri-deep border border-agri-fresh/30 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all shadow-2xs"
                      >
                        💡 {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('chatPlaceholder')}
                className="flex-1 px-3.5 py-2.5 text-xs bg-agri-cream border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-fresh text-agri-dark font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2.5 rounded-xl text-white font-bold transition-all ${
                  inputText.trim() ? 'bg-agri-fresh text-agri-dark hover:bg-agri-leaf' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
