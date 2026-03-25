import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Briefcase, Award, Users, FileText, Database,
  ChevronRight, CheckCircle2, Search, UploadCloud, Filter, Plus, FileUp,
  Target, LineChart, Edit2, Trash2, X, Library, MapPin, Landmark, Clock, Globe,
  Palette, Type, Image as ImageIcon, Star, Settings2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const COMPANY_CONTEXT = [
  { title: 'Company Description', type: 'brand', content: 'Apex Solutions is a premier provider of secure cloud engineering and cybersecurity services for the federal government. Founded in 2012, we specialize in zero-trust architectures, rapid ATO acceleration, and mission-critical systems integration. Our approach combines commercial best practices with rigorous federal compliance standards.', lastUpdated: '2 days ago', verified: true },
  { title: 'Mission Statement', type: 'brand', content: 'To secure and modernize the digital infrastructure of our nation\'s most critical institutions through innovative engineering and unwavering dedication to the mission.', lastUpdated: '1 month ago', verified: true },
  { title: 'Value Proposition', type: 'brand', content: 'We deliver "Build to Hand Off" solutions. Unlike traditional integrators that create vendor lock-in, we build secure, automated, and fully documented systems designed to be seamlessly transitioned to government operators.', lastUpdated: '2 weeks ago', verified: true },
  { title: 'CAGE & UEI', type: 'financial', content: 'CAGE Code: 7XYZ9\nUnique Entity ID (UEI): ABC123DEF456', lastUpdated: '6 months ago', verified: true },
  { title: 'DCAA Approved Accounting', type: 'financial', content: 'Accounting system audited and approved by DCAA for cost-reimbursable (CPFF, CPAF) contracts. Last audit completed October 2024.', lastUpdated: '1 month ago', verified: true },
  { title: 'Facility Clearance (FCL)', type: 'facilities', content: 'Top Secret Facility Clearance.\nSafeguarding capability: Secret.\nSMO Code: 123456', lastUpdated: '3 months ago', verified: true },
  { title: 'Headquarters', type: 'facilities', content: '1234 Innovation Drive, Suite 500\nArlington, VA 22203\n(Includes 2,000 sq ft SCIF)', lastUpdated: '1 year ago', verified: true },
  { title: 'AWS Advanced Tier Partner', type: 'partner_programs', content: 'Recognized as an Advanced Tier partner with competencies in Government, Security, and Migration. Includes access to AWS GovCloud specialized funding programs and dedicated public sector technical account managers.', lastUpdated: '3 months ago', verified: true },
  { title: 'Microsoft Federal Partner', type: 'partner_programs', content: 'Gold competency in Cloud Platform and Security. Authorized AOS-G partner for GCC High licensing and deployments.', lastUpdated: '5 months ago', verified: true },
  { title: 'CMMC Level 2 Certified', type: 'certifications', content: 'Assessed and certified by a C3PAO for CMMC Level 2 (Advanced). Fully compliant with all 110 NIST SP 800-171 practices.', lastUpdated: '1 month ago', verified: true },
  { title: 'ISO 27001:2022', type: 'certifications', content: 'Information Security Management System (ISMS) certified for the provision of cloud engineering and cybersecurity consulting services.', lastUpdated: '8 months ago', verified: true },
  { title: 'Data Handling & Classification', type: 'legal', content: 'All corporate systems process CUI in accordance with NIST 800-171. ITAR restricted data is segmented in GCC High enclaves with US-citizen only access controls.', lastUpdated: '2 months ago', verified: true },
  { title: 'Security by Default', type: 'values', content: 'We do not bolt security on at the end. Every architecture, pipeline, and line of code is evaluated against zero-trust principles from day one.', lastUpdated: '1 year ago', verified: true },
];

const CASE_STUDIES = [
  { title: 'City of Richmond — Legacy System Modernization', type: 'case study', verified: true, tags: ['government', 'systems_engineering', 'mid_market'] },
  { title: 'Department of Education — CMMC Compliance Acceleration', type: 'case study', verified: true, tags: ['government', 'cybersecurity', 'mid_market'] },
  { title: 'Department of Veterans Affairs — Enterprise Cloud Migration', type: 'case study', verified: true, tags: ['government', 'cloud_migration', 'enterprise'] },
  { title: 'DHS CISA — Threat Intelligence Data Platform', type: 'case study', verified: true, tags: ['government', 'data_analytics', 'enterprise'] },
  { title: 'State of Virginia VITA — Managed IT Services Consolidation', type: 'case study', verified: true, tags: ['government', 'managed_services', 'enterprise'] },
  { title: 'U.S. Army Corps of Engineers — Zero Trust Network Transformation', type: 'case study', verified: true, tags: ['government', 'cybersecurity', 'enterprise'] },
];

