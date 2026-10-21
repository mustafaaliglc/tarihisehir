/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TurkeyMapModel } from './components/TurkeyMapModel';
import { CityGameModal } from './components/CityGameModal';
import { CityData, TURKEY_CITIES } from './data/turkeyData';
import { Compass } from 'lucide-react';

export default function App() {
  // Directly start in fullscreen 3D game for Istanbul / Galata Tower
  const defaultCity = TURKEY_CITIES.find((c) => c.id === 'istanbul') || TURKEY_CITIES[0];
  const [playingCity, setPlayingCity] = useState<CityData | null>(defaultCity);

  // Earned badges tracking
  const [earnedBadges, setEarnedBadges] = useState<string[]>(['İstanbul Muhafızı']);

  const handleBadgeEarned = (badge: string) => {
    if (!earnedBadges.includes(badge)) {
      setEarnedBadges((prev) => [...prev, badge]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-white shadow-md">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Türkiye Keşif Gezgini
            </h1>
          </div>
        </div>
      </header>

      {/* Main View Area: Direct Turkey Map Model */}
      <main className="flex-1 pb-12">
        <TurkeyMapModel
          onStartGame={(city) => setPlayingCity(city)}
          earnedBadges={earnedBadges}
        />
      </main>

      {/* Active Game Modal for selected city */}
      {playingCity && (
        <CityGameModal
          city={playingCity}
          onClose={() => setPlayingCity(null)}
          onBadgeEarned={handleBadgeEarned}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-5 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Türkiye Keşif Gezgini. Öğrenciler için 81 il ve tarihi yapılar harita oyunu.</p>
        </div>
      </footer>
    </div>
  );
}
