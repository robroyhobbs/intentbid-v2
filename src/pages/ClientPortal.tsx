import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  ChevronRight,
  X,
  Send,
  Building2,
  Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const CLIENT_DATA = {
  name: 'Apex Federal',
  logo: 'A',
  proposals: [
    {
      id: 'PROP-001',
      title: 'MDOT — Data Analytics Platform',
      status: 'review',
      dueDate: 'Oct 24, 2023',
      progress: 85,
      checkpoints: 1,
      lastUpdated: '2 hours ago'
    },
    {
      id: 'PROP-002',
      title: 'DOD — Cloud Migration Services',
      status: 'generating',
      dueDate: 'Nov 15, 2023',
      progress: 40,
      checkpoints: 0,
      lastUpdated: '1 day ago'
    },
    {
      id: 'PROP-003',
      title: 'HHS — Legacy System Modernization',
      status: 'final',
      dueDate: 'Oct 10, 2023',
      progress: 100,
      checkpoints: 0,
      lastUpdated: '1 week ago'
    }
  ]
};

export function ClientPortal() {
  const [activeReview, setActiveReview] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans relative">
      {/* Subtle Noise Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-[#0A0A0A] flex items-center justify-between px-8 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#111116] border border-white/10 flex items-center justify-center text-white font-mono text-[10px] uppercase tracking-widest font-bold">
            {CLIENT_DATA.logo}
          </div>
          <div>
            <h1 className="text-[10px] uppercase tracking-widest font-bold text-white tracking-tight">{CLIENT_DATA.name}</h1>
            <p className="text-[10px] uppercase tracking-widest text-foreground-muted font-mono">Proposal Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-foreground-muted">
            <span className="w-2 h-2 rounded-none bg-emerald-500"></span>
            System Online
          </div>
          <div className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-white border border-white/20">
            JD
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-12 relative z-10">
        <div className="mb-12">
          <h2 className="text-base uppercase tracking-widest font-bold text-white mb-2">Active Proposals</h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Review drafts, provide feedback, and track the status of your active bids.</p>
        </div>

        <div className="grid gap-4">
          {CLIENT_DATA.proposals.map((proposal) => (
            <div 
              key={proposal.id}
              className="group bg-[#0A0A0A] border border-white/10 p-6 hover:border-white/20 transition-all cursor-pointer flex flex-col md:flex-row md:items-center gap-6"
              onClick={() => proposal.status === 'review' && setActiveReview(proposal.id)}
            >
              {/* Status Icon */}
              <div className="shrink-0 hidden md:flex">
                {proposal.status === 'review' ? (
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Clock size={20} />
                  </div>
                ) : proposal.status === 'generating' ? (
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Terminal size={20} />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={20} />
                  </div>
                )}
              </div>

              {/* Core Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-mono text-foreground-muted uppercase tracking-widest">{proposal.id}</span>
                  {proposal.checkpoints > 0 && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border bg-amber-500/5 text-amber-400 border-amber-500/20">
                      Action Required
                    </span>
                  )}
                </div>
                <h3 className="text-sm uppercase tracking-widest font-bold text-white group-hover:text-[#c084fc] transition-colors">{proposal.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-[10px] font-mono uppercase tracking-widest text-foreground-muted">
                  <span>Due: {proposal.dueDate}</span>
                  <span>•</span>
                  <span>Updated: {proposal.lastUpdated}</span>
                </div>
              </div>

              {/* Progress & Action */}
              <div className="flex items-center gap-8 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                <div className="flex-1 md:w-32">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
                    <span className="text-foreground-muted">Progress</span>
                    <span className="text-white font-mono">{proposal.progress}%</span>
                  </div>
                  <div className="h-1 bg-[#111116] border border-white/10 overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        proposal.status === 'review' ? "bg-amber-400" : 
                        proposal.status === 'generating' ? "bg-blue-400" : "bg-emerald-400"
                      )}
                      style={{ width: `${proposal.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="shrink-0">
                  {proposal.status === 'review' ? (
                    <button className="bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-gray-200 transition-all flex items-center gap-2">
                      Review Draft
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button className="bg-transparent border border-white/10 text-foreground-muted text-[10px] font-bold uppercase tracking-widest py-2 px-6 cursor-not-allowed">
                      {proposal.status === 'generating' ? 'In Progress' : 'Completed'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Review Modal */}
      {activeReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-5xl h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505] shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border bg-amber-500/5 text-amber-400 border-amber-500/20">
                    Checkpoint
                  </span>
                  <span className="text-[10px] font-mono text-foreground-muted uppercase tracking-widest">MDOT — Data Analytics Platform</span>
                </div>
                <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">Review Executive Summary</h2>
              </div>
              <button 
                onClick={() => setActiveReview(null)}
                className="text-foreground-muted hover:text-white transition-colors p-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* Document Preview */}
              <div className="flex-1 bg-[#111116] p-8 overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-white/10">
                <div className="max-w-2xl mx-auto bg-white text-black p-12 min-h-full shadow-2xl font-serif">
                  <h1 className="text-sm uppercase tracking-widest font-bold mb-6">Executive Summary</h1>
                  <p className="mb-4 leading-relaxed">
                    Apex Federal proposes a comprehensive Data Analytics Platform designed specifically for the Maryland Department of Transportation (MDOT). Our solution leverages a zero-trust architecture to ensure the highest levels of security while providing real-time insights into traffic patterns and infrastructure health.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    By implementing our proprietary data ingestion engine, MDOT will reduce reporting latency by 40% and improve predictive maintenance accuracy. Our team brings over 15 years of experience delivering similar platforms to state and federal agencies.
                  </p>
                  <div className="bg-amber-100 border-l-4 border-amber-500 p-4 my-6">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-amber-900 font-sans">
                      <strong>Operator Note:</strong> Please confirm if we should highlight the recent CMMI Level 3 appraisal here or save it for the Team Qualifications section.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Panel */}
              <div className="w-full md:w-80 bg-[#0A0A0A] flex flex-col shrink-0">
                <div className="p-4 border-b border-white/10 bg-[#050505]">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white flex items-center gap-2">
                    <MessageSquare size={14} className="text-[#c084fc]" />
                    Feedback Thread
                  </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#c084fc] font-mono text-[10px] shrink-0">
                      O
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Operator</span>
                        <span className="text-[10px] font-mono text-foreground-muted">2 HOURS AGO</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted leading-relaxed">
                        Draft is ready for your review. Let me know about the CMMI appraisal note.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-white/10 bg-[#050505]">
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your feedback..."
                    className="w-full bg-[#111116] border border-white/10 px-4 py-3 text-[10px] uppercase tracking-widest font-bold font-mono text-white focus:border-[#8b5cf6] outline-none transition-all resize-none mb-3"
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors">
                      Approve Draft
                    </button>
                    <button 
                      disabled={!comment.trim()}
                      className="bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 px-4 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Send Feedback
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
