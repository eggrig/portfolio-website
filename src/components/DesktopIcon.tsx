
import React from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div 
      className="desktop-icon flex flex-col items-center cursor-pointer p-2 rounded hover:bg-white/20 transition-all duration-200 select-none"
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <div className="icon-container mb-2 relative">
        <div className="text-6xl mb-1 drop-shadow-md filter">
          {icon}
        </div>
      </div>
      <span className="text-white text-sm font-bold text-center drop-shadow-lg px-1 py-0.5 rounded bg-black/30">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
