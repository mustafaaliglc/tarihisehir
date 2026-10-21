import React from 'react';
import { Compass, MapPin, Gamepad2, Award, MessageSquare } from 'lucide-react';

interface NavbarProps {
  activeTab: 'map' | 'games' | 'chat' | 'badges';
  setActiveTab: (tab: 'map' | 'games' | 'chat' | 'badges') => void;
  earnedBadgesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, earnedBadgesCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand title */}
        <div 
          onClick={() => setActiveTab('map')} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-red-600 transition-colors">
              Türkiye Keşif Gezgini
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">Tarih & Coğrafya Eğitim Oyunu</p>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'map' ? 'bg-red-50 text-red-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Türkiye Haritası</span>
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'games' ? 'bg-red-50 text-red-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Eğitici Oyunlar</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'chat' ? 'bg-red-50 text-red-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Yapay Zeka Bilge Dede</span>
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'badges' ? 'bg-red-50 text-red-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Rozetlerim ({earnedBadgesCount})</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('games')}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm transition-all hover:shadow whitespace-nowrap shrink-0"
          >
            Hemen Yarışmaya Başla!
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar Submenu */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-100 px-2 py-2 bg-slate-50 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === 'map' ? 'text-red-600 font-bold' : ''}`}
        >
          <MapPin className="w-4 h-4" />
          <span>Harita</span>
        </button>
        <button
          onClick={() => setActiveTab('games')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === 'games' ? 'text-red-600 font-bold' : ''}`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Oyunlar</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === 'chat' ? 'text-red-600 font-bold' : ''}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Rehber</span>
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === 'badges' ? 'text-red-600 font-bold' : ''}`}
        >
          <Award className="w-4 h-4" />
          <span>Rozetler</span>
        </button>
      </div>
    </header>
  );
};
