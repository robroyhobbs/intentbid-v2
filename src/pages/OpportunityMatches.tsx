import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Target, AlertTriangle, CheckCircle2, Zap, FileText, Building2, Calendar, DollarSign, ChevronRight, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OpportunityMatches() {
  const { id } = useParams();

  // Mock data for the specific opportunity
  const opportunity = {
    id: id || "1",
    title: "IT Modernization Services",
    agency: "Department of Defense",
    solicitationNumber: "W912HQ-23-R-0001",
    value: "$15M - $25M",
    dueDate: "Oct 15, 2024",
    matchScore: 94,
    status: "Active",
    description: "The Department of Defense is seeking comprehensive IT modernization services to upgrade legacy systems, migrate to cloud infrastructure, and enhance cybersecurity posture across multiple facilities.",
    matchAlerts: [
      { type: 'success', message: 'Strong past performance match in Cloud Migration.' },
      { type: 'warning', message: 'Requires TS/SCI clearance for key personnel.' },
      { type: 'success', message: 'NAICS code 541512 aligns with primary business profile.' }
    ],
    requirements: [
      { name: "Cloud Migration Experience", met: true },
      { name: "Cybersecurity Certification (CMMC Level 3)", met: true },
      { name: "TS/SCI Clearance", met: false },
      { name: "Agile Development Methodology", met: true }
    ]
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link to="/intelligence" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white bg-[#111116] border border-white/10 px-4 py-2 hover:bg-white/[0.02] transition-all w-fit">
            <ArrowLeft size={14} />
            Back to Intelligence
          </Link>
          
          <button className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#c084fc] bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 px-4 py-2 hover:bg-[#8b5cf6]/20 transition-all w-fit">
            <Search size={14} />
            Find More Like This
          </button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                <CheckCircle2 size={12} />
                {opportunity.matchScore}% Match
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#111116] border border-white/10 text-foreground-muted text-[11px] font-bold uppercase tracking-wider">
                {opportunity.status}
              </span>
            </div>
            
            <div>
              <h1 className="text-2xl uppercase tracking-widest font-bold text-white tracking-tight mb-2">{opportunity.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
                <div className="flex items-center gap-1.5">
                  <Building2 size={16} />
                  {opportunity.agency}
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText size={16} />
                  {opportunity.solicitationNumber}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px]">
            <Link 
              to="/proposals/new"
              className="flex items-center justify-center gap-2 w-full bg-white text-black text-[10px] font-bold uppercase tracking-widest py-3 px-4 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Plus size={16} strokeWidth={2.5} />
              Start Proposal
            </Link>
            <button className="flex items-center justify-center gap-2 w-full bg-[#111116] border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest py-3 px-4 hover:bg-white/[0.02] transition-all">
              Save for Later
            </button>
          </div>
        </div>

        {/* Key Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0A0A0A] border border-white/5 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#111116] border border-white/10 flex items-center justify-center">
              <DollarSign size={24} className="text-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-1">Estimated Value</div>
              <div className="text-xl font-mono font-bold text-white">{opportunity.value}</div>
            </div>
          </div>
          
          <div className="bg-[#0A0A0A] border border-white/5 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#111116] border border-white/10 flex items-center justify-center">
              <Calendar size={24} className="text-[#c084fc]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-1">Due Date</div>
              <div className="text-xl font-mono font-bold text-white">{opportunity.dueDate}</div>
            </div>
          </div>
        </div>

        {/* Match Alerts */}
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest font-bold text-white flex items-center gap-2">
            <Zap size={16} className="text-[#8b5cf6]" />
            Match Alerts
          </h2>
          <div className="grid gap-3">
            {opportunity.matchAlerts.map((alert, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex items-start gap-3 p-4 border",
                  alert.type === 'success' 
                    ? "bg-emerald-500/5 border-emerald-500/20" 
                    : "bg-amber-500/5 border-amber-500/20"
                )}
              >
                {alert.type === 'success' ? (
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5" />
                ) : (
                  <AlertTriangle size={18} className="text-amber-400 mt-0.5" />
                )}
                <span className="text-sm text-white">{alert.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-sm uppercase tracking-widest font-bold text-white">Opportunity Overview</h2>
              <div className="bg-[#0A0A0A] border border-white/5 p-6">
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {opportunity.description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-widest font-bold text-white">Key Requirements</h2>
            <div className="bg-[#0A0A0A] border border-white/5 p-6 space-y-4">
              {opportunity.requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3">
                  {req.met ? (
                    <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 border border-white/20 mt-0.5 shrink-0 flex items-center justify-center bg-[#111116]">
                      <span className="text-[8px] text-foreground-muted">✕</span>
                    </div>
                  )}
                  <span className={cn(
                    "text-sm",
                    req.met ? "text-white" : "text-foreground-muted"
                  )}>
                    {req.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
