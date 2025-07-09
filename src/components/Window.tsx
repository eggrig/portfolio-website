import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;   
  onRestore: () => void; 
  isMinimized: boolean;
  onFocus: () => void;
  isFocused: boolean;    
  initialPosition?: { x: number; y: number };
}

const Window: React.FC<WindowProps> = ({
  title,
  children,
  onClose,
  onMinimize,   
  onRestore,    
  isMinimized,
  onFocus,
  isFocused, 
  initialPosition = { x: 100, y: 100 }
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false); 
  const [isMinimizing, setIsMinimizing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMaximized || isMinimized) return;

    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging && !isMaximized && !isMinimized) {
        const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
        const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

        setPosition({
          x: clientX - dragOffset.x,
          y: clientY - dragOffset.y
        });
      }
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, dragOffset, isMaximized, isMinimized]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMinimizeClick = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      setIsMinimizing(false);
      onMinimize();
    }, 300);
  };

  if (isMinimized && !isMinimizing) return null;

  return (
    <div
      ref={windowRef}
      onMouseDown={() => onFocus()}
      onTouchStart={() => onFocus()}
      className={`window fixed bg-gray-200 border-2 border-gray-400 shadow-lg z-50 ${
        isMinimizing ? 'animate-minimize' : ''
      }`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : 'auto',
        height: isMaximized ? '100vh' : 'auto',
        minWidth: isMaximized ? '100%' : '400px',
        minHeight: isMaximized ? '100%' : '300px',
        zIndex: isMinimized ? 0 : isFocused ? 50 : 40
      }}
    >
      {/* Title Bar */}
      <div
        className="title-bar bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 flex justify-between items-center cursor-move select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <span className="font-bold text-sm">{title}</span>
        <div className="flex gap-1">
          <button
            className="window-button w-4 h-4 bg-gray-300 border border-gray-400 text-xs flex items-center justify-center hover:bg-gray-400"
            onClick={handleMinimizeClick} 
          >
            <Minus size={8} />
          </button>
          <button
            className="window-button w-4 h-4 bg-gray-300 border border-gray-400 text-xs flex items-center justify-center hover:bg-gray-400"
            onClick={toggleMaximize}
          >
            <Square size={6} />
          </button>
          <button
            className="window-button w-4 h-4 bg-gray-300 border border-gray-400 text-xs flex items-center justify-center hover:bg-red-400"
            onClick={onClose}
          >
            <X size={8} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-gray-200 min-h-[250px] overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;
