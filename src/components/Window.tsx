import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
}

const Window: React.FC<WindowProps> = ({ title, children, onClose, initialPosition = { x: 100, y: 100 } }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={windowRef}
      className="window fixed bg-gray-200 border-2 border-gray-400 shadow-lg z-50"
      style={{
        left: position.x,
        top: position.y,
        minWidth: '400px',
        maxWidth: '600px',
        minHeight: '300px'
      }}
    >
      {/* Title Bar */}
      <div
        className="title-bar bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 flex justify-between items-center cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="font-bold text-sm">{title}</span>
        <div className="flex gap-1">
          <button className="window-button w-4 h-4 bg-gray-300 border border-gray-400 text-xs flex items-center justify-center hover:bg-gray-400">
            <Minus size={8} />
          </button>
          <button className="window-button w-4 h-4 bg-gray-300 border border-gray-400 text-xs flex items-center justify-center hover:bg-gray-400">
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
