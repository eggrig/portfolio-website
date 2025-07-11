import React from 'react';

const errorSound = new Audio('/mixkit-click-error-1110.wav');

interface StartMenuProps {
  onClose: () => void;
  openWindow: (type: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, openWindow }) => {
  const programs = [
    { name: 'My Computer', icon: '/icons/computer_explorer-2.png' },
    { name: 'Recycle Bin', icon: '/icons/recycle_bin_empty-2.png' },
    { name: 'Control Panel', icon: '/icons/directory_control_panel-4.png' },
    { name: 'Notepad', icon: '/icons/write_wordpad-1.png' },
    { name: 'MIDI playback', icon: '/icons/midi_bl-2.png' },
    { name: 'Clock', icon: '/icons/clock-1.png' },
    { name: 'Solitaire', icon: '/icons/game_solitaire-0.png' },
    { name: 'Minesweeper', icon: '/icons/minesweeper-0.png' },
    { name: 'Internet Explorer', icon: '/icons/msie2-1.png' },
    { name: 'Windows Media Player', icon: '/icons/multimedia-2.png' },
    { name: 'Disk Cleanup', icon: '/icons/clean_drive-1.png' },
    { name: 'MSN', icon: '/icons/msn2-0.png' }
  ];

const handleProgramClick = (programName: string) => {
  if (programName === 'Settings') {
    openWindow('settings');
    onClose();
  } else if (programName === 'Recycle Bin') {
    openWindow('recyclebin');
    onClose();
  } else if (programName === 'Minesweeper') {
    openWindow('minesweeper');
    onClose();
  } else {
    console.log(`Opening ${programName}... (nostalgic memories!)`);
    errorSound.play();
    onClose();
  }
};

  return (
    <div className="fixed bottom-10 left-2 z-50">
      <div className="flex bg-gray-200 border-2 border-gray-400 shadow-lg select-none">
        <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white w-10 flex flex-col items-center justify-between py-2">
          <img
            src="/icons/windows-0.png"
            alt="Windows 95 Logo"
            className="w-8 h-auto transform -rotate-90"
          />
        </div>

        <div className="w-64">
          <div className="py-1">
            {programs.map((program) => (
              <div
                key={program.name}
                className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                onClick={() => handleProgramClick(program.name)}
              >
                <img src={program.icon} alt={program.name} className="w-4 h-4" />
                <span>{program.name}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-400 mx-2"></div>

          <div className="py-1">
            <div
              className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
              onClick={() => handleProgramClick('Settings')}
            >
              <img src="/icons/settings_gear-0.png" alt="Settings icon" className="w-4 h-4" />
              <span>Settings</span>
            </div>
            <div
              className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
              onClick={() => handleProgramClick('Shut Down')}
            >
              <img src="/icons/shut_down.png" alt="Shut Down icon" className="w-4 h-4" />
              <span>Shut Down...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
