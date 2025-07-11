import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const clickSound = new Audio('/mixkit-clear-mouse-clicks-2997.wav');
  const okClickSound = new Audio('/mixkit-correct-answer-tone-2870.wav');

  // Center the modal on mount
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      });
    }
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
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

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Window */}
      <div
        ref={modalRef}
        className="fixed bg-gray-200 border-2 border-gray-400 shadow-lg z-50"
        style={{
          left: position.x,
          top: position.y,
          width: '400px',
          minHeight: '250px',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Title Bar */}
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 flex justify-between items-center cursor-move select-none border-b border-blue-900"
          onMouseDown={handleMouseDown}
        >
          <span className="font-bold text-sm">About Erik</span>
            <button 
            className="w-4 h-4 bg-gray-300 border border-gray-400 text-xs flex items-center justify-center hover:bg-red-400 text-black font-bold"
            onClick={() => {
                clickSound.play();
                onClose();
            }}
            >
            <X size={8} />
            </button>
        </div>
        
        {/* Content Area */}
        <div className="p-4 bg-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-3 text-blue-800">Welcome to My Portfolio!</h2>
            <p className="text-sm leading-relaxed mb-4">
              Hello! I'm Erik, a passionate full-stack developer with a love for creating 
              innovative web applications and solving complex problems with elegant solutions.
            </p>
            <div className="bg-white border-2 border-gray-300 p-3 mb-4">
              <h3 className="font-bold text-sm mb-2 text-blue-700">About Me</h3>
              <p className="text-xs leading-relaxed text-gray-700">
                I specialize in modern web technologies including React, Node.js, and TypeScript. 
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or enjoying a good cup of coffee while brainstorming the 
                next big idea. I believe in writing clean, maintainable code and creating 
                user experiences that make a difference.
              </p>
            </div>
          </div>
          
          {/* OK Button */}
          <div className="flex justify-end">
                    <button
            className="retro-button bg-gray-200 border-2 border-gray-400 px-6 py-2 text-sm font-bold hover:bg-gray-100 active:border-inset"
            onClick={() => {
                okClickSound.play();
                onClose();
            }}
            >
            OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutModal;