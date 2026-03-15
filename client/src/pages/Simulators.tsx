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
  const [pipelineError, setPipelineError] = useState(false);
  const [pipelineAttempt, setPipelineAttempt] = useState(1);
  const [errorMode] = useState<'odd' | 'even'>(() => Math.random() > 0.5 ? 'odd' : 'even');
  const [lastFailedStageIndex, setLastFailedStageIndex] = useState<number | null>(null);

  const runPipeline = async () => {
    setPipelineRunning(true);
    setPipelineComplete(false);
    setPipelineError(false);

    // Determine if this run should fail
    const shouldFail = (errorMode === 'odd' && pipelineAttempt % 2 !== 0) ||
                       (errorMode === 'even' && pipelineAttempt % 2 === 0);

    let failStageIndex = -1;
    if (shouldFail) {
      // Pick a random stage to fail, excluding the last failed stage to ensure variety
      const availableIndices = pipelineStages.map((_, idx) => idx).filter(idx => idx !== lastFailedStageIndex);
      const indicesToPickFrom = availableIndices.length > 0 ? availableIndices : pipelineStages.map((_, idx) => idx);
      
      failStageIndex = indicesToPickFrom[Math.floor(Math.random() * indicesToPickFrom.length)];
      setLastFailedStageIndex(failStageIndex);
    }

    for (let i = 0; i < pipelineStages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPipelineStages(prev => {
        const updated = [...prev];
        updated[i].status = 'running';
        return updated;
      });

      await new Promise(resolve => setTimeout(resolve, pipelineStages[i].duration * 1000));

      if (shouldFail && i === failStageIndex) {
        setPipelineStages(prev => {
          const updated = [...prev];
          updated[i].status = 'failed';
          return updated;
        });
        setPipelineRunning(false);
        setPipelineError(true);
        setPipelineAttempt(prev => prev + 1);
        return;
      }

      setPipelineStages(prev => {
        const updated = [...prev];
        updated[i].status = 'success';
        return updated;
      });
    }

    setPipelineRunning(false);
    setPipelineComplete(true);
    setPipelineAttempt(prev => prev + 1);
  };

  const resetPipeline = () => {
    setPipelineStages(prev =>
      prev.map(stage => ({ ...stage, status: 'pending' }))
    );
    setPipelineComplete(false);
    setPipelineError(false);
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
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
            <Button
              variant="ghost"
              onClick={() => setSelectedSimulator(null)}
              className="mb-8 text-muted-foreground hover:text-foreground text-sm md:text-base"
            >
              <ChevronLeft size={20} className="mr-2" />
              Voltar aos Simuladores
            </Button>

            <div className="bg-card border border-border rounded-lg p-4 md:p-8">
              <h1 className="text-lg md:text-3xl font-bold text-foreground mb-2">Simulador de Pipeline</h1>
              <p className="text-xs md:text-base text-muted-foreground mb-8">
                Clique em "Executar" para simular o processo de CI/CD
              </p>

              <div className="space-y-4">
                {pipelineStages.map((stage, index) => (
                  <div key={index} className="bg-muted border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground text-sm md:text-base">{stage.name}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent capitalize">
                        {stage.status === 'pending' && '⏳ Aguardando'}
                        {stage.status === 'running' && '⚙️ Executando'}
                        {stage.status === 'success' && '✓ Sucesso'}
                        {stage.status === 'failed' && '✗ Falha'}
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          stage.status === 'success' ? 'bg-green-500' :
                          stage.status === 'running' ? 'bg-blue-500' :
                          stage.status === 'failed' ? 'bg-red-500' :
                          'bg-muted-foreground'
                        }`}
                        style={{
                          width: stage.status === 'pending' ? '0%' : stage.status === 'running' ? '50%' : '100%'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  onClick={runPipeline}
                  disabled={pipelineRunning}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm md:text-base"
                >
                  <Play size={20} className="mr-2" />
                  Executar
                </Button>
                <Button
                  variant="outline"
                  onClick={resetPipeline}
                  className="text-sm md:text-base"
                >
                  <RotateCcw size={20} className="mr-2" />
                  Resetar
                </Button>
              </div>

              {pipelineComplete && (
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-500 font-semibold text-sm md:text-base">
                    ✓ Pipeline executado com sucesso! Aplicação deployada em produção.
                  </p>
                </div>
              )}

              {pipelineError && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-500 font-semibold text-sm md:text-base">
                    ✗ Falha na execução do pipeline. Verifique os logs e tente novamente.
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
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-12">
            <Button
              variant="ghost"
              onClick={() => setSelectedSimulator(null)}
              className="mb-6 text-muted-foreground hover:text-foreground text-sm md:text-base"
            >
              <ChevronLeft size={20} className="mr-2" />
              Voltar aos Simuladores
            </Button>

            <div className="bg-card border border-border rounded-lg p-4 md:p-8 mb-6">
              <h1 className="text-lg md:text-3xl font-bold text-foreground mb-2">Simulador de Board</h1>
              <p className="text-xs md:text-base text-muted-foreground">
                Clique nas setas para mover tarefas entre as colunas
              </p>
            </div>

            {/* Board Container - Scrollable on Mobile */}
            <div className="overflow-x-auto pb-4 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0">
              <div className="grid grid-cols-4 gap-2 md:gap-4 min-w-max md:min-w-0">
                {statuses.map(status => (
                  <div key={status} className="bg-card border border-border rounded-lg p-3 md:p-4 w-56 md:w-auto">
                    <h3 className="font-semibold text-foreground mb-3 md:mb-4 capitalize text-sm md:text-base">
                      {status === 'backlog' && '📋 Backlog'}
                      {status === 'dev' && '💻 Dev'}
                      {status === 'testing' && '🧪 Testes'}
                      {status === 'done' && '✅ Concluído'}
                    </h3>

                    <div className="space-y-2 md:space-y-3">
                      {boardTasks
                        .filter(task => task.status === status)
                        .map(task => (
                          <div
                            key={task.id}
                            className="bg-muted border border-border rounded-lg p-2 md:p-3"
                          >
                            <p className="font-semibold text-foreground text-xs md:text-sm mb-2">{task.title}</p>
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
                                    className="text-xs px-2 py-1 bg-accent/20 text-accent rounded hover:bg-accent/30 transition-colors"
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
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-12">
          <div className="mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Simuladores Práticos</h1>
            <p className="text-sm md:text-lg text-muted-foreground">
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
                description: 'Gerencie tarefas e veja o fluxo de trabalho em tempo real',
                icon: '📊'
              },
            ].map(simulator => (
              <button
                key={simulator.id}
                onClick={() => setSelectedSimulator(simulator.id as SimulatorType)}
                className="bg-card border border-border rounded-lg p-6 md:p-8 hover:border-accent transition-colors text-left"
              >
                <div className="text-3xl md:text-4xl mb-3">{simulator.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{simulator.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{simulator.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
