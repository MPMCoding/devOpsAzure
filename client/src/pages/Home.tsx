import { useLocation } from 'wouter';
import { ArrowRight, BookOpen, Zap, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
        {/* Hero Section */}
        <section className="px-8 py-20 max-w-6xl mx-auto">
          <div className="space-y-6 mb-12">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent rounded-lg">
              <span className="text-accent font-semibold text-sm">$ az-devops --start-learning</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Domine o <span className="text-accent">Azure DevOps</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Aprenda metodologias ágeis, práticas DevOps e domine as ferramentas do Azure DevOps com nossa plataforma interativa.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-20">
            <Button
              size="lg"
              onClick={() => setLocation('/topic/1')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Começar Aprendizado
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/challenges')}
              className="border-accent text-accent hover:bg-accent/10"
            >
              Ver Desafios
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            {[
              { label: '4 Tópicos', value: 'Completos' },
              { label: '16 Seções', value: 'Detalhadas' },
              { label: '4 Desafios', value: 'Interativos' },
              { label: '2 Simuladores', value: 'Práticos' },
            ].map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="text-2xl font-bold text-accent">{stat.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="px-8 py-20 bg-card/50 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12">O que você vai aprender</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  description: 'Teste seu conhecimento com quizzes e cenários reais'
                },
                {
                  icon: Users,
                  title: 'Baseado em Experiência Real',
                  description: 'Conteúdo desenvolvido pela equipe DevOps com casos reais'
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                        <Icon size={24} className="text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground mt-2">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Topics Preview */}
        <section className="px-8 py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12">Tópicos do Curso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'Introdução ao Azure DevOps',
                presenter: 'Leonardo',
                color: '#58A6FF',
                path: '/topic/1'
              },
              {
                num: '02',
                title: 'Metodologias Ágeis e DevOps',
                presenter: 'Daniel',
                color: '#58A6FF',
                path: '/topic/2'
              },
              {
                num: '03',
                title: 'Organização da Equipe e Processos',
                presenter: 'Gustavo',
                color: '#38BDF8',
                path: '/topic/3'
              },
              {
                num: '04',
                title: 'Recursos Técnicos e Prática',
                presenter: 'Camille e Raylucas',
                color: '#A371F7',
                path: '/topic/4'
              },
            ].map((topic, i) => (
              <button
                key={i}
                onClick={() => setLocation(topic.path)}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:border-accent transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-4xl font-bold text-muted-foreground mb-2">{topic.num}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Apresentado por {topic.presenter}</p>
                  <div className="flex items-center text-accent text-sm font-semibold group-hover:gap-2 transition-all">
                    Acessar <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 py-12 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center text-muted-foreground text-sm mb-4">
              <p>Azure DevOps Learning Platform © 2026</p>
              <p className="mt-2">Desenvolvido pela equipe DevOps - Leonardo, Daniel, Gustavo, Camille e Raylucas</p>
            </div>
            <div className="text-center text-xs text-muted-foreground/60 border-t border-border/50 pt-4">
              <p>Plataforma e Design: <span className="text-accent">Matheus</span></p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
