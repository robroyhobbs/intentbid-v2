import React, { useState } from 'react';
import { Shield, Package, Users, FileText, Plus, X, Search, Briefcase, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'brand', name: 'Brand & Identity', icon: Shield },
  { id: 'products', name: 'Products & Services', icon: Package },
  { id: 'evidence', name: 'Evidence Library', icon: FileText },
  { id: 'personnel', name: 'Named Personnel', icon: Users },
];

export function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('evidence');
  const [isAdding, setIsAdding] = useState(false);

  // Mock Data State
  const [evidenceList, setEvidenceList] = useState([
    { id: 1, title: 'DoD Cloud Migration', client: 'Department of Defense', date: '2025-08-12', summary: 'Successfully migrated 50,000 users to the cloud with zero downtime.', metrics: '100% uptime, $2M saved annually' },
    { id: 2, title: 'State Healthcare Portal', client: 'State of CA', date: '2024-11-30', summary: 'Modernized legacy healthcare portal to improve patient access.', metrics: '40% increase in user engagement' }
  ]);

  const [personnelList, setPersonnelList] = useState([
    { id: 1, name: 'Jane Doe', role: 'Cloud Architect', clearance: 'Top Secret', certs: 'AWS Solutions Architect, CISSP', bio: '15 years of experience designing secure federal cloud environments.' },
    { id: 2, name: 'John Smith', role: 'Project Manager', clearance: 'Secret', certs: 'PMP, Agile Scrum Master', bio: 'Expert in leading cross-functional teams for large-scale IT modernizations.' }
  ]);

  // Form States
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (activeTab === 'evidence') {
      if (!formData.title?.trim()) errors.title = 'Title is required';
      if (!formData.client?.trim()) errors.client = 'Client is required';
      if (!formData.date) errors.date = 'Date is required';
      if (!formData.summary?.trim()) errors.summary = 'Summary is required';
      if (!formData.metrics?.trim()) errors.metrics = 'Metrics are required';
    } else if (activeTab === 'personnel') {
      if (!formData.name?.trim()) errors.name = 'Name is required';
      if (!formData.role?.trim()) errors.role = 'Role is required';
      if (!formData.clearance) errors.clearance = 'Clearance is required';
      if (!formData.bio?.trim()) errors.bio = 'Bio is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (activeTab === 'evidence') {
      setEvidenceList([...evidenceList, { id: Date.now(), ...formData }]);
    } else if (activeTab === 'personnel') {
      setPersonnelList([...personnelList, { id: Date.now(), ...formData }]);
    }
    setIsAdding(false);
    setFormData({});
    setFormErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-base uppercase tracking-widest font-bold tracking-tight text-white mb-2">Knowledge Base</h1>
          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Manage your verified company context, products, evidence, and personnel.</p>
        </div>
        <button 
          onClick={() => { setFormData({}); setFormErrors({}); setIsAdding(true); }}
          className="inline-flex items-center gap-2 rounded-none bg-white px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold text-black hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add {TABS.find(t => t.id === activeTab)?.name.split(' ')[0]}
        </button>
      </div>

      <div className="border-b border-white/10">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                activeTab === tab.id
                  ? 'border-[#8b5cf6] text-white'
                  : 'border-transparent text-foreground-muted hover:border-white/20 hover:text-white',
                'group inline-flex items-center border-b-2 py-4 px-1 text-[10px] font-bold transition-colors uppercase tracking-widest'
              )}
            >
              <tab.icon
                className={cn(
                  activeTab === tab.id ? 'text-[#c084fc]' : 'text-foreground-muted group-hover:text-foreground-subtle',
                  '-ml-0.5 mr-2 h-4 w-4 transition-colors'
                )}
                aria-hidden="true"
              />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted w-4 h-4" />
          <input 
            type="text" 
            placeholder={`Search ${TABS.find(t => t.id === activeTab)?.name.toLowerCase()}...`}
            className="w-full rounded-none border border-white/10 bg-[#0A0A0A] pl-10 pr-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-foreground placeholder-foreground-muted focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'evidence' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evidenceList.map((item) => (
              <div key={item.id} className="group relative rounded-none border border-white/5 bg-[#0A0A0A] p-6 shadow-none hover:border-white/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-[#c084fc]" />
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-bold text-white">{item.title}</h3>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">{item.client}</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-foreground-subtle bg-white/5 px-2 py-1 rounded-none">{item.date}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-4 leading-relaxed">{item.summary}</p>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-none p-3 flex items-start gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">{item.metrics}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'personnel' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personnelList.map((item) => (
              <div key={item.id} className="group relative rounded-none border border-white/5 bg-[#0A0A0A] p-6 shadow-none hover:border-white/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-none bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-sm uppercase tracking-widest font-bold text-white">
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-bold text-white">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#c084fc] font-bold">{item.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-500/10 px-2 py-1 rounded-none border border-red-500/20">{item.clearance}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-4 leading-relaxed">{item.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {item.certs.split(', ').map(cert => (
                    <span key={cert} className="text-[10px] font-bold text-foreground-subtle bg-white/5 px-2 py-1 rounded-none border border-white/5 uppercase tracking-wider">{cert}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'brand' || activeTab === 'products') && (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-none bg-white/[0.02]">
            <div className="w-16 h-16 rounded-none bg-white/5 flex items-center justify-center mb-4">
              {activeTab === 'brand' ? <Shield className="w-8 h-8 text-foreground-muted" /> : <Package className="w-8 h-8 text-foreground-muted" />}
            </div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-2">No {TABS.find(t => t.id === activeTab)?.name} Yet</h3>
            <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted max-w-sm mb-6">Start building your intelligence moat by adding your company's core assets.</p>
            <button 
              onClick={() => { setFormData({}); setFormErrors({}); setIsAdding(true); }}
              className="inline-flex items-center gap-2 rounded-none bg-white/10 px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-white hover:bg-white/20 transition-colors"
            >
              <Plus size={16} />
              Add Entry
            </button>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-none w-full max-w-lg shadow-none overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-sm uppercase tracking-widest font-bold text-white">Add {TABS.find(t => t.id === activeTab)?.name}</h2>
              <button onClick={() => setIsAdding(false)} className="p-2 rounded-none hover:bg-white/10 text-foreground-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddEntry} className="p-6 space-y-4">
              {activeTab === 'evidence' && (
                <>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Project Title</label>
                    <input 
                      type="text" 
                      className={cn("w-full bg-[#111116] border rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all", formErrors.title ? "border-red-500" : "border-white/10")}
                      value={formData.title || ''}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                    {formErrors.title && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-1">{formErrors.title}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Client</label>
                      <input 
                        type="text" 
                        className={cn("w-full bg-[#111116] border rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all", formErrors.client ? "border-red-500" : "border-white/10")}
                        value={formData.client || ''}
                        onChange={e => setFormData({...formData, client: e.target.value})}
                      />
                      {formErrors.client && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-1">{formErrors.client}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Date</label>
                      <input 
                        type="date" 
                        className={cn("w-full bg-[#111116] border rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all", formErrors.date ? "border-red-500" : "border-white/10")}
                        value={formData.date || ''}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                      />
                      {formErrors.date && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-1">{formErrors.date}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Summary</label>
                    <textarea 
                      rows={3}
                      className={cn("w-full bg-[#111116] border rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all resize-none", formErrors.summary ? "border-red-500" : "border-white/10")}
                      value={formData.summary || ''}
                      onChange={e => setFormData({...formData, summary: e.target.value})}
                    />
                    {formErrors.summary && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-1">{formErrors.summary}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Key Metrics / Outcomes</label>
                    <input 
                      type="text" 
                      className={cn("w-full bg-[#111116] border rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all", formErrors.metrics ? "border-red-500" : "border-white/10")}
                      value={formData.metrics || ''}
                      onChange={e => setFormData({...formData, metrics: e.target.value})}
                    />
                    {formErrors.metrics && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-1">{formErrors.metrics}</p>}
                  </div>
                </>
              )}

              {activeTab === 'personnel' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Full Name</label>
                      <input 
                        type="text" 
                        className={cn("w-full bg-[#111116] border rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all", formErrors.name ? "border-red-500" : "border-white/10")}
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                      {formErrors.name && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Role</label>
                      <input 
                        type="text" 
                        className={cn("w-full bg-[#111116] border rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all", formErrors.role ? "border-red-500" : "border-white/10")}
                        value={formData.role || ''}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                      />
                      {formErrors.role && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-1">{formErrors.role}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Clearance Level</label>
                    <select 
                      className={cn("w-full bg-[#111116] border rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all", formErrors.clearance ? "border-red-500" : "border-white/10")}
                      value={formData.clearance || ''}
                      onChange={e => setFormData({...formData, clearance: e.target.value})}
                    >
                      <option value="">Select clearance...</option>
                      <option value="None">None</option>
                      <option value="Public Trust">Public Trust</option>
                      <option value="Secret">Secret</option>
                      <option value="Top Secret">Top Secret</option>
                      <option value="TS/SCI">TS/SCI</option>
                    </select>
                    {formErrors.clearance && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-1">{formErrors.clearance}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Certifications (comma separated)</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#111116] border border-white/10 rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                      value={formData.certs || ''}
                      onChange={e => setFormData({...formData, certs: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-foreground-muted mb-2">Bio</label>
                    <textarea 
                      rows={3}
                      className={cn("w-full bg-[#111116] border rounded-none px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#8b5cf6] transition-all resize-none", formErrors.bio ? "border-red-500" : "border-white/10")}
                      value={formData.bio || ''}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                    />
                    {formErrors.bio && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-1">{formErrors.bio}</p>}
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-none hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
