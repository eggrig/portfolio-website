import React, { useState } from 'react';
import DesktopIcon from '../components/ui/DesktopIcon';
import Window from '../components/ui/Window';
import StartMenu from '../components/ui/StartMenu';

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const openWindow = (windowType: string) => {
    if (!openWindows.includes(windowType)) {
      setOpenWindows([...openWindows, windowType]);
    }
  };

  const closeWindow = (windowType: string) => {
    setOpenWindows(openWindows.filter(window => window !== windowType));
  };

  const getWindowPosition = (index: number) => {
    return {
      x: 100 + (index * 50),
      y: 100 + (index * 50)
    };
  };

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  // Close start menu when clicking outside
  const handleDesktopClick = () => {
    if (isStartMenuOpen) {
      setIsStartMenuOpen(false);
    }
  };

  return (
    <div 
      className="retro-desktop min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 relative overflow-hidden"
      onClick={handleDesktopClick}
    >
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main Desktop Icons */}
      <div className="desktop-icons absolute top-8 left-8 flex flex-col gap-8">
        <DesktopIcon
          icon="📄"
          label="Resume"
          onClick={() => openWindow('resume')}
        />
        <DesktopIcon
          icon="🗂️"
          label="Projects"
          onClick={() => openWindow('projects')}
        />
        <DesktopIcon
          icon="📞"
          label="Contact"
          onClick={() => openWindow('contact')}
        />
      </div>

      {/* Recycle Bin in top right corner */}
      <div className="absolute top-8 right-8">
        <DesktopIcon
          icon="🗑️"
          label="Recycle Bin"
          onClick={() => openWindow('recyclebin')}
        />
      </div>

      {/* Old Stuff folder */}
      <div className="absolute top-48 right-8">
        <DesktopIcon
          icon="📁"
          label="Old Stuff"
          onClick={() => openWindow('oldstuff')}
        />
      </div>

      {/* Settings.ini file */}
      <div className="absolute bottom-32 left-8">
        <DesktopIcon
          icon="⚙️"
          label="Settings.ini"
          onClick={() => openWindow('settings')}
        />
      </div>

      {/* Sticky Note */}
      <div className="absolute top-1/2 right-12 transform -translate-y-1/2">
        <div className="bg-yellow-200 border-2 border-yellow-300 p-3 shadow-lg transform rotate-2 cursor-pointer hover:rotate-1 transition-transform">
          <div className="text-xs text-gray-800 font-mono leading-relaxed">
            <div className="text-center font-bold mb-1">📝 Note</div>
            <div>Need help?</div>
            <div>Click Start!</div>
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu onClose={() => setIsStartMenuOpen(false)} />
      )}

      {/* Taskbar */}
      <div className="taskbar fixed bottom-0 left-0 right-0 h-10 bg-gray-300 border-t-2 border-gray-400 flex items-center px-2 shadow-lg">
        <div 
          className="start-button bg-gray-200 border-2 border-gray-400 px-3 py-1 text-xs font-bold hover:bg-gray-100 cursor-pointer select-none"
          onClick={(e) => {
            e.stopPropagation();
            toggleStartMenu();
          }}
        >
          Start
        </div>
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
                title="Projects - My Work"
                onClose={() => closeWindow('projects')}
                initialPosition={getWindowPosition(index)}
              >
                <div className="retro-content space-y-6">
                  <div className="project-card bg-white border-2 border-gray-400 p-4 shadow-sm">
                    <h3 className="font-bold text-blue-800 mb-2">E-Commerce Platform</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {['React', 'Node.js', 'MongoDB', 'Stripe'].map(tag => (
                        <span key={tag} className="retro-tag bg-green-200 border border-green-400 px-2 py-1 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">
                      Built a full-featured e-commerce platform with user authentication, payment processing, 
                      and admin dashboard. Handles 1000+ daily transactions with 99.9% uptime.
                    </p>
                  </div>
                  
                  <div className="project-card bg-white border-2 border-gray-400 p-4 shadow-sm">
                    <h3 className="font-bold text-blue-800 mb-2">Task Management App</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {['Vue.js', 'Firebase', 'PWA'].map(tag => (
                        <span key={tag} className="retro-tag bg-yellow-200 border border-yellow-400 px-2 py-1 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">
                      Progressive Web App for team collaboration and project management. Features real-time 
                      updates, offline support, and intuitive drag-and-drop interface.
                    </p>
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
                initialPosition={getWindowPosition(index)}
              >
                <div className="retro-content text-center">
                  <div className="text-8xl mb-4">🗑️</div>
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

          case 'settings':
            return (
              <Window
                key="settings"
                title="Notepad - Settings.ini"
                onClose={() => closeWindow('settings')}
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
  );
};

export default Index;
