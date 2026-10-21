import React, { useState, useEffect } from 'react';
import { CityData } from '../data/turkeyData';
import { X, Sparkles, Landmark, History, BookOpen, CheckCircle2, AlertCircle, Award } from 'lucide-react';

interface CityDetailModalProps {
  city: CityData;
  onClose: () => void;
  onBadgeEarned: (badge: string) => void;
}

interface AiInfo {
  title?: string;
  history?: string;
  legendOrSecret?: string;
  studentQuiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

export const CityDetailModal: React.FC<CityDetailModalProps> = ({ city, onClose, onBadgeEarned }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [aiInfo, setAiInfo] = useState<AiInfo | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAiCityInfo() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/ai/city-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cityName: city.name, landmarkName: city.landmark }),
        });
        const data = await res.json();
        if (res.ok) {
          setAiInfo(data);
        } else {
          setError(data.error || 'Bilgi yüklenemedi');
        }
      } catch (err: any) {
        setError(err.message || 'Sunucu hatası');
      } finally {
        setLoading(false);
      }
    }
    fetchAiCityInfo();
  }, [city]);

  const handleAnswerCheck = (index: number) => {
    setSelectedOption(index);
    if (aiInfo?.studentQuiz && index === aiInfo.studentQuiz.correctIndex) {
      setIsCorrect(true);
      onBadgeEarned(city.badgeName);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-red-800 to-slate-900 text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              {city.region} Bölgesi · Plaka: {city.plate}
            </span>
            <span className="text-xs text-slate-300 font-mono">{city.century}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {city.name}
          </h2>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mt-1">
            <Landmark className="w-4 h-4 shrink-0" />
            <span>{city.landmark}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Static info */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Şehir Özeti</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{city.shortDesc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-400 block mb-1">İnşa Eden / Medeniyet</span>
                <span className="text-sm font-semibold text-slate-800">{city.builder}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-400 block mb-1">Kazanılacak Rozet</span>
                <span className="text-sm font-semibold text-amber-600 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> {city.badgeName}
                </span>
              </div>
            </div>
          </div>

          {/* AI Dynamic Content Section */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Yapay Zeka Tarih ve Efsane Rehberi</span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs">Yapay zeka bu şehir için tarihi bilgileri derliyor...</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : aiInfo ? (
              <div className="space-y-4">
                {aiInfo.history && (
                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/60">
                    <h5 className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
                      <History className="w-3.5 h-3.5" /> Detaylı Tarihçe
                    </h5>
                    <p className="text-xs text-slate-700 leading-relaxed">{aiInfo.history}</p>
                  </div>
                )}

                {aiInfo.legendOrSecret && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h5 className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-red-600" /> Efsane ve Sırlar
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{aiInfo.legendOrSecret}</p>
                  </div>
                )}

                {/* Mini Quiz */}
                {aiInfo.studentQuiz && (
                  <div className="bg-red-50/60 p-5 rounded-2xl border border-red-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Öğrenci Mini Sınavı</span>
                      <span className="text-xs text-slate-500">Doğru cevapla rozeti kap!</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{aiInfo.studentQuiz.question}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {aiInfo.studentQuiz.options.map((option, idx) => {
                        let btnStyle = "bg-white text-slate-700 border-slate-200 hover:bg-slate-50";
                        if (selectedOption !== null) {
                          if (idx === aiInfo.studentQuiz?.correctIndex) {
                            btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold";
                          } else if (idx === selectedOption) {
                            btnStyle = "bg-red-600 text-white border-red-600 font-bold";
                          } else {
                            btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                          }
                        }
                        return (
                          <button
                            key={idx}
                            disabled={selectedOption !== null}
                            onClick={() => handleAnswerCheck(idx)}
                            className={`px-4 py-2.5 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {selectedOption !== null && idx === aiInfo.studentQuiz?.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isCorrect === true && (
                      <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Tebrikler! Doğru cevap. "{city.badgeName}" rozeti hesabına eklendi!</span>
                      </div>
                    )}
                    {isCorrect === false && (
                      <div className="p-3 bg-red-100 text-red-800 rounded-xl text-xs font-semibold">
                        Yanlış cevap! Doğru cevabı yeşil renkte görebilirsin. Tekrar dene!
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
