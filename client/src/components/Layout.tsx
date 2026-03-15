import { useState } from 'react';
import { useLocation } from 'wouter';
import { Menu, X, BookOpen, Zap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [location, setLocation] = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', path: '/', icon: BookOpen },
    { id: 'topic-1', label: 'Tópico 1: Azure DevOps', path: '/topic/1', icon: BookOpen },
    { id: 'topic-2', label: 'Tópico 2: Ágil & DevOps', path: '/topic/2', icon: BookOpen },
    { id: 'topic-3', label: 'Tópico 3: Organização', path: '/topic/3', icon: BookOpen },
    { id: 'topic-4', label: 'Tópico 4: Recursos', path: '/topic/4', icon: BookOpen },
    { id: 'simulators', label: 'Simuladores', path: '/simulators', icon: Zap },
    { id: 'challenges', label: 'Desafios', path: '/challenges', icon: Trophy },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-accent">DevOps</h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <button
                key={item.id}
                onClick={() => setLocation(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-border text-xs text-muted-foreground space-y-2">
            <p>Azure DevOps Learning Platform</p>
            <p>Desenvolvido pela equipe DevOps</p>
            <p className="text-muted-foreground/50 border-t border-border/50 pt-2 mt-2">Design: <span className="text-accent/70">Matheus</span></p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
