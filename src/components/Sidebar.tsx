import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen,
  Globe,
  Library,
  Settings,
  HelpCircle,
  LogOut,
  Target,
  Plus,
  Zap,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/proposals", icon: LayoutDashboard },
    { name: "Managed Delivery", href: "/managed-delivery", icon: Briefcase },
    { name: "Business Profile", href: "/business-profile", icon: BookOpen },
    { name: "Intelligence", href: "/intelligence", icon: Globe },
    { name: "FOIA", href: "/foia", icon: Library },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const bottomItems = [
    { name: "What's New", href: "/whats-new", icon: Zap },
    { name: "System Ready", href: "/status", icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-col w-64 border-r border-white/5 bg-[#0A0A0A] transition-all duration-300 relative z-20">
      <div className="flex flex-col p-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#111116] border border-white/10 flex items-center justify-center text-white">
              <Target size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-base uppercase tracking-widest font-bold tracking-tight text-white">IntentBid</span>
              <span className="text-[10px] font-mono tracking-widest text-foreground-muted uppercase">Intelligence</span>
            </div>
          </div>
        </div>
        
        <Link 
          to="/proposals/new"
          className="flex items-center justify-center gap-2 w-full bg-white text-black text-[10px] font-bold uppercase tracking-widest py-3 px-4 hover:bg-gray-200 transition-all"
        >
          <Plus size={16} strokeWidth={2.5} />
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
                "flex items-center gap-3 px-3 py-3 text-[10px] uppercase tracking-widest font-bold transition-all duration-200 group relative border border-transparent",
                isActive 
                  ? "text-white bg-[#111116] border-white/10" 
                  : "text-foreground-muted hover:bg-white/[0.02] hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8b5cf6]" />
              )}
              <item.icon size={18} className={cn(
                "transition-colors",
                isActive ? "text-[#c084fc]" : "text-foreground-muted group-hover:text-foreground-subtle"
              )} />
              <span className={isActive ? "font-bold" : ""}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 space-y-1.5 mb-4 border-t border-white/5">
        {bottomItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 px-3 py-3 text-[10px] uppercase tracking-widest font-bold text-foreground-muted hover:bg-white/[0.02] hover:text-white transition-all duration-200 group"
          >
            <item.icon size={18} className="text-foreground-muted group-hover:text-foreground-subtle transition-colors" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
