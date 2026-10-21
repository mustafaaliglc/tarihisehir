import React, { useState } from 'react';
import { TURKEY_CITIES, REGIONS, CityData } from '../data/turkeyData';
import { MapPin, Search, Compass, Sparkles, Building, Landmark } from 'lucide-react';

interface TurkeyMapProps {
  onSelectCity: (city: CityData) => void;
}

export const TurkeyMap: React.FC<TurkeyMapProps> = ({ onSelectCity }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCities = TURKEY_CITIES.filter((city) => {
    const matchesRegion = selectedRegion === 'Tümü' || city.region === selectedRegion;
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          city.landmark.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Search and Region Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedRegion === region
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="İl veya tarihi yapı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Interactive Map Visual Area */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden min-h-[420px] sm:min-h-[500px] flex flex-col justify-between">
        {/* Background contour lines / grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/30 text-red-300 text-xs font-semibold border border-red-500/30 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>İnteraktif Türkiye Haritası</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Bir Şehir Seç ve Tarihini Keşfet</h2>
          </div>
          <div className="text-xs text-slate-300 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            Haritada <span className="text-amber-400 font-bold">{filteredCities.length}</span> il listeleniyor
          </div>
        </div>

        {/* Visual Map Pins Overlay */}
        <div className="relative w-full h-[320px] sm:h-[380px] my-auto">
          {/* Stylized Anatolia Map Background Silhouette */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <svg viewBox="0 0 1000 500" className="w-full h-full text-slate-400 fill-current">
              <path d="M100,200 C200,100 400,80 600,120 C800,160 900,250 850,320 C800,390 600,420 400,400 C200,380 50,300 100,200 Z" />
            </svg>
          </div>

          {filteredCities.map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectCity(city)}
              style={{ left: `${city.x}%`, top: `${city.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
              title={`${city.name} - ${city.landmark}`}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-amber-400/30 animate-ping"></span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform border-2 border-white">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900/95 text-white text-xs px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap border border-slate-700 z-30 pointer-events-none">
                  <div className="font-bold text-amber-400">{city.name} ({city.plate})</div>
                  <div className="text-slate-300">{city.landmark}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
          <span>💡 İpucu: Haritadaki işaretçilere tıklayarak şehirlerin sırlarını öğrenin.</span>
          <span className="flex items-center gap-1 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" /> Yapay zeka ile desteklenmektedir
          </span>
        </div>
      </div>

      {/* City Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Şehirler ve Tarihi Yapılar</h3>
          <span className="text-xs text-slate-500">{filteredCities.length} sonuç gösteriliyor</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              onClick={() => onSelectCity(city)}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between hover:border-red-500/50"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
                    {city.region} · {city.plate}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{city.century}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  {city.name}
                </h4>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mt-1">
                  <Landmark className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{city.landmark}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {city.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Rozet: {city.badgeName}</span>
                <span className="text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Keşfet &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
