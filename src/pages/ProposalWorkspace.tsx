import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, MessageSquare, ListChecks, 
  Download, AlertCircle, CheckCircle2, 
  RefreshCw, X, Sparkles, Wand2, Share2, 
  MoreHorizontal, BarChart3, FileText, 
  ArrowRight, Check, Zap, Eye, History,
  Plus, Loader2, Play, ThumbsUp, ThumbsDown,
  AlignLeft, Type, TrendingUp,
  Presentation, Layout, FileDown, Globe, FileOutput,
  Search, Command, ShieldCheck, Clock, Monitor
} from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data
const SECTIONS = [
  { id: 'cover-letter', title: 'Cover Letter', status: 'completed', wordCount: 350, progress: 100 },
  { id: 'exec-summary', title: 'Executive Summary', status: 'review', wordCount: 850, progress: 100 },
  { id: 'understanding', title: 'Understanding of Needs', status: 'completed', wordCount: 1200, progress: 100 },
  { id: 'approach', title: 'Proposed Approach', status: 'drafting', wordCount: 1400, progress: 65 },
  { id: 'methodology', title: 'Methodology', status: 'pending', wordCount: 0, progress: 0 },
  { id: 'team', title: 'Team & Qualifications', status: 'gap', wordCount: 950, progress: 80 },
  { id: 'experience', title: 'Relevant Experience', status: 'completed', wordCount: 1500, progress: 100 },
  { id: 'commercial', title: 'Commercial Framework', status: 'completed', wordCount: 600, progress: 100 },
];

