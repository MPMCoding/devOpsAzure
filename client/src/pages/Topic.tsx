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
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-8 py-6">
            <Button
              variant="ghost"
              onClick={() => setLocation('/')}
              className="mb-4 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={20} className="mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: module.color + '20', borderColor: module.color, borderWidth: '1px' }}
              >
                <div style={{ color: module.color }} className="text-xl font-bold">
                  {params?.id}
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{module.title}</h1>
                <p className="text-muted-foreground">Apresentado por {module.presenter}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-8 py-12">
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
                        <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {section.content}
                    </p>

                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">Pontos-chave</h3>
                      <ul className="space-y-2">
                        {section.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: module.color }} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-8 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                const prevId = parseInt(params?.id) - 1;
                if (prevId >= 1) setLocation(`/topic/${prevId}`);
              }}
              disabled={parseInt(params?.id) === 1}
            >
              ← Tópico Anterior
            </Button>
            <Button
              onClick={() => {
                const nextId = parseInt(params?.id) + 1;
                if (nextId <= 4) setLocation(`/topic/${nextId}`);
              }}
              disabled={parseInt(params?.id) === 4}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Próximo Tópico →
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
