import React, { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, FileText, Loader2, X, ChevronRight, Check, Sparkles, Link as LinkIcon, Type, FileEdit, PenTool, Settings, Play, RefreshCw, SlidersHorizontal, CheckSquare, Square, Briefcase, MessageSquare, Code, TrendingUp, Info, ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 'upload', name: 'Upload', description: 'Source Material' },
  { id: 'review', name: 'Review', description: 'Verify Extraction' },
  { id: 'bid', name: 'Bid Decision', description: 'Go/No-Go' },
  { id: 'configure', name: 'Configure', description: 'Template + Strategy' },
  { id: 'generate', name: 'Generate', description: 'AI Writes Proposal' },
];

const TONES = [
  { id: 'Professional', label: 'Professional', desc: 'Formal, business-appropriate tone. Best for most government and enterprise RFPs. Use when the evaluator is a procurement officer or contracting official.' },
  { id: 'Conversational', label: 'Conversational', desc: 'Approachable, friendly while professional' },
  { id: 'Technical', label: 'Technical', desc: 'Detailed, precise, specification-focused' },
  { id: 'Executive', label: 'Executive', desc: 'High-level, strategic, outcome-focused' },
];

const PROPOSAL_SECTIONS = [
  { id: 'Cover Letter', label: 'Cover Letter', type: 'standard' },
  { id: 'Executive Summary', label: 'Executive Summary', type: 'required' },
  { id: 'Understanding of Client Needs', label: 'Understanding of Client Needs', type: 'required' },
  { id: 'Proposed Approach', label: 'Proposed Approach', type: 'rfp_required', desc: 'Required to demonstrate ability to manage complex IT infrastructure and executive-level support.' },
  { id: 'Methodology', label: 'Methodology', type: 'standard' },
  { id: 'Proposed Team & Qualifications', label: 'Proposed Team & Qualifications', type: 'standard' },
  { id: 'Relevant Experience & Case Studies', label: 'Relevant Experience & Case Studies', type: 'rfp_required', desc: 'Explicitly required to demonstrate ability to meet objectives and customer needs.' },
  { id: 'Timeline & Milestones', label: 'Timeline & Milestones', type: 'standard' },
  { id: 'Commercial Framework', label: 'Commercial Framework', type: 'standard' },
  { id: 'Risk Mitigation', label: 'Risk Mitigation', type: 'optional' },
  { id: 'Why Us', label: 'Why Us', type: 'standard' },
  { id: 'Company Profile: General Business Information', label: 'Company Profile: General Business Information', type: 'rfp_required', desc: 'Explicitly required by the RFI response instructions.' },
];

