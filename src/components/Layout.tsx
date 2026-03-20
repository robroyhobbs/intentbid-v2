import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';

export function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#050505] text-foreground relative">
      {/* Global Noise Texture */}
      <div className="pointer-events-none absolute inset-0 z-50 h-full w-full opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}
