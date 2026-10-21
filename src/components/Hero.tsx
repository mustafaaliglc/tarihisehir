import React from 'react';
import { Sparkles, MapPin, Trophy, BookOpen } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onGameClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onGameClick }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-red-900 via-red-800 to-slate-900 text-white py-16 px-6">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Yapay Zeka Destekli Tarih ve Coğrafya Serüveni</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Türkiye'nin Tarihi Hazinelerini <span className="text-amber-400">Keşfetmeye Başla!</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
            Öğrenciler için özel olarak hazırlanan bu interaktif haritada illeri gez, antik yapıların sırlarını öğren, yapay zeka bilgi yarışmalarında rozetleri topla ve sınıfının en iyi kaşifi ol!
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              <span>Haritayı İncele</span>
            </button>
            <button
              onClick={onGameClick}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Bilgi Yarışmasına Katıl</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
            <div>
              <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">81</div>
              <div className="text-xs text-slate-400">İl & Bölge</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">50+</div>
              <div className="text-xs text-slate-400">Tarihi Yapı</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">100%</div>
              <div className="text-xs text-slate-400">Eğlenceli Öğrenme</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-slate-300 font-mono ml-auto">Günün Önerilen Rotası</span>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-900/60 rounded-xl p-4 border border-white/10">
                <span className="text-xs font-semibold text-amber-400">Kapadokya / Nevşehir</span>
                <h3 className="text-lg font-bold text-white mt-1">Peri Bacaları & Yer Altı Şehirleri</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Milyonlarca yıllık volkanik tüflerin rüzgarla dansı ve binlerce yıllık gizli yer altı sığınakları öğrencileri bekliyor.
                </p>
              </div>
              <div className="bg-slate-900/60 rounded-xl p-4 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Hemen Öğren</span>
                  <div className="text-sm font-semibold text-white">Göbeklitepe Sırları</div>
                </div>
                <button
                  onClick={onExploreClick}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-xs font-bold rounded-lg text-white transition-colors"
                >
                  Keşfet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