export function ProposalWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Step 1 State (Upload)
  const [entryMethod, setEntryMethod] = useState<'upload' | 'paste' | 'describe' | 'url' | 'manual'>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [researchClient, setResearchClient] = useState(true);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 2 State (Review)
  const [extractedData, setExtractedData] = useState({
    client: 'Department of Defense',
    scope: 'Cloud Migration Services',
    budget: '$5M - $10M',
    dueDate: '2026-04-15',
  });

  // Step 3 State (Bid Decision)
  const [bidScores, setBidScores] = useState({
    alignment: 85,
    strategicValue: 90,
    executionRisk: 70,
    competitivePosition: 80,
    resources: 75,
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['Cloud Platform', 'Security Suite']);

  // Step 4 State (Configure)
  const [solicitationType, setSolicitationType] = useState('Request for Information (auto-detected)');
  const [tone, setTone] = useState('Professional');
  const [selectedSections, setSelectedSections] = useState<string[]>(
    PROPOSAL_SECTIONS.filter(s => s.type !== 'optional').map(s => s.id)
  );
  
  // Win Themes & Strategy State
  const [winThemes, setWinThemes] = useState<string[]>([
    'Zero-Downtime Executive Operations for Uninterrupted Diplomacy',
    'Secure, Global Agility for Crisis Response and OCONUS Travel',
    'Proactive Threat Defense Across Classified and Unclassified Environments',
    'Modernized Mission Execution via Secure Cloud and DevOps Integration'
  ]);
  const [targetOutcomes, setTargetOutcomes] = useState([
    { id: 1, title: 'Maintain uninterrupted executive communications during global transit and crisis scenarios', category: 'Quality Improvement', impact: 'High' },
    { id: 2, title: 'Achieve 100% operational readiness for Continuity of Government (COG) protocols', category: 'Risk Reduction', impact: 'High' },
    { id: 3, title: 'Accelerate deployment of secure VTC and network infrastructure for pop-up diplomatic missions', category: 'Speed to Value', impact: 'High' },
    { id: 4, title: 'Prevent unauthorized access to classified executive data through continuous monitoring and Zero Trust architecture', category: 'Risk Reduction', impact: 'High' },
    { id: 5, title: 'Reduce executive IT issue resolution time through dedicated 24x7x365 white-glove concierge desks', category: 'Quality Improvement', impact: 'Medium' },
    { id: 6, title: 'Modernize legacy executive applications using automated DevOps pipelines in secure cloud environments', category: 'Innovation', impact: 'Medium' },
    { id: 7, title: 'Ensure continuous compliance with FISMA and State Department cybersecurity mandates across all ExecTech systems', category: 'Compliance', impact: 'High' },
    { id: 8, title: 'Decrease infrastructure maintenance costs by migrating legacy enterprise systems to secure cloud environments', category: 'Cost Optimization', impact: 'Low' },
  ]);
  const [differentiators, setDifferentiators] = useState([
    'Proven playbook for secure, rapid-deployment IT kits supporting Cabinet-level OCONUS travel and crisis response',
    'Cleared, white-glove support personnel trained specifically in executive diplomacy protocols and high-pressure crisis environments',
    'Integrated DevSecOps approach bridging classified and unclassified cloud environments for seamless executive data access'
  ]);
  const [competitiveIntel, setCompetitiveIntel] = useState('');
  const [isAdvancedOptionsOpen, setIsAdvancedOptionsOpen] = useState(false);

  // Step 5 State (Generate)
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<Record<string, 'pending' | 'generating' | 'complete' | 'failed'>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startExtraction = () => {
    if (entryMethod === 'manual') {
      setCurrentStep(2); // Skip to Bid Decision
      return;
    }
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setCurrentStep(1); // Go to Review
    }, 2500);
  };

  const startGeneration = () => {
    setIsGenerating(true);
    const initialProgress: Record<string, 'pending' | 'generating' | 'complete' | 'failed'> = {};
    selectedSections.forEach(sec => initialProgress[sec] = 'pending');
    setGenerationProgress(initialProgress);
    
    selectedSections.forEach((section, index) => {
      setTimeout(() => {
        setGenerationProgress(prev => ({ ...prev, [section]: 'generating' }));
        setTimeout(() => {
          setGenerationProgress(prev => ({ ...prev, [section]: 'complete' }));
          if (index === selectedSections.length - 1) {
            setIsGenerating(false);
          }
        }, 2000 + Math.random() * 2000);
      }, index * 1500);
    });
  };

  const handleQuickStart = () => {
    setCurrentStep(4);
  };

  const overallScore = Math.round((Object.values(bidScores) as number[]).reduce((a: number, b: number) => a + b, 0) / 5);

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] relative z-10">
      {/* Subtle Noise Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Wizard Sidebar */}
      <aside className="flex h-full w-[260px] flex-col bg-[#0A0A0A] border-r border-white/10 relative z-10">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <Link to="/proposals" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center bg-[#111116] border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold">
              IB
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-white group-hover:text-[#c084fc] transition-colors">
              IntentBid
            </span>
          </Link>
        </div>

        {/* Section Label */}
        <div className="px-5 pt-6 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">
            New Proposal
          </span>
        </div>

        {/* Steps */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {STEPS.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <li key={step.id}>
                  <button
                    onClick={() => {
                      if (isCompleted) setCurrentStep(index);
                    }}
                    disabled={!isCompleted && !isCurrent}
                    className={cn(
                      "w-full relative flex items-center text-left gap-3 px-3 py-3 transition-all border border-transparent",
                      isCurrent ? "bg-[#111116] border-white/10" : isCompleted ? "hover:bg-white/5 cursor-pointer" : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {/* Active accent bar */}
                    {isCurrent && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8b5cf6]" />
                    )}

                    {/* Step Indicator */}
                    {isCompleted && !isCurrent ? (
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    ) : isCurrent ? (
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center bg-[#8b5cf6] text-white text-[10px] font-bold font-mono">
                        {index + 1}
                      </span>
                    ) : (
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-white/10 text-foreground-muted text-[10px] font-mono">
                        {index + 1}
                      </span>
                    )}

                    <div className="min-w-0 flex flex-col">
                      <p className={cn(
                        "text-[10px] font-bold uppercase tracking-widest truncate",
                        isCurrent ? "text-white" : isCompleted ? "text-foreground-muted" : "text-foreground-subtle"
                      )}>
                        {step.name}
                      </p>
                      {isCurrent && (
                        <p className="text-[10px] font-mono text-foreground-subtle truncate mt-0.5">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Exit Button */}
        <div className="px-3 pb-5">
          <Link
            to="/proposals"
            className="flex w-full items-center justify-center gap-2 border border-white/10 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground-muted hover:text-white hover:bg-white/[0.02] transition-all"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Exit Wizard
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-3xl mx-auto">
            
            {/* Step 1: Upload */}
            {currentStep === 0 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-sm uppercase tracking-widest font-bold text-white uppercase tracking-tight">Source Material</h2>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted mt-2">Provide the solicitation documents or details to begin.</p>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: 'upload', icon: Upload, label: 'Upload Files' },
                    { id: 'paste', icon: FileEdit, label: 'Paste Content' },
                    { id: 'describe', icon: Type, label: 'Describe It' },
                    { id: 'url', icon: LinkIcon, label: 'Import URL' },
                    { id: 'manual', icon: PenTool, label: 'Manual Entry' },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setEntryMethod(method.id as any)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 p-4 border transition-all",
                        entryMethod === method.id 
                          ? "border-[#8b5cf6] bg-[#8b5cf6]/10 text-white" 
                          : "border-white/10 bg-[#0A0A0A] text-foreground-muted hover:border-white/20 hover:text-white"
                      )}
                    >
                      <method.icon size={20} className={entryMethod === method.id ? 'text-[#c084fc]' : ''} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-center mt-2">{method.label}</span>
                    </button>
                  ))}
                </div>

                {entryMethod === 'upload' && (
                  <div 
                    className={cn(
                      "flex justify-center border-2 border-dashed px-6 py-16 transition-colors",
                      uploadedFiles.length > 0 ? "border-white/10 bg-[#0A0A0A]" : "border-white/10 hover:border-white/20 bg-[#0A0A0A]"
                    )}
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-foreground-muted" aria-hidden="true" />
                      <div className="mt-4 flex text-[10px] uppercase tracking-widest font-bold leading-6 text-foreground-muted justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer font-bold text-[#c084fc] hover:text-white transition-colors"
                        >
                          <span>Upload files</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            multiple
                            className="sr-only" 
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx,.txt"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-[10px] font-mono leading-5 text-foreground-subtle mt-2">PDF, DOCX, TXT up to 50MB</p>
                    </div>
                  </div>
                )}

                {entryMethod !== 'upload' && (
                  <div className="border border-white/10 bg-[#0A0A0A] p-6">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted text-center py-8">
                      {entryMethod === 'paste' && "Paste your RFP content here..."}
                      {entryMethod === 'describe' && "Describe the opportunity in your own words..."}
                      {entryMethod === 'url' && "Enter the URL of the solicitation..."}
                      {entryMethod === 'manual' && "Skip extraction and enter details manually in the next steps."}
                    </p>
                  </div>
                )}

                {uploadedFiles.length > 0 && entryMethod === 'upload' && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Uploaded Documents ({uploadedFiles.length})</h3>
                    <ul className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-between border border-white/10 bg-[#0A0A0A] p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#111116] border border-white/10">
                              <FileText className="h-5 w-5 text-[#c084fc]" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] uppercase tracking-widest font-bold text-white">{file.name}</span>
                              <span className="text-[10px] font-mono text-foreground-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFile(index)}
                            className="p-2 text-foreground-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="research" 
                    checked={researchClient}
                    onChange={(e) => setResearchClient(e.target.checked)}
                    className="border-white/10 text-[#8b5cf6] focus:ring-[#8b5cf6] bg-[#111116] w-4 h-4"
                  />
                  <label htmlFor="research" className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted">
                    Automatically research client background and recent news
                  </label>
                </div>

                {isExtracting && (
                  <div className="border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 p-8 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#c084fc]" />
                    <h3 className="mt-4 text-[10px] font-bold uppercase tracking-widest text-white">Analyzing & Extracting...</h3>
                    <p className="mt-2 text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Parsing structured fields and gathering company intel.</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Review */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-sm uppercase tracking-widest font-bold text-white">Verify Extraction</h2>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted mt-2">Review the extracted data, fix any gaps, and confirm details.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-foreground-subtle uppercase tracking-widest">Extracted Fields</h3>
                    <div className="border border-white/10 bg-[#0A0A0A] p-5 space-y-4">
                      {Object.entries(extractedData).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                          <input 
                            type="text" 
                            value={value}
                            onChange={(e) => setExtractedData(prev => ({ ...prev, [key]: e.target.value }))}
                            className="w-full bg-[#111116] border border-white/10 px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-foreground-subtle uppercase tracking-widest">Gap Checklist</h3>
                    <div className="bg-red-400/10 border border-red-400/20 p-5">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-red-400">Missing Information</h3>
                          <div className="mt-2 text-[10px] uppercase tracking-widest font-bold text-red-400/80 space-y-2 font-mono">
                            <p>We couldn't confidently extract the following fields:</p>
                            <ul className="list-disc pl-5">
                              <li>Incumbent Contractor</li>
                              <li>Security Clearance Level</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {researchClient && (
                      <div className="border border-white/10 bg-[#0A0A0A] p-5 mt-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2 mb-2">
                          <Sparkles size={16} className="text-[#c084fc]" />
                          Client Research
                        </h4>
                        <p className="text-[10px] uppercase tracking-widest font-bold font-mono text-foreground-muted leading-relaxed">
                          The DoD recently announced a major push for zero-trust architecture across all cloud migrations. Consider emphasizing our zero-trust capabilities.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Bid Decision */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-sm uppercase tracking-widest font-bold text-white">Bid Decision</h2>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted mt-2">Review AI bid scores and select product alignment.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 border border-white/10 bg-[#0A0A0A] p-8 flex flex-col items-center justify-center text-center">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={56 * 2 * Math.PI} strokeDashoffset={56 * 2 * Math.PI * (1 - (overallScore / 100))} className="text-[#8b5cf6] transition-all duration-1000 ease-out" />
                      </svg>
                      <div className="absolute text-2xl uppercase tracking-widest font-bold text-white">{overallScore}<span className="text-sm uppercase tracking-widest font-bold text-foreground-muted">%</span></div>
                    </div>
                    <div className="mt-6 text-[10px] font-bold uppercase tracking-widest text-white">Win Probability</div>
                    <div className="mt-2 inline-flex items-center bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 border border-emerald-400/20">
                      Recommended: BID
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-6">
                    <div className="border border-white/10 bg-[#0A0A0A] p-6 space-y-6">
                      <h3 className="text-[10px] font-bold text-foreground-subtle uppercase tracking-widest flex items-center justify-between">
                        <span>Scoring Factors</span>
                        <SlidersHorizontal size={14} />
                      </h3>
                      <div className="space-y-5">
                        {Object.entries(bidScores).map(([key, score]) => (
                          <div key={key}>
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest mb-2">
                              <span className="text-white font-bold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="font-bold text-[#c084fc]">{score}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" max="100" 
                              value={score}
                              onChange={(e) => setBidScores(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                              className="w-full h-2 bg-[#111116] appearance-none cursor-pointer accent-[#8b5cf6]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border border-white/10 bg-[#0A0A0A] p-6 space-y-4">
                      <h3 className="text-[10px] font-bold text-foreground-subtle uppercase tracking-widest">Product Alignment</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Cloud Platform', 'Security Suite', 'Managed Services', 'Training'].map(product => (
                          <button
                            key={product}
                            onClick={() => {
                              setSelectedProducts(prev => 
                                prev.includes(product) ? prev.filter(p => p !== product) : [...prev, product]
                              )
                            }}
                            className={cn(
                              "px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-colors",
                              selectedProducts.includes(product) 
                                ? "bg-[#8b5cf6]/10 border-[#8b5cf6] text-white" 
                                : "bg-[#111116] border-white/10 text-foreground-muted hover:border-white/20 hover:text-white"
                            )}
                          >
                            {product}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Configure */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                <div>
                  <h2 className="text-sm uppercase tracking-widest font-bold text-white">Configure Proposal</h2>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted mt-2">Review the AI-generated strategy and confirm document settings.</p>
                </div>

                <div className="space-y-8">
                  {/* AI Strategy Summary Card */}
                  <div className="border border-[#8b5cf6]/30 bg-[#8b5cf6]/5 p-6 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 p-4 opacity-10 pointer-events-none">
                      <Sparkles className="w-40 h-40 text-[#c084fc]" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-[#c084fc]" />
                          <h3 className="text-sm uppercase tracking-widest font-bold text-white">AI-Generated Strategy</h3>
                        </div>
                        <button 
                          onClick={() => setIsAdvancedOptionsOpen(!isAdvancedOptionsOpen)}
                          className="text-[10px] font-bold uppercase tracking-widest text-[#c084fc] hover:text-white transition-colors"
                        >
                          {isAdvancedOptionsOpen ? 'Collapse Strategy' : 'Edit Strategy'}
                        </button>
                      </div>
                      
                      {!isAdvancedOptionsOpen ? (
                        <div className="space-y-5">
                          <div>
                            <div className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mb-2">Win Themes</div>
                            <div className="flex flex-wrap gap-2">
                              {winThemes.slice(0, 3).map((theme, i) => (
                                <span key={i} className="bg-[#111116] border border-white/10 text-white px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest">
                                  {theme}
                                </span>
                              ))}
                              {winThemes.length > 3 && (
                                <span className="bg-[#0A0A0A] border border-white/10 text-foreground-muted px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest">
                                  +{winThemes.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mb-2">Key Differentiators</div>
                            <ul className="space-y-2">
                              {differentiators.slice(0, 2).map((diff, i) => (
                                <li key={i} className="flex items-start gap-3 text-[10px] uppercase tracking-widest font-bold text-foreground-subtle bg-[#111116] p-2.5 border border-white/10 font-mono">
                                  <div className="w-1.5 h-1.5 bg-[#8b5cf6] mt-2 shrink-0" />
                                  <span className="leading-relaxed">{diff}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-white">Win Themes</label>
                              <button className="text-[10px] font-bold uppercase tracking-widest text-[#c084fc] hover:text-white transition-colors flex items-center gap-1">
                                <Plus size={14} /> Add Theme
                              </button>
                            </div>
                            <div className="space-y-2">
                              {winThemes.map((theme, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <input 
                                    type="text" 
                                    value={theme}
                                    onChange={(e) => {
                                      const newThemes = [...winThemes];
                                      newThemes[i] = e.target.value;
                                      setWinThemes(newThemes);
                                    }}
                                    className="flex-1 bg-[#111116] border border-white/10 px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:border-[#8b5cf6] font-mono"
                                  />
                                  <button 
                                    onClick={() => setWinThemes(prev => prev.filter((_, index) => index !== i))}
                                    className="p-2 text-foreground-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-white">Key Differentiators</label>
                              <button className="text-[10px] font-bold uppercase tracking-widest text-[#c084fc] hover:text-white transition-colors flex items-center gap-1">
                                <Plus size={14} /> Add Differentiator
                              </button>
                            </div>
                            <div className="space-y-2">
                              {differentiators.map((diff, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <textarea 
                                    value={diff}
                                    onChange={(e) => {
                                      const newDiffs = [...differentiators];
                                      newDiffs[i] = e.target.value;
                                      setDifferentiators(newDiffs);
                                    }}
                                    className="flex-1 min-h-[60px] bg-[#111116] border border-white/10 px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:border-[#8b5cf6] resize-y font-mono"
                                  />
                                  <button 
                                    onClick={() => setDifferentiators(prev => prev.filter((_, index) => index !== i))}
                                    className="p-2 mt-1 text-foreground-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Setup */}
                  <div className="space-y-5">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">Document Setup</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Template</label>
                        <select 
                          value={solicitationType}
                          onChange={(e) => setSolicitationType(e.target.value)}
                          className="w-full bg-[#111116] border border-white/10 hover:border-white/20 px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:border-[#8b5cf6] transition-colors font-mono"
                        >
                          <option>Standard RFP Response</option>
                          <option>Executive Proposal</option>
                          <option>Short-Form Quote</option>
                          <option>Request for Information (RFI)</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Voice & Tone</label>
                        <select 
                          value={tone}
                          onChange={(e) => setTone(e.target.value)}
                          className="w-full bg-[#111116] border border-white/10 hover:border-white/20 px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:border-[#8b5cf6] transition-colors font-mono"
                        >
                          {TONES.map(t => (
                            <option key={t.id} value={t.id}>{t.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Included Sections */}
                  <div className="border border-white/10 bg-[#0A0A0A] p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">Included Sections</h3>
                        <p className="text-[10px] font-mono text-foreground-muted mt-1">
                          Auto-configured based on RFP requirements. Uncheck to exclude sections from generation.
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#c084fc] bg-[#8b5cf6]/10 px-4 py-2 whitespace-nowrap border border-[#8b5cf6]/20">
                        {selectedSections.length} Selected
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {PROPOSAL_SECTIONS.map(section => (
                        <label 
                          key={section.id} 
                          className={cn(
                            "flex items-center gap-3 p-4 border cursor-pointer transition-all",
                            selectedSections.includes(section.id)
                              ? "bg-[#111116] border-[#8b5cf6]/40"
                              : "bg-[#0A0A0A] border-white/10 opacity-70 hover:opacity-100 hover:border-white/20"
                          )}
                        >
                          <input 
                            type="checkbox"
                            checked={selectedSections.includes(section.id)}
                            onChange={() => {
                              setSelectedSections(prev => 
                                prev.includes(section.id) ? prev.filter(s => s !== section.id) : [...prev, section.id]
                              )
                            }}
                            className="border-white/10 text-[#8b5cf6] focus:ring-[#8b5cf6] bg-[#111116] w-5 h-5 shrink-0"
                          />
                          <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-white">{section.label}</span>
                              {section.desc && (
                                <span className="text-[10px] font-mono text-foreground-muted mt-0.5">{section.desc}</span>
                              )}
                            </div>
                            {(section.type === 'required' || section.type === 'rfp_required') && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 shrink-0 bg-amber-500/10 px-2.5 py-1 border border-amber-500/20">Required</span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Generate */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col pb-20">
                <div>
                  <h2 className="text-sm uppercase tracking-widest font-bold text-white uppercase tracking-tight">Generate Proposal</h2>
                  <p className="text-[10px] font-mono text-foreground-muted mt-2 uppercase tracking-widest">IntentBid is now writing the proposal sections concurrently.</p>
                </div>
                
                {!isGenerating && Object.keys(generationProgress).length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center border border-white/10 hover:border-white/20 transition-colors bg-[#0A0A0A] p-12 text-center mt-4">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-[#8b5cf6]/20 blur-2xl" />
                      <div className="relative bg-[#111116] border border-[#8b5cf6]/30 w-24 h-24 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                        <Sparkles className="w-10 h-10 text-[#c084fc]" />
                      </div>
                    </div>
                    <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-3 uppercase tracking-tight">Ready to Draft Your Proposal</h3>
                    <p className="text-[10px] font-mono text-foreground-muted max-w-lg mb-8 leading-relaxed uppercase tracking-widest">
                      Our AI will now draft <strong className="text-white">{selectedSections.length} sections</strong> using the <strong className="text-white">{solicitationType}</strong> template, matching a <strong className="text-white">{TONES.find(t => t.id === tone)?.label?.toLowerCase() || 'professional'}</strong> tone, and weaving in your <strong className="text-white">{winThemes.length} win themes</strong>.
                    </p>
                    <button 
                      onClick={startGeneration}
                      className="bg-white hover:bg-gray-200 text-black px-8 py-4 font-bold text-[10px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center gap-3 active:scale-95"
                    >
                      <Play size={16} className="fill-current" />
                      Start AI Generation
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px] mt-4">
                    {/* Left: Progress List */}
                    <div className="lg:col-span-1 border border-white/10 bg-[#0A0A0A] p-5 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">Generation Status</h3>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c084fc] bg-[#8b5cf6]/10 px-2.5 py-1 border border-[#8b5cf6]/20">
                          {Object.values(generationProgress).filter(s => s === 'complete').length} / {Object.keys(generationProgress).length}
                        </span>
                      </div>
                      
                      <div className="w-full bg-[#111116] h-1.5 mb-6 overflow-hidden border border-white/5">
                        <div 
                          className="bg-[#8b5cf6] h-full transition-all duration-500 ease-out" 
                          style={{ width: `${(Object.values(generationProgress).filter(s => s === 'complete').length / Math.max(1, Object.keys(generationProgress).length)) * 100}%` }}
                        />
                      </div>

                      <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                        {Object.entries(generationProgress).map(([section, status]) => (
                          <div key={section} className={cn(
                            "flex items-center gap-3 p-3 border transition-colors",
                            status === 'generating' ? "bg-[#8b5cf6]/5 border-[#8b5cf6]/30" :
                            status === 'complete' ? "bg-emerald-500/5 border-emerald-500/20" :
                            "bg-[#111116] border-white/5"
                          )}>
                            {status === 'complete' ? (
                              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                            ) : status === 'generating' ? (
                              <Loader2 className="h-4 w-4 text-[#c084fc] animate-spin shrink-0" />
                            ) : status === 'failed' ? (
                              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                            ) : (
                              <div className="h-4 w-4 border-2 border-white/10 shrink-0" />
                            )}
                            <span className={cn(
                              "text-[10px] font-mono uppercase tracking-widest truncate",
                              status === 'complete' ? "text-white" : 
                              status === 'generating' ? "text-[#c084fc]" : "text-foreground-muted"
                            )}>
                              {section}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Live Preview / Terminal */}
                    <div className="lg:col-span-2 border border-white/10 bg-[#050505] overflow-hidden flex flex-col relative">
                      <div className="bg-[#0A0A0A] border-b border-white/10 px-4 py-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 bg-red-500/80" />
                          <div className="w-2.5 h-2.5 bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 bg-emerald-500/80" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono ml-2">intentbid-ai-engine.log</span>
                      </div>
                      
                      <div className="p-6 font-mono text-[10px] uppercase tracking-widest text-white/70 overflow-y-auto flex-1 custom-scrollbar space-y-6">
                        {Object.entries(generationProgress).map(([section, status]) => {
                          if (status === 'pending') return null;
                          return (
                            <div key={section} className="animate-in fade-in slide-in-from-bottom-2">
                              <div className="flex items-center gap-2 text-[#c084fc] mb-2">
                                <span className="text-white/30">{`[${new Date().toISOString().split('T')[1].split('.')[0]}]`}</span>
                                <span>{`> Generating section: ${section}...`}</span>
                              </div>
                              {status === 'generating' && (
                                <div className="pl-4 border-l border-[#8b5cf6]/30 ml-2 space-y-3 py-2">
                                  <div className="h-1.5 bg-white/10 w-3/4 animate-pulse" />
                                  <div className="h-1.5 bg-white/10 w-full animate-pulse" />
                                  <div className="h-1.5 bg-white/10 w-5/6 animate-pulse" />
                                  <div className="h-1.5 bg-white/10 w-1/2 animate-pulse" />
                                </div>
                              )}
                              {status === 'complete' && (
                                <div className="flex items-center gap-2 text-emerald-500">
                                  <span className="text-white/30">{`[${new Date().toISOString().split('T')[1].split('.')[0]}]`}</span>
                                  <span>{`✓ Successfully drafted ${section} (2.4s)`}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {isGenerating && (
                          <div className="flex items-center gap-2 text-white/50 mt-4">
                            <span className="animate-pulse">_</span>
                          </div>
                        )}
                      </div>

                      {/* Success Overlay */}
                      {!isGenerating && Object.values(generationProgress).length > 0 && Object.values(generationProgress).every(s => s === 'complete') && (
                        <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-500 z-10">
                          <div className="bg-[#0A0A0A] border border-white/10 p-8 text-center max-w-md shadow-2xl">
                            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                              <CheckCircle className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-base uppercase tracking-widest font-bold text-white mb-2">Proposal Generated!</h3>
                            <p className="text-[10px] font-mono text-foreground-muted mb-6 uppercase tracking-widest">
                              All sections have been drafted successfully. You can now review, edit, and collaborate in the workspace.
                            </p>
                            <button 
                              onClick={() => navigate('/workspace')}
                              className="w-full bg-white hover:bg-gray-200 text-black px-6 py-3 font-bold text-[10px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
                            >
                              Go to Workspace <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#0A0A0A] border-t border-white/10 flex justify-between items-center z-10">
          <button 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0 || isExtracting || isGenerating}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground-muted hover:text-white disabled:opacity-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            {currentStep === 1 && (
              <button 
                onClick={handleQuickStart}
                className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#c084fc] hover:text-white transition-colors"
              >
                Quick Start (Skip to Generate)
              </button>
            )}
            
            {currentStep === 0 ? (
              <button 
                onClick={startExtraction}
                disabled={isExtracting || (entryMethod === 'upload' && uploadedFiles.length === 0)}
                className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExtracting ? (
                  <><Loader2 size={16} className="animate-spin" /> Processing...</>
                ) : (
                  <>Analyze & Extract <ArrowRight size={16} /></>
                )}
              </button>
            ) : currentStep === 4 ? (
              <button 
                disabled={isGenerating || Object.keys(generationProgress).length === 0 || Object.values(generationProgress).some(s => s !== 'complete')}
                onClick={() => navigate('/workspace')}
                className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Go to Workspace <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
                disabled={currentStep === 3 && selectedSections.length === 0}
                className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 2 ? 'Bid & Continue' : 'Continue'} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
