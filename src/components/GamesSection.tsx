import React, { useState } from 'react';
import { TURKEY_CITIES, REGIONS, CityData } from '../data/turkeyData';
import { Trophy, Sparkles, Gamepad2, CheckCircle2, AlertCircle, RefreshCw, Award, ArrowRight } from 'lucide-react';

interface GamesSectionProps {
  onBadgeEarned: (badge: string) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onBadgeEarned }) => {
  const [activeGame, setActiveGame] = useState<'locator' | 'aiQuiz'>('locator');
  
  // Locator Game State
  const [locatorIndex, setLocatorIndex] = useState<number>(0);
  const [locatorScore, setLocatorScore] = useState<number>(0);
  const [locatorAnswered, setLocatorAnswered] = useState<boolean>(false);
  const [locatorSelected, setLocatorSelected] = useState<string | null>(null);

  // AI Quiz State
  const [selectedRegion, setSelectedRegion] = useState<string>('Tümü');
  const [loadingQuiz, setLoadingQuiz] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  // Locator Game Cities (shuffle subset)
  const locatorCities = TURKEY_CITIES;
  const currentTargetCity = locatorCities[locatorIndex % locatorCities.length];

  // Generate 4 options for locator (1 correct, 3 random wrong)
  const getLocatorOptions = () => {
    const wrongOptions = TURKEY_CITIES.filter(c => c.id !== currentTargetCity.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const allOpts = [currentTargetCity, ...wrongOptions].sort(() => 0.5 - Math.random());
    return allOpts;
  };

  const [locatorOptions, setLocatorOptions] = useState<CityData[]>(getLocatorOptions());

  const handleLocatorGuess = (cityId: string) => {
    if (locatorAnswered) return;
    setLocatorAnswered(true);
    const correct = cityId === currentTargetCity.id;
    if (correct) {
      setLocatorScore(prev => prev + 10);
      onBadgeEarned(currentTargetCity.badgeName);
    }
  };

  const nextLocatorQuestion = () => {
    setLocatorAnswered(false);
    setLocatorSelected(null);
    const nextIdx = locatorIndex + 1;
    setLocatorIndex(nextIdx);
    const newTarget = locatorCities[nextIdx % locatorCities.length];
    const wrongOptions = TURKEY_CITIES.filter(c => c.id !== newTarget.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setLocatorOptions([newTarget, ...wrongOptions].sort(() => 0.5 - Math.random()));
  };

  // Start AI Quiz
  const startAiQuiz = async (region: string) => {
    setSelectedRegion(region);
    setLoadingQuiz(true);
    setQuizError(null);
    setQuizFinished(false);
    setCurrentQuizIdx(0);
    setQuizScore(0);
    setQuizSelected(null);

    try {
      const res = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region: region === 'Tümü' ? '' : region }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data) && data.length > 0) {
        setQuizQuestions(data);
      } else {
        setQuizError('Yapay zeka soru üretemedi. Lütfen tekrar deneyin.');
      }
    } catch (err: any) {
      setQuizError(err.message || 'Bağlantı hatası');
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleQuizAnswer = (optIdx: number) => {
    if (quizSelected !== null) return;
    setQuizSelected(optIdx);
    const currentQ = quizQuestions[currentQuizIdx];
    if (optIdx === currentQ.correctAnswer) {
      setQuizScore(prev => prev + 20);
      onBadgeEarned('Tarih Dedektifi');
    }
  };

  const nextQuizQuestion = () => {
    setQuizSelected(null);
    if (currentQuizIdx + 1 < quizQuestions.length) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Game Mode Selector */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setActiveGame('locator')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeGame === 'locator'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Harita Bulmacası (İl Tahmini)</span>
        </button>
        <button
          onClick={() => {
            setActiveGame('aiQuiz');
            if (quizQuestions.length === 0) startAiQuiz('Tümü');
          }}
          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeGame === 'aiQuiz'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Yapay Zeka Tarih Dedektifi</span>
        </button>
      </div>

      {/* Game Mode 1: Locator */}
      {activeGame === 'locator' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Oyun 1: Şehir & Yapı Bulmacası</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Bu Tarihi Yapı Hangi İlimizdedir?</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Puan</span>
              <span className="text-xl font-extrabold text-amber-500 font-mono tabular-nums">{locatorScore}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-red-950 text-white rounded-2xl p-6 text-center space-y-3">
            <span className="text-xs text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-400/20 inline-block">
              İpucu & Efsane
            </span>
            <h4 className="text-lg sm:text-xl font-bold">{currentTargetCity.landmark}</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">{currentTargetCity.shortDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {locatorOptions.map((opt) => {
              let btnStyle = "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200";
              if (locatorAnswered) {
                if (opt.id === currentTargetCity.id) {
                  btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold";
                } else if (locatorSelected === opt.id) {
                  btnStyle = "bg-red-600 text-white border-red-600 font-bold";
                } else {
                  btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                }
              }
              return (
                <button
                  key={opt.id}
                  disabled={locatorAnswered}
                  onClick={() => {
                    setLocatorSelected(opt.id);
                    handleLocatorGuess(opt.id);
                  }}
                  className={`p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt.name}</span>
                  <span className="text-xs opacity-75">Plaka: {opt.plate}</span>
                </button>
              );
            })}
          </div>

          {locatorAnswered && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">
                {locatorSelected === currentTargetCity.id ? '🎉 Tebrikler! Doğru bildin (+10 Puan)' : `❌ Yanlış! Doğru cevap: ${currentTargetCity.name}`}
              </span>
              <button
                onClick={nextLocatorQuestion}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Sonraki Soru</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Game Mode 2: AI Quiz */}
      {activeGame === 'aiQuiz' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Oyun 2: Yapay Zeka Bilgi Yarışması</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Tarih Dedektifi Sınavı</h3>
            </div>
            
            {/* Region Filter for Quiz */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => startAiQuiz(region)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    selectedRegion === region
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {loadingQuiz ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-medium">Yapay zeka {selectedRegion} bölgesi için özgün sorular hazırlıyor...</p>
            </div>
          ) : quizError ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl text-xs flex items-center justify-between">
              <span>{quizError}</span>
              <button
                onClick={() => startAiQuiz(selectedRegion)}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold"
              >
                Tekrar Dene
              </button>
            </div>
          ) : quizFinished ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Yarışma Tamamlandı!</h4>
              <p className="text-sm text-slate-600">Toplam Puanınız: <span className="font-extrabold text-red-600 text-xl font-mono">{quizScore}</span></p>
              <button
                onClick={() => startAiQuiz(selectedRegion)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Yeniden Başla</span>
              </button>
            </div>
          ) : quizQuestions.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>Soru {currentQuizIdx + 1} / {quizQuestions.length}</span>
                <span>Puan: <span className="text-amber-500 font-mono text-sm">{quizScore}</span></span>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {quizQuestions[currentQuizIdx].question}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {quizQuestions[currentQuizIdx].options.map((opt, idx) => {
                  let style = "bg-white hover:bg-slate-50 text-slate-800 border-slate-200";
                  if (quizSelected !== null) {
                    if (idx === quizQuestions[currentQuizIdx].correctAnswer) {
                      style = "bg-emerald-600 text-white border-emerald-600 font-bold";
                    } else if (idx === quizSelected) {
                      style = "bg-red-600 text-white border-red-600 font-bold";
                    } else {
                      style = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                    }
                  }
                  return (
                    <button
                      key={idx}
                      disabled={quizSelected !== null}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {quizSelected !== null && idx === quizQuestions[currentQuizIdx].correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSelected !== null && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold block text-slate-900 mb-1">Bilgi Notu:</span>
                    {quizQuestions[currentQuizIdx].explanation}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={nextQuizQuestion}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <span>{currentQuizIdx + 1 < quizQuestions.length ? 'Sonraki Soru' : 'Sonuçları Gör'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
