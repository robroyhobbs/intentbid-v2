import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText,
  LineChart,
  Library,
  HelpCircle,
  LogOut,
  Target,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/proposals", icon: LayoutDashboard },
    { name: "My Bids", href: "/my-bids", icon: FileText },
    { name: "Intelligence", href: "/intelligence", icon: LineChart },
    { name: "FOIA", href: "/foia", icon: Library },
  ];

  const bottomItems = [
    { name: "Help Center", href: "/help", icon: HelpCircle },
    { name: "Log Out", href: "/logout", icon: LogOut },
  ];

  return (
    <div className="flex flex-col w-64 border-r border-white/5 bg-[#0A0A0A] transition-all duration-300 relative z-20">
      <div className="flex flex-col p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            <Target size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold tracking-tight text-white">IntentBid</span>
            <span className="text-[10px] font-bold tracking-widest text-[#8b5cf6] uppercase">Intelligence</span>
          </div>
        </div>
        
        <Link 
          to="/proposals/new"
          className="flex items-center justify-center gap-2 w-full bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
        >
          <Plus size={18} strokeWidth={2.5} />
          New Proposal
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "text-white bg-white/5" 
                  : "text-foreground-muted hover:bg-white/[0.02] hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#8b5cf6] rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              )}
              <item.icon size={20} className={cn(
                "transition-colors",
                isActive ? "text-[#c084fc]" : "text-foreground-muted group-hover:text-foreground-subtle"
              )} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 space-y-1.5 mb-4 border-t border-white/5">
        {bottomItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground-muted hover:bg-white/[0.02] hover:text-white transition-all duration-200 group"
          >
            <item.icon size={20} className="text-foreground-muted group-hover:text-foreground-subtle transition-colors" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
