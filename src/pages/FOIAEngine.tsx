import React, { useState } from 'react';
import { FileText, ShieldCheck, Globe, Building2, Mail, FileOutput, Clock, CheckCircle2, AlertCircle, Lock, ExternalLink, MoreHorizontal, Filter, Download, Send, Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data for FOIA Requests
const FOIA_REQUESTS = [
  { 
    id: 'REQ-0842', 
    agency: 'California Dept of Transportation', 
    state: 'CA', 
    status: 'completed', 
    dateSent: 'Oct 12, 2025', 
    dueDate: 'Oct 22, 2025',
    docs: 3, 
    title: 'District 4 Highway Maintenance Contract' 
  },
  { 
    id: 'REQ-0843', 
    agency: 'Texas Dept of Public Safety', 
    state: 'TX', 
    status: 'in_progress', 
    dateSent: 'Oct 15, 2025', 
    dueDate: 'Oct 29, 2025',
    docs: 0, 
    title: 'Border Security Tech Procurement' 
  },
  { 
    id: 'REQ-0844', 
    agency: 'Florida Dept of Education', 
    state: 'FL', 
    status: 'sent', 
    dateSent: 'Oct 18, 2025', 
    dueDate: 'Nov 02, 2025',
    docs: 0, 
    title: 'Statewide Assessment Software Pricing' 
  },
  { 
    id: 'REQ-0845', 
    agency: 'NY State Office of General Services', 
    state: 'NY', 
    status: 'action_needed', 
    dateSent: 'Oct 05, 2025', 
    dueDate: 'Oct 15, 2025',
    docs: 0, 
    title: 'Cloud Infrastructure RFP Responses' 
  },
  { 
    id: 'REQ-0846', 
    agency: 'Virginia Dept of Health', 
    state: 'VA', 
    status: 'completed', 
    dateSent: 'Sep 28, 2025', 
    dueDate: 'Oct 12, 2025',
    docs: 12, 
    title: 'Public Health Data Analytics Platform' 
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
      return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Completed' };
    case 'in_progress':
      return { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', label: 'In Progress' };
    case 'sent':
      return { icon: Send, color: 'text-foreground-muted', bg: 'bg-white/5', border: 'border-white/10', label: 'Sent' };
    case 'action_needed':
      return { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Action Needed' };
    default:
      return { icon: Clock, color: 'text-foreground-muted', bg: 'bg-white/5', border: 'border-white/10', label: 'Unknown' };
  }
};

export function FOIAEngine() {
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex gap-5 items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#8b5cf6] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] shrink-0">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-display font-bold text-foreground">FOIA Engine</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#c084fc] text-white text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                Pro
              </span>
            </div>
            <p className="text-foreground-muted text-sm md:text-base">Automate Sunshine Law requests to acquire incumbent contracts and pricing.</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowNewRequestModal(true)}
          className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-bold py-2.5 px-5 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 shrink-0"
        >
          <Plus className="w-5 h-5" />
          New Request
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-background-secondary border border-white/5 hover:border-white/10 transition-colors rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground-muted mb-0.5">Active Requests</p>
            <p className="text-2xl font-bold text-foreground">4</p>
          </div>
        </div>
        <div className="bg-background-secondary border border-white/5 hover:border-white/10 transition-colors rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground-muted mb-0.5">Action Needed</p>
            <p className="text-2xl font-bold text-foreground">1</p>
          </div>
        </div>
        <div className="bg-background-secondary border border-white/5 hover:border-white/10 transition-colors rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground-muted mb-0.5">Completed</p>
            <p className="text-2xl font-bold text-foreground">2</p>
          </div>
        </div>
        <div className="bg-background-secondary border border-white/5 hover:border-white/10 transition-colors rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#c084fc]" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground-muted mb-0.5">Docs Acquired</p>
            <p className="text-2xl font-bold text-foreground">15</p>
          </div>
        </div>
      </div>

      {/* Full Width Table */}
      <div className="bg-background-secondary border border-white/5 hover:border-white/10 transition-colors rounded-2xl shadow-lg flex flex-col overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background-secondary/50">
          <div>
            <h2 className="text-lg font-display font-bold text-foreground mb-1">Request Pipeline</h2>
            <p className="text-sm text-foreground-muted">Manage and track your automated FOIA requests.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-background hover:bg-background-tertiary text-sm font-medium text-foreground-muted hover:text-foreground transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-background hover:bg-background-tertiary text-sm font-medium text-foreground-muted hover:text-foreground transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-background/50">
                <th className="px-6 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider">Request Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider">Timeline</th>
                <th className="px-6 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider">Docs</th>
                <th className="px-6 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {FOIA_REQUESTS.map((request) => {
                const status = getStatusConfig(request.status);
                const StatusIcon = status.icon;
                
                return (
                  <tr key={request.id} className="hover:bg-background-tertiary/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground mb-1">{request.title}</span>
                        <div className="flex items-center gap-2 text-xs text-foreground-muted">
                          <span className="font-mono text-foreground-subtle">{request.id}</span>
                          <span>•</span>
                          <span className="truncate max-w-[250px]">{request.agency}</span>
                          <span className="px-1.5 py-0.5 rounded bg-background border border-white/5 text-[10px] font-medium uppercase">
                            {request.state}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium", status.bg, status.border, status.color)}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-foreground-subtle">Sent:</span>
                          <span className="text-foreground font-medium">{request.dateSent}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-foreground-subtle">Due:</span>
                          <span className={cn("font-medium", request.status === 'action_needed' ? 'text-amber-500' : 'text-foreground')}>
                            {request.dueDate}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {request.docs > 0 ? (
                        <div className="flex items-center gap-1.5 text-emerald-500 font-medium text-sm">
                          <FileText className="w-4 h-4" />
                          {request.docs}
                        </div>
                      ) : (
                        <span className="text-foreground-subtle text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-md hover:bg-background border border-transparent hover:border-white/5 text-foreground-muted hover:text-foreground transition-all tooltip-trigger">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-background border border-transparent hover:border-white/5 text-foreground-muted hover:text-foreground transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Footer Pagination/Info */}
        <div className="p-4 border-t border-white/5 bg-background-secondary/50 flex items-center justify-between text-xs text-foreground-muted">
          <span>Showing 1 to 5 of 12 requests</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded hover:bg-background-tertiary disabled:opacity-50" disabled>Prev</button>
            <button className="px-2 py-1 rounded hover:bg-background-tertiary">Next</button>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-background-secondary border border-white/5 hover:border-white/10 transition-colors rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-background-secondary/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b5cf6]/5 rounded-bl-full -z-10" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#c084fc]" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-foreground">Draft FOIA Request</h2>
                  <p className="text-xs text-foreground-muted">Generate and send via Resend</p>
                </div>
              </div>
              <button onClick={() => setShowNewRequestModal(false)} className="p-2 rounded-lg hover:bg-background text-foreground-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">State Jurisdiction</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
                  <select 
                    className="w-full bg-background border border-white/5 hover:border-white/10 transition-colors rounded-xl pl-10 pr-4 py-3 text-sm text-foreground appearance-none focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a state</option>
                    <option value="ca">California</option>
                    <option value="ny">New York</option>
                    <option value="tx">Texas</option>
                    <option value="fl">Florida</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-foreground-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">Agency Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
                  <input 
                    type="text" 
                    placeholder="e.g., California Dept of Transportation" 
                    className="w-full bg-background border border-white/5 hover:border-white/10 transition-colors rounded-xl pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">Target Document(s)</label>
                <textarea 
                  rows={4}
                  className="w-full bg-background border border-white/5 hover:border-white/10 transition-colors rounded-xl p-4 text-sm text-foreground focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all resize-none"
                  defaultValue="Winning proposal and pricing tabulation from incumbent"
                />
              </div>

              {/* Inbox Routing Info */}
              <div className="bg-background border border-white/5 hover:border-white/10 transition-colors rounded-xl p-4 mt-2">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-foreground-muted mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Automated Inbox Routing</h4>
                    <p className="text-xs text-foreground-muted leading-relaxed mb-3">
                      Replies will be routed to <span className="font-mono text-foreground-subtle">foia-inbound@intentbid.com</span> for automatic parsing.
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-[#c084fc]">
                      <ShieldCheck className="w-3.5 h-3.5" /> State Laws Applied Automatically
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/5 bg-background-secondary/50">
              <button 
                onClick={() => setShowNewRequestModal(false)}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
              >
                <FileOutput className="w-5 h-5" />
                Generate & Send Request
              </button>
              <p className="text-center text-[11px] text-foreground-subtle mt-3 flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" /> Automated follow-ups included
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
