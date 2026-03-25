import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Users, 
  Building2, 
  Save,
  ShieldAlert,
  Palette,
  Globe,
  Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Settings() {
  const [activeTab, setActiveTab] = useState('agency');

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto relative z-10">
      {/* Subtle Noise Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-base uppercase tracking-widest font-bold tracking-tight text-white mb-2">Workspace Settings</h1>
        <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted font-mono tracking-tight">SYSTEM.CONFIG // PREFERENCES</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="space-y-1">
            {[
              { id: 'general', label: 'General', icon: SettingsIcon },
              { id: 'agency', label: 'Agency / MSP', icon: Building2 },
              { id: 'team', label: 'Team & Roles', icon: Users },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all border border-transparent",
                    isActive 
                      ? "bg-[#111116] text-white border-white/10" 
                      : "text-foreground-muted hover:bg-white/[0.02] hover:text-white"
                  )}
                >
                  <tab.icon size={16} className={isActive ? "text-[#c084fc]" : ""} />
                  {tab.label}
                  {isActive && <div className="ml-auto w-1 h-4 bg-[#8b5cf6]" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'agency' && (
            <div className="bg-[#0A0A0A] border border-white/10 p-8">
              <div className="mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white flex items-center gap-2">
                    <Terminal size={14} className="text-[#c084fc]" />
                    Agency / MSP Configuration
                  </h2>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-[#c084fc]">
                    Managed Delivery
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mt-2 leading-relaxed max-w-2xl">
                  Configure the white-label experience for your clients. These settings apply to the external Client Portal where stakeholders review and approve proposals.
                </p>
              </div>

              <div className="space-y-8 max-w-2xl">
                {/* Custom Domain */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <Globe size={16} className="text-foreground-muted" />
                    <h3 className="text-[10px] uppercase tracking-widest font-bold">Custom Domain</h3>
                  </div>
                  <div className="p-6 border border-white/10 bg-[#111116]">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-4">Host the client portal on your own domain (e.g., proposals.youragency.com).</p>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder="proposals.youragency.com"
                        className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white focus:border-[#8b5cf6] outline-none transition-all"
                      />
                      <button className="bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-white/20 transition-all">
                        Verify
                      </button>
                    </div>
                  </div>
                </div>

                {/* Branding */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <Palette size={16} className="text-foreground-muted" />
                    <h3 className="text-[10px] uppercase tracking-widest font-bold">Brand Assets</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo Upload */}
                    <div className="p-6 border border-white/10 bg-[#111116]">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-4">Agency Logo</label>
                      <div className="flex items-center justify-center w-full h-32 border border-dashed border-white/20 bg-[#0A0A0A] hover:border-[#8b5cf6]/50 transition-colors cursor-pointer group">
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 bg-white/5 flex items-center justify-center group-hover:bg-[#8b5cf6]/10 transition-colors">
                            <Plus size={16} className="text-foreground-muted group-hover:text-[#c084fc]" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted group-hover:text-white transition-colors">Upload SVG or PNG</span>
                        </div>
                      </div>
                    </div>

                    {/* Color Picker */}
                    <div className="p-6 border border-white/10 bg-[#111116]">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-4">Primary Brand Color</label>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#8b5cf6] border border-white/20"></div>
                        <div className="flex-1">
                          <input 
                            type="text" 
                            defaultValue="#8b5cf6"
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white focus:border-[#8b5cf6] outline-none transition-all uppercase"
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-foreground-muted mt-4 font-mono uppercase tracking-widest">Used for buttons, active states, and accents in the portal.</p>
                    </div>
                  </div>
                </div>

                {/* Support Contact */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <ShieldAlert size={16} className="text-foreground-muted" />
                    <h3 className="text-[10px] uppercase tracking-widest font-bold">Support Contact</h3>
                  </div>
                  <div className="p-6 border border-white/10 bg-[#111116]">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-4">Where should clients reach out if they have questions about the portal?</p>
                    <input 
                      type="email" 
                      placeholder="support@youragency.com"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white focus:border-[#8b5cf6] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button className="flex items-center gap-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-gray-200 transition-all">
                    <Save size={14} />
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'agency' && (
            <div className="bg-[#0A0A0A] border border-white/10 p-8 flex flex-col items-center justify-center min-h-[400px]">
              <Terminal size={24} className="text-foreground-muted mb-4" />
              <h2 className="text-[10px] uppercase tracking-widest font-bold text-white mb-2">Select a configuration category</h2>
              <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted">Settings module loaded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
