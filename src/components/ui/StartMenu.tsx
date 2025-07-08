
import React from 'react';

interface StartMenuProps {
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const programs = [
    { name: 'My Computer', icon: '💻' },
    { name: 'Recycle Bin', icon: '🗑️' },
    { name: 'Control Panel', icon: '⚙️' },
    { name: 'Notepad', icon: '📝' },
    { name: 'Paint', icon: '🎨' },
    { name: 'Calculator', icon: '🧮' },
    { name: 'Solitaire', icon: '🃏' },
    { name: 'Minesweeper', icon: '💣' },
    { name: 'Internet Explorer', icon: '🌐' },
    { name: 'Windows Media Player', icon: '🎵' },
    { name: 'Command Prompt', icon: '⚫' },
    { name: 'WordPad', icon: '📄' }
  ];

  const handleProgramClick = (programName: string) => {
    console.log(`Opening ${programName}... (nostalgic memories!)`);
    // Programs don't actually open, just for nostalgia
    onClose();
  };

  return (
    <div className="fixed bottom-10 left-2 z-50">
      <div className="bg-gray-200 border-2 border-gray-400 shadow-lg w-64 select-none">
        {/* Start Menu Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-2 text-sm font-bold border-b border-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-lg">👤</span>
            <span>Windows 95</span>
          </div>
        </div>

        {/* Programs List */}
        <div className="py-1">
          {programs.map((program, index) => (
            <div
              key={program.name}
              className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
              onClick={() => handleProgramClick(program.name)}
            >
              <span className="text-base">{program.icon}</span>
              <span>{program.name}</span>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-400 mx-2"></div>

        {/* Bottom Options */}
        <div className="py-1">
          <div
            className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
            onClick={() => handleProgramClick('Settings')}
          >
            <span className="text-base">⚙️</span>
            <span>Settings</span>
          </div>
          <div
            className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
            onClick={() => handleProgramClick('Shut Down')}
          >
            <span className="text-base">🔌</span>
            <span>Shut Down...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;