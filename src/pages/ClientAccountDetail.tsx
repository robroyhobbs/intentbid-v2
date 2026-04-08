import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldAlert, 
  Plus, 
  Copy, 
  ChevronDown, 
  Mail, 
  Save, 
  Archive,
  FileText,
  CheckCircle2,
  MessageSquare,
  Clock,
  X,
  Terminal,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ClientAccountDetail() {
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState('settings');

  // Mock data based on the screenshots
  const clientName = clientId === '1' ? 'Acme Corp' : 'Matt Org';

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto relative z-10">
      {/* Subtle Noise Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <Link to="/managed-delivery" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground-muted hover:text-white transition-colors mb-6">
          <ArrowLeft size={14} />
          Back to Directory
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-[#c084fc] text-[9px] font-bold uppercase tracking-widest">
            <ShieldAlert size={12} />
            Operator-Only Workspace
          </div>
          <div className="text-[10px] font-mono text-foreground-muted">ID: CLI-{clientId?.padStart(4, '0')}</div>
        </div>
        
        <h1 className="text-2xl uppercase tracking-widest font-bold tracking-tight text-white mb-3">{clientName}</h1>
        <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted max-w-3xl leading-relaxed">
          Keep delivery controls scoped to this client account. Update the operating mode, attach proposals, 
          and prepare external stakeholders before you expose any client-facing portal flow.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-white/10 mb-8 relative z-10">
        {['Settings', 'Proposals', 'Invites', 'Knowledge Base', 'Activity'].map((tab) => {
          const id = tab.toLowerCase().replace(' ', '-');
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "pb-4 text-[10px] uppercase tracking-widest font-bold transition-colors relative",
                isActive ? "text-white" : "text-foreground-muted hover:text-white"
              )}
            >
              {tab}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8b5cf6]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 pb-12 relative z-10">
        {activeTab === 'settings' && <SettingsTab clientName={clientName} />}
        {activeTab === 'proposals' && <ProposalsTab clientName={clientName} />}
        {activeTab === 'invites' && <InvitesTab />}
        {activeTab === 'knowledge-base' && <KnowledgeBaseTab />}
        {activeTab === 'activity' && <ActivityTab />}
      </div>
    </div>
  );
}

function SettingsTab({ clientName }: { clientName: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-[#0A0A0A] border border-white/10 p-8">
          <div className="mb-8 border-b border-white/10 pb-4">
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-white flex items-center gap-2">
              <Terminal size={14} className="text-[#c084fc]" />
              Account Settings
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Account Name</label>
              <input 
                type="text" 
                defaultValue={clientName}
                className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white focus:border-[#8b5cf6] outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Status</label>
                <div className="relative">
                  <select className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white appearance-none focus:border-[#8b5cf6] outline-none cursor-pointer">
                    <option>ACTIVE</option>
                    <option>PROVISIONING</option>
                    <option>PAUSED</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-white/10 bg-[#111116] mt-6">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-4 h-4 border border-white/20 bg-[#0A0A0A] peer-checked:bg-[#8b5cf6] peer-checked:border-[#8b5cf6] transition-colors"></div>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white">Require checkpoints by default on newly assigned work.</span>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-4 border-t border-white/10 mt-8">
              <button className="flex items-center gap-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-gray-200 transition-all">
                <Save size={14} />
                Save Settings
              </button>
              <button className="flex items-center gap-2 bg-transparent border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-red-500/10 transition-all">
                <Archive size={14} />
                Archive Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#8b5cf6]/5 border border-[#8b5cf6]/20 p-6 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#8b5cf6]"></div>
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-white flex items-center gap-2 mb-4">
            <Terminal size={14} className="text-[#c084fc]" />
            AI Account Intelligence
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#c084fc] mb-1">Win Probability Trend</div>
              <div className="text-2xl font-mono font-bold text-white">74% <span className="text-emerald-400 text-sm">↑ 12%</span></div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="text-[9px] font-bold uppercase tracking-widest text-foreground-muted mb-2">Strategic Recommendations</div>
              <ul className="space-y-3">
                <li className="text-[10px] uppercase tracking-widest font-bold text-white flex gap-2">
                  <span className="text-[#8b5cf6]">•</span>
                  Emphasize past performance in cloud migration to counter competitor strengths.
                </li>
                <li className="text-[10px] uppercase tracking-widest font-bold text-white flex gap-2">
                  <span className="text-[#8b5cf6]">•</span>
                  Client responds well to detailed pricing breakdowns; ensure transparency in cost volumes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProposalsTab({ clientName }: { clientName: string }) {
  return (
    <div className="space-y-6">
      {/* Assignments */}
      <div className="bg-[#0A0A0A] border border-white/10 p-8">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h2 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white flex items-center gap-2">
            <Terminal size={14} className="text-[#c084fc]" />
            Proposals
          </h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mt-2">Manage proposals for this client. Creating a proposal here automatically applies their specific L1 Context.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Create New */}
          <div className="bg-[#111116] border border-white/10 p-6 flex flex-col">
            <div className="w-8 h-8 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mb-4">
              <Plus className="w-4 h-4 text-[#c084fc]" />
            </div>
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-white mb-2">Create New Proposal</h3>
            <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-6 flex-1 leading-relaxed">
              Start a fresh proposal wizard. The AI will be strictly grounded in {clientName}'s L1 Context and Knowledge Base.
            </p>
            <button className="bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-gray-200 transition-all w-full">
              Create Proposal
            </button>
          </div>

          {/* Assign Existing */}
          <div className="bg-[#111116] border border-white/10 p-6 flex flex-col">
            <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-white mb-2">Assign Existing</h3>
            <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-6 flex-1 leading-relaxed">
              Move an existing draft from your global workspace into this client account.
            </p>
            <div className="flex items-center gap-3 w-full">
              <div className="relative flex-1">
                <select className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-[10px] font-mono text-white appearance-none focus:border-[#8b5cf6] outline-none cursor-pointer">
                  <option>SELECT PROPOSAL...</option>
                  <option>MDOT — DATA ANALYTICS PLATFORM</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
              </div>
              <button className="bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest py-2 px-4 hover:bg-white/20 transition-all whitespace-nowrap">
                Assign
              </button>
            </div>
          </div>
        </div>

        <div className="py-12 flex flex-col items-center justify-center border border-dashed border-white/10 bg-[#111116]/50">
          <FileText size={20} className="text-foreground-muted mb-3" />
          <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted">No proposals assigned yet.</p>
        </div>
      </div>

      {/* Checkpoints */}
      <div className="bg-[#0A0A0A] border border-white/10 p-8">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h2 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white flex items-center gap-2">
            <Terminal size={14} className="text-[#c084fc]" />
            Request Client Checkpoint
          </h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mt-2">Ask the client to confirm a specific milestone before the team moves forward.</p>
        </div>

        <div className="space-y-6 max-w-3xl mb-12">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Proposal</label>
            <div className="relative">
              <select className="w-full bg-[#111116] border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white appearance-none focus:border-[#8b5cf6] outline-none cursor-pointer">
                <option>MDOT — DATA ANALYTICS PLATFORM</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Checkpoint Title</label>
            <input 
              type="text" 
              placeholder="Approve pricing narrative"
              className="w-full bg-[#111116] border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white focus:border-[#8b5cf6] outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Checkpoint Description</label>
            <textarea 
              rows={3}
              placeholder="Confirm the summary before final review."
              className="w-full bg-[#111116] border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white focus:border-[#8b5cf6] outline-none transition-all resize-none"
            />
          </div>

          <button className="bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-gray-200 transition-all">
            Request Checkpoint
          </button>
        </div>

        <div className="border-t border-white/10 pt-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-6">Active Checkpoints</h3>
          <div className="p-6 border border-white/10 bg-[#111116]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border bg-amber-500/5 text-amber-400 border-amber-500/20">
                    Pending Client Action
                  </span>
                  <span className="text-[10px] font-mono text-foreground-muted">REQUESTED: 1 DAY AGO</span>
                </div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-white">Review Executive Summary</h4>
              </div>
            </div>
            
            {/* Threaded Comment */}
            <div className="mt-4 pl-4 border-l border-white/10 space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-mono text-[10px] shrink-0">
                  C
                </div>
                <div className="flex-1 bg-[#0A0A0A] p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Client (mtmckinney@gmail.com)</span>
                    <span className="text-[10px] font-mono text-foreground-muted">2 HOURS AGO</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted leading-relaxed">
                    Looks good, but can we emphasize the zero-trust architecture more in section 2? I left a comment in the doc.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#c084fc] font-mono text-[10px] shrink-0">
                  O
                </div>
                <div className="flex-1">
                  <textarea 
                    rows={2}
                    placeholder="REPLY TO CLIENT..."
                    className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white focus:border-[#8b5cf6] outline-none transition-all resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button className="bg-white/10 text-white text-[9px] font-bold uppercase tracking-widest py-1.5 px-4 hover:bg-white/20 transition-all">
                      Post Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvitesTab() {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 p-8">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h2 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white flex items-center gap-2">
          <Terminal size={14} className="text-[#c084fc]" />
          Pending Invites
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mt-2">Save stakeholder invites now, then revoke them deliberately if the account team changes before portal access is opened.</p>
      </div>

      <div className="space-y-6 max-w-3xl mb-12">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Stakeholder Email</label>
          <input 
            type="email" 
            placeholder="client@example.com"
            className="w-full bg-[#111116] border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white focus:border-[#8b5cf6] outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Role</label>
          <div className="relative">
            <select className="w-full bg-[#111116] border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-white appearance-none focus:border-[#8b5cf6] outline-none cursor-pointer">
              <option>CLIENT MEMBER</option>
              <option>CLIENT ADMIN</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
          </div>
        </div>

        <button className="flex items-center gap-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-gray-200 transition-all">
          <Mail size={14} />
          Save Invite
        </button>
      </div>

      <div className="max-w-3xl">
        <div className="flex items-center justify-between p-4 border border-white/10 bg-[#111116]">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold font-mono text-white">mtmckinney@gmail.com</p>
            <p className="text-[10px] uppercase tracking-widest text-foreground-muted mt-1">Client Admin</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors">
            <X size={12} />
            Revoke
          </button>
        </div>
      </div>
    </div>
  );
}

function KnowledgeBaseTab() {
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-[#0A0A0A] border border-white/10 p-8">
        <div className="flex items-start justify-between mb-8 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Terminal size={14} className="text-[#c084fc]" />
              L1 Context & Knowledge Base
            </h2>
            <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mt-2">Client-specific context, products, and evidence. The AI uses this L1 Context as the foundation for all proposals generated for this client.</p>
          </div>
          <button 
            onClick={() => setIsCopyModalOpen(true)}
            className="flex items-center gap-2 bg-transparent border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest py-2 px-4 hover:bg-white/10 transition-all"
          >
            <Copy size={14} />
            Copy from Org
          </button>
        </div>

        <div className="space-y-4">
          {/* Company Context Accordion */}
          <div className="border border-white/10 bg-[#111116]">
            <div className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <ChevronDown size={14} className="text-foreground-muted" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">Company Context</h3>
                <span className="text-[10px] font-mono text-foreground-muted">[1]</span>
              </div>
              <button className="text-[#c084fc] hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors">
                <Plus size={12} /> Add Entry
              </button>
            </div>
            <div className="p-4 bg-[#0A0A0A] border-t border-white/10">
              <div className="p-4 border border-white/10 bg-[#111116]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold font-bold text-white uppercase tracking-widest">Agile Methodology (Global)</h4>
                  <span className="text-[9px] uppercase tracking-widest text-[#8b5cf6] font-bold border border-[#8b5cf6]/30 px-1.5 py-0.5">Copied</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted line-clamp-2 leading-relaxed">Our standard agile delivery framework utilizing two-week sprints, daily standups, and continuous integration...</p>
              </div>
            </div>
          </div>

          {/* Products Accordion */}
          <div className="border border-white/10 bg-[#111116]">
            <div className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <ChevronDown size={14} className="text-foreground-muted" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">Products</h3>
                <span className="text-[10px] font-mono text-foreground-muted">[0]</span>
              </div>
              <button className="text-[#c084fc] hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors">
                <Plus size={12} /> Add Product
              </button>
            </div>
            <div className="p-6 text-center bg-[#0A0A0A] border-t border-white/10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted">No products yet.</p>
            </div>
          </div>

          {/* Evidence Accordion */}
          <div className="border border-white/10 bg-[#111116]">
            <div className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <ChevronDown size={14} className="text-foreground-muted" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">Evidence</h3>
                <span className="text-[10px] font-mono text-foreground-muted">[0]</span>
              </div>
              <button className="text-[#c084fc] hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors">
                <Plus size={12} /> Add Evidence
              </button>
            </div>
            <div className="p-6 text-center bg-[#0A0A0A] border-t border-white/10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted">No evidence entries yet.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Modal */}
      {isCopyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505]">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-[#c084fc]" />
                <h2 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white">Global Knowledge Base</h2>
              </div>
              <button 
                onClick={() => setIsCopyModalOpen(false)}
                className="text-foreground-muted hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-3">
              {[
                { type: 'Context', name: 'Agile Methodology', desc: 'Standard delivery framework' },
                { type: 'Evidence', name: 'ISO 27001 Certificate', desc: 'Valid through 2025' },
                { type: 'Evidence', name: 'CMMI Level 3 Appraisal', desc: 'Official appraisal document' },
                { type: 'Product', name: 'Data Analytics Platform', desc: 'Core SaaS offering' },
              ].map((item, i) => (
                <label key={i} className="flex items-start gap-4 p-4 border border-white/10 bg-[#111116] hover:bg-white/[0.02] cursor-pointer transition-colors">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" className="peer sr-only" defaultChecked={i === 0} />
                    <div className="w-4 h-4 border border-white/20 bg-[#0A0A0A] peer-checked:bg-[#8b5cf6] peer-checked:border-[#8b5cf6] transition-colors flex items-center justify-center">
                      <CheckCircle2 size={10} className="text-white opacity-0 peer-checked:opacity-100" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#8b5cf6] border border-[#8b5cf6]/30 px-1.5 py-0.5">{item.type}</span>
                    </div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold font-bold text-white uppercase tracking-widest mt-2">{item.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mt-1">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3 bg-[#050505]">
              <button 
                onClick={() => setIsCopyModalOpen(false)}
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground-muted hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsCopyModalOpen(false)}
                className="bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 px-6 hover:bg-gray-200 transition-all"
              >
                Copy 1 Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActivityTab() {
  const activities = [
    { id: 1, type: 'comment', title: 'Comment Added', detail: '"Looks good, but can we emphasize the zero-trust architecture more in section 2?"', user: 'Client (mtmckinney@gmail.com)', time: '10:42 AM', icon: MessageSquare, color: 'text-blue-400' },
    { id: 2, type: 'request', title: 'Checkpoint Requested: Executive Summary', user: 'Operator (Sarah J.)', time: 'YESTERDAY', icon: Clock, color: 'text-amber-400' },
    { id: 3, type: 'system', title: 'Client Account Provisioned', user: 'System', time: 'OCT 12, 2023', icon: ShieldAlert, color: 'text-[#c084fc]' },
  ];

  return (
    <div className="bg-[#0A0A0A] border border-white/10 p-8">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h2 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-white flex items-center gap-2">
          <Activity size={14} className="text-foreground-muted" />
          System Log
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mt-2">Immutable record of all actions, checkpoints, and communications for this client.</p>
      </div>

      <div className="border border-white/10 bg-[#111116]">
        <div className="divide-y divide-white/5">
          {activities.map((act) => (
            <div key={act.id} className="flex gap-4 p-4 hover:bg-white/[0.02] transition-colors">
              <span className="font-mono text-[10px] text-foreground-subtle w-20 shrink-0 pt-0.5">{act.time}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <act.icon size={12} className={act.color} />
                  <h4 className="text-[10px] uppercase tracking-widest font-bold font-bold text-white uppercase tracking-widest">{act.title}</h4>
                </div>
                {act.detail && (
                  <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2 italic border-l-2 border-white/10 pl-3 py-1">{act.detail}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-4 h-4 bg-white/10 flex items-center justify-center text-[8px] font-mono text-white">
                    {act.user.charAt(0)}
                  </div>
                  <span className="text-[10px] font-mono text-foreground-muted uppercase">{act.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
