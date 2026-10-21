import React from 'react';
import { Compass, Sparkles, MapPin, Gamepad2, Award } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-6">
        {/* Header Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 text-white flex items-center justify-center mx-auto shadow-lg">
          <Compass className="w-9 h-9" />
        </div>

        {/* Title */}
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100 inline-block mb-2">
            Öğrenciler İçin Eğitici Platform
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Türkiye Keşif Gezgini'ne Hoş Geldiniz!
          </h2>
        </div>

        {/* Purpose Statement */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Amacımız
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Bu sitenin amacı; öğrencilerin Türkiye’nin kadim şehirlerini, dünyaca ünlü tarihi yapılarını, antik kentlerini ve efsanelerini sıkılmadan, eğlenceli oyunlar oynayarak keyifle öğrenmelerini sağlamaktır.
          </p>
        </div>

        {/* Quick Instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-100">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900">1. Şehir Seç</span>
            </div>
            <p className="text-xs text-slate-500">Haritadaki dilediğin şehre tıkla.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900">2. Yapıyı Gör</span>
            </div>
            <p className="text-xs text-slate-500">Tarihini ve efsanesini oku.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <Gamepad2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900">3. Oyuna Başla</span>
            </div>
            <p className="text-xs text-slate-500">Soruları çöz, rozetleri topla!</p>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-2xl shadow-lg transition-all hover:shadow-xl active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Tamam</span>
          </button>
        </div>
      </div>
    </div>
  );
};
