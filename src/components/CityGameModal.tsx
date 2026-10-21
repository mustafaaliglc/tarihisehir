import React from 'react';
import { CityData } from '../data/turkeyData';
import { City3DGame } from './City3DGame';

interface CityGameModalProps {
  city: CityData;
  onClose: () => void;
  onBadgeEarned: (badge: string) => void;
}

export const CityGameModal: React.FC<CityGameModalProps> = ({ city, onClose, onBadgeEarned }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-50 bg-black overflow-hidden select-none animate-in fade-in duration-200">
      <City3DGame
        city={city}
        onBadgeEarned={onBadgeEarned}
        onClose={onClose}
      />
    </div>
  );
};

