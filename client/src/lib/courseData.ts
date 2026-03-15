export interface Module {
  id: string;
  title: string;
  presenter: string;
  description: string;
  sections: Section[];
  color: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  icon: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const modules: Module[] = [
  {
    id: 'topic-1',
    title: 'Introdução ao Azure DevOps',
    presenter: 'Leonardo',
    description: 'Conceitos fundamentais e definição da plataforma',
    color: '#58A6FF',
    sections: [
      {
        id: 'def-1',
        title: 'O que é Azure DevOps?',
        content: 'O Azure DevOps é uma plataforma da Microsoft utilizada para gerenciar todo o ciclo de desenvolvimento de software, desde o planejamento até a entrega da aplicação. É essencial em ambientes onde desenvolvimento e operações trabalham juntos para entregas rápidas e seguras.',
        keyPoints: [
          'Ferramenta em nuvem integrada',
          'Gerencia todo o ciclo de desenvolvimento',
          'Essencial para integração Dev/Ops',
          'Suporta entregas rápidas e seguras'
        ],
        icon: 'Cloud'
      },
      {
        id: 'origin-1',
        title: 'Origem e Evolução',
        content: 'O Azure DevOps tem sua origem no Team Foundation Server (TFS) e Visual Studio Team Services (VSTS), evoluindo para uma plataforma moderna e integrada na nuvem.',
        keyPoints: [
          'Origem: Team Foundation Server (TFS)',
          'Evolução: Visual Studio Team Services (VSTS)',
          'Atual: Azure DevOps (plataforma cloud)',
          'Integração contínua com Azure'
        ],
        icon: 'History'
      },
      {
        id: 'problems-1',
        title: 'Problemas Resolvidos',
        content: 'O Azure DevOps busca resolver desafios comuns no desenvolvimento de software, eliminando desorganização, perda de código e processos manuais.',
        keyPoints: [
          'Fim da desorganização',
          'Prevenção de perda de códigos',
          'Eliminação de deploy manual',
          'Testes formalizados e automatizados'
        ],
        icon: 'CheckCircle'
      },
      {
        id: 'usage-1',
        title: 'Onde Usar',
        content: 'O Azure DevOps é ideal para automatizar tarefas, organizar trabalho, facilitar colaboração em equipe e gerenciar sistemas corporativos.',
        keyPoints: [
          'Automatizar tarefas repetitivas',
          'Organizar e priorizar trabalho',
          'Facilitar trabalho em equipes',
          'Gerenciar ambientes corporativos',
          'Controlar sistemas internos de empresas'
        ],
        icon: 'Target'
      }
    ]
  },
  {
    id: 'topic-2',
    title: 'Metodologias Ágeis e DevOps',
    presenter: 'Daniel',
    description: 'Princípios, ciclos e benefícios da metodologia DevOps',
    color: '#58A6FF',
    sections: [
      {
        id: 'concept-2',
        title: 'Conceito de DevOps',
        content: 'DevOps é uma metodologia que integra desenvolvimento e operações, promovendo automação, colaboração e entrega contínua.',
        keyPoints: [
          'Integração entre Dev e Ops',
          'Automação de processos',
          'Colaboração contínua',
          'Entrega rápida e frequente'
        ],
        icon: 'GitBranch'
      },
      {
        id: 'principles-2',
        title: 'Princípios Fundamentais',
        content: 'Os princípios de DevOps incluem automação, medição, compartilhamento e integração contínua.',
        keyPoints: [
          'Automação de tudo que é possível',
          'Medição contínua de métricas',
          'Compartilhamento de conhecimento',
          'Integração contínua (CI)',
          'Entrega contínua (CD)'
        ],
        icon: 'Zap'
      },
      {
        id: 'cycle-2',
        title: 'Ciclo DevOps',
        content: 'O ciclo DevOps compreende as fases de Planejamento, Desenvolvimento, Build, Testes, Deploy, Operação e Monitoramento.',
        keyPoints: [
          'Planejamento e Backlog',
          'Desenvolvimento de código',
          'Build e Integração',
          'Testes automatizados',
          'Deploy contínuo',
          'Operação em produção',
          'Monitoramento e feedback'
        ],
        icon: 'Repeat'
      }
    ]
  },
  {
    id: 'topic-3',
    title: 'Organização da Equipe e Processos',
    presenter: 'Gustavo',
    description: 'Como estruturar e gerenciar equipes DevOps',
    color: '#38BDF8',
    sections: [
      {
        id: 'org-3',
        title: 'Organização da Equipe',
        content: 'Uma equipe DevOps eficaz requer integração entre desenvolvedores, operadores, QA e gestores, trabalhando em conjunto para objetivos comuns.',
        keyPoints: [
          'Integração Dev + Ops + QA',
          'Responsabilidades compartilhadas',
          'Comunicação contínua',
          'Objetivos alinhados'
        ],
        icon: 'Users'
      },
      {
        id: 'distribution-3',
        title: 'Distribuição de Tarefas',
        content: 'As tarefas devem ser distribuídas considerando especialidades, capacidades e prioridades do projeto.',
        keyPoints: [
          'Atribuição por especialidade',
          'Balanceamento de carga',
          'Priorização de tarefas',
          'Colaboração entre especialistas'
        ],
        icon: 'Share2'
      },
      {
        id: 'progress-3',
        title: 'Acompanhamento do Progresso',
        content: 'O acompanhamento deve ser contínuo, utilizando métricas, reuniões regulares e dashboards de visualização.',
        keyPoints: [
          'Métricas de desempenho',
          'Reuniões de sincronização',
          'Dashboards visuais',
          'Rastreamento de impedimentos'
        ],
        icon: 'TrendingUp'
      },
      {
        id: 'quality-3',
        title: 'Impacto na Qualidade',
        content: 'A organização adequada resulta em maior qualidade, menos erros e entregas mais confiáveis.',
        keyPoints: [
          'Redução de bugs em produção',
          'Melhor cobertura de testes',
          'Feedback mais rápido',
          'Maior confiabilidade'
        ],
        icon: 'Award'
      }
    ]
  },
  {
    id: 'topic-4',
    title: 'Recursos Técnicos e Prática',
    presenter: 'Camille e Raylucas',
    description: 'Ferramentas e exemplo prático do Azure DevOps',
    color: '#A371F7',
    sections: [
      {
        id: 'platforms-4',
        title: 'Plataforma Integrada',
        content: 'O Azure DevOps gerencia todo o ciclo de desenvolvimento, do planejamento à entrega, com funcionalidades integradas.',
        keyPoints: [
          'Planejar tarefas',
          'Controlar versões',
          'Automatizar builds',
          'Gerenciar deploys',
          'Monitorar progresso'
        ],
        icon: 'Layers'
      },
      {
        id: 'ecosystem-4',
        title: 'Ecossistema de Ferramentas',
        content: 'Azure Boards para gestão, Repos para versionamento, Pipelines para CI/CD, Test Plans para testes e Artifacts para pacotes.',
        keyPoints: [
          'Azure Boards: Gestão de tarefas',
          'Azure Repos: Controle de versão Git',
          'Azure Pipelines: Automação CI/CD',
          'Azure Test Plans: Planejamento de testes',
          'Azure Artifacts: Gestão de pacotes'
        ],
        icon: 'Package'
      },
      {
        id: 'workflow-4',
        title: 'Fluxo de Trabalho Prático',
        content: 'Exemplo real: PO cria tarefas → Sprint distribui → Dev codifica → Pipeline testa → Deploy automático.',
        keyPoints: [
          'PO cria tarefas no Boards',
          'Tarefas distribuídas na Sprint',
          'Dev desenvolve e envia para Repos',
          'Pipeline executa build e testes',
          'Deploy automático se aprovado'
        ],
        icon: 'Workflow'
      },
      {
        id: 'benefits-4',
        title: 'Vantagens e Eficiência',
        content: 'Integração de ferramentas, facilitação do trabalho em equipe, automação de processos e melhor controle.',
        keyPoints: [
          'Integração completa de ferramentas',
          'Facilita trabalho em equipe',
          'Automação de processos',
          'Melhor controle e acompanhamento',
          'Transparência total do projeto'
        ],
        icon: 'Zap'
      }
    ]
  }
];

export const challenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Conceitos Fundamentais',
    description: 'Teste seu conhecimento sobre os conceitos básicos do Azure DevOps',
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        text: 'O que é Azure DevOps?',
        options: [
          'Uma plataforma de gerenciamento de projetos apenas',
          'Uma ferramenta em nuvem que gerencia todo o ciclo de desenvolvimento de software',
          'Um serviço de hospedagem de código',
          'Uma linguagem de programação'
        ],
        correctAnswer: 1,
        explanation: 'Azure DevOps é uma plataforma em nuvem da Microsoft que gerencia todo o ciclo de desenvolvimento de software, desde o planejamento até a entrega.'
      },
      {
        id: 'q2',
        text: 'Qual é a origem do Azure DevOps?',
        options: [
          'GitHub',
          'GitLab',
          'Team Foundation Server (TFS) e Visual Studio Team Services (VSTS)',
          'Jenkins'
        ],
        correctAnswer: 2,
        explanation: 'O Azure DevOps evoluiu do Team Foundation Server (TFS) e do Visual Studio Team Services (VSTS).'
      },
      {
        id: 'q3',
        text: 'Qual problema o Azure DevOps NÃO resolve?',
        options: [
          'Desorganização no desenvolvimento',
          'Perda de códigos',
          'Deploy manual',
          'Hospedagem de servidores físicos'
        ],
        correctAnswer: 3,
        explanation: 'Azure DevOps resolve problemas de organização, perda de código e deploy manual, mas não é uma solução de hospedagem de servidores físicos.'
      }
    ]
  },
  {
    id: 'challenge-2',
    title: 'Metodologia DevOps',
    description: 'Teste seu conhecimento sobre os princípios e ciclo DevOps',
    difficulty: 'medium',
    questions: [
      {
        id: 'q4',
        text: 'Qual é o principal objetivo do DevOps?',
        options: [
          'Separar desenvolvimento e operações',
          'Integrar desenvolvimento e operações para automação e entrega contínua',
          'Aumentar o número de desenvolvedores',
          'Reduzir custos de infraestrutura'
        ],
        correctAnswer: 1,
        explanation: 'O principal objetivo do DevOps é integrar desenvolvimento e operações, promovendo automação, colaboração e entrega contínua.'
      },
      {
        id: 'q5',
        text: 'Quantas fases principais tem o ciclo DevOps?',
        options: [
          '3 fases',
          '5 fases',
          '7 fases',
          '10 fases'
        ],
        correctAnswer: 2,
        explanation: 'O ciclo DevOps compreende 7 fases: Planejamento, Desenvolvimento, Build, Testes, Deploy, Operação e Monitoramento.'
      }
    ]
  },
  {
    id: 'challenge-3',
    title: 'Ferramentas do Azure DevOps',
    description: 'Teste seu conhecimento sobre as ferramentas do ecossistema',
    difficulty: 'medium',
    questions: [
      {
        id: 'q6',
        text: 'Qual ferramenta do Azure DevOps é usada para controle de versão?',
        options: [
          'Azure Boards',
          'Azure Repos',
          'Azure Pipelines',
          'Azure Artifacts'
        ],
        correctAnswer: 1,
        explanation: 'Azure Repos é o sistema de controle de versão baseado em Git do Azure DevOps.'
      },
      {
        id: 'q7',
        text: 'O que faz o Azure Pipelines?',
        options: [
          'Gerencia tarefas do projeto',
          'Controla versões de código',
          'Automatiza processos de build, teste e deploy',
          'Armazena pacotes e dependências'
        ],
        correctAnswer: 2,
        explanation: 'Azure Pipelines automatiza os processos de build, teste e deploy de aplicações (CI/CD).'
      },
      {
        id: 'q8',
        text: 'Qual é a função do Azure Boards?',
        options: [
          'Executar testes automatizados',
          'Gerenciar tarefas, sprints e backlog do projeto',
          'Armazenar código-fonte',
          'Monitorar performance da aplicação'
        ],
        correctAnswer: 1,
        explanation: 'Azure Boards é responsável pela gestão de tarefas, planejamento de sprints e organização do backlog do projeto.'
      }
    ]
  },
  {
    id: 'challenge-4',
    title: 'Cenários Práticos',
    description: 'Teste seu conhecimento em cenários reais de uso',
    difficulty: 'hard',
    questions: [
      {
        id: 'q9',
        text: 'Em um fluxo DevOps, qual é a ordem correta de etapas?',
        options: [
          'Deploy → Build → Desenvolvimento → Planejamento',
          'Planejamento → Desenvolvimento → Build → Testes → Deploy',
          'Build → Testes → Desenvolvimento → Deploy → Planejamento',
          'Desenvolvimento → Planejamento → Build → Testes → Deploy'
        ],
        correctAnswer: 1,
        explanation: 'A ordem correta é: Planejamento (criar tarefas) → Desenvolvimento (codificar) → Build (compilar) → Testes (validar) → Deploy (publicar).'
      },
      {
        id: 'q10',
        text: 'O que deve acontecer se um teste falhar no Pipeline?',
        options: [
          'Continuar com o deploy mesmo assim',
          'Parar o pipeline e notificar o desenvolvedor',
          'Ignorar o erro e registrar em log',
          'Fazer rollback automático'
        ],
        correctAnswer: 1,
        explanation: 'Se um teste falhar no Pipeline, o processo deve parar e notificar o desenvolvedor para que ele corrija o problema antes de prosseguir.'
      }
    ]
  }
];
