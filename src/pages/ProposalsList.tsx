import { FileText, Plus, Search, Filter, ArrowUpRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProposalsList() {
  const proposals = [
    { id: 'PRP-001', title: 'Department of Defense Cloud Migration', client: 'DoD', status: 'Draft', dueDate: '2026-04-15', score: 85, value: '$12.5M' },
    { id: 'PRP-002', title: 'State Healthcare Portal Modernization', client: 'State of CA', status: 'Review', dueDate: '2026-04-01', score: 92, value: '$8.2M' },
    { id: 'PRP-003', title: 'Financial Services Data Lake', client: 'GlobalBank', status: 'Submitted', dueDate: '2026-03-10', score: 78, value: '$4.1M' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-2">Dashboard</h1>
          <p className="text-sm text-foreground-muted">Manage your active bids and solicitations.</p>
        </div>
        <Link 
          to="/proposals/new" 
          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
        >
          <Plus size={18} strokeWidth={2.5} />
          New Proposal
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Bids', value: '12', trend: '+2 this week', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Win Rate (YTD)', value: '68%', trend: '+4% vs last year', icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Pipeline Value', value: '$42.8M', trend: '+$12M this quarter', icon: CheckCircle2, color: 'text-[#c084fc]', bg: 'bg-[#c084fc]/10' },
        ].map((metric) => (
          <div key={metric.label} className="p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors bg-[#0A0A0A] shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-500">
              <metric.icon className={`w-16 h-16 ${metric.color}`} />
            </div>
            <div className={`w-10 h-10 rounded-xl ${metric.bg} flex items-center justify-center mb-4`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <p className="text-sm font-medium text-foreground-muted mb-1">{metric.label}</p>
            <h3 className="text-3xl font-display font-bold text-white mb-2">{metric.value}</h3>
            <p className="text-xs font-medium text-foreground-subtle">{metric.trend}</p>
          </div>
        ))}
      </div>

      {/* List Section */}
      <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] shadow-xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search proposals..." 
              className="w-full rounded-xl border border-white/10 bg-[#111116] pl-10 pr-4 py-2.5 text-sm text-foreground placeholder-foreground-muted focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] focus:outline-none transition-all"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111116] px-4 py-2.5 text-sm font-medium text-foreground hover:bg-white/5 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-[#050505]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Proposal</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Client</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Due Date</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Win Score</th>
                <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {proposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-white/10 transition-colors">
                        <FileText className="h-5 w-5 text-foreground-muted" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-0.5">{proposal.title}</div>
                        <div className="text-xs text-foreground-muted font-mono">{proposal.id} • {proposal.value}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-foreground-muted font-medium">{proposal.client}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      proposal.status === 'Draft' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      proposal.status === 'Review' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {proposal.status === 'Draft' && <Clock className="w-3 h-3" />}
                      {proposal.status === 'Review' && <AlertCircle className="w-3 h-3" />}
                      {proposal.status === 'Submitted' && <CheckCircle2 className="w-3 h-3" />}
                      {proposal.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-foreground-muted font-medium">{proposal.dueDate}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                        <div className="bg-[#c084fc] h-full rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]" style={{ width: `${proposal.score}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-white">{proposal.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/workspace`} 
                      className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/5"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
