import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Target, Zap, Clock, ChevronRight, BarChart3, Briefcase, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function IntelligenceDashboard() {
  const recentMatches = [
    {
      id: "1",
      title: "IT Modernization Services",
      agency: "Department of Defense",
      value: "$15M - $25M",
      matchScore: 94,
      date: "2 days ago",
      status: "new"
    },
    {
      id: "2",
      title: "Cloud Migration Initiative",
      agency: "Department of Energy",
      value: "$5M - $10M",
      matchScore: 88,
      date: "3 days ago",
      status: "viewed"
    },
    {
      id: "3",
      title: "Cybersecurity Support Services",
      agency: "Department of Homeland Security",
      value: "$12M - $18M",
      matchScore: 82,
      date: "1 week ago",
      status: "viewed"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base uppercase tracking-widest font-bold text-white mb-2">Intelligence</h1>
            <p className="text-sm text-foreground-muted">Discover and evaluate bid opportunities matched to your profile.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#111116] border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/[0.02] transition-colors">
              <Filter size={16} />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Search size={16} />
              Search SAM.gov
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-foreground-muted" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-[#0A0A0A] border border-white/10 text-white placeholder-foreground-muted focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] text-sm transition-all"
            placeholder="Search opportunities by keyword, agency, or NAICS code..."
          />
        </div>

        {/* Snapshot Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A0A0A] border border-white/5 p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-30 transition-opacity">
              <Zap size={64} className="text-[#8b5cf6]" />
            </div>
            <div className="w-10 h-10 bg-[#8b5cf6]/10 flex items-center justify-center mb-4">
              <Zap size={20} className="text-[#c084fc]" />
            </div>
            <div className="text-3xl font-display font-bold text-white mb-1">12</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">New Matches This Week</div>
          </div>
          
          <div className="bg-[#0A0A0A] border border-white/5 p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-30 transition-opacity">
              <Target size={64} className="text-emerald-500" />
            </div>
            <div className="w-10 h-10 bg-emerald-500/10 flex items-center justify-center mb-4">
              <Target size={20} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-display font-bold text-white mb-1">4</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">High Probability Bids</div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-30 transition-opacity">
              <BarChart3 size={64} className="text-blue-500" />
            </div>
            <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center mb-4">
              <BarChart3 size={20} className="text-blue-400" />
            </div>
            <div className="text-3xl font-display font-bold text-white mb-1">86%</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Avg Match Score</div>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest font-bold text-white">Recent Matches</h2>
            <Link to="/intelligence/matches" className="text-[10px] uppercase tracking-widest font-bold text-[#c084fc] hover:text-white transition-colors flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="bg-[#0A0A0A] border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#050505] border-b border-white/5">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Opportunity</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Agency</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Value</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Match Score</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-foreground-muted text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentMatches.map((match) => (
                  <tr key={match.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {match.status === 'new' && (
                          <div className="w-2 h-2 rounded-none bg-[#8b5cf6] shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                        )}
                        <div>
                          <div className="text-sm font-bold text-white mb-1">{match.title}</div>
                          <div className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted flex items-center gap-1">
                            <Clock size={12} /> {match.date}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <Building2 size={16} />
                        {match.agency}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white font-mono">
                      {match.value}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-bold text-emerald-400">{match.matchScore}%</div>
                        <div className="w-24 h-1.5 bg-[#111116] overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500" 
                            style={{ width: `${match.matchScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/intelligence/matches/${match.id}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 bg-[#111116] border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white hover:bg-white/[0.02] hover:border-[#8b5cf6] transition-all opacity-0 group-hover:opacity-100"
                      >
                        Evaluate
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Self Discovery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0A0A0A] border border-white/5 p-6 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 bg-[#111116] border border-white/10 flex items-center justify-center mb-4">
              <Briefcase size={20} className="text-white" />
            </div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-2">Browse by Agency</h3>
            <p className="text-sm text-foreground-muted mb-4">Explore opportunities across federal agencies and departments.</p>
            <button className="text-[10px] uppercase tracking-widest font-bold text-[#c084fc] hover:text-white transition-colors flex items-center gap-1">
              Explore Agencies <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="bg-[#0A0A0A] border border-white/5 p-6 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 bg-[#111116] border border-white/10 flex items-center justify-center mb-4">
              <Target size={20} className="text-white" />
            </div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-2">Browse by NAICS</h3>
            <p className="text-sm text-foreground-muted mb-4">Find opportunities matching your specific industry codes.</p>
            <button className="text-[10px] uppercase tracking-widest font-bold text-[#c084fc] hover:text-white transition-colors flex items-center gap-1">
              Explore NAICS <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
