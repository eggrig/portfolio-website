import React, { useState, useEffect } from 'react';
import DesktopIcon from '../components/DesktopIcon';
import Window from '../components/Window';
import StartMenu from '../components/StartMenu';
import AboutModal from '../components/AboutModal';
import ProjectGallery from '../components/ProjectGallery';
import Minesweeper from '../components/Minesweeper';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../components/ui/context-menu';

const clickSound = new Audio('/mixkit-clear-mouse-clicks-2997.wav');
const closeSound = new Audio('/mixkit-mouse-click-close-1113.wav'); 


const iconMap: Record<string, string> = {
  resume: '/icons/briefcase-4.png',
  projects: '/icons/directory_open_file_mydocs_2k-2.png',
  contact: '/icons/phone.webp',
  recyclebin: '/icons/recycle_bin_empty-2.png',
  oldstuff: '/icons/package-1.png',
  settings: '/icons/settings_gear-0.png',
  minesweeper: '/icons/minesweeper-0.png'
};

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const [isAboutOpen, setIsAboutOpen] = useState(true);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

        const wallpapers = [
        '/wallpapers/windowsog.png',
        '/wallpapers/windows95-3.png',
        '/wallpapers/teal.png',
        '/wallpapers/windows95-2.png',
        '/wallpapers/windowsxp.jpg',
        '/wallpapers/cd.png',
        ];

    // Show modal on page load
    useEffect(() => {
        setIsAboutModalOpen(true);
    }, []);

    const openWindow = (windowType: string) => {
    if (!openWindows.includes(windowType)) {
        clickSound.play();
        setOpenWindows([...openWindows, windowType]);
    } else if (minimizedWindows.includes(windowType)) {
        setMinimizedWindows(minimizedWindows.filter(w => w !== windowType));
    }
      setFocusedWindow(windowType);
    };


  const closeWindow = (windowType: string) => {
    setOpenWindows(openWindows.filter(window => window !== windowType));
    closeSound.play();
  };

  const getWindowPosition = (index: number) => {
    return {
      x: 100 + (index * 50),
      y: 100 + (index * 50)
    };
  };

  const toggleStartMenu = () => {
    clickSound.play();
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  // Close start menu when clicking outside
  const handleDesktopClick = () => {
    if (isStartMenuOpen) {
      setIsStartMenuOpen(false);
    }
  };
  
    const handlePropertiesClick = () => {
    setCurrentWallpaper((prev) => (prev + 1) % wallpapers.length);
  };

return (
  <ContextMenu>
    <ContextMenuTrigger>
      <div 
        className={`retro-desktop min-h-screen relative overflow-hidden''}`}
        onClick={handleDesktopClick}
        style={{
          backgroundImage: `url(${wallpapers[currentWallpaper]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100%',
        }}
      >

        {/* === ABOUT MODAL === */}
        <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />

        {/* Desktop Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Desktop Icons */}
      <div className="desktop-icons absolute top-8 left-8 flex flex-col gap-8">
        <DesktopIcon
            icon="/icons/briefcase-4.png"
            label="Resume"
            onClick={() => openWindow('resume')}
        />
        <DesktopIcon
            icon="/icons/directory_open_file_mydocs_2k-2.png"
            label="Projects"
            onClick={() => openWindow('projects')}
        />
        <DesktopIcon
            icon="/icons/phone.webp"
            label="Contact"
            onClick={() => openWindow('contact')}
        />
      </div>

      {/* Recycle Bin in top right corner */}
      <div className="absolute top-8 right-8">
        <DesktopIcon
            icon="/icons/recycle_bin_empty-2.png"
            label="Recycle Bin"
            onClick={() => openWindow('recyclebin')}
        />
      </div>

      {/* Old Stuff folder */}
      <div className="absolute top-72 right-8">
        <DesktopIcon
            icon="/icons/package-1.png"
            label="Old Stuff"
            onClick={() => openWindow('oldstuff')}
        />
      </div>

      {/* Minesweeper */}
      <div className="absolute top-32 right-8">
        <DesktopIcon
        icon="/icons/minesweeper-0.png"
        label="Minesweeper"
        onClick={() => openWindow('minesweeper')}
      />
      </div>

      {/* Project Gallery */}

      {/* Settings.ini file */}
      <div className="absolute bottom-32 left-8">
        <DesktopIcon
            icon="/icons/settings_gear-0.png"
            label="Settings.ini"
            onClick={() => openWindow('settings')}
        />
      </div>

        {/* Sticky Note */}
        <div className="absolute top-1/2 right-12 transform -translate-y-1/2">
        <div className="bg-yellow-200 border border-yellow-400 p-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transform rotate-1 hover:rotate-0 transition-transform w-32">
            <div className="font-pixel text-[8px] text-gray-800 leading-snug">
            <div className="text-center mb-1">NOTE</div>
            <div className="text-center">Click any icon</div>
            <div className="text-center">to open a window!</div>
            </div>
        </div>
        </div>


      {/* Start Menu */}
        {isStartMenuOpen && (
        <StartMenu
            onClose={() => setIsStartMenuOpen(false)}
            openWindow={openWindow} 
        />
        )}
        {/* Taskbar */}
        <div className="taskbar fixed bottom-0 left-0 right-0 h-10 bg-gray-300 border-t-2 border-gray-400 flex items-center px-2 shadow-lg">
        {/* Start button */}
        <div
            className="start-button bg-gray-200 border-2 border-gray-400 px-3 py-1 text-xs font-bold hover:bg-gray-100 cursor-pointer select-none flex items-center gap-2"
            onClick={(e) => {
            e.stopPropagation();
            toggleStartMenu();
            }}
        >
            <img src="/icons/windows-0.png" alt="Windows 95 Start" className="w-4 h-4" />
            Start
        </div>

        {/* Program buttons */}
        {openWindows.slice(0, 2).map((windowType) => (
                        <button
                key={windowType}
                className={`
                start-button border-2 border-gray-400 px-2 py-1 text-xs font-bold flex items-center gap-2 ml-2 
                ${minimizedWindows.includes(windowType) ? 'bg-gray-400' : 'bg-gray-200'}
                overflow-hidden whitespace-nowrap text-ellipsis max-w-[80px] sm:max-w-none
                `}
                onClick={() => {
                if (minimizedWindows.includes(windowType)) {
                    setMinimizedWindows(minimizedWindows.filter(w => w !== windowType));
                } else {
                    setMinimizedWindows([...minimizedWindows, windowType]);
                }
                }}
            >
                <img src={iconMap[windowType]} alt="" className="w-4 h-4" />
                <span className="truncate">
                {windowType.includes('gallery') 
                    ? windowType === 'gallery-ecommerce' 
                    ? 'E-Com'
                    : windowType === 'gallery-taskmanager'
                        ? 'Tasks'
                        : windowType
                    : windowType}
                </span>
            </button>
        ))}

        {/* Overflow */}
        {openWindows.length > 2 && (
            <button
            className="start-button border-2 border-gray-400 px-3 py-1 text-xs font-bold flex items-center gap-2 ml-2 bg-gray-200 hover:bg-gray-300"
            onClick={() => {
            }}
            >
            ...
            </button>
        )}

        <div className="flex-1" />

        <div className="time bg-gray-200 border border-gray-400 px-2 py-1 text-xs">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        </div>

      {/* Windows */}
      {openWindows.map((windowType, index) => {
        switch (windowType) {
          case 'resume':
            return (
              <Window
                 key="resume"
                    title="Resume - My CV"
                    onClose={() => closeWindow('resume')}
                    isMinimized={minimizedWindows.includes('resume')}
                    onMinimize={() => {
                        if (!minimizedWindows.includes('resume')) {
                        setMinimizedWindows([...minimizedWindows, 'resume']);
                        }
                    }}
                    onRestore={() => {
                        setMinimizedWindows(minimizedWindows.filter(w => w !== 'resume'));
                    }}
                    onFocus={() => setFocusedWindow('resume')}
                    isFocused={focusedWindow === 'resume'}       
                    initialPosition={getWindowPosition(index)}
                    >
                                    <div className="retro-content">
                  <h2 className="text-lg font-bold mb-4 text-blue-800">John Developer</h2>
                  <div className="mb-4">
                    <h3 className="font-bold text-sm mb-2">ABOUT ME</h3>
                    <p className="text-sm leading-relaxed">
                      Passionate full-stack developer with 5+ years of experience building web applications. 
                      Specializing in React, Node.js, and modern web technologies. I love creating intuitive 
                      user experiences and solving complex problems with clean, efficient code.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-sm mb-2">EXPERIENCE</h3>
                    <div className="text-sm space-y-2">
                      <div>
                        <strong>Senior Frontend Developer</strong> - TechCorp (2021-Present)
                        <br />
                        <span className="text-gray-600">Built responsive web apps serving 100k+ users</span>
                      </div>
                      <div>
                        <strong>Full Stack Developer</strong> - StartupXYZ (2019-2021)
                        <br />
                        <span className="text-gray-600">Developed MVP and scaled to production</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-2">SKILLS</h3>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'SQL'].map(skill => (
                        <span key={skill} className="retro-tag bg-blue-200 border border-blue-400 px-2 py-1 text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Window>
            );
                    
                                        case 'projects':
            return (
                <Window
                key="projects"
                title="Projects - File Explorer"
                onClose={() => closeWindow('projects')}
                onMinimize={() => {
                    if (!minimizedWindows.includes('projects')) {
                    setMinimizedWindows([...minimizedWindows, 'projects']);
                    }
                }}
                onRestore={() => {
                    setMinimizedWindows(minimizedWindows.filter(w => w !== 'projects'));
                }}
                onFocus={() => setFocusedWindow('projects')}
                isFocused={focusedWindow === 'projects'}
                isMinimized={minimizedWindows.includes('projects')}
                initialPosition={getWindowPosition(index)}
                >
                <div className="retro-content bg-white flex flex-col h-[80vh]">
                    {/* File Explorer Menu Bar */}
                    <div className="bg-gray-200 border-b border-gray-400 p-1 mb-2">
                    <div className="flex gap-4 text-xs">
                        <span className="underline cursor-pointer">File</span>
                        <span className="underline cursor-pointer">Edit</span>
                        <span className="underline cursor-pointer">View</span>
                        <span className="underline cursor-pointer">Help</span>
                    </div>
                    </div>

                    {/* Toolbar */}
                    <div className="bg-gray-200 border border-gray-400 p-2 flex gap-2">
                    <button className="retro-button px-2 py-1 text-xs border border-gray-400 bg-gray-100 hover:bg-gray-200 active:translate-y-px">↑</button>
                    <button className="retro-button px-2 py-1 text-xs border border-gray-400 bg-gray-100 hover:bg-gray-200 active:translate-y-px">✂</button>
                    <button className="retro-button px-2 py-1 text-xs border border-gray-400 bg-gray-100 hover:bg-gray-200 active:translate-y-px">📋</button>
                    <button className="retro-button px-2 py-1 text-xs border border-gray-400 bg-gray-100 hover:bg-gray-200 active:translate-y-px">📁</button>
                    <div className="border-l border-gray-400 mx-2 h-4"></div>
                    <div className="text-xs flex items-center">📁 C:\Projects</div>
                    </div>

                    {/* Project Cards */}
                    <div className="space-y-6">
                    {/* Project 1 */}
                    <div className="flex-1 overflow-auto p-4 space-y-6">
                        <div className="title-bar bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 text-xs font-bold">
                        📂 ECommerce_Platform.exe - Properties
                        </div>
                        <div className="p-4 bg-white">
                        <div className="flex gap-4">
                            <div className="flex-1">
                            <h3 className="font-bold text-blue-800 mb-2 text-sm">E-Commerce Platform</h3>
                            <p className="text-xs text-gray-700 mb-3 leading-relaxed">
                                Full-featured online shopping platform with modern UI/UX, secure payment processing,
                                and comprehensive admin dashboard for inventory management.
                            </p>
                            <div className="mb-3">
                                <div className="text-xs font-bold mb-1">Key Features:</div>
                                <ul className="text-xs text-gray-700 space-y-1">
                                <li>• User authentication & profiles</li>
                                <li>• Real-time inventory tracking</li>
                                <li>• Secure payment integration</li>
                                <li>• Order management system</li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                <span className="retro-tech-button inline-block px-2 py-1 text-xs border border-gray-400 bg-red-200 text-red-800">React</span>
                                <span className="retro-tech-button inline-block px-2 py-1 text-xs border border-gray-400 bg-green-200 text-green-800">Node.js</span>
                                <span className="retro-tech-button inline-block px-2 py-1 text-xs border border-gray-400 bg-blue-200 text-blue-800">MongoDB</span>
                                <span className="retro-tech-button inline-block px-2 py-1 text-xs border border-gray-400 bg-yellow-200 text-yellow-800">Stripe API</span>
                            </div>
                            </div>
                            <div
                            className="w-32 h-24 border-2 border-gray-500 flex items-center justify-center cursor-pointer overflow-hidden"
                            onClick={() => {
                                openWindow('gallery-ecommerce');
                                setFocusedWindow('gallery-ecommerce');
                            }}
                            >
                            <img
                                src="/screenshots/AlderliDashboard.png"
                                alt="E-Commerce Platform"
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="project-window bg-gray-100 border-2 border-gray-400">
                        <div className="title-bar bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 text-xs font-bold">
                        📂 TaskManager_Pro.exe - Properties
                        </div>
                        <div className="p-4 bg-white">
                        <div className="flex gap-4">
                            <div className="flex-1">
                            <h3 className="font-bold text-blue-800 mb-2 text-sm">Task Management Pro</h3>
                            <p className="text-xs text-gray-700 mb-3 leading-relaxed">
                                Progressive Web Application for team collaboration and project tracking with
                                real-time updates, offline support, and intuitive drag-and-drop interface.
                            </p>
                            <div className="mb-3">
                                <div className="text-xs font-bold mb-1">Key Features:</div>
                                <ul className="text-xs text-gray-700 space-y-1">
                                <li>• Real-time collaboration</li>
                                <li>• Drag & drop task boards</li>
                                <li>• Offline functionality</li>
                                <li>• Team performance analytics</li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                <span className="retro-tech-button inline-block px-2 py-1 text-xs border border-gray-400 bg-green-200 text-green-800">Vue.js</span>
                                <span className="retro-tech-button inline-block px-2 py-1 text-xs border border-gray-400 bg-orange-200 text-orange-800">Firebase</span>
                                <span className="retro-tech-button inline-block px-2 py-1 text-xs border border-gray-400 bg-purple-200 text-purple-800">PWA</span>
                                <span className="retro-tech-button inline-block px-2 py-1 text-xs border border-gray-400 bg-cyan-200 text-cyan-800">WebSockets</span>
                            </div>
                            </div>
                            <div
                            className="w-32 h-24 border-2 border-gray-500 flex items-center justify-center cursor-pointer overflow-hidden"
                            onClick={() => {
                                openWindow('gallery-taskmanager');
                                setFocusedWindow('gallery-taskmanager');
                            }}
                            >
                            <img
                                src="/screenshots/AlderliDashboard.png"
                                alt="Task Manager Pro"
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Status Bar */}
                    <div className="bg-gray-200 border-t border-gray-400 p-1 text-xs">
                    <div className="text-xs">2 object(s) selected</div>
                    </div>
                </div>
                </Window>
            );



                    case 'gallery-ecommerce':
            return (
                <Window
                key="gallery-ecommerce"
                title="E-Commerce Platform - Screenshots"
                onClose={() => closeWindow('gallery-ecommerce')}
                onMinimize={() => {
                    if (!minimizedWindows.includes('gallery-ecommerce')) {
                    setMinimizedWindows([...minimizedWindows, 'gallery-ecommerce']);
                    }
                }}
                onRestore={() => {
                    setMinimizedWindows(minimizedWindows.filter(w => w !== 'gallery-ecommerce'));
                }}
                onFocus={() => setFocusedWindow('gallery-ecommerce')}
                isFocused={focusedWindow === 'gallery-ecommerce'}
                isMinimized={minimizedWindows.includes('gallery-ecommerce')}
                initialPosition={getWindowPosition(index)}
                >
                <div className="retro-content bg-white h-full">
                    {/* Gallery Menu Bar */}
                    <div className="bg-gray-200 border-b border-gray-400 p-1 mb-4">
                    <div className="flex gap-4 text-xs">
                        <span className="underline cursor-pointer">File</span>
                        <span className="underline cursor-pointer">Edit</span>
                        <span className="underline cursor-pointer">View</span>
                        <span className="underline cursor-pointer">Tools</span>
                    </div>
                    </div>

                    {/* Toolbar */}
                    <div className="bg-gray-200 border border-gray-400 p-2 mb-4 flex gap-2 items-center">
                    <button className="retro-button px-2 py-1 text-xs">🖼️</button>
                    <button className="retro-button px-2 py-1 text-xs">🔍</button>
                    <button className="retro-button px-2 py-1 text-xs">📊</button>
                    <div className="border-l border-gray-400 mx-2"></div>
                    <div className="text-xs flex items-center">📁 Screenshots\ECommerce</div>
                    </div>

                    {/* Screenshot Gallery */}
                    <ProjectGallery projectType="ecommerce" />

                    {/* Status Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-200 border-t border-gray-400 p-1">
                    <div className="text-xs">4 screenshot(s) • E-Commerce Platform Gallery</div>
                    </div>
                </div>
                </Window>
            );


            case 'gallery-taskmanager':
            return (
                <Window
                key="gallery-taskmanager"
                title="Task Manager Pro - Screenshots"
                onClose={() => closeWindow('gallery-taskmanager')}
                onMinimize={() => {
                    if (!minimizedWindows.includes('gallery-taskmanager')) {
                    setMinimizedWindows([...minimizedWindows, 'gallery-taskmanager']);
                    }
                }}
                onRestore={() => {
                    setMinimizedWindows(minimizedWindows.filter(w => w !== 'gallery-taskmanager'));
                }}
                onFocus={() => setFocusedWindow('gallery-taskmanager')}
                isFocused={focusedWindow === 'gallery-taskmanager'}
                isMinimized={minimizedWindows.includes('gallery-taskmanager')}
                initialPosition={getWindowPosition(index)}
                >
                <div className="retro-content bg-white h-full">
                    {/* Gallery Menu Bar */}
                    <div className="bg-gray-200 border-b border-gray-400 p-1 mb-4">
                    <div className="flex gap-4 text-xs">
                        <span className="underline cursor-pointer">File</span>
                        <span className="underline cursor-pointer">Edit</span>
                        <span className="underline cursor-pointer">View</span>
                        <span className="underline cursor-pointer">Tools</span>
                    </div>
                    </div>

                    {/* Toolbar */}
                    <div className="bg-gray-200 border border-gray-400 p-2 mb-4 flex gap-2 items-center">
                    <button className="retro-button px-2 py-1 text-xs">🖼️</button>
                    <button className="retro-button px-2 py-1 text-xs">🔍</button>
                    <button className="retro-button px-2 py-1 text-xs">📊</button>
                    <div className="border-l border-gray-400 mx-2"></div>
                    <div className="text-xs flex items-center">📁 Screenshots\TaskManager</div>
                    </div>

                    {/* Screenshot Gallery */}
                    <ProjectGallery projectType="taskmanager" />

                    {/* Status Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-200 border-t border-gray-400 p-1">
                    <div className="text-xs">4 screenshot(s) • Task Manager Pro Gallery</div>
                    </div>
                </div>
                </Window>
            );

                    case 'contact':
            return (
                <Window
                key="contact"
                title="Contact - Get In Touch"
                onClose={() => closeWindow('contact')}
                onMinimize={() => {
                    if (!minimizedWindows.includes('contact')) {
                    setMinimizedWindows([...minimizedWindows, 'contact']);
                    }
                }}
                onRestore={() => {
                    setMinimizedWindows(minimizedWindows.filter(w => w !== 'contact'));
                }}
                onFocus={() => setFocusedWindow('contact')}
                isFocused={focusedWindow === 'contact'}
                isMinimized={minimizedWindows.includes('contact')}
                initialPosition={getWindowPosition(index)}
                >
                <div className="retro-content">
                    <h2 className="text-lg font-bold mb-6 text-blue-800">Let's Connect!</h2>

                    <div className="space-y-4">
                    <div className="contact-item bg-white border-2 border-gray-400 p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                        <span className="text-2xl">📧</span>
                        <div>
                            <strong className="text-sm">Email</strong>
                            <div className="text-sm text-blue-600">john.developer@email.com</div>
                        </div>
                        </div>
                    </div>

                    <div className="contact-item bg-white border-2 border-gray-400 p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                        <span className="text-2xl">📱</span>
                        <div>
                            <strong className="text-sm">Phone</strong>
                            <div className="text-sm text-blue-600">+1 (555) 123-4567</div>
                        </div>
                        </div>
                    </div>

                    <div className="contact-item bg-white border-2 border-gray-400 p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                        <span className="text-2xl">🌐</span>
                        <div>
                            <strong className="text-sm">LinkedIn</strong>
                            <div className="text-sm text-blue-600">linkedin.com/in/johndeveloper</div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="mt-6 p-3 bg-yellow-100 border-2 border-yellow-400">
                    <p className="text-sm">
                        💡 <strong>Available for freelance projects!</strong><br />
                        Let's discuss your next big idea.
                    </p>
                    </div>
                </div>
                </Window>
            );


            case 'recyclebin':
            return (
                <Window
                key="recyclebin"
                title="Recycle Bin"
                onClose={() => closeWindow('recyclebin')}
                onMinimize={() => {
                    if (!minimizedWindows.includes('recyclebin')) {
                    setMinimizedWindows([...minimizedWindows, 'recyclebin']);
                    }
                }}
                onRestore={() => {
                    setMinimizedWindows(minimizedWindows.filter(w => w !== 'recyclebin'));
                }}
                onFocus={() => setFocusedWindow('recyclebin')}
                isFocused={focusedWindow === 'recyclebin'}
                isMinimized={minimizedWindows.includes('recyclebin')}
                initialPosition={getWindowPosition(index)}
                >
                <div className="retro-content text-center">
                        <img
                        src="/icons/recycle_bin_empty-2.png"
                        alt="Recycle Bin"
                        className="w-16 h-16 mx-auto mb-4"
                        />
                    <h2 className="text-lg font-bold mb-4 text-blue-800">Recycle Bin</h2>
                    <p className="text-sm text-gray-600 mb-6">
                    The Recycle Bin is empty.
                    </p>
                    <div className="bg-gray-100 border-2 border-gray-300 p-4 text-left">
                    <div className="text-xs text-gray-700">
                        <div className="mb-2"><strong>Objects:</strong> 0</div>
                        <div><strong>Size:</strong> 0 bytes</div>
                    </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                    Drag files here to delete them, or right-click to empty the bin.
                    </div>
                </div>
                </Window>
            );

            case 'oldstuff':
  return (
    <Window
      key="oldstuff"
      title="Old Stuff"
      onClose={() => closeWindow('oldstuff')}
      onMinimize={() => {
        if (!minimizedWindows.includes('oldstuff')) {
          setMinimizedWindows([...minimizedWindows, 'oldstuff']);
        }
      }}
      onRestore={() => {
        setMinimizedWindows(minimizedWindows.filter(w => w !== 'oldstuff'));
      }}
        onFocus={() => setFocusedWindow('oldstuff')}
        isFocused={focusedWindow === 'oldstuff'}
      isMinimized={minimizedWindows.includes('oldstuff')}
      initialPosition={getWindowPosition(index)}
    >
      <div className="retro-content">
        <div className="text-6xl mb-4 text-center">📁</div>
        <h2 className="text-lg font-bold mb-4 text-blue-800 text-center">Old Stuff</h2>

        <div className="space-y-3">
          <div className="bg-white border-2 border-gray-300 p-3 flex items-center gap-3 hover:bg-gray-50">
            <span className="text-2xl">💾</span>
            <div>
              <div className="text-sm font-bold">backup_2019.zip</div>
              <div className="text-xs text-gray-600">Modified: 3/15/2019</div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 p-3 flex items-center gap-3 hover:bg-gray-50">
            <span className="text-2xl">📷</span>
            <div>
              <div className="text-sm font-bold">vacation_photos</div>
              <div className="text-xs text-gray-600">Folder • 247 items</div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 p-3 flex items-center gap-3 hover:bg-gray-50">
            <span className="text-2xl">🎵</span>
            <div>
              <div className="text-sm font-bold">mixtape_vol1.mp3</div>
              <div className="text-xs text-gray-600">4.2 MB • Audio file</div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 p-3 flex items-center gap-3 hover:bg-gray-50">
            <span className="text-2xl">📄</span>
            <div>
              <div className="text-sm font-bold">resume_old.doc</div>
              <div className="text-xs text-gray-600">The one before the redesign</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-yellow-100 border-2 border-yellow-300 text-center">
          <p className="text-xs">
            💭 <em>Ah, the memories... Maybe I'll organize this someday.</em>
          </p>
        </div>
      </div>
    </Window>
  );

case 'minesweeper':
  return (
    <Window
      key="minesweeper"
      title="Minesweeper"
      onClose={() => closeWindow('minesweeper')}
      isMinimized={minimizedWindows.includes('minesweeper')}
      onMinimize={() => setMinimizedWindows([...minimizedWindows, 'minesweeper'])}
      onRestore={() => setMinimizedWindows(minimizedWindows.filter(w => w !== 'minesweeper'))}
      onFocus={() => setFocusedWindow('minesweeper')}
      isFocused={focusedWindow === 'minesweeper'}
      initialPosition={getWindowPosition(index)}
      noMinSize
    >
      <Minesweeper />
    </Window>
  );

                case 'settings':
  return (
    <Window
      key="settings"
      title="Notepad - Settings.ini"
      onClose={() => closeWindow('settings')}
      onMinimize={() => {
        if (!minimizedWindows.includes('settings')) {
          setMinimizedWindows([...minimizedWindows, 'settings']);
        }
      }}
      onRestore={() => {
        setMinimizedWindows(minimizedWindows.filter(w => w !== 'settings'));
      }}
        onFocus={() => setFocusedWindow('settings')}
        isFocused={focusedWindow === 'settings'}
      isMinimized={minimizedWindows.includes('settings')}
      initialPosition={getWindowPosition(index)}
    >
      <div className="retro-content">
        <div className="bg-white border-2 border-gray-300 p-4 font-mono text-xs min-h-[200px]">
          <div className="text-green-600 mb-2"># System Configuration File</div>
          <div className="text-green-600 mb-4"># Last modified: 1995-08-24</div>

          <div className="mb-3">
            <div className="text-blue-600 font-bold">[Display]</div>
            <div>Resolution=800x600</div>
            <div>ColorDepth=256</div>
            <div>Wallpaper=C:\WINDOWS\clouds.bmp</div>
          </div>

          <div className="mb-3">
            <div className="text-blue-600 font-bold">[Sound]</div>
            <div>Enabled=True</div>
            <div>Volume=75</div>
            <div>StartupSound=tada.wav</div>
          </div>

          <div className="mb-3">
            <div className="text-blue-600 font-bold">[Desktop]</div>
            <div>ShowClock=True</div>
            <div>AutoArrange=False</div>
            <div>GridSnap=True</div>
          </div>

          <div className="mb-3">
            <div className="text-blue-600 font-bold">[Network]</div>
            <div>DialUp=True</div>
            <div>ISP=LocalNet</div>
            <div>ModemSpeed=56k</div>
          </div>

          <div className="text-green-600 mt-4"># Do not edit unless you know what you're doing!</div>
        </div>
      </div>
    </Window>
  );
          default:
            return null;
        }
      })}
        </div>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-48 bg-gray-200 border-2 border-gray-400 shadow-lg">
          <ContextMenuItem className="text-xs hover:bg-blue-600 hover:text-white cursor-pointer px-2 py-1 flex items-center gap-2">
            New Folder
          </ContextMenuItem>

          <ContextMenuItem className="text-xs hover:bg-blue-600 hover:text-white cursor-pointer px-2 py-1 flex items-center gap-2">
            New Document
          </ContextMenuItem>

          <ContextMenuSeparator className="h-px bg-gray-400 my-1" />

          <ContextMenuItem className="text-xs hover:bg-blue-600 hover:text-white cursor-pointer px-2 py-1 flex items-center gap-2">
            Paste
          </ContextMenuItem>

          <ContextMenuItem className="text-xs hover:bg-blue-600 hover:text-white cursor-pointer px-2 py-1 flex items-center gap-2">
            Paste Shortcut
          </ContextMenuItem>

          <ContextMenuSeparator className="h-px bg-gray-400 my-1" />

          <ContextMenuItem className="text-xs hover:bg-blue-600 hover:text-white cursor-pointer px-2 py-1 flex items-center gap-2">
            Refresh
          </ContextMenuItem>

          <ContextMenuItem className="text-xs hover:bg-blue-600 hover:text-white cursor-pointer px-2 py-1 flex items-center gap-2">
            Arrange Icons
          </ContextMenuItem>

          <ContextMenuItem className="text-xs hover:bg-blue-600 hover:text-white cursor-pointer px-2 py-1 flex items-center gap-2">
            Line up Icons
          </ContextMenuItem>

          <ContextMenuSeparator className="h-px bg-gray-400 my-1" />

          <ContextMenuItem
            className="text-xs hover:bg-blue-600 hover:text-white cursor-pointer px-2 py-1 flex items-center gap-2"
            onClick={handlePropertiesClick}
          >
            Properties
          </ContextMenuItem>
        </ContextMenuContent>

  </ContextMenu>

  
  );
};

export default Index;