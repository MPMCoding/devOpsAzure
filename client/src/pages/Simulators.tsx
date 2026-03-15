import { useState } from 'react';
import { ChevronLeft, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useLocation } from 'wouter';

type SimulatorType = 'pipeline' | 'board' | 'repos' | null;

interface PipelineStage {
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  duration: number;
}

interface BoardTask {
  id: string;
  title: string;
  status: 'backlog' | 'dev' | 'testing' | 'done';
  assignee: string;
}

export default function Simulators() {
  const [, setLocation] = useLocation();
  const [selectedSimulator, setSelectedSimulator] = useState<SimulatorType>(null);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    { name: 'Build', status: 'pending', duration: 2 },
    { name: 'Unit Tests', status: 'pending', duration: 3 },
    { name: 'Integration Tests', status: 'pending', duration: 4 },
    { name: 'Deploy Staging', status: 'pending', duration: 2 },
    { name: 'Deploy Production', status: 'pending', duration: 1 },
  ]);
  const [boardTasks, setBoardTasks] = useState<BoardTask[]>([
    { id: '1', title: 'Implementar login', status: 'dev', assignee: 'João' },
    { id: '2', title: 'Criar dashboard', status: 'backlog', assignee: 'Maria' },
    { id: '3', title: 'Testes de segurança', status: 'testing', assignee: 'Pedro' },
    { id: '4', title: 'Deploy v1.0', status: 'done', assignee: 'Ana' },
  ]);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineComplete, setPipelineComplete] = useState(false);

  const runPipeline = async () => {
    setPipelineRunning(true);
    setPipelineComplete(false);

    for (let i = 0; i < pipelineStages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPipelineStages(prev => {
        const updated = [...prev];
        updated[i].status = 'running';
        return updated;
      });

      await new Promise(resolve => setTimeout(resolve, pipelineStages[i].duration * 1000));

      setPipelineStages(prev => {
        const updated = [...prev];
        updated[i].status = i < 3 ? 'success' : i === 3 ? 'success' : 'success';
        return updated;
      });
    }

    setPipelineRunning(false);
    setPipelineComplete(true);
  };

  const resetPipeline = () => {
    setPipelineStages(prev =>
      prev.map(stage => ({ ...stage, status: 'pending' }))
    );
    setPipelineComplete(false);
  };

  const moveTask = (taskId: string, newStatus: BoardTask['status']) => {
    setBoardTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const statuses: BoardTask['status'][] = ['backlog', 'dev', 'testing', 'done'];

  if (selectedSimulator === 'pipeline') {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <Button
              variant="ghost"
              onClick={() => setSelectedSimulator(null)}
              className="mb-8 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={20} className="mr-2" />
              Voltar aos Simuladores
            </Button>

            <div className="bg-card border border-border rounded-lg p-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Simulador de Pipeline</h1>
              <p className="text-muted-foreground mb-8">
                Veja como funciona o processo de CI/CD no Azure DevOps
              </p>

              <div className="space-y-4 mb-8">
                {pipelineStages.map((stage, i) => (
                  <div key={i} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{stage.name}</span>
                      <span className="text-sm text-muted-foreground">{stage.duration}s</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      {stage.status === 'pending' && (
                        <div className="bg-muted-foreground h-2 rounded-full w-0" />
                      )}
                      {stage.status === 'running' && (
                        <div className="bg-yellow-500 h-2 rounded-full w-1/2 animate-pulse" />
                      )}
                      {stage.status === 'success' && (
                        <div className="bg-green-500 h-2 rounded-full w-full" />
                      )}
                      {stage.status === 'failed' && (
                        <div className="bg-red-500 h-2 rounded-full w-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={runPipeline}
                  disabled={pipelineRunning}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Play size={20} className="mr-2" />
                  Executar Pipeline
                </Button>
                <Button
                  onClick={resetPipeline}
                  variant="outline"
                >
                  <RotateCcw size={20} className="mr-2" />
                  Resetar
                </Button>
              </div>

              {pipelineComplete && (
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-500 font-semibold">
                    ✓ Pipeline executado com sucesso! Aplicação deployada em produção.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (selectedSimulator === 'board') {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="max-w-6xl mx-auto px-8 py-12">
            <Button
              variant="ghost"
              onClick={() => setSelectedSimulator(null)}
              className="mb-8 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={20} className="mr-2" />
              Voltar aos Simuladores
            </Button>

            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Simulador de Board</h1>
              <p className="text-muted-foreground">
                Arraste as tarefas entre as colunas para simular o fluxo de trabalho
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {statuses.map(status => (
                <div key={status} className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-4 capitalize">
                    {status === 'backlog' && '📋 Backlog'}
                    {status === 'dev' && '💻 Em Desenvolvimento'}
                    {status === 'testing' && '🧪 Testes'}
                    {status === 'done' && '✅ Concluído'}
                  </h3>

                  <div className="space-y-3">
                    {boardTasks
                      .filter(task => task.status === status)
                      .map(task => (
                        <div
                          key={task.id}
                          className="bg-muted border border-border rounded-lg p-3 cursor-move hover:border-accent transition-colors"
                        >
                          <p className="font-semibold text-foreground text-sm mb-2">{task.title}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{task.assignee}</span>
                            <div className="flex gap-1">
                              {status !== 'done' && (
                                <button
                                  onClick={() => {
                                    const nextIndex = statuses.indexOf(status) + 1;
                                    if (nextIndex < statuses.length) {
                                      moveTask(task.id, statuses[nextIndex]);
                                    }
                                  }}
                                  className="text-xs px-2 py-1 bg-accent/20 text-accent rounded hover:bg-accent/30"
                                >
                                  →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Simuladores Práticos</h1>
            <p className="text-xl text-muted-foreground">
              Experimente na prática como funcionam os principais processos do Azure DevOps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 'pipeline',
                title: 'Simulador de Pipeline',
                description: 'Veja como funciona o processo de CI/CD com Build, Testes e Deploy',
                icon: '🚀'
              },
              {
                id: 'board',
                title: 'Simulador de Board',
                description: 'Gerencie tarefas movendo-as entre diferentes estágios',
                icon: '📋'
              },
            ].map(sim => (
              <button
                key={sim.id}
                onClick={() => setSelectedSimulator(sim.id as SimulatorType)}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all text-left hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{sim.icon}</div>
                <h2 className="text-xl font-bold text-foreground mb-2">{sim.title}</h2>
                <p className="text-muted-foreground">{sim.description}</p>
                <div className="mt-4 text-accent font-semibold flex items-center">
                  Acessar →
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 bg-muted/50 border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">💡 Dica</h2>
            <p className="text-muted-foreground">
              Os simuladores são ferramentas interativas para você entender melhor como funcionam os processos do Azure DevOps. Experimente diferentes cenários e veja os resultados em tempo real!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
