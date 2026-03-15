import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Menu, X, BookOpen, Zap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [location, setLocation] = useLocation();

  // Detectar mudanças de tamanho de tela
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Fechar sidebar em mobile ao redimensionar
      if (mobile) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fechar sidebar ao clicar em um link (mobile)
  const handleNavClick = (path: string) => {
    setLocation(path);
    if (isMobile) setSidebarOpen(false);
  };

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
      {/* Mobile Menu Button - Fixed Top */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-0"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-accent font-bold text-sm hover:text-accent/80"
          >
            Azure DevOps
          </Button>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-8 py-4 flex items-center">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-accent font-bold text-lg hover:text-accent/80"
          >
            Azure DevOps
          </Button>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-12 md:h-16" />

      {/* Sidebar - Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isMobile
            ? `fixed left-0 top-12 h-[calc(100%-3rem)] w-72 z-40 transform transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-80 lg:w-96 mt-16'
        } bg-card border-r border-border flex flex-col overflow-hidden`}
      >
        {/* Header - Desktop only */}
        {!isMobile && (
          <div className="p-8 border-b border-border">
            <h1 className="text-2xl font-bold text-accent">DevOps</h1>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto ${isMobile ? 'p-4 space-y-2 pt-20' : 'p-6 space-y-3'}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  isMobile ? 'text-base' : 'text-base'
                } ${
                  location === item.path
                    ? 'bg-accent/20 text-accent font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon size={isMobile ? 20 : 22} />
                <span className={isMobile ? 'font-medium' : 'font-medium'}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`border-t border-border text-center ${isMobile ? 'p-4 space-y-2' : 'p-6 space-y-3'}`}>
          <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Criado por Matheus em parceria com a equipe DevOps
          </p>
          <p className={`text-muted-foreground/70 ${isMobile ? 'text-xs' : 'text-xs'}`}>
            Leonardo • Daniel • Gustavo • Camille • Raylucas
          </p>
          <p className={`text-muted-foreground/50 border-t border-border/50 pt-2 mt-2 ${isMobile ? 'text-xs' : 'text-xs'}`}>
            Azure DevOps Learning Platform
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-auto ${isMobile ? 'pt-12' : 'pt-16'}`}>
        {children}
      </main>
    </div>
  );
}