const METRICS_DATA = [
  { title: 'Cybersecurity Program Metrics', verified: true, tags: ['cybersecurity'], stats: ['ZTA Deployments: 28', 'CMMC Pass Rate: 100%'] },
  { title: 'Cloud Migration Track Record', verified: true, tags: ['cloud_migration'], stats: ['Migrations Completed: 90+', 'Data Loss Incidents: 0'] },
];

const UPLOADED_DOCS = [
  { name: 'ITSS_Sources_Sought_19AQMM26N0091.docx', type: 'Bid Document', status: 'READY', chunks: 13, date: '2 hours ago' },
  { name: 'sample-rfp.pdf', type: 'Bid Document', status: 'READY', chunks: 8, date: '5 hours ago' },
  { name: 'Apex_Capabilities_Statement_2025.pdf', type: 'Reference Material', status: 'READY', chunks: 24, date: '2 days ago' },
  { name: 'Security_Compliance_Matrix_CMMC.xlsx', type: 'Reference Material', status: 'FAILED', chunks: 0, date: '3 days ago' },
  { name: 'Opp Analysis_DOS Information Technology.docx', type: 'Bid Document', status: 'READY', chunks: 1, date: '1 week ago' },
];

function UploadModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [category, setCategory] = useState<'reference' | 'bid'>('reference');
  const [files, setFiles] = useState<Array<{ id: string, name: string, title: string, tags: string, isExtracting: boolean }>>([]);
  const [linkedProposal, setLinkedProposal] = useState('');

  if (!isOpen) return null;

  const handleAddMockFile = () => {
    const isBid = category === 'bid';
    const newId = Math.random().toString();
    const newFile = {
      id: newId,
      name: isBid ? 'Draft_RFP_Requirements_v2.docx' : 'Apex_Capabilities_Statement_2025.pdf',
      title: '',
      tags: '',
      isExtracting: true
    };
    setFiles([...files, newFile]);

    // Simulate AI extraction delay
    setTimeout(() => {
      setFiles(current => current.map(f => {
        if (f.id === newId) {
          return {
            ...f,
            title: isBid ? 'Draft RFP Requirements v2' : 'Apex Capabilities Statement 2025',
            tags: isBid ? 'rfp, requirements, draft' : 'capabilities, past performance',
            isExtracting: false
          };
        }
        return f;
      }));
    }, 1500);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const updateFile = (id: string, field: string, value: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-none shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 max-h-[90vh]">
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between shrink-0">
          <h2 className="text-sm uppercase tracking-widest font-bold text-white">Upload Document(s)</h2>
          <button onClick={onClose} className="text-foreground-muted hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
          {/* Document Type Selection */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted">1. Select Document Category</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setCategory('reference')}
                className={cn(
                  "flex flex-col items-start p-4 rounded-none border text-left relative overflow-hidden transition-all",
                  category === 'reference' 
                    ? "border-[#8b5cf6] bg-[#8b5cf6]/10" 
                    : "border-white/10 bg-[#111116] hover:border-white/20"
                )}
              >
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Library size={48} className={category === 'reference' ? "text-[#c084fc]" : "text-foreground-muted"} />
                </div>
                <Library size={18} className={cn("mb-2 relative z-10", category === 'reference' ? "text-[#c084fc]" : "text-foreground-muted")} />
                <span className="text-[10px] uppercase tracking-widest font-bold text-white mb-1 relative z-10">Reference Material</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted relative z-10">Company details, capabilities, past performance</span>
              </button>
              
              <button 
                onClick={() => setCategory('bid')}
                className={cn(
                  "flex flex-col items-start p-4 rounded-none border text-left relative overflow-hidden transition-all",
                  category === 'bid' 
                    ? "border-blue-500 bg-blue-500/10" 
                    : "border-white/10 bg-[#111116] hover:border-white/20"
                )}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FileText size={48} className={category === 'bid' ? "text-blue-400" : "text-foreground-muted"} />
                </div>
                <FileText size={18} className={cn("mb-2 relative z-10", category === 'bid' ? "text-blue-400" : "text-foreground-muted")} />
                <span className="text-[10px] uppercase tracking-widest font-bold text-white mb-1 relative z-10">Bid Document</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted relative z-10">RFPs, amendments, pricing templates</span>
              </button>
            </div>
          </div>

          {/* Optional: Link to Proposal for Bid Documents */}
          {category === 'bid' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted">Attach to Proposal (Optional)</label>
              <select 
                value={linkedProposal}
                onChange={(e) => setLinkedProposal(e.target.value)}
                className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Do not attach to a specific proposal yet</option>
                <option value="new">+ Start a New Proposal from these documents</option>
                <option value="1">Department of Education — CMMC Compliance</option>
                <option value="2">DHS CISA — Threat Intelligence</option>
              </select>
              <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Bid documents can be uploaded globally here, or directly within a specific proposal's workspace.</p>
            </div>
          )}

          {/* Drag & Drop Area */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted">2. Upload Files</label>
            <div 
              onClick={handleAddMockFile}
              className="border-2 border-dashed border-white/20 bg-[#111116] rounded-none p-10 flex flex-col items-center justify-center text-center hover:border-[#8b5cf6]/50 hover:bg-[#8b5cf6]/5 transition-colors cursor-pointer group shadow-inner"
            >
              <div className="w-16 h-16 rounded-none bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-white/10">
                <UploadCloud size={32} className="text-foreground-muted group-hover:text-[#c084fc] transition-colors" />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-white mb-1">Drag and drop files, or click to browse</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">DOCX, PDF, PPTX, XLSX, TXT, or MD (max 50MB)</p>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted flex items-center justify-between">
                <span>3. Review Extracted Details</span>
                <span className="text-[#c084fc] flex items-center gap-1"><Target size={12} /> AI Auto-Extraction Active</span>
              </label>
              <div className="space-y-4">
                {files.map(file => (
                  <div key={file.id} className="bg-[#111116] border border-white/10 rounded-none p-4 relative group">
                    <button 
                      onClick={() => removeFile(file.id)}
                      className="absolute top-4 right-4 text-foreground-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4 pr-8">
                      <div className="w-8 h-8 rounded-none bg-white/5 flex items-center justify-center shrink-0">
                        <FileText size={14} className="text-foreground-muted" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white truncate">{file.name}</span>
                    </div>

                    {file.isExtracting ? (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-9 bg-white/5 rounded-none w-full"></div>
                        <div className="h-9 bg-white/5 rounded-none w-full"></div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#c084fc] flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-[#c084fc] border-t-transparent rounded-none animate-spin" />
                          Extracting title and tags...
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 animate-in fade-in duration-300">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">Title</label>
                          <input 
                            type="text" 
                            value={file.title}
                            onChange={(e) => updateFile(file.id, 'title', e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-none px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-white focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] outline-none transition-all" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">Tags</label>
                          <input 
                            type="text" 
                            value={file.tags}
                            onChange={(e) => updateFile(file.id, 'tags', e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-none px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-white focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] outline-none transition-all" 
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
        
        <div className="p-6 border-t border-white/5 bg-background-secondary/50 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-none text-[10px] uppercase tracking-widest font-bold font-bold text-white hover:bg-white/5 transition-colors">Cancel</button>
          <button 
            disabled={files.length === 0 || files.some(f => f.isExtracting)}
            className="px-4 py-2 rounded-none text-[10px] uppercase tracking-widest font-bold font-bold bg-white text-black hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Upload {files.length > 0 ? `${files.length} Document${files.length > 1 ? 's' : ''}` : 'Document(s)'}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddTruthModal({ isOpen, onClose, initialCategoryId, categories }: { isOpen: boolean, onClose: () => void, initialCategoryId: string, categories: Array<{id: string, title: string}> }) {
  const [categoryId, setCategoryId] = React.useState(initialCategoryId);

  React.useEffect(() => {
    if (isOpen) setCategoryId(initialCategoryId);
  }, [isOpen, initialCategoryId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-none shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between shrink-0">
          <h2 className="text-sm uppercase tracking-widest font-bold text-white">Add Company Truth</h2>
          <button onClick={onClose} className="text-foreground-muted hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted mb-2">Category</label>
            <select 
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] outline-none transition-all appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted mb-2">Title</label>
            <input 
              type="text" 
              placeholder="e.g. CAGE Code & UEI"
              className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] outline-none transition-all placeholder:text-foreground-subtle" 
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted mb-2">Content</label>
            <textarea 
              rows={5}
              placeholder="Enter the exact, verified text or data point..."
              className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] outline-none transition-all placeholder:text-foreground-subtle resize-none custom-scrollbar" 
            />
          </div>

          <label className="flex items-center gap-3 p-4 rounded-none border border-white/10 bg-[#111116] cursor-pointer hover:border-white/20 transition-colors">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="w-5 h-5 rounded-none border border-white/20 bg-[#0A0A0A] peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors"></div>
              <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-white">Mark as Verified Truth</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Verified truths are prioritized by the AI over general documents.</p>
            </div>
          </label>
        </div>
        
        <div className="p-6 border-t border-white/5 bg-background-secondary/50 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-none text-[10px] uppercase tracking-widest font-bold font-bold text-white hover:bg-white/5 transition-colors">Cancel</button>
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-none text-[10px] uppercase tracking-widest font-bold font-bold bg-white text-black hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Save Truth
          </button>
        </div>
      </div>
    </div>
  );
}

function CompanyTruthsTab() {
  const [activeCategory, setActiveCategory] = useState('brand');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'brand', title: 'Brand & Identity', icon: Building2, color: 'text-[#c084fc]', bg: 'bg-[#c084fc]/10' },
    { id: 'partner_programs', title: 'Partner Programs', icon: Users, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { id: 'certifications', title: 'Certifications', icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'legal', title: 'Legal & Compliance', icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'facilities', title: 'Facilities & Security', icon: MapPin, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { id: 'financial', title: 'Financial & Systems', icon: Landmark, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'values', title: 'Core Values', icon: Target, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ];

  const activeItems = COMPANY_CONTEXT.filter(c => 
    c.type === activeCategory && 
    (c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const activeCatDetails = categories.find(c => c.id === activeCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar - Categories */}
      <div className="w-full lg:w-64 shrink-0 space-y-1">
        {categories.map(cat => {
          const count = COMPANY_CONTEXT.filter(c => c.type === cat.id).length;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery('');
              }}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-none border transition-all duration-200 group",
                isActive 
                  ? "bg-white/5 border-white/10" 
                  : "border-transparent hover:bg-white/[0.02]"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-none flex items-center justify-center transition-colors",
                  isActive ? cat.bg : "bg-white/5 group-hover:bg-white/10"
                )}>
                  <cat.icon className={cn("w-4 h-4", isActive ? cat.color : "text-foreground-muted")} />
                </div>
                <span className={cn(
                  "text-[10px] uppercase tracking-widest font-bold transition-colors",
                  isActive ? "text-white" : "text-foreground-muted group-hover:text-white"
                )}>{cat.title}</span>
              </div>
              <span className={cn(
                "text-[10px] uppercase tracking-widest font-bold font-bold px-2 py-1 rounded-none transition-colors",
                isActive ? "bg-white/10 text-white" : "bg-white/5 text-foreground-muted"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Content - Truths List */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
          <div>
            <h2 className="text-base uppercase tracking-widest font-bold text-white mb-1">{activeCatDetails?.title}</h2>
            <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Explicit, verified facts that the AI will prioritize over general uploaded documents.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
              <input 
                type="text" 
                placeholder="Filter truths..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#111116] border border-white/10 rounded-none pl-9 pr-4 py-2 text-[10px] uppercase tracking-widest font-bold text-white focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] outline-none transition-all w-full sm:w-48"
              />
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-white text-black px-4 py-2 rounded-none text-[10px] uppercase tracking-widest font-bold font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0"
            >
              <Plus size={16}/> Add Truth
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {activeItems.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-none bg-[#0A0A0A]">
              <div className="w-12 h-12 rounded-none bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Target size={24} className="text-foreground-muted" />
              </div>
              <p className="text-white font-bold mb-1">
                {searchQuery ? "No matching truths found." : "No truths added yet."}
              </p>
              <p className="text-foreground-muted text-[10px] uppercase tracking-widest font-bold mb-6 max-w-sm mx-auto">
                {searchQuery 
                  ? "Try adjusting your search terms." 
                  : "Add verified statements and data points to ensure the AI uses accurate information in proposals."}
              </p>
              {!searchQuery && (
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-white/10 text-white px-4 py-2 rounded-none text-[10px] uppercase tracking-widest font-bold font-bold flex items-center gap-2 hover:bg-white/20 transition-colors mx-auto"
                >
                  <Plus size={16}/> Add First Truth
                </button>
              )}
            </div>
          ) : (
            activeItems.map((item, i) => (
              <div key={i} className="p-6 rounded-none border border-white/5 bg-[#0A0A0A] hover:border-white/10 transition-colors group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-white">{item.title}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-white/10 rounded-none text-foreground-muted hover:text-white transition-colors"><Edit2 size={14}/></button>
                    <button className="p-1.5 hover:bg-red-500/20 rounded-none text-foreground-muted hover:text-red-400 transition-colors"><Trash2 size={14}/></button>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted leading-relaxed whitespace-pre-wrap mb-5">{item.content}</p>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
                  {item.verified && (
                    <span className="text-emerald-400 flex items-center gap-1.5 bg-emerald-400/10 px-2 py-1 rounded-none">
                      <CheckCircle2 size={12}/> Verified Truth
                    </span>
                  )}
                  <span className="text-foreground-subtle flex items-center gap-1.5">
                    <Clock size={12} /> Updated {item.lastUpdated}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <AddTruthModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        initialCategoryId={activeCategory}
        categories={categories}
      />
    </div>
  );
}

function BrandAssetsTab() {
  const [viewState, setViewState] = useState<'input' | 'processing' | 'managed'>('input');
  const [url, setUrl] = useState('');

  // Editable state for the management prototype
  const [colors, setColors] = useState([
    { id: 'primary', label: 'Primary Brand Color', hex: '#0f172a' },
    { id: 'accent', label: 'Accent Color', hex: '#3b82f6' },
  ]);
  
  const [fonts, setFonts] = useState([
    { id: 'headings', label: 'Headings Font', value: 'Manrope' },
    { id: 'body', label: 'Body Text Font', value: 'Inter Regular' },
  ]);

  const [templates, setTemplates] = useState([
    { id: '1', name: 'Apex_Standard_Proposal_v3.dotx', isDefault: true },
  ]);

  const handleExtract = () => {
    if (!url) return;
    setViewState('processing');
    setTimeout(() => {
      setViewState('managed');
    }, 2500);
  };

  const handleUpdateColor = (id: string, newHex: string) => {
    setColors(colors.map(c => c.id === id ? { ...c, hex: newHex } : c));
  };

  const handleUpdateFont = (id: string, newValue: string) => {
    setFonts(fonts.map(f => f.id === id ? { ...f, value: newValue } : f));
  };

  const setAsDefaultTemplate = (id: string) => {
    setTemplates(templates.map(t => ({ ...t, isDefault: t.id === id })));
  };

  const removeTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {viewState === 'input' && (
        <div className="animate-in fade-in duration-500">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-none bg-[#c084fc]/10 border border-[#c084fc]/20 flex items-center justify-center mx-auto mb-6">
              <Palette size={32} className="text-[#c084fc]" />
            </div>
            <h2 className="text-sm uppercase tracking-widest font-bold text-white mb-2">Brand & Export Assets</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Add your website URL, media kit, or upload corporate templates. Our AI will automatically extract and store your brand identity for use in all exported proposals.
            </p>
          </div>

          <div className="border-2 border-dashed border-white/10 bg-[#0A0A0A] rounded-none p-10 flex flex-col items-center justify-center text-center hover:border-[#8b5cf6]/50 transition-colors group shadow-inner relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Globe size={120} className="text-[#c084fc]" />
            </div>

            <div className="w-16 h-16 rounded-none bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/10 relative z-10">
              <UploadCloud size={32} className="text-foreground-muted group-hover:text-[#c084fc] transition-colors" />
            </div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-2 relative z-10">Upload Brand Assets or Templates</h3>
            <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-8 max-w-md relative z-10">
              Drag and drop your media kit (PDF), logos (PNG/SVG), or document templates (.docx, .dotx) here.
            </p>

            <div className="flex items-center gap-4 w-full max-w-md relative z-10">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted">OR</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <div className="w-full max-w-md mt-8 relative z-10">
              <label className="block text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted mb-2 text-left">Auto-Extract from URL</label>
              <div className="flex items-center gap-2 bg-[#111116] border border-white/10 rounded-none p-1.5 focus-within:border-[#8b5cf6] focus-within:ring-1 focus-within:ring-[#8b5cf6] transition-all shadow-lg">
                <Globe size={18} className="text-foreground-muted ml-3" />
                <input 
                  type="url" 
                  placeholder="e.g. https://yourcompany.com or media kit link" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white text-[10px] uppercase tracking-widest font-bold px-2 py-2 outline-none placeholder:text-foreground-subtle"
                />
                <button 
                  onClick={handleExtract}
                  disabled={!url}
                  className="bg-white text-black hover:bg-gray-100 font-bold px-5 py-2 rounded-none text-[10px] uppercase tracking-widest font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  Extract
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewState === 'processing' && (
        <div className="py-24 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 relative mb-8">
            <div className="absolute inset-0 border-4 border-[#111116] rounded-none"></div>
            <div className="absolute inset-0 border-4 border-[#8b5cf6] rounded-none border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Palette size={24} className="text-[#c084fc] animate-pulse" />
            </div>
          </div>
          <h3 className="text-base uppercase tracking-widest font-bold text-white mb-2">Analyzing Brand Assets...</h3>
          <p className="text-foreground-muted max-w-md">
            Scanning {url} for color palettes, typography, logos, and brand guidelines.
          </p>
        </div>
      )}

      {viewState === 'managed' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          {/* Management Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A0A0A] border border-white/5 rounded-none p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-none bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 size={24} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-widest font-bold text-white">Active Brand Profile</h2>
                <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Assets extracted from {url}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setViewState('input')}
                className="px-4 py-2 rounded-none border border-white/10 bg-[#111116] text-[10px] uppercase tracking-widest font-bold text-white hover:bg-white/5 transition-colors"
              >
                Add More Assets
              </button>
              <button className="px-4 py-2 rounded-none bg-white text-black text-[10px] uppercase tracking-widest font-bold font-bold hover:bg-gray-100 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colors & Typography Column */}
            <div className="space-y-6">
              {/* Colors */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Palette size={18} className="text-[#c084fc]" />
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-white">Color Palette</h3>
                </div>
                <div className="space-y-4">
                  {colors.map(color => (
                    <div key={color.id} className="flex items-center gap-4 bg-[#111116] border border-white/5 rounded-none p-3">
                      <div 
                        className="w-10 h-10 rounded-none border border-white/10 shadow-inner shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">{color.label}</label>
                        <input 
                          type="text" 
                          value={color.hex}
                          onChange={(e) => handleUpdateColor(color.id, e.target.value)}
                          className="w-full bg-transparent border-none text-[10px] uppercase tracking-widest font-bold text-white outline-none uppercase font-mono"
                        />
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 rounded-none border border-dashed border-white/10 text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted hover:text-white hover:border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                    <Plus size={14} /> Add Color
                  </button>
                </div>
              </div>

              {/* Typography */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Type size={18} className="text-blue-400" />
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-white">Typography</h3>
                </div>
                <div className="space-y-4">
                  {fonts.map(font => (
                    <div key={font.id} className="bg-[#111116] border border-white/5 rounded-none p-3">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">{font.label}</label>
                      <input 
                        type="text" 
                        value={font.value}
                        onChange={(e) => handleUpdateFont(font.id, e.target.value)}
                        className="w-full bg-transparent border-none text-[10px] uppercase tracking-widest font-bold text-white outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Logos & Templates Column */}
            <div className="space-y-6">
              {/* Logos */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ImageIcon size={18} className="text-emerald-400" />
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-white">Logos</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#111116] border border-white/5 rounded-none p-4 relative group">
                    <button className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500/80 text-white rounded-none opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                      <Trash2 size={14} />
                    </button>
                    <div className="h-16 bg-white rounded-none flex items-center justify-center p-2 mb-3">
                      <div className="flex items-center gap-2 text-black font-bold text-base uppercase tracking-widest">
                        <div className="w-8 h-8 bg-blue-600 rounded-none"></div> Apex Solutions
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white">Primary Logo (Light BG)</span>
                      <span className="text-[10px] text-foreground-muted uppercase tracking-wider">PNG • 240KB</span>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-none border border-dashed border-white/10 text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted hover:text-white hover:border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                    <UploadCloud size={14} /> Upload Logo Variant
                  </button>
                </div>
              </div>

              {/* Document Templates */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FileUp size={18} className="text-amber-400" />
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-white">Export Templates</h3>
                </div>
                <div className="space-y-3">
                  {templates.map(template => (
                    <div key={template.id} className={cn(
                      "flex items-center justify-between p-3 rounded-none border transition-colors group",
                      template.isDefault ? "bg-amber-500/5 border-amber-500/20" : "bg-[#111116] border-white/5 hover:border-white/10"
                    )}>
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={cn(
                          "w-8 h-8 rounded-none flex items-center justify-center shrink-0",
                          template.isDefault ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-foreground-muted"
                        )}>
                          <FileText size={14} />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white truncate pr-4">{template.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {template.isDefault ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-1 rounded-none">
                            <Star size={10} className="fill-amber-400" /> Default
                          </span>
                        ) : (
                          <button 
                            onClick={() => setAsDefaultTemplate(template.id)}
                            className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted hover:text-white px-2 py-1 rounded-none hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            Set Default
                          </button>
                        )}
                        <button 
                          onClick={() => removeTemplate(template.id)}
                          className="p-1.5 text-foreground-muted hover:text-red-400 hover:bg-red-500/10 rounded-none transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 rounded-none border border-dashed border-white/10 text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted hover:text-white hover:border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                    <UploadCloud size={14} /> Upload Word Template (.dotx)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EvidenceLibraryTab() {
  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex items-center gap-4 p-2 bg-[#0A0A0A] border border-white/5 rounded-none w-fit">
        <div className="flex items-center gap-2 px-3 border-r border-white/5">
          <Filter size={16} className="text-foreground-muted" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Filter</span>
        </div>
        <select className="bg-transparent text-[10px] uppercase tracking-widest font-bold text-white outline-none cursor-pointer px-2">
          <option>All Types</option>
          <option>Case Studies</option>
          <option>Metrics</option>
          <option>Testimonials</option>
        </select>
        <div className="w-px h-4 bg-white/5 mx-2" />
        <select className="bg-transparent text-[10px] uppercase tracking-widest font-bold text-white outline-none cursor-pointer px-2">
          <option>Industry...</option>
        </select>
        <div className="w-px h-4 bg-white/5 mx-2" />
        <select className="bg-transparent text-[10px] uppercase tracking-widest font-bold text-white outline-none cursor-pointer px-2">
          <option>Service Line...</option>
        </select>
      </div>

      {/* Case Studies Section */}
      <div>
        <h3 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted mb-4 flex items-center gap-2">
          <Briefcase size={14} /> Case Studies <span className="bg-white/10 px-1.5 py-0.5 rounded-none text-[10px]">6</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {CASE_STUDIES.map((cs, i) => (
             <div key={i} className="p-5 rounded-none border border-white/5 bg-[#0A0A0A] hover:border-white/10 transition-colors group flex flex-col">
               <div className="flex items-start justify-between mb-3">
                 <h4 className="text-[10px] uppercase tracking-widest font-bold text-white leading-snug pr-4">{cs.title}</h4>
                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                   <button className="p-1 hover:bg-white/10 rounded-none text-foreground-muted hover:text-white"><Edit2 size={12} /></button>
                   <button className="p-1 hover:bg-red-500/20 rounded-none text-foreground-muted hover:text-red-400"><Trash2 size={12} /></button>
                 </div>
               </div>
               <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted line-clamp-3 mb-4 flex-1">Assessed, remediated, and prepared a 600-person DoD contractor for CMMC Level 2 certification in 4 months. Closed 47 of 52 identified gaps, implemented 110 NIST practices...</p>
               <div className="flex flex-wrap gap-2 mt-auto">
                 {cs.tags.map(tag => (
                   <span key={tag} className="px-2 py-1 rounded-none bg-white/5 text-foreground-muted text-[10px] font-bold">
                     {tag}
                   </span>
                 ))}
                 {cs.verified && <span className="px-2 py-1 rounded-none bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center gap-1"><CheckCircle2 size={10} /> Verified</span>}
               </div>
             </div>
           ))}
        </div>
      </div>
      
      {/* Metrics Section */}
      <div>
        <h3 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted mb-4 flex items-center gap-2">
          <LineChart size={14} /> Metrics <span className="bg-white/10 px-1.5 py-0.5 rounded-none text-[10px]">2</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {METRICS_DATA.map((metric, i) => (
             <div key={i} className="p-5 rounded-none border border-white/5 bg-[#0A0A0A] hover:border-white/10 transition-colors group flex flex-col">
               <div className="flex items-start justify-between mb-3">
                 <h4 className="text-[10px] uppercase tracking-widest font-bold text-white leading-snug pr-4">{metric.title}</h4>
                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                   <button className="p-1 hover:bg-white/10 rounded-none text-foreground-muted hover:text-white"><Edit2 size={12} /></button>
                   <button className="p-1 hover:bg-red-500/20 rounded-none text-foreground-muted hover:text-red-400"><Trash2 size={12} /></button>
                 </div>
               </div>
               <div className="space-y-2 mb-4 flex-1">
                 {metric.stats.map((stat, j) => (
                   <p key={j} className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">{stat}</p>
                 ))}
               </div>
               <div className="flex flex-wrap gap-2 mt-auto">
                 {metric.tags.map(tag => (
                   <span key={tag} className="px-2 py-1 rounded-none bg-[#c084fc]/10 text-[#c084fc] text-[10px] font-bold">
                     {tag}
                   </span>
                 ))}
                 {metric.verified && <span className="px-2 py-1 rounded-none bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center gap-1"><CheckCircle2 size={10} /> Verified</span>}
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}

function DocumentCenterTab({ onUploadClick }: { onUploadClick: () => void }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={onUploadClick} className="p-6 rounded-none border border-white/5 bg-[#0A0A0A] hover:border-white/10 transition-colors group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Library size={80} className="text-[#c084fc]" />
          </div>
          <div className="w-12 h-12 rounded-none bg-[#8b5cf6]/10 flex items-center justify-center mb-4 border border-[#8b5cf6]/20 relative z-10">
            <Library className="text-[#c084fc]" size={24} />
          </div>
          <h3 className="text-base uppercase tracking-widest font-bold text-white mb-2 relative z-10">Reference Materials</h3>
          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-4 relative z-10">Company details, capabilities, past performance, and standard operating procedures used to ground the AI.</p>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold relative z-10">
            <span className="text-white font-bold">142 Documents</span>
            <span className="text-[#c084fc] group-hover:translate-x-1 transition-transform flex items-center gap-1">Upload Reference <ChevronRight size={16} /></span>
          </div>
        </div>

        <div onClick={onUploadClick} className="p-6 rounded-none border border-white/5 bg-[#0A0A0A] hover:border-white/10 transition-colors group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <FileText size={80} className="text-blue-400" />
          </div>
          <div className="w-12 h-12 rounded-none bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 relative z-10">
            <FileText className="text-blue-400" size={24} />
          </div>
          <h3 className="text-base uppercase tracking-widest font-bold text-white mb-2 relative z-10">Bid Documents</h3>
          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-4 relative z-10">RFPs, amendments, pricing templates, and submitted proposals specific to individual opportunities.</p>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold relative z-10">
            <span className="text-white font-bold">84 Documents</span>
            <span className="text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">Upload Bid Doc <ChevronRight size={16} /></span>
          </div>
        </div>
      </div>

      {/* Recent Uploads Table */}
      <div className="rounded-none border border-white/5 bg-[#0A0A0A] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h3 className="text-sm uppercase tracking-widest font-bold text-white">Recent Uploads</h3>
          <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:text-white transition-colors px-3 py-1.5 rounded-none border border-white/5 bg-background hover:bg-white/5">
            <Filter size={16} /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-[#050505]">
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Document Name</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Category</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted">Date Added</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-foreground-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {UPLOADED_DOCS.map((doc, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-none flex items-center justify-center shrink-0",
                        doc.type === 'Reference Material' ? "bg-[#8b5cf6]/10 text-[#c084fc]" : "bg-blue-500/10 text-blue-400"
                      )}>
                        <FileText size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-white">{doc.name}</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">{doc.chunks} chunks indexed</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider",
                      doc.type === 'Reference Material' ? "bg-[#8b5cf6]/10 text-[#c084fc] border border-[#8b5cf6]/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    )}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider w-fit",
                      doc.status === 'READY' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                    )}>
                      {doc.status === 'READY' ? <CheckCircle2 size={12} /> : <X size={12} />}
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-4 text-[10px] uppercase tracking-widest font-bold text-foreground-muted">{doc.date}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-white/10 rounded-none text-foreground-muted hover:text-white transition-colors"><Edit2 size={14} /></button>
                      <button className="p-1.5 hover:bg-red-500/20 rounded-none text-foreground-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SearchTab() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-none bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mx-auto mb-6">
          <Search size={32} className="text-[#c084fc]" />
        </div>
        <h2 className="text-sm uppercase tracking-widest font-bold text-white mb-2">Search Knowledge Base</h2>
        <p className="text-foreground-muted">Search across all indexed documents, company truths, and evidence using natural language.</p>
      </div>

      <div className="flex items-center gap-2 bg-[#111116] border border-white/10 rounded-none p-2 focus-within:border-[#8b5cf6] focus-within:ring-1 focus-within:ring-[#8b5cf6] transition-all shadow-lg">
        <div className="pl-4">
          <Search size={20} className="text-foreground-muted" />
        </div>
        <input 
          type="text" 
          placeholder="e.g. AWS cloud migration strategy for financial services..." 
          className="flex-1 bg-transparent border-none text-white text-[10px] uppercase tracking-widest font-bold px-2 py-3 outline-none"
        />
        <select className="bg-[#0A0A0A] border border-white/5 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-white outline-none cursor-pointer">
          <option>All Types</option>
          <option>Documents</option>
          <option>Evidence</option>
        </select>
        <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold px-6 py-2.5 rounded-none transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          Search
        </button>
      </div>

      <div className="mt-12">
        <h3 className="text-[10px] uppercase tracking-widest font-bold font-bold uppercase tracking-widest text-foreground-muted mb-4 text-center">Suggested Searches</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {['Past performance for DHS', 'CMMC Level 2 compliance approach', 'Key personnel resumes', 'Pricing templates for T&M'].map(q => (
            <button key={q} className="px-4 py-2 rounded-none border border-white/5 bg-[#0A0A0A] hover:bg-white/5 text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:text-white transition-colors">
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BusinessProfile() {
  const [activeTab, setActiveTab] = useState('truths');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const tabs = [
    { id: 'truths', label: 'Company Truths' },
    { id: 'brand_assets', label: 'Brand Assets' },
    { id: 'evidence', label: 'Evidence Library' },
    { id: 'documents', label: 'Document Center' },
    { id: 'search', label: 'Search' },
  ];

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-base uppercase tracking-widest font-bold tracking-tight text-white mb-2">Business Profile</h1>
          <p className="text-foreground-muted">Manage your company truths, brand assets, evidence, and reference documents.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setActiveTab('search')}
             className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] hover:bg-white/5 border border-white/5 rounded-none text-white font-bold transition-colors"
           >
             <Search size={16} />
             Search
           </button>
           <button 
             onClick={() => setIsUploadModalOpen(true)}
             className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-none font-bold hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
           >
             <UploadCloud size={18} />
             Upload Docs
           </button>
        </div>
      </div>

      <div className="flex border-b border-white/5 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "py-4 px-6 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-colors",
              activeTab === tab.id 
                ? "border-[#8b5cf6] text-white" 
                : "border-transparent text-foreground-muted hover:border-white/20 hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 pb-12">
        {activeTab === 'truths' && <CompanyTruthsTab />}
        {activeTab === 'brand_assets' && <BrandAssetsTab />}
        {activeTab === 'evidence' && <EvidenceLibraryTab />}
        {activeTab === 'documents' && <DocumentCenterTab onUploadClick={() => setIsUploadModalOpen(true)} />}
        {activeTab === 'search' && <SearchTab />}
      </div>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </div>
  );
}
