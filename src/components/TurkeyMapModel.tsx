import React, { useState, useRef } from 'react';
import { TURKEY_CITIES, CityData } from '../data/turkeyData';
import { TURKEY_PROVINCES_GEO, VIEWBOX_WIDTH, VIEWBOX_HEIGHT } from '../data/turkeyGeoPaths';
import { Landmark, Gamepad2, X, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Eye, CheckCircle2, Moon, Sun } from 'lucide-react';

interface TurkeyMapModelProps {
  onStartGame: (city: CityData) => void;
  earnedBadges: string[];
  isDarkAmbiance?: boolean;
  onToggleDark?: () => void;
}

export const TurkeyMapModel: React.FC<TurkeyMapModelProps> = ({
  onStartGame,
  earnedBadges,
  isDarkAmbiance = false,
  onToggleDark,
}) => {
  const [selectedPlate, setSelectedPlate] = useState<string | null>(null);
  const [hoveredPlate, setHoveredPlate] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showAllLabels, setShowAllLabels] = useState<boolean>(true);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Map plate to CityData
  const cityByPlate = React.useMemo(() => {
    const map = new Map<string, CityData>();
    TURKEY_CITIES.forEach((c) => map.set(c.plate, c));
    return map;
  }, []);

  const handleCitySelect = (plate: string) => {
    setSelectedPlate(plate);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.3, 1));
  const handleResetZoom = () => setZoomLevel(1);

  const selectedCity = selectedPlate ? cityByPlate.get(selectedPlate) : null;
  const selectedGeo = selectedPlate ? TURKEY_PROVINCES_GEO.find((g) => g.plate === selectedPlate) : null;
  const hoveredCity = hoveredPlate ? cityByPlate.get(hoveredPlate) : null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-5">
      {/* Map Model Board */}
      <div
        ref={mapContainerRef}
        className={`relative rounded-3xl p-3 sm:p-6 shadow-sm border overflow-hidden flex flex-col justify-between select-none transition-colors duration-300 ${
          isDarkAmbiance
            ? 'bg-gradient-to-b from-[#0b101f] to-[#04060d] border-slate-800/90 shadow-2xl'
            : 'bg-gradient-to-b from-[#f3f6f9] to-[#edf2f7] border-slate-300/80'
        }`}
      >
        {/* Map Header Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-2 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2
              className={`text-xs sm:text-sm font-extrabold tracking-tight ${
                isDarkAmbiance ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              Türkiye İnteraktif Vektör Haritası
            </h2>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border ${
                isDarkAmbiance
                  ? 'text-slate-300 bg-slate-800/90 border-slate-700'
                  : 'text-slate-500 bg-white/90 border-slate-200'
              }`}
            >
              81 İl
            </span>
          </div>

          {/* Controls: Ambiance, Labels toggle & Zoom */}
          <div className="flex items-center gap-2">
            {onToggleDark && (
              <button
                onClick={onToggleDark}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isDarkAmbiance
                    ? 'bg-slate-800 text-amber-300 border-amber-500/30 hover:bg-slate-750'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 shadow-2xs'
                }`}
                title={isDarkAmbiance ? 'Gündüz Ambiyansı' : 'Siyah Ambiyans'}
              >
                {isDarkAmbiance ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                )}
                <span className="hidden sm:inline">
                  {isDarkAmbiance ? 'Gündüz' : 'Siyah'}
                </span>
              </button>
            )}

            <button
              onClick={() => setShowAllLabels((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showAllLabels
                  ? isDarkAmbiance
                    ? 'bg-slate-800 text-slate-100 border-slate-700'
                    : 'bg-white text-slate-700 border-slate-300 shadow-2xs'
                  : isDarkAmbiance
                  ? 'bg-slate-900/80 text-slate-400 border-transparent hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200'
              }`}
              title="Şehir isimlerini aç/kapat"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">İsimler: {showAllLabels ? 'Açık' : 'Kapalı'}</span>
            </button>

            <div
              className={`flex items-center gap-1 p-1 rounded-xl border shadow-2xs ${
                isDarkAmbiance
                  ? 'bg-slate-800/90 border-slate-700'
                  : 'bg-white/95 border-slate-300'
              }`}
            >
              <button
                onClick={handleZoomIn}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  isDarkAmbiance
                    ? 'hover:bg-slate-700 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
                title="Yakınlaştır"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  isDarkAmbiance
                    ? 'hover:bg-slate-700 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
                title="Uzaklaştır"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  isDarkAmbiance
                    ? 'hover:bg-slate-700 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
                title="Sıfırla"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* The Exact Vector Turkey Map */}
        <div className="relative w-full my-auto overflow-hidden rounded-2xl py-2">
          {/* Subtle Sea Labels (Watermarks) strictly inside waters */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none text-slate-400/50 font-black tracking-widest text-xs sm:text-sm select-none">
            K A R A D E N İ Z
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-slate-400/50 font-black tracking-widest text-xs sm:text-sm select-none">
            A K D E N İ Z
          </div>
          <div className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-slate-400/50 font-black tracking-widest text-xs sm:text-sm select-none">
            E G E  D E N İ Z İ
          </div>
          <div className="absolute top-12 left-24 pointer-events-none text-slate-400/40 font-bold tracking-wider text-[10px] select-none">
            MARMARA
          </div>

          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="relative w-full"
          >
            {/* PURE TURKEY 81 PROVINCES SVG - NO OTHER COUNTRIES */}
            <svg
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              className="w-full h-auto drop-shadow-md overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Province Polygons */}
              <g id="turkey-provinces">
                {TURKEY_PROVINCES_GEO.map((geo) => {
                  const isSelected = selectedPlate === geo.plate;
                  const isHovered = hoveredPlate === geo.plate;
                  const city = cityByPlate.get(geo.plate);
                  const hasBadge = city && earnedBadges.includes(city.badgeName);

                  // Color logic:
                  let fill = isDarkAmbiance ? '#1c2d42' : '#3b7794'; // Dark indigo or educational teal
                  if (isSelected) {
                    fill = '#e11d48'; // Bright crimson for selected
                  } else if (isHovered) {
                    fill = isDarkAmbiance ? '#2563eb' : '#26546b'; // Glowing sapphire hover
                  } else if (hasBadge) {
                    fill = '#059669'; // Emerald for badge earned
                  }

                  return (
                    <path
                      key={geo.plate}
                      d={geo.draw}
                      id={`province-${geo.plate}`}
                      fill={fill}
                      stroke={isDarkAmbiance ? (isSelected ? '#f43f5e' : '#334155') : '#ffffff'}
                      strokeWidth={isSelected ? '2.4' : '1.1'}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      className="transition-colors duration-150 cursor-pointer"
                      onClick={() => handleCitySelect(geo.plate)}
                      onMouseEnter={() => setHoveredPlate(geo.plate)}
                      onMouseLeave={() => setHoveredPlate(null)}
                    >
                      <title>{geo.name} ({geo.plate})</title>
                    </path>
                  );
                })}
              </g>

              {/* Province Labels and City Dots */}
              <g id="turkey-labels" className="pointer-events-none">
                {TURKEY_PROVINCES_GEO.map((geo) => {
                  const isSelected = selectedPlate === geo.plate;
                  const isHovered = hoveredPlate === geo.plate;
                  const city = cityByPlate.get(geo.plate);
                  const hasBadge = city && earnedBadges.includes(city.badgeName);

                  const showLabel = isSelected || isHovered || showAllLabels;

                  return (
                    <g key={`marker-${geo.plate}`}>
                      {/* City Center Pin Dot */}
                      <circle
                        cx={geo.cx}
                        cy={geo.cy}
                        r={isSelected ? 5.5 : isHovered ? 4.5 : hasBadge ? 3.5 : 2.5}
                        fill={isSelected ? '#ffffff' : isHovered ? '#fbbf24' : hasBadge ? '#34d399' : (isDarkAmbiance ? '#38bdf8' : '#0f172a')}
                        stroke={isSelected ? '#e11d48' : (isDarkAmbiance ? '#0f172a' : '#ffffff')}
                        strokeWidth={isSelected ? 2 : 1}
                        className="transition-all duration-150"
                      />

                      {/* City Name Text Label */}
                      {showLabel && (
                        <text
                          x={geo.cx}
                          y={geo.cy - 6}
                          textAnchor="middle"
                          fill={isSelected ? (isDarkAmbiance ? '#fda4af' : '#991b1b') : (isDarkAmbiance ? '#f1f5f9' : '#0f172a')}
                          fontSize={isSelected ? '12px' : '9px'}
                          fontWeight={isSelected ? '900' : '700'}
                          filter="url(#text-backdrop)"
                          className="select-none tracking-tight font-sans transition-all"
                          paintOrder="stroke"
                          stroke={isDarkAmbiance ? '#060a12' : '#ffffff'}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {geo.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* POPUP CARD DIRECTLY ANCHORED OVER THE CLICKED CITY */}
            {selectedCity && selectedGeo && (
              <div
                style={{
                  left: `${selectedGeo.pctX}%`,
                  top: `${selectedGeo.pctY}%`,
                  transform:
                    selectedGeo.pctY < 35
                      ? 'translate(-50%, 14px)' // If near top border, open downwards
                      : selectedGeo.pctX < 20
                      ? 'translate(-15%, -105%)' // Near left edge
                      : selectedGeo.pctX > 80
                      ? 'translate(-85%, -105%)' // Near right edge
                      : 'translate(-50%, -105%)', // Default: open directly above city center
                }}
                className={`absolute z-50 w-72 sm:w-84 backdrop-blur-md rounded-2xl shadow-2xl border p-4 sm:p-5 animate-in fade-in zoom-in-95 duration-150 ${
                  isDarkAmbiance
                    ? 'bg-slate-900/98 border-slate-700 text-white'
                    : 'bg-white/98 border-slate-200 text-slate-900'
                }`}
              >
                {/* Pointer arrow notch aiming precisely at city point */}
                <div
                  style={{
                    left:
                      selectedGeo.pctX < 20
                        ? '15%'
                        : selectedGeo.pctX > 80
                        ? '85%'
                        : '50%',
                  }}
                  className={`absolute -translate-x-1/2 w-3.5 h-3.5 rotate-45 ${
                    isDarkAmbiance ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  } ${
                    selectedGeo.pctY < 35
                      ? '-top-2 border-t border-l'
                      : '-bottom-2 border-b border-r'
                  }`}
                />

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlate(null);
                  }}
                  className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    isDarkAmbiance
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Card Content */}
                <div className="space-y-2 pr-6">
                  {/* Badge tags */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                      Plaka: {selectedCity.plate}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isDarkAmbiance
                          ? 'text-slate-300 bg-slate-800'
                          : 'text-slate-500 bg-slate-100'
                      }`}
                    >
                      {selectedCity.region}
                    </span>
                    {earnedBadges.includes(selectedCity.badgeName) && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Rozetli
                      </span>
                    )}
                  </div>

                  {/* City Name */}
                  <h3
                    className={`text-xl font-black leading-tight ${
                      isDarkAmbiance ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {selectedCity.name}
                  </h3>

                  {/* Landmark */}
                  <div
                    className={`flex items-start gap-1.5 text-xs font-bold p-2 rounded-xl ${
                      isDarkAmbiance
                        ? 'bg-slate-800/80 text-amber-400 border border-slate-700/60'
                        : 'text-[#3b7794] bg-[#3b7794]/10'
                    }`}
                  >
                    <Landmark
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isDarkAmbiance ? 'text-amber-400' : 'text-[#3b7794]'
                      }`}
                    />
                    <div>
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-wider ${
                          isDarkAmbiance ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        Özel Tarihi Yapısı
                      </div>
                      <div
                        className={`font-extrabold text-xs sm:text-sm ${
                          isDarkAmbiance ? 'text-slate-100' : 'text-slate-900'
                        }`}
                      >
                        {selectedCity.landmark}
                      </div>
                    </div>
                  </div>

                  {/* Short description / story */}
                  <p
                    className={`text-[11px] sm:text-xs line-clamp-3 leading-relaxed ${
                      isDarkAmbiance ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {selectedCity.shortDesc}
                  </p>
                </div>

                {/* Action button: OYUNA BAŞLA */}
                <div
                  className={`pt-3 mt-3 border-t ${
                    isDarkAmbiance ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartGame(selectedCity);
                    }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-101 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Oyuna Başla!</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info: Legend */}
        <div
          className={`relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t text-xs font-medium ${
            isDarkAmbiance
              ? 'border-slate-800 text-slate-400'
              : 'border-slate-300/80 text-slate-600'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isDarkAmbiance ? 'bg-indigo-500' : 'bg-[#3b7794]'
                }`}
              />
              81 İl (Sadece Türkiye)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Seçili İl
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Tamamlanan / Rozet ({earnedBadges.length})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