export default function ProposalWorkspace() {
  const [activeSection, setActiveSection] = useState(SECTIONS[1].id);
  const [rightPanelTab, setRightPanelTab] = useState<'copilot' | 'score' | 'comments'>('copilot');
  const [isImproving, setIsImproving] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  const handleAutoImprove = () => {
    setIsImproving(true);
    setTimeout(() => setIsImproving(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-[#050505] text-foreground overflow-hidden font-sans selection:bg-electric/30 selection:text-white">
      {/* Unified Header - Glassmorphism */}
      <header className="h-14 px-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#050505] z-30">
        <div className="flex items-center gap-4">
          <Link to="/proposals" className="flex items-center justify-center w-8 h-8 rounded-none hover:bg-white/5 transition-colors text-foreground-muted hover:text-foreground">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-[10px] uppercase tracking-widest font-bold text-foreground">DoD Cloud Migration Services RFP</h1>
                <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-white/5 text-foreground-muted border border-white/10">
                  Drafting
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Users */}
          <div className="flex items-center -space-x-2 mr-2">
            <div className="w-7 h-7 rounded-none bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-[#050505] flex items-center justify-center text-[9px] font-bold text-white z-30 ring-2 ring-transparent hover:ring-white/20 transition-all cursor-pointer">JD</div>
            <div className="w-7 h-7 rounded-none bg-gradient-to-br from-emerald-400 to-teal-600 border-2 border-[#050505] flex items-center justify-center text-[9px] font-bold text-white z-20 ring-2 ring-transparent hover:ring-white/20 transition-all cursor-pointer">AS</div>
          </div>
          
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-none hover:bg-white/5 text-foreground-muted hover:text-foreground transition-colors tooltip-trigger">
              <History className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-none hover:bg-white/5 text-foreground-muted hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="w-px h-4 bg-white/10 mx-1" />

          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-none bg-white text-black text-[10px] uppercase tracking-widest font-bold transition-all hover:bg-gray-200 active:scale-95"
          >
            <FileOutput className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex min-h-0 relative">
        
        {/* Left Sidebar - Document Outline */}
        <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col shrink-0 z-20">
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted uppercase tracking-wider">Outline</h2>
              <button className="p-1 rounded-none hover:bg-white/5 text-foreground-muted transition-colors">
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="space-y-0.5 flex-1 overflow-y-auto custom-scrollbar pr-1 -mx-2">
              {SECTIONS.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex flex-col gap-1.5 px-3 py-2 rounded-none text-left transition-all group relative",
                    activeSection === section.id 
                      ? "bg-white/10 text-foreground" 
                      : "hover:bg-white/5 text-foreground-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-start gap-2.5 relative z-10">
                    <div className="mt-0.5 shrink-0">
                      {section.status === 'completed' ? (
                        <CheckCircle2 className={cn("w-3.5 h-3.5", activeSection === section.id ? "text-foreground" : "text-foreground-muted")} />
                      ) : section.status === 'review' ? (
                        <Eye className={cn("w-3.5 h-3.5", activeSection === section.id ? "text-amber-400" : "text-amber-500/70")} />
                      ) : section.status === 'drafting' ? (
                        <Loader2 className={cn("w-3.5 h-3.5 animate-spin", activeSection === section.id ? "text-blue-400" : "text-blue-400/70")} />
                      ) : section.status === 'pending' ? (
                        <div className="w-3.5 h-3.5 rounded-none border-2 border-white/20" />
                      ) : (
                        <AlertCircle className={cn("w-3.5 h-3.5", activeSection === section.id ? "text-red-400" : "text-red-400/70")} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        "text-[10px] uppercase tracking-widest font-bold truncate transition-colors",
                        activeSection === section.id ? "font-bold text-foreground" : "font-normal"
                      )}>
                        {section.title}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="pt-4 mt-auto border-t border-white/5">
              <button 
                onClick={() => setShowAddSectionModal(true)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-none border border-dashed border-white/10 bg-transparent text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:text-foreground hover:border-white/20 hover:bg-white/5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Section
              </button>
            </div>
          </div>
        </aside>

        {/* Center - The Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#050505] relative custom-scrollbar scroll-smooth">
          <div className="max-w-[850px] mx-auto py-12 px-8 relative z-10">
            
            {/* The "Document" */}
            <div className="bg-[#0A0A0A] border border-white/10 shadow-none rounded-none min-h-[1000px] relative group/doc">
              
              {/* Document Header Actions */}
              <div className="sticky top-0 left-0 right-0 h-12 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A0A0A]/95 backdrop-blur-md z-40 opacity-0 group-hover/doc:opacity-100 transition-opacity duration-200 rounded-none">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Executive Summary</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleAutoImprove}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-none text-[10px] uppercase tracking-widest font-bold bg-white/5 text-foreground hover:bg-white/10 border border-white/5 transition-all"
                  >
                    {isImproving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-electric" />}
                    Auto-Improve
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-1" />
                  <button className="p-1 rounded-none hover:bg-white/10 text-foreground-muted transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Content */}
              <div className="p-12 md:p-16 pt-8">
                <h1 className="text-base uppercase tracking-widest font-bold text-foreground mb-8 tracking-tight">Executive Summary</h1>
                
                <div className="prose prose-invert prose-lg max-w-none prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-[15px] prose-headings:text-foreground prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-widest prose-headings:tracking-tight prose-li:text-foreground/80 prose-strong:text-foreground prose-strong:font-bold">
                  <p>
                    The Department of Defense (DoD) requires a resilient, secure, and scalable cloud infrastructure to support its global mission. Apex Federal Solutions proposes a comprehensive Cloud Migration Service that leverages our proven <strong>Zero-Trust Migration Framework</strong> to transition legacy systems to Impact Level 5 (IL5) and IL6 environments with zero operational downtime.
                  </p>

                  {/* Inline AI Suggestion Block */}
                  {showSuggestion && (
                    <div className="my-8 relative group/suggestion">
                      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden shadow-none">
                        {/* Suggestion Header */}
                        <div className="bg-white/5 border-b border-white/5 px-4 py-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-foreground">
                            <Wand2 className="w-3.5 h-3.5 text-electric" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">AI Suggestion: Strategic Alignment</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-white/10 rounded-none text-foreground-muted transition-colors" onClick={() => setShowSuggestion(false)}>
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Suggestion Content */}
                        <div className="p-5">
                          <p className="text-[13px] text-foreground-muted mb-4">
                            The RFP emphasizes "Speed to Deployment" more than "Cost Savings". I've rewritten this paragraph to highlight our 45-day average migration speed instead of the 30% cost savings.
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-red-500/5 border border-red-500/10 rounded-none p-4 relative">
                              <div className="absolute top-0 right-0 bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-none rounded-none">Original</div>
                              <p className="text-[13px] text-foreground/70 line-through decoration-red-500/50">
                                Our approach minimizes risk through automated discovery and dependency mapping. We have successfully migrated over 50 federal agencies to the cloud, saving an average of 30% in annual infrastructure costs.
                              </p>
                            </div>
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-none p-4 relative">
                              <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-none rounded-none">Suggested</div>
                              <p className="text-[13px] text-foreground/90">
                                Our approach minimizes risk through automated discovery and dependency mapping. We have successfully migrated over 50 federal agencies to the cloud, <strong className="text-emerald-400 font-bold">achieving full operational capability in an average of 45 days—exceeding the RFP's speed-to-deployment requirements.</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Suggestion Actions */}
                        <div className="bg-[#050505] border-t border-white/5 px-5 py-3 flex justify-end gap-2">
                          <button 
                            onClick={() => setShowSuggestion(false)}
                            className="px-3 py-1.5 rounded-none text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors"
                          >
                            Dismiss
                          </button>
                          <button 
                            onClick={() => setShowSuggestion(false)}
                            className="px-3 py-1.5 rounded-none text-[10px] uppercase tracking-widest font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" /> Accept Change
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!showSuggestion && (
                    <p>
                      Our approach minimizes risk through automated discovery and dependency mapping. We have successfully migrated over 50 federal agencies to the cloud, achieving full operational capability in an average of 45 days—exceeding the RFP's speed-to-deployment requirements.
                    </p>
                  )}

                  <p>
                    To achieve the DoD's objectives, we have assembled a team of cleared cloud architects and DevSecOps engineers. Our solution integrates seamlessly with existing DoD enterprise services, ensuring compliance with all DISA Cloud Computing Security Requirements Guide (CC SRG) mandates.
                  </p>

                  <h3 className="text-base uppercase tracking-widest font-bold mt-12 mb-6 text-foreground">Key Differentiators</h3>
                  <ul className="space-y-4">
                    <li className="pl-2">
                      <strong className="text-foreground">Automated ATO Acceleration:</strong> Our proprietary compliance-as-code library reduces Authority to Operate (ATO) timelines by up to 40%.
                    </li>
                    <li className="pl-2">
                      <strong className="text-foreground">Cleared Talent Readiness:</strong> 100% of our proposed key personnel hold active TS/SCI clearances and are ready to deploy on Day 1.
                    </li>
                    <li className="pl-2">
                      <strong className="text-foreground">Multi-Cloud Agility:</strong> Vendor-agnostic architecture supporting AWS GovCloud, Azure Government, and Google Distributed Cloud Hosted.
                    </li>
                  </ul>

                  {/* Mock Selected Text with Floating Toolbar */}
                  <div className="mt-12 relative">
                    <p className="text-sm uppercase tracking-widest font-bold leading-relaxed text-foreground/90 border-l-2 border-electric/30 pl-6 py-2">
                      <span className="bg-electric/10 text-foreground selection:bg-transparent rounded-none px-1">We understand that the transition to the cloud is not merely a technical upgrade, but a strategic imperative to maintain decision advantage.</span> Our team is committed to partnering with the DoD to realize this vision.
                    </p>
                    
                    {/* Floating Toolbar - Glassmorphism */}
                    <div className="absolute -top-12 left-1/4 bg-[#1A1A1A] border border-white/10 rounded-none shadow-none flex items-center p-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <button className="px-2.5 py-1.5 hover:bg-white/5 rounded-none text-[10px] uppercase tracking-widest font-bold text-electric flex items-center gap-1.5 transition-colors">
                        <Sparkles className="w-3.5 h-3.5" /> Rewrite
                      </button>
                      <div className="w-px h-4 bg-white/10 mx-1" />
                      <button className="px-2.5 py-1.5 hover:bg-white/5 rounded-none text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:text-foreground transition-colors">Shorten</button>
                      <button className="px-2.5 py-1.5 hover:bg-white/5 rounded-none text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:text-foreground transition-colors">Expand</button>
                      <button className="px-2.5 py-1.5 hover:bg-white/5 rounded-none text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:text-foreground transition-colors">Tone</button>
                      <div className="w-px h-4 bg-white/10 mx-1" />
                      <button className="p-1.5 hover:bg-white/5 rounded-none text-foreground-muted hover:text-foreground transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - AI Co-Pilot */}
        <aside className="w-80 border-l border-white/5 bg-[#050505] flex flex-col shrink-0 z-30">
          {/* Tabs */}
          <div className="flex p-2 border-b border-white/5 gap-1 bg-[#0A0A0A]">
            {[
              { id: 'copilot', label: 'Co-Pilot', icon: Zap },
              { id: 'score', label: 'Score', icon: BarChart3 },
              { id: 'comments', label: 'Comments', icon: MessageSquare },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRightPanelTab(tab.id as any)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-none text-[10px] uppercase tracking-widest font-bold transition-all",
                  rightPanelTab === tab.id 
                    ? "bg-white/10 text-foreground shadow-none" 
                    : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                )}
              >
                <tab.icon className={cn("w-3.5 h-3.5", rightPanelTab === tab.id ? "text-electric" : "")} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative">
            {rightPanelTab === 'copilot' && (
              <>
                <div className="flex-1 p-4 space-y-6 animate-in fade-in duration-300 pb-24">
                  
                  {/* AI Status Bubble */}
                  <div className="p-4 rounded-none border border-white/10 bg-[#0A0A0A] relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-none bg-electric/10 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-electric" />
                        </div>
                        <h3 className="text-[10px] uppercase tracking-widest font-bold text-foreground">IntentBid AI</h3>
                      </div>
                      <p className="text-[13px] text-foreground-muted leading-relaxed">
                        I'm reviewing the Executive Summary against the RFP requirements. I've found <strong className="text-foreground font-bold">2 areas</strong> for improvement to increase your win probability.
                      </p>
                    </div>
                  </div>

                  {/* Actionable Guidance Cards */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-bold text-foreground-muted uppercase tracking-wider flex items-center gap-2">
                      Suggested Actions <span className="bg-white/10 text-foreground px-1.5 py-0.5 rounded-none text-[10px]">2</span>
                    </h4>
                    
                    <div className="p-3.5 rounded-none border border-white/5 bg-[#0A0A0A] hover:bg-white/5 transition-colors group">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-none bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-[13px] font-bold text-foreground mb-1">Missing Win Theme</h5>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-3 leading-relaxed">
                            The "Zero-Downtime Operations" win theme is not explicitly mentioned in this section.
                          </p>
                          <button className="w-full py-1.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] uppercase tracking-widest font-bold font-medium text-foreground transition-colors flex items-center justify-center gap-1.5">
                            <Wand2 className="w-3 h-3 text-electric" /> Weave into text
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-none border border-white/5 bg-[#0A0A0A] hover:bg-white/5 transition-colors group">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-none bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                          <ListChecks className="w-3.5 h-3.5 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-[13px] font-bold text-foreground mb-1">Compliance Gap</h5>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-3 leading-relaxed">
                            RFP Section L.4 requires explicit acknowledgment of the 8(a) set-aside status in the summary.
                          </p>
                          <button className="w-full py-1.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] uppercase tracking-widest font-bold font-medium text-foreground transition-colors flex items-center justify-center gap-1.5">
                            <Wand2 className="w-3 h-3 text-electric" /> Generate statement
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sticky Command Palette Input */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-8">
                  <div className="relative bg-[#0A0A0A] border border-white/10 rounded-none focus-within:border-electric/50 transition-colors flex items-center px-3 py-1.5 group">
                    <Sparkles className="w-3.5 h-3.5 text-foreground-muted group-focus-within:text-electric transition-colors shrink-0" />
                    <input 
                      type="text"
                      placeholder="Ask AI or type '/' for commands..."
                      className="w-full bg-transparent border-none pl-2 pr-10 py-1.5 text-[13px] text-foreground focus:outline-none focus:ring-0 placeholder:text-foreground-muted"
                    />
                    <div className="absolute right-2 flex items-center gap-1.5">
                      <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none bg-white/5 border border-white/10 text-[10px] font-mono text-foreground-muted">
                        <Command className="w-3 h-3" /> K
                      </kbd>
                    </div>
                  </div>
                </div>
              </>
            )}

            {rightPanelTab === 'score' && (
              <div className="p-4 space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col items-center justify-center py-6 px-4 rounded-none border border-white/10 bg-[#0A0A0A] relative overflow-hidden">
                  <div className="relative z-10 text-center">
                    <div className="text-4xl uppercase tracking-widest font-bold text-foreground mb-2 tracking-tight">85<span className="text-sm uppercase tracking-widest font-bold text-foreground-muted">/100</span></div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-none border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Strong Probability
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold text-foreground-muted uppercase tracking-wider">Evaluation Metrics</h4>
                    <button className="text-[10px] font-bold text-electric hover:text-electric-light transition-colors">View Details</button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Requirements Match', score: 95, color: 'bg-emerald-500' },
                      { label: 'Past Performance', score: 80, color: 'bg-emerald-500' },
                      { label: 'Technical Capability', score: 90, color: 'bg-emerald-500' },
                      { label: 'Pricing Competitiveness', score: 60, color: 'bg-amber-500' },
                      { label: 'Strategic Alignment', score: 85, color: 'bg-emerald-500' },
                    ].map(metric => (
                      <div key={metric.label} className="space-y-1.5 group">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                          <span className="text-foreground-muted font-bold group-hover:text-foreground transition-colors">{metric.label}</span>
                          <span className="font-bold text-foreground">{metric.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-none overflow-hidden">
                          <div className={cn("h-full rounded-none transition-all duration-1000 ease-out", metric.color)} style={{ width: `${metric.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 rounded-none border border-white/5 bg-[#0A0A0A] mt-2">
                  <h5 className="text-[10px] uppercase tracking-widest font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Score Trend
                  </h5>
                  <p className="text-[11px] text-foreground-muted leading-relaxed">
                    Your score increased by <strong className="text-emerald-500 font-bold">+5 points</strong> after adding the "Zero-Downtime" win theme to the Executive Summary.
                  </p>
                </div>
              </div>
            )}

            {rightPanelTab === 'comments' && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 p-6">
                <div className="w-12 h-12 rounded-none bg-white/5 flex items-center justify-center mb-1">
                  <MessageSquare className="w-5 h-5 text-foreground-muted" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-foreground mb-1">No comments yet</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted leading-relaxed max-w-[200px]">Highlight text in the document and click the comment icon to start a discussion.</div>
                </div>
              </div>
            )}
          </div>
        </aside>

      </div>

      {/* Export & Generate Fullscreen Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex justify-center bg-[#050505] animate-in fade-in zoom-in-95 duration-200 overflow-y-auto custom-scrollbar">
          <div className="w-full max-w-5xl p-8 md:p-12 relative">
            {/* Close Button */}
            <button 
              onClick={() => setShowExportModal(false)} 
              className="absolute top-8 right-8 p-2 rounded-none hover:bg-white/5 text-foreground-muted hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Back to Editor Action */}
            <button 
              onClick={() => setShowExportModal(false)}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:text-foreground transition-colors mb-10 group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Editor
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <Monitor className="w-6 h-6 text-foreground" />
              <h1 className="text-sm uppercase tracking-widest font-bold text-foreground tracking-tight">Export Proposal</h1>
            </div>
            <p className="text-foreground-muted text-[10px] uppercase tracking-widest font-bold mb-8">
              Choose a format to export your proposal. Web presentations are recommended for sales discussions.
            </p>

            {/* Info Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-none border border-white/5 bg-[#0A0A0A] mb-8">
              <Sparkles className="w-3.5 h-3.5 text-foreground" />
              <span className="text-[13px] font-bold text-foreground/90">Web Presentation is optimized for sales-ready, concise slides</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recommended Card */}
              <button className="relative flex flex-col text-left p-5 rounded-none border border-white/20 bg-[#0A0A0A] hover:bg-white/5 transition-colors group">
                <div className="absolute -top-2.5 left-5 bg-[#050505] px-2">
                  <span className="text-[10px] font-bold tracking-wider text-foreground uppercase">Recommended</span>
                </div>
                <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 text-foreground ml-0.5" />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-foreground mb-0.5">Web Presentation</h3>
                <span className="text-[10px] font-bold text-foreground-muted tracking-wider uppercase mb-3">Interactive Slides</span>
                <p className="text-[13px] text-foreground-muted leading-relaxed">
                  Modern, interactive slides for sales discussions. Keyboard/touch navigation, fullscreen mode, concise bullets.
                </p>
              </button>

              {/* PowerPoint */}
              <button className="relative flex flex-col text-left p-5 rounded-none border border-white/5 bg-[#0A0A0A] hover:bg-white/5 hover:border-white/10 transition-colors group">
                <div className="w-10 h-10 rounded-none bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Presentation className="w-4 h-4 text-orange-500" />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-foreground mb-0.5">PowerPoint</h3>
                <span className="text-[10px] font-bold text-foreground-muted tracking-wider uppercase mb-3">.PPTX</span>
                <p className="text-[13px] text-foreground-muted leading-relaxed">
                  Classic PowerPoint for team editing and enterprise compatibility.
                </p>
              </button>

              {/* Landing Page */}
              <button className="relative flex flex-col text-left p-5 rounded-none border border-white/5 bg-[#0A0A0A] hover:bg-white/5 hover:border-white/10 transition-colors group">
                <div className="w-10 h-10 rounded-none bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Globe className="w-4 h-4 text-emerald-500" />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-foreground mb-0.5">Landing Page</h3>
                <span className="text-[10px] font-bold text-foreground-muted tracking-wider uppercase mb-3">.HTML</span>
                <p className="text-[13px] text-foreground-muted leading-relaxed">
                  Premium branded page with scroll animations for detailed proposals.
                </p>
              </button>

              {/* Word Document */}
              <button className="relative flex flex-col text-left p-5 rounded-none border border-white/5 bg-[#0A0A0A] hover:bg-white/5 hover:border-white/10 transition-colors group">
                <div className="w-10 h-10 rounded-none bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4 text-blue-500" />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-foreground mb-0.5">Word Document</h3>
                <span className="text-[10px] font-bold text-foreground-muted tracking-wider uppercase mb-3">.DOCX</span>
                <p className="text-[13px] text-foreground-muted leading-relaxed">
                  Editable document for team collaboration and revisions.
                </p>
              </button>

              {/* PDF Document */}
              <button className="relative flex flex-col text-left p-5 rounded-none border border-white/5 bg-[#0A0A0A] hover:bg-white/5 hover:border-white/10 transition-colors group">
                <div className="w-10 h-10 rounded-none bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <FileDown className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-foreground mb-0.5">PDF Document</h3>
                <span className="text-[10px] font-bold text-foreground-muted tracking-wider uppercase mb-3">.PDF</span>
                <p className="text-[13px] text-foreground-muted leading-relaxed">
                  Print-ready document with professional formatting.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Section Modal */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#050505] border border-white/10 rounded-none w-full max-w-2xl shadow-none overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-[#0A0A0A]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-none bg-white/5 flex items-center justify-center">
                  <Plus className="w-3.5 h-3.5 text-foreground" />
                </div>
                <h2 className="text-xs uppercase tracking-widest font-bold text-foreground">Add New Section</h2>
              </div>
              <button onClick={() => setShowAddSectionModal(false)} className="p-1.5 rounded-none hover:bg-white/5 text-foreground-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto custom-scrollbar max-h-[70vh]">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                <input 
                  type="text" 
                  placeholder="Search standard sections or type to create custom..." 
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-none pl-9 pr-4 py-2 text-[13px] text-foreground focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>

              <div className="space-y-6">
                {/* AI Suggested Sections */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-electric uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> Suggested Based on RFP
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="flex items-center justify-between p-3 rounded-none border border-white/10 bg-[#0A0A0A] hover:border-electric/30 hover:bg-white/5 transition-all text-left group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-none bg-electric/10 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4 text-electric" />
                        </div>
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground">Security Architecture Plan</h4>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mt-0.5">Required by RFP Section L.4.2 (Zero-Trust Mandate)</p>
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-electric opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    
                    <button className="flex items-center justify-between p-3 rounded-none border border-white/10 bg-[#0A0A0A] hover:border-electric/30 hover:bg-white/5 transition-all text-left group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-none bg-electric/10 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-electric" />
                        </div>
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground">Transition & Cutover Plan</h4>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mt-0.5">Highly recommended for Cloud Migration proposals</p>
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-electric opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>

                {/* Standard Library */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted uppercase tracking-wider mb-3">Standard Library</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Pricing Narrative', 'Quality Assurance Plan', 'Risk Management', 'Subcontractor Details', 'Resumes & Bios', 'Corporate History'].map((section) => (
                      <button key={section} className="flex items-center justify-between p-3 rounded-none border border-white/10 bg-[#0A0A0A] hover:bg-white/5 hover:border-white/20 transition-all text-left group">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-foreground">{section}</span>
                        <Plus className="w-4 h-4 text-foreground-muted group-hover:text-foreground transition-colors" />
                      </button>
                    ))}
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
