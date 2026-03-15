import { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { challenges } from '@/lib/courseData';
import { useLocation } from 'wouter';

export default function Challenges() {
  const [, setLocation] = useLocation();
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const challenge = selectedChallenge
    ? challenges.find(c => c.id === selectedChallenge)
    : null;

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    if (challenge) {
      setShowResults(true);
    }
  };

  const getScore = () => {
    if (!challenge) return 0;
    let correct = 0;
    challenge.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / challenge.questions.length) * 100);
  };

  if (selectedChallenge && challenge && showResults) {
    const score = getScore();
    const passed = score >= 70;

    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedChallenge(null);
                setCurrentQuestion(0);
                setAnswers({});
                setShowResults(false);
              }}
              className="mb-8 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={20} className="mr-2" />
              Voltar aos Desafios
            </Button>

            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <div className="mb-8">
                {passed ? (
                  <Trophy size={64} className="mx-auto text-accent mb-4" />
                ) : (
                  <div className="mx-auto text-muted-foreground mb-4 text-6xl">📊</div>
                )}
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4">
                {passed ? 'Parabéns!' : 'Resultado'}
              </h1>

              <div className="text-6xl font-bold text-accent mb-4">{score}%</div>

              <p className="text-xl text-muted-foreground mb-8">
                {passed
                  ? 'Você passou no desafio! Continue aprendendo.'
                  : 'Revise o conteúdo e tente novamente.'}
              </p>

              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <div className="text-left space-y-4">
                  {challenge.questions.map((q, i) => {
                    const isCorrect = answers[q.id] === q.correctAnswer;
                    return (
                      <div key={q.id} className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle size={20} className="text-red-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="text-left">
                          <p className="font-semibold text-foreground">{q.text}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Sua resposta: {q.options[answers[q.id] || 0]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-500 mt-1">
                              Resposta correta: {q.options[q.correctAnswer]}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground mt-2 italic">{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedChallenge(null);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Tentar Outro Desafio
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (selectedChallenge && challenge) {
    const question = challenge.questions[currentQuestion];

    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedChallenge(null);
                setCurrentQuestion(0);
                setAnswers({});
              }}
              className="mb-8 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={20} className="mr-2" />
              Voltar aos Desafios
            </Button>

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-foreground">{challenge.title}</h1>
                  <span className="text-sm text-muted-foreground">
                    Questão {currentQuestion + 1} de {challenge.questions.length}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / challenge.questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{question.text}</h2>
                <div className="space-y-3">
                  {question.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(question.id, i)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        answers[question.id] === i
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-accent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                            answers[question.id] === i
                              ? 'bg-accent border-accent'
                              : 'border-muted-foreground'
                          }`}
                        >
                          {answers[question.id] === i && (
                            <div className="w-2 h-2 bg-accent-foreground rounded-sm" />
                          )}
                        </div>
                        <span className="text-foreground">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  ← Anterior
                </Button>
                {currentQuestion === challenge.questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={Object.keys(answers).length !== challenge.questions.length}
                  >
                    Enviar Respostas
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Próxima →
                  </Button>
                )}
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
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Desafios</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Teste seu conhecimento com quizzes interativos sobre cada tópico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map(challenge => (
              <button
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge.id)}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all text-left hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{challenge.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      challenge.difficulty === 'easy'
                        ? 'bg-green-500/10 text-green-500'
                        : challenge.difficulty === 'medium'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    {challenge.difficulty === 'easy'
                      ? 'Fácil'
                      : challenge.difficulty === 'medium'
                      ? 'Médio'
                      : 'Difícil'}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {challenge.questions.length} questões
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
