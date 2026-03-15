import { useRoute } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { modules } from '@/lib/courseData';
import { useLocation } from 'wouter';
import * as Icons from 'lucide-react';

export default function Topic() {
  const [match, params] = useRoute('/topic/:id');
  const [, setLocation] = useLocation();
  
  if (!match) return null;

  const topicId = `topic-${params?.id}`;
  const module = modules.find(m => m.id === topicId);

  if (!module) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Tópico não encontrado</h1>
            <Button onClick={() => setLocation('/')}>Voltar para Home</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header - Fixed on Mobile */}
        <div className="bg-card border-b border-border fixed top-12 left-0 right-0 z-40 md:sticky md:top-0">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-5 pt-4 md:pt-5">
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/')}
                className="p-1 text-muted-foreground hover:text-foreground flex-shrink-0 text-xs md:text-base"
              >
                <ChevronLeft size={18} className="mr-1" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: module.color + '20', borderColor: module.color, borderWidth: '1px' }}
              >
                <div style={{ color: module.color }} className="text-sm md:text-base font-bold">
                  {params?.id}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm md:text-2xl font-bold text-foreground truncate">{module.title}</h1>
                <p className="text-xs text-muted-foreground">Apresentado por {module.presenter}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for fixed header on mobile */}
        <div className="h-12 md:h-0" />

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-12">
          <div className="grid grid-cols-1 gap-8">
            {module.sections.map((section) => {
              const IconComponent = (Icons as any)[section.icon] || Icons.BookOpen;
              return (
                <div
                  key={section.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-colors"
                >
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="p-3 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: module.color + '20' }}
                      >
                        <IconComponent size={24} style={{ color: module.color }} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-foreground mb-3">{section.title}</h2>
                        <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
