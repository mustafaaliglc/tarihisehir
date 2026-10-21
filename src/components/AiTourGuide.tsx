import React, { useState } from 'react';
import { Send, Sparkles, User, Bot, Compass, HelpCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AiTourGuide: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'Merhaba genç kaşif! Ben Bilge Dede. Türkiye\'nin tarihi yapıları, efsaneleri ve antik şehirleri hakkında bana dilediğin soruyu sorabilirsin. Bugün nereyi keşfetmek istersin?',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const suggestedQuestions = [
    'Göbeklitepe neden insanlık tarihini değiştirdi?',
    'Kızkulesi\'nin efsanesi nedir?',
    'Sümela Manastırı nerede ve nasıl kuruldu?',
    'Efes Antik Kenti hangi medeniyete başkentlik yaptı?',
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: textToSend };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages([...newMessages, { role: 'model', text: data.reply }]);
      } else {
        setMessages([...newMessages, { role: 'model', text: 'Üzgünüm, şu an yanıt üretemedim. Lütfen tekrar dene.' }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'model', text: 'Bağlantı hatası oluştu.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-red-800 to-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base font-bold">Yapay Zeka Bilge Dede</h3>
              <p className="text-xs text-slate-300">Tarih ve Mitoloji Rehberi</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/10 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Canlı Asistan
          </span>
        </div>

        {/* Suggested Quick Questions */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Hızlı Sorular:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs rounded-lg border border-slate-200 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 max-w-2xl ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-red-600 text-white' : 'bg-slate-900 text-amber-400'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-red-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-xs text-slate-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></div>
                <span>Bilge Dede düşünüyor...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Bilge Dede'ye bir tarih sorusu sor (Örn: İstanbul'un fethi nasıl oldu?)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-slate-900 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl transition-all shadow-sm flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
