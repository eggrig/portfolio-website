import React from 'react';

interface DesktopIconProps {
  icon: string; // Should be a file path to .png or .ico
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div
      className="desktop-icon flex flex-col items-center cursor-pointer p-2 select-none w-20"
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <img
        src={icon}
        alt={label}
        className="w-10 h-10 mb-1"
      />
      <span className="text-[10px] font-[Tahoma] text-white drop-shadow-[1px_1px_0_#000] text-center">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
