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
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Wizard Sidebar */}
      <aside className="flex h-full w-[260px] flex-col bg-background-secondary border-r border-border">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-border">
          <Link to="/proposals" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric text-background text-sm font-bold">
              IB
            </div>
            <span className="text-sm font-semibold text-foreground group-hover:text-electric transition-colors">
              IntentBid
            </span>
          </Link>
        </div>

        {/* Section Label */}
        <div className="px-5 pt-6 pb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
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
                      "w-full relative flex items-center text-left gap-3 rounded-xl px-3 py-3 transition-all",
                      isCurrent ? "bg-background-tertiary" : isCompleted ? "hover:bg-background-tertiary cursor-pointer" : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {/* Active accent bar */}
                    {isCurrent && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-electric shadow-[0_0_8px_var(--color-electric)]" />
                    )}

                    {/* Step Indicator */}
                    {isCompleted && !isCurrent ? (
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-success-subtle text-success">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    ) : isCurrent ? (
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-electric text-background text-xs font-bold">
                        {index + 1}
                      </span>
                    ) : (
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted text-xs">
                        {index + 1}
                      </span>
                    )}

                    <div className="min-w-0 flex flex-col">
                      <p className={cn(
                        "text-sm font-medium truncate",
                        isCurrent ? "text-foreground" : isCompleted ? "text-foreground-muted" : "text-foreground-subtle"
                      )}>
                        {step.name}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-foreground-subtle truncate mt-0.5">
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
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground-muted hover:text-foreground hover:border-foreground-subtle hover:bg-background-tertiary transition-all"
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
                  <h2 className="text-2xl font-display font-bold text-foreground">Source Material</h2>
                  <p className="text-foreground-muted mt-2">Provide the solicitation documents or details to begin.</p>
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
                        "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all",
                        entryMethod === method.id 
                          ? "border-electric bg-electric-subtle text-electric" 
                          : "border-border bg-background-secondary text-foreground-muted hover:border-border-focus hover:bg-background-tertiary"
                      )}
                    >
                      <method.icon size={20} />
                      <span className="text-xs font-medium text-center">{method.label}</span>
                    </button>
                  ))}
                </div>

                {entryMethod === 'upload' && (
                  <div 
                    className={cn(
                      "flex justify-center rounded-xl border-2 border-dashed px-6 py-16 transition-colors",
                      uploadedFiles.length > 0 ? "border-border bg-background-tertiary" : "border-border hover:border-electric/50 bg-background-tertiary"
                    )}
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-foreground-muted" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-foreground-muted justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-electric focus-within:outline-none focus-within:ring-2 focus-within:ring-electric hover:text-electric-dim"
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
                      <p className="text-xs leading-5 text-foreground-subtle mt-2">PDF, DOCX, TXT up to 50MB</p>
                    </div>
                  </div>
                )}

                {entryMethod !== 'upload' && (
                  <div className="rounded-xl border border-border bg-background-secondary p-6">
                    <p className="text-sm text-foreground-muted text-center py-8">
                      {entryMethod === 'paste' && "Paste your RFP content here..."}
                      {entryMethod === 'describe' && "Describe the opportunity in your own words..."}
                      {entryMethod === 'url' && "Enter the URL of the solicitation..."}
                      {entryMethod === 'manual' && "Skip extraction and enter details manually in the next steps."}
                    </p>
                  </div>
                )}

                {uploadedFiles.length > 0 && entryMethod === 'upload' && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-foreground">Uploaded Documents ({uploadedFiles.length})</h3>
                    <ul className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-between rounded-xl border border-border bg-background-secondary p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-background-tertiary rounded-lg">
                              <FileText className="h-5 w-5 text-electric" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-foreground">{file.name}</span>
                              <span className="text-xs text-foreground-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFile(index)}
                            className="p-2 text-foreground-muted hover:text-warning hover:bg-warning-subtle rounded-lg transition-colors"
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
                    className="rounded border-border bg-background text-electric focus:ring-electric"
                  />
                  <label htmlFor="research" className="text-sm text-foreground">
                    Automatically research client background and recent news
                  </label>
                </div>

                {isExtracting && (
                  <div className="rounded-xl border border-electric/30 bg-electric-subtle p-8 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-electric" />
                    <h3 className="mt-4 text-sm font-bold text-foreground">Analyzing & Extracting...</h3>
                    <p className="mt-2 text-sm text-foreground-muted">Parsing structured fields and gathering company intel.</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Review */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Verify Extraction</h2>
                  <p className="text-foreground-muted mt-2">Review the extracted data, fix any gaps, and confirm details.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-foreground-subtle uppercase tracking-wider">Extracted Fields</h3>
                    <div className="rounded-xl border border-border bg-background-secondary p-5 space-y-4">
                      {Object.entries(extractedData).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <label className="text-xs text-foreground-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                          <input 
                            type="text" 
                            value={value}
                            onChange={(e) => setExtractedData(prev => ({ ...prev, [key]: e.target.value }))}
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-foreground-subtle uppercase tracking-wider">Gap Checklist</h3>
                    <div className="rounded-xl bg-warning-subtle border border-warning-muted p-5">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-warning" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-bold text-warning">Missing Information</h3>
                          <div className="mt-2 text-sm text-warning/80 space-y-2">
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
                      <div className="rounded-xl border border-border bg-background-secondary p-5 mt-4">
                        <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                          <Sparkles size={16} className="text-electric" />
                          Client Research
                        </h4>
                        <p className="text-xs text-foreground-muted leading-relaxed">
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
                  <h2 className="text-2xl font-display font-bold text-foreground">Bid Decision</h2>
                  <p className="text-foreground-muted mt-2">Review AI bid scores and select product alignment.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 rounded-xl border border-border bg-background-secondary p-8 flex flex-col items-center justify-center text-center">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-border" />
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={56 * 2 * Math.PI} strokeDashoffset={56 * 2 * Math.PI * (1 - (overallScore / 100))} className="text-electric transition-all duration-1000 ease-out" />
                      </svg>
                      <div className="absolute text-4xl font-display font-bold text-foreground">{overallScore}<span className="text-2xl text-foreground-muted">%</span></div>
                    </div>
                    <div className="mt-6 text-lg font-bold text-foreground">Win Probability</div>
                    <div className="mt-2 inline-flex items-center rounded-full bg-success-subtle px-3 py-1 text-xs font-bold text-success">
                      Recommended: BID
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-6">
                    <div className="rounded-xl border border-border bg-background-secondary p-6 space-y-6">
                      <h3 className="text-xs font-bold text-foreground-subtle uppercase tracking-wider flex items-center justify-between">
                        <span>Scoring Factors</span>
                        <SlidersHorizontal size={14} />
                      </h3>
                      <div className="space-y-5">
                        {Object.entries(bidScores).map(([key, score]) => (
                          <div key={key}>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-foreground font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="font-bold text-electric">{score}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" max="100" 
                              value={score}
                              onChange={(e) => setBidScores(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                              className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer accent-electric"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="rounded-xl border border-border bg-background-secondary p-6 space-y-4">
                      <h3 className="text-xs font-bold text-foreground-subtle uppercase tracking-wider">Product Alignment</h3>
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
                              "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
                              selectedProducts.includes(product) 
                                ? "bg-electric-subtle border-electric text-electric" 
                                : "bg-background border-border text-foreground-muted hover:border-foreground-subtle"
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
                  <h2 className="text-2xl font-display font-bold text-foreground">Configure Proposal</h2>
                  <p className="text-foreground-muted mt-2">Review the AI-generated strategy and confirm document settings.</p>
                </div>

                <div className="space-y-8">
                  {/* AI Strategy Summary Card */}
                  <div className="rounded-xl border border-electric/30 bg-electric/5 p-6 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 p-4 opacity-10 pointer-events-none">
                      <Sparkles className="w-40 h-40 text-electric" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-electric" />
                          <h3 className="text-lg font-bold text-foreground">AI-Generated Strategy</h3>
                        </div>
                        <button 
                          onClick={() => setIsAdvancedOptionsOpen(!isAdvancedOptionsOpen)}
                          className="text-sm font-bold text-electric hover:underline"
                        >
                          {isAdvancedOptionsOpen ? 'Collapse Strategy' : 'Edit Strategy'}
                        </button>
                      </div>
                      
                      {!isAdvancedOptionsOpen ? (
                        <div className="space-y-5">
                          <div>
                            <div className="text-xs font-bold text-foreground-muted uppercase tracking-wider mb-2">Win Themes</div>
                            <div className="flex flex-wrap gap-2">
                              {winThemes.slice(0, 3).map((theme, i) => (
                                <span key={i} className="bg-background border border-border text-foreground px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm">
                                  {theme}
                                </span>
                              ))}
                              {winThemes.length > 3 && (
                                <span className="bg-background-secondary border border-border text-foreground-muted px-3 py-1.5 rounded-lg text-xs font-medium">
                                  +{winThemes.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-xs font-bold text-foreground-muted uppercase tracking-wider mb-2">Key Differentiators</div>
                            <ul className="space-y-2">
                              {differentiators.slice(0, 2).map((diff, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-foreground-subtle bg-background/50 p-2.5 rounded-lg border border-border/50">
                                  <div className="w-1.5 h-1.5 rounded-full bg-electric mt-2 shrink-0" />
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
                              <label className="text-sm font-bold text-foreground">Win Themes</label>
                              <button className="text-xs font-bold text-electric hover:underline flex items-center gap-1">
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
                                    className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-electric"
                                  />
                                  <button 
                                    onClick={() => setWinThemes(prev => prev.filter((_, index) => index !== i))}
                                    className="p-2 text-foreground-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-bold text-foreground">Key Differentiators</label>
                              <button className="text-xs font-bold text-electric hover:underline flex items-center gap-1">
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
                                    className="flex-1 min-h-[60px] bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-electric resize-y"
                                  />
                                  <button 
                                    onClick={() => setDifferentiators(prev => prev.filter((_, index) => index !== i))}
                                    className="p-2 mt-1 text-foreground-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
                    <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">Document Setup</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-foreground">Template</label>
                        <select 
                          value={solicitationType}
                          onChange={(e) => setSolicitationType(e.target.value)}
                          className="w-full bg-background-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-electric transition-colors"
                        >
                          <option>Standard RFP Response</option>
                          <option>Executive Proposal</option>
                          <option>Short-Form Quote</option>
                          <option>Request for Information (RFI)</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-bold text-foreground">Voice & Tone</label>
                        <select 
                          value={tone}
                          onChange={(e) => setTone(e.target.value)}
                          className="w-full bg-background-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-electric transition-colors"
                        >
                          {TONES.map(t => (
                            <option key={t.id} value={t.id}>{t.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Included Sections */}
                  <div className="rounded-xl border border-border bg-background-secondary p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Included Sections</h3>
                        <p className="text-sm text-foreground-muted mt-1">
                          Auto-configured based on RFP requirements. Uncheck to exclude sections from generation.
                        </p>
                      </div>
                      <span className="text-sm font-bold text-electric bg-electric/10 px-4 py-2 rounded-full whitespace-nowrap">
                        {selectedSections.length} Selected
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {PROPOSAL_SECTIONS.map(section => (
                        <label 
                          key={section.id} 
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                            selectedSections.includes(section.id)
                              ? "bg-background border-electric/40 shadow-sm"
                              : "bg-background/40 border-border opacity-70 hover:opacity-100 hover:border-foreground-subtle"
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
                            className="rounded border-border text-electric focus:ring-electric bg-background w-5 h-5 shrink-0"
                          />
                          <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-foreground">{section.label}</span>
                              {section.desc && (
                                <span className="text-xs text-foreground-muted mt-0.5">{section.desc}</span>
                              )}
                            </div>
                            {(section.type === 'required' || section.type === 'rfp_required') && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 shrink-0 bg-amber-500/10 px-2.5 py-1 rounded-full">Required</span>
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
                  <h2 className="text-2xl font-display font-bold text-foreground">Generate Proposal</h2>
                  <p className="text-foreground-muted mt-2">IntentBid is now writing the proposal sections concurrently.</p>
                </div>
                
                {!isGenerating && Object.keys(generationProgress).length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl bg-background-secondary/50 p-12 text-center mt-4">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-electric/20 blur-2xl rounded-full" />
                      <div className="relative bg-background border border-electric/30 w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl shadow-electric/10">
                        <Sparkles className="w-10 h-10 text-electric" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3">Ready to Draft Your Proposal</h3>
                    <p className="text-foreground-muted max-w-lg mb-8 leading-relaxed">
                      Our AI will now draft <strong className="text-foreground">{selectedSections.length} sections</strong> using the <strong className="text-foreground">{solicitationType}</strong> template, matching a <strong className="text-foreground">{TONES.find(t => t.id === tone)?.label?.toLowerCase() || 'professional'}</strong> tone, and weaving in your <strong className="text-foreground">{winThemes.length} win themes</strong>.
                    </p>
                    <button 
                      onClick={startGeneration}
                      className="bg-electric hover:bg-electric-dim text-background px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-electric/25 flex items-center gap-3 hover:scale-105 active:scale-95"
                    >
                      <Play size={20} className="fill-current" />
                      Start AI Generation
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px] mt-4">
                    {/* Left: Progress List */}
                    <div className="lg:col-span-1 rounded-xl border border-border bg-background-secondary p-5 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-foreground">Generation Status</h3>
                        <span className="text-xs font-bold text-electric bg-electric/10 px-2.5 py-1 rounded-full">
                          {Object.values(generationProgress).filter(s => s === 'complete').length} / {Object.keys(generationProgress).length}
                        </span>
                      </div>
                      
                      <div className="w-full bg-background-tertiary rounded-full h-1.5 mb-6 overflow-hidden">
                        <div 
                          className="bg-electric h-full transition-all duration-500 ease-out" 
                          style={{ width: `${(Object.values(generationProgress).filter(s => s === 'complete').length / Math.max(1, Object.keys(generationProgress).length)) * 100}%` }}
                        />
                      </div>

                      <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                        {Object.entries(generationProgress).map(([section, status]) => (
                          <div key={section} className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                            status === 'generating' ? "bg-electric/5 border-electric/30" :
                            status === 'complete' ? "bg-success/5 border-success/20" :
                            "bg-background border-border"
                          )}>
                            {status === 'complete' ? (
                              <CheckCircle className="h-4 w-4 text-success shrink-0" />
                            ) : status === 'generating' ? (
                              <Loader2 className="h-4 w-4 text-electric animate-spin shrink-0" />
                            ) : status === 'failed' ? (
                              <AlertCircle className="h-4 w-4 text-warning shrink-0" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-border shrink-0" />
                            )}
                            <span className={cn(
                              "text-sm truncate",
                              status === 'complete' ? "text-foreground font-medium" : 
                              status === 'generating' ? "text-electric font-bold" : "text-foreground-muted"
                            )}>
                              {section}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Live Preview / Terminal */}
                    <div className="lg:col-span-2 rounded-xl border border-border bg-[#0D0D12] overflow-hidden flex flex-col relative">
                      <div className="bg-[#1A1A24] border-b border-white/10 px-4 py-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs text-white/40 font-mono ml-2">intentbid-ai-engine.log</span>
                      </div>
                      
                      <div className="p-6 font-mono text-sm text-white/70 overflow-y-auto flex-1 custom-scrollbar space-y-6">
                        {Object.entries(generationProgress).map(([section, status]) => {
                          if (status === 'pending') return null;
                          return (
                            <div key={section} className="animate-in fade-in slide-in-from-bottom-2">
                              <div className="flex items-center gap-2 text-electric mb-2">
                                <span className="text-white/30">{`[${new Date().toISOString().split('T')[1].split('.')[0]}]`}</span>
                                <span>{`> Generating section: ${section}...`}</span>
                              </div>
                              {status === 'generating' && (
                                <div className="pl-4 border-l-2 border-electric/30 ml-2 space-y-3 py-2">
                                  <div className="h-2 bg-white/10 rounded w-3/4 animate-pulse" />
                                  <div className="h-2 bg-white/10 rounded w-full animate-pulse" />
                                  <div className="h-2 bg-white/10 rounded w-5/6 animate-pulse" />
                                  <div className="h-2 bg-white/10 rounded w-1/2 animate-pulse" />
                                </div>
                              )}
                              {status === 'complete' && (
                                <div className="flex items-center gap-2 text-success">
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
                        <div className="absolute inset-0 bg-[#0D0D12]/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-500 z-10">
                          <div className="bg-background border border-border rounded-2xl p-8 text-center max-w-md shadow-2xl">
                            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <CheckCircle className="w-8 h-8 text-success" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Proposal Generated!</h3>
                            <p className="text-foreground-muted text-sm mb-6">
                              All sections have been drafted successfully. You can now review, edit, and collaborate in the workspace.
                            </p>
                            <button 
                              onClick={() => navigate('/workspace')}
                              className="w-full bg-electric hover:bg-electric-dim text-background px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                              Go to Workspace <ArrowRight size={18} />
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
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-background-secondary border-t border-border flex justify-between items-center z-10">
          <button 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0 || isExtracting || isGenerating}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground-muted hover:text-foreground disabled:opacity-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            {currentStep === 1 && (
              <button 
                onClick={handleQuickStart}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-electric hover:text-electric-dim transition-colors"
              >
                Quick Start (Skip to Generate)
              </button>
            )}
            
            {currentStep === 0 ? (
              <button 
                onClick={startExtraction}
                disabled={isExtracting || (entryMethod === 'upload' && uploadedFiles.length === 0)}
                className="flex items-center gap-2 bg-electric hover:bg-electric-dim text-background px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="flex items-center gap-2 bg-electric hover:bg-electric-dim text-background px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Go to Workspace <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
                disabled={currentStep === 3 && selectedSections.length === 0}
                className="flex items-center gap-2 bg-electric hover:bg-electric-dim text-background px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
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
