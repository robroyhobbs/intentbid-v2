import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Bell, User, LogOut } from 'lucide-react';

export function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#050505] text-foreground relative">
      {/* Global Noise Texture */}
      <div className="pointer-events-none absolute inset-0 z-50 h-full w-full opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 bg-[#050505] flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-xs font-medium text-foreground-muted">IDD Active</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-foreground-muted hover:text-white transition-colors relative">
              <Bell size={18} />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#8b5cf6]" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#2c2832] border border-white/10 flex items-center justify-center text-foreground-muted">
                <User size={16} />
              </div>
              <button className="flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-white transition-colors">
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
