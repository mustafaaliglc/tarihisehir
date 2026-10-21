/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TurkeyMapModel } from './components/TurkeyMapModel';
import { CityGameModal } from './components/CityGameModal';
import { CityData, TURKEY_CITIES } from './data/turkeyData';
import { Compass, Moon, Sun } from 'lucide-react';

export default function App() {
  // Start on the interactive Turkey map view; launches 3D game when student selects a city
  const [playingCity, setPlayingCity] = useState<CityData | null>(null);

  // Ambiance Black / Dark mode toggle (Requested: top-right ambiance button)
  const [isDarkAmbiance, setIsDarkAmbiance] = useState<boolean>(false);

  // Earned badges tracking
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  const handleBadgeEarned = (badge: string) => {
    if (!earnedBadges.includes(badge)) {
      setEarnedBadges((prev) => [...prev, badge]);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-red-500 selection:text-white transition-colors duration-300 ${
        isDarkAmbiance ? 'bg-[#06080e] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Top Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
          isDarkAmbiance
            ? 'bg-[#090d16]/95 border-slate-800 text-white'
            : 'bg-white/95 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-white shadow-md">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight leading-tight">
                Türkiye Keşif Gezgini
              </h1>
              <p
                className={`text-[11px] font-medium hidden sm:block ${
                  isDarkAmbiance ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                81 İl, Tarihi Yapılar ve 3D Keşif
              </p>
            </div>
          </div>

          {/* Right Header Controls: Ambiance Black / Light Toggle Button (Sağ Üstte) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkAmbiance((prev) => !prev)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold border transition-all cursor-pointer shadow-sm hover:scale-102 ${
                isDarkAmbiance
                  ? 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800 shadow-amber-500/10'
                  : 'bg-slate-950 text-white border-slate-800 hover:bg-slate-900 shadow-slate-950/10'
              }`}
              title={isDarkAmbiance ? 'Gündüz Ambiyansına Dön' : 'Ambiyansı Siyaha Döndür'}
            >
              {isDarkAmbiance ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline">Gündüz Ambiyansı</span>
                  <span className="sm:hidden">Gündüz</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline">Siyah Ambiyans</span>
                  <span className="sm:hidden">Siyah</span>
                </>
              )}
              <span
                className={`w-2 h-2 rounded-full ${
                  isDarkAmbiance ? 'bg-amber-400' : 'bg-slate-400'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main View Area: Direct Turkey Map Model */}
      <main className="flex-1 pb-12">
        <TurkeyMapModel
          onStartGame={(city) => setPlayingCity(city)}
          earnedBadges={earnedBadges}
          isDarkAmbiance={isDarkAmbiance}
          onToggleDark={() => setIsDarkAmbiance((prev) => !prev)}
        />
      </main>

      {/* Active Game Modal for selected city */}
      {playingCity && (
        <CityGameModal
          city={playingCity}
          onClose={() => setPlayingCity(null)}
          onBadgeEarned={handleBadgeEarned}
          isDarkAmbiance={isDarkAmbiance}
          onToggleDark={() => setIsDarkAmbiance((prev) => !prev)}
        />
      )}

      {/* Footer */}
      <footer
        className={`border-t py-5 px-6 text-center text-xs transition-colors duration-300 ${
          isDarkAmbiance
            ? 'bg-[#090d16] border-slate-800 text-slate-400'
            : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Türkiye Keşif Gezgini. Öğrenciler için 81 il ve tarihi yapılar harita oyunu.</p>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Ambiyans:</span>
            <span
              className={`font-semibold ${
                isDarkAmbiance ? 'text-amber-400' : 'text-slate-700'
              }`}
            >
              {isDarkAmbiance ? 'Siyah / Gece Ambiyansı' : 'Aydınlık / Gündüz Ambiyansı'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
