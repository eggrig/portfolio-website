import React from 'react';
import Window from './Window';
import Minesweeper from './Minesweeper';

interface MinesweeperWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
  onFocus: () => void;
  isMinimized: boolean;
  isFocused: boolean;
}

const MinesweeperWindow: React.FC<MinesweeperWindowProps> = ({
  onClose,
  onMinimize,
  onRestore,
  onFocus,
  isMinimized,
  isFocused
}) => {
  return (
    <Window
      title="Minesweeper"
      onClose={onClose}
      onMinimize={onMinimize}
      onRestore={onRestore}
      onFocus={onFocus}
      isMinimized={isMinimized}
      isFocused={isFocused}
      initialPosition={{ x: 150, y: 150 }}
      className="w-[320px] h-[420px] overflow-hidden"
    >
      <Minesweeper />
    </Window>
  );
};

export default MinesweeperWindow;
