import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Plus,
  Search,
  Filter,
  X,
  Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for clients
const CLIENTS = [
  {
    id: '1',
    name: 'Acme Corp',
    activeProposals: 3,
    pendingCheckpoints: 1,
    status: 'active',
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Matt Org',
    activeProposals: 1,
    pendingCheckpoints: 0,
    status: 'active',
    lastActive: '1 day ago',
  },
  {
    id: '3',
    name: 'Initech',
    activeProposals: 0,
    pendingCheckpoints: 0,
    status: 'inactive',
    lastActive: '2 weeks ago',
  }
];

export function ManagedDelivery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full relative z-10 max-w-7xl mx-auto w-full">
      {/* Subtle Noise Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header */}
      <div className="flex items-end justify-between mb-8 relative z-10">
        <div>
          <h1 className="text-base uppercase tracking-widest font-bold tracking-tight text-white mb-2">Managed Delivery</h1>
          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted font-mono tracking-tight">OPERATOR.DASHBOARD // CLIENT_LIFECYCLE_MANAGEMENT</p>
        </div>
        <button 
          onClick={() => setIsNewClientModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-none bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-black hover:bg-gray-200 transition-all"
        >
          <Plus size={16} strokeWidth={2.5} />
          New Client Account
        </button>
      </div>

      {/* Metrics Cards - Brutalist Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10 bg-[#0A0A0A] relative z-10 mb-8">
        {[
          { label: 'Active Clients', value: '12', trend: '+2 this month', icon: Building2 },
          { label: 'Active Proposals', value: '28', trend: 'In progress', icon: FileText },
          { label: 'Pending Checkpoints', value: '5', trend: 'Require action', icon: Clock },
          { label: 'Delivered (YTD)', value: '142', trend: 'Completed', icon: CheckCircle2 },
        ].map((metric, idx) => (
          <div key={metric.label} className={`p-6 relative group ${idx !== 3 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}>
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] uppercase tracking-widest text-foreground-muted font-bold">{metric.label}</span>
              <metric.icon size={14} className="text-foreground-subtle" />
            </div>
            <h3 className="text-2xl uppercase tracking-widest font-bold text-white tracking-tight">{metric.value}</h3>
            <div className="mt-6 pt-4 border-t border-dashed border-white/10">
              <p className="text-[10px] font-mono text-foreground-subtle uppercase tracking-wider">
                {metric.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 border border-white/10 bg-[#0A0A0A] flex flex-col relative z-10">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4 bg-[#050505]">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[#c084fc]" />
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-white">Client Directory</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground-muted" />
              <input 
                type="text"
                placeholder="SEARCH CLIENTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-[#111116] border border-white/10 rounded-none pl-9 pr-4 py-1.5 text-[10px] font-mono uppercase text-white placeholder:text-foreground-muted focus:outline-none focus:border-[#8b5cf6] transition-all"
              />
            </div>
            <button className="inline-flex items-center justify-center w-7 h-7 border border-white/10 bg-[#111116] text-foreground hover:bg-white/10 transition-colors">
              <Filter size={12} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#050505] sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted border-b border-white/10">Client Name</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted border-b border-white/10">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted border-b border-white/10">Active Proposals</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted border-b border-white/10">Pending Checkpoints</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted border-b border-white/10">Last Active</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted border-b border-white/10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {CLIENTS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((client) => (
                <tr 
                  key={client.id} 
                  onClick={() => navigate(`/managed-delivery/${client.id}`)}
                  className="group hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#111116] border border-white/10 flex items-center justify-center text-white font-mono text-[10px]">
                        {client.name.charAt(0)}
                      </div>
                      <span className="font-bold text-white text-[10px] uppercase tracking-widest group-hover:text-[#c084fc] transition-colors">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border",
                      client.status === 'active' 
                        ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" 
                        : "bg-white/5 text-foreground-muted border-white/10"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold font-mono text-foreground-muted">{client.activeProposals}</span>
                  </td>
                  <td className="px-6 py-4">
                    {client.pendingCheckpoints > 0 ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border bg-amber-500/5 text-amber-400 border-amber-500/20">
                        {client.pendingCheckpoints} PENDING
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest font-bold font-mono text-foreground-muted">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono uppercase text-foreground-muted">{client.lastActive}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-foreground-muted hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Client Modal */}
      {isNewClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505]">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-[#c084fc]" />
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-white">New Client Account</h2>
              </div>
              <button 
                onClick={() => setIsNewClientModalOpen(false)}
                className="text-foreground-muted hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Client Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Acme Corporation"
                  className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white placeholder:text-foreground-muted focus:outline-none focus:border-[#8b5cf6] transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Primary Contact Email</label>
                <input 
                  type="email" 
                  placeholder="contact@example.com"
                  className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white placeholder:text-foreground-muted focus:outline-none focus:border-[#8b5cf6] transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Industry / Vertical</label>
                <input 
                  type="text" 
                  placeholder="e.g. Defense, Healthcare"
                  className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white placeholder:text-foreground-muted focus:outline-none focus:border-[#8b5cf6] transition-all"
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3 bg-[#050505]">
              <button 
                onClick={() => setIsNewClientModalOpen(false)}
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground-muted hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsNewClientModalOpen(false)}
                className="bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-gray-200 transition-all"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
