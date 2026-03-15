import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, BookOpen, Zap, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

export default function Home() {
  const [, setLocation] = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
        {/* Hero Section */}
        <section className="px-4 py-12 md:px-8 lg:px-12 md:py-16 lg:py-24 max-w-7xl mx-auto">
          <div className="space-y-4 md:space-y-6 lg:space-y-8 mb-8 md:mb-12 lg:mb-16">
            <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-accent/10 border border-accent rounded-lg">
              <span className="text-accent font-semibold text-xs md:text-sm">$ az-devops --start-learning</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Domine o <span className="text-accent">Azure DevOps</span>
            </h1>
            <p className="text-base md:text-lg lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              Aprenda metodologias ágeis, práticas DevOps e domine as ferramentas do Azure DevOps com nossa plataforma interativa.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-12 md:mb-16 lg:mb-24">
            <Button
              size="lg"
              onClick={() => setLocation('/topic/1')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full md:w-auto"
            >
              Começar Aprendizado
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/challenges')}
              className="border-accent text-accent hover:bg-accent/10 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full md:w-auto"
            >
              Ver Desafios
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-24">
            {[
              { label: '4 Tópicos', value: 'Completos' },
              { label: '16 Seções', value: 'Detalhadas' },
              { label: '4 Desafios', value: 'Interativos' },
              { label: '2 Simuladores', value: 'Práticos' },
            ].map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-accent">{stat.label}</div>
                <div className="text-xs md:text-sm lg:text-base text-muted-foreground mt-1 md:mt-2">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-12 md:px-8 lg:px-12 md:py-16 lg:py-24 bg-card/50 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold text-foreground mb-8 md:mb-12 lg:mb-16">O que você vai aprender</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-12">
              {[
                {
                  icon: BookOpen,
                  title: 'Conteúdo Estruturado',
                  description: 'Aprenda desde conceitos básicos até práticas avançadas de DevOps com Azure'
                },
                {
                  icon: Zap,
                  title: 'Simuladores Práticos',
                  description: 'Experimente na prática como funcionam Pipelines, Boards e Repos'
                },
                {
                  icon: Trophy,
                  title: 'Desafios Interativos',
                  description: 'Teste seu conhecimento com quizzes e cenários reais de DevOps'
                },
                {
                  icon: Users,
                  title: 'Comunidade DevOps',
                  description: 'Aprenda com a equipe e compartilhe conhecimento'
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-background border border-border rounded-lg p-4 md:p-6 lg:p-8 hover:border-accent/50 transition-colors">
                    <Icon size={isMobile ? 24 : 32} className="text-accent mb-3 md:mb-4 lg:mb-4" />
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground mb-2 md:mb-3">{feature.title}</h3>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground mb-3 md:mb-6">Criado por Matheus em parceria com a equipe DevOps</p>
            <p className="text-xs md:text-sm text-muted-foreground/70 mb-4 md:mb-8">Leonardo • Daniel • Gustavo • Camille • Raylucas</p>
            <p className="text-xs text-muted-foreground/50 border-t border-border/50 pt-4 md:pt-6 lg:pt-6">Azure DevOps Learning Platform © 2026</p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
