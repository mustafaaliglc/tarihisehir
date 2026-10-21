import React from 'react';
import { Award, Trophy, Star, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface BadgesSectionProps {
  earnedBadges: string[];
}

export const BadgesSection: React.FC<BadgesSectionProps> = ({ earnedBadges }) => {
  const allBadges = [
    { name: 'İstanbul Muhafızı', desc: 'Ayasofya ve Topkapı Sarayı görevlerini tamamla', icon: '🏰' },
    { name: 'Efes Kaşifi', desc: 'İzmir Efes Antik Kenti bulmacasını çöz', icon: '🏛️' },
    { name: 'Ankara Tarihçisi', desc: 'Anıtkabir ve başkent tarihini öğren', icon: '⭐' },
    { name: 'Kapadokya Sihirbazı', desc: 'Peri bacaları ve yer altı şehirlerini keşfet', icon: '🎈' },
    { name: 'Truva Kahramanı', desc: 'Çanakkale Şehitliği ve Truva efsanesini öğren', icon: '🛡️' },
    { name: 'Akdeniz Bilgini', desc: 'Antalya Aspendos tiyatrosunu ziyaret et', icon: '🏛️' },
    { name: 'Karadeniz Kartalı', desc: 'Trabzon Sümela Manastırı sırrını çöz', icon: '⛰️' },
    { name: 'Medeniyet Atası', desc: 'Şanlıurfa Göbeklitepe sınavını geç', icon: '🗿' },
    { name: 'Mevlevi Dostu', desc: 'Konya Mevlana müzesini keşfet', icon: '🕊️' },
    { name: 'Tarih Dedektifi', desc: 'Yapay zeka bilgi yarışmasında puan topla', icon: '🔍' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-red-900 to-slate-900 text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Trophy className="w-3.5 h-3.5" />
            <span>Öğrenci Başarı Paneli</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Kazanılan Rozetler ve Sertifikalar</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Türkiye'nin dört bir yanını keşfettikçe rozetleri topla, bilgi düzeyini artır ve sınıfının baş kaşifi ol!
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-xs text-slate-300 block">Toplam Rozet</span>
          <span className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
            {earnedBadges.length} / {allBadges.length}
          </span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Rozet Koleksiyonu</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBadges.map((badge, idx) => {
            const isEarned = earnedBadges.includes(badge.name);
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${
                  isEarned
                    ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-400/20'
                    : 'bg-slate-50 border-slate-200 opacity-75'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm ${
                  isEarned ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-500'
                }`}>
                  {badge.icon}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900">{badge.name}</h4>
                    {isEarned ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Kazanıldı
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">Kilitli</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Box */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h4 className="text-xl font-bold text-slate-900">Anadolu Tarihi Başarı Sertifikası</h4>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          En az 5 rozet kazandığında Türkiye Keşif Gezgini resmi başarı sertifikanı indirebilir ve arkadaşlarınla paylaşabilirsin!
        </p>
        <div className="pt-2">
          <button
            disabled={earnedBadges.length < 3}
            onClick={() => alert('Tebrikler! Sertifikanız başarıyla oluşturuldu.')}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
              earnedBadges.length >= 3
                ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {earnedBadges.length >= 3 ? 'Sertifikayı İndir (PDF)' : `Sertifika için ${3 - earnedBadges.length} rozet daha kazan`}
          </button>
        </div>
      </div>
    </div>
  );
};
