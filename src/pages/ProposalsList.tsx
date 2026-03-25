import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Upload, 
  Activity, 
  Building2,
  ChevronRight,
  MoreHorizontal,
  Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProposalsList() {
  const proposals = [
    { id: 'PRP-001', title: 'Department of Defense Cloud Migration', client: 'DoD', status: 'Draft', dueDate: '2026-04-15', daysLeft: 23, score: 85, value: '$12.5M' },
    { id: 'PRP-002', title: 'State Healthcare Portal Modernization', client: 'State of CA', status: 'Review', dueDate: '2026-04-01', daysLeft: 9, score: 92, value: '$8.2M' },
    { id: 'PRP-003', title: 'Financial Services Data Lake', client: 'GlobalBank', status: 'Submitted', dueDate: '2026-03-10', daysLeft: 0, score: 78, value: '$4.1M' },
  ];

  const activities = [
    { id: 1, user: 'Sarah J.', action: 'approved section', target: 'Executive Summary', time: '10:42 AM' },
    { id: 2, user: 'AI Co-Pilot', action: 'generated', target: 'Compliance Matrix', time: '09:15 AM' },
    { id: 3, user: 'Mike T.', action: 'uploaded', target: 'Security Addendum.pdf', time: 'Yesterday' },
    { id: 4, user: 'System', action: 'flagged risk in', target: 'Pricing Volume', time: 'Yesterday' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative z-10">
      {/* Subtle Noise Texture Overlay for the Dashboard */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <h1 className="text-base uppercase tracking-widest font-bold tracking-tight text-white mb-2">Welcome back, Matt</h1>
          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted font-mono tracking-tight">SYSTEM.STATUS: <span className="text-emerald-400">ONLINE</span> // {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-none border border-white/20 bg-[#050505] px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all">
            <Upload size={14} />
            Import RFP
          </button>
          <Link 
            to="/proposals/new" 
            className="inline-flex items-center gap-2 rounded-none bg-white px-5 py-2 text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-black hover:bg-gray-200 transition-all"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Proposal
          </Link>
        </div>
      </div>

      {/* Metrics Row - Technical / Brutalist Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 bg-[#0A0A0A] relative z-10">
        {[
          { label: 'Active Bids', value: '12', trend: '+2 this week', icon: FileText },
          { label: 'Win Rate (YTD)', value: '68%', trend: '+4% vs last year', icon: ArrowUpRight },
          { label: 'Pipeline Value', value: '$42.8M', trend: '+$12.4M this quarter', icon: CheckCircle2 },
        ].map((metric, idx) => (
          <div key={metric.label} className={`p-6 relative group ${idx !== 2 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}>
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

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left: Active Proposals (Takes up 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Terminal size={14} className="text-[#c084fc]" />
              Active Proposals
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted w-3.5 h-3.5" />
                <input 
                  type="text" 
                  placeholder="SEARCH..." 
                  className="w-48 rounded-none border border-white/10 bg-[#050505] pl-9 pr-4 py-1 text-[10px] font-mono uppercase text-foreground placeholder-foreground-muted focus:border-[#8b5cf6] focus:outline-none transition-all"
                />
              </div>
              <button className="inline-flex items-center justify-center w-7 h-7 border border-white/10 bg-[#050505] text-foreground hover:bg-white/10 transition-colors">
                <Filter size={12} />
              </button>
            </div>
          </div>
          
          <div className="border border-white/10 bg-[#0A0A0A] divide-y divide-white/5">
            {proposals.map((proposal) => (
              <Link 
                key={proposal.id}
                to="/workspace"
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors group cursor-pointer"
              >
                {/* ID & Client */}
                <div className="md:w-1/4 shrink-0">
                  <div className="text-[10px] font-mono text-foreground-muted mb-1">{proposal.id}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-white flex items-center gap-2">
                    <Building2 size={14} className="text-foreground-subtle" />
                    {proposal.client}
                  </div>
                </div>

                {/* Title & Status */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-white truncate mb-2 group-hover:text-[#c084fc] transition-colors">{proposal.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border ${
                      proposal.status === 'Draft' ? 'bg-orange-500/5 text-orange-400 border-orange-500/20' :
                      proposal.status === 'Review' ? 'bg-blue-500/5 text-blue-400 border-blue-500/20' :
                      'bg-emerald-500/5 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {proposal.status === 'Draft' && <Clock className="w-2.5 h-2.5" />}
                      {proposal.status === 'Review' && <AlertCircle className="w-2.5 h-2.5" />}
                      {proposal.status === 'Submitted' && <CheckCircle2 className="w-2.5 h-2.5" />}
                      {proposal.status}
                    </span>
                    <span className="text-[10px] font-mono text-foreground-muted">
                      DUE: {proposal.dueDate}
                    </span>
                  </div>
                </div>

                {/* Score & Value */}
                <div className="md:w-1/4 shrink-0 flex items-center justify-between md:justify-end gap-6">
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest">Score</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white">{proposal.score}/100</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest">Value</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white">{proposal.value}</div>
                  </div>
                  <ChevronRight size={16} className="text-foreground-muted group-hover:text-white transition-colors hidden md:block" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Activity & Deadlines (Takes up 1 column) */}
        <div className="space-y-6">
          
          {/* System Log */}
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h2 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white flex items-center gap-2">
                <Activity size={14} className="text-foreground-muted" />
                System Log
              </h2>
            </div>
            <div className="border border-white/10 bg-[#0A0A0A]">
              <div className="divide-y divide-white/5">
                {activities.map((act, i) => (
                  <div key={i} className="flex gap-3 p-3 hover:bg-white/[0.02] transition-colors">
                    <span className="font-mono text-[10px] text-foreground-subtle w-16 shrink-0 pt-0.5">{act.time}</span>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted leading-relaxed">
                      <span className="font-bold text-white">{act.user}</span> {act.action} <span className="text-white">{act.target}</span>
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full p-3 text-[10px] font-bold uppercase tracking-widest text-foreground-muted hover:text-white hover:bg-white/5 transition-colors border-t border-white/10">
                View Full Log
              </button>
            </div>
          </div>

          {/* Quick Help / Resources - Refined */}
          <div className="border border-[#8b5cf6]/30 bg-[#8b5cf6]/5 p-5 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#8b5cf6]"></div>
            <h3 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white mb-2">Knowledge Base Sync</h3>
            <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-4 leading-relaxed">
              AI generation quality depends on your evidence library. Ensure your past performance and corporate context are up to date.
            </p>
            <Link to="/knowledge-base" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold font-bold text-[#c084fc] hover:text-white transition-colors">
              Update Knowledge Base <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
