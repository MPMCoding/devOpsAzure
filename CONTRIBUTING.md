# 🤝 Guia de Contribuição

Obrigado por se interessar em contribuir para a **Azure DevOps Learning Platform**! Este documento fornece diretrizes para contribuir ao projeto.

## 📋 Como Contribuir

### Reportar Bugs

Se encontrar um bug, por favor crie uma issue descrevendo:
- O que você esperava que acontecesse
- O que realmente aconteceu
- Passos para reproduzir o problema
- Seu ambiente (navegador, SO, etc.)

### Sugerir Melhorias

Sugestões de melhorias são bem-vindas! Crie uma issue descrevendo:
- A melhoria sugerida
- Por que seria útil
- Exemplos de como funcionaria

### Enviar Pull Requests

1. **Fork o repositório**
```bash
git clone https://github.com/seu-usuario/azure-devops-learning-platform.git
```

2. **Crie uma branch para sua feature**
```bash
git checkout -b feature/minha-feature
```

3. **Faça suas mudanças**
- Siga o estilo de código existente
- Adicione comentários quando necessário
- Teste suas mudanças localmente

4. **Commit suas mudanças**
```bash
git commit -m "feat: descrição clara da mudança"
```

5. **Push para a branch**
```bash
git push origin feature/minha-feature
```

6. **Abra um Pull Request**
- Descreva claramente as mudanças
- Referencie qualquer issue relacionada
- Adicione screenshots se relevante

## 🎨 Padrões de Código

### TypeScript
- Use tipos explícitos quando possível
- Evite `any`
- Siga as convenções de naming

### React
- Use functional components
- Prefira hooks ao invés de class components
- Mantenha componentes pequenos e focados

### Tailwind CSS
- Use classes do Tailwind ao invés de CSS customizado
- Siga o design system definido em `index.css`
- Mantenha a consistência visual

### Commits
Use o padrão Conventional Commits:
```
feat: adicionar novo simulador
fix: corrigir bug na navegação
docs: atualizar README
style: formatar código
refactor: reorganizar estrutura
test: adicionar testes
```

## 🧪 Testando Localmente

1. **Instale as dependências**
```bash
pnpm install
```

2. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
```

3. **Acesse http://localhost:3000**

4. **Teste suas mudanças**
- Navegue por todas as páginas
- Teste os desafios
- Teste os simuladores
- Verifique responsividade

## 📝 Adicionando Conteúdo

### Adicionar um Novo Tópico

1. Edite `client/src/lib/courseData.ts`
2. Adicione um novo objeto ao array `modules`:

```typescript
{
  id: 'topic-5',
  title: 'Novo Tópico',
  presenter: 'Seu Nome',
  description: 'Descrição breve',
  color: '#58A6FF',
  sections: [
    {
      id: 'section-1',
      title: 'Seção 1',
      content: 'Conteúdo...',
      keyPoints: ['Ponto 1', 'Ponto 2'],
      icon: 'BookOpen'
    }
  ]
}
```

### Adicionar um Novo Desafio

1. Edite `client/src/lib/courseData.ts`
2. Adicione um novo objeto ao array `challenges`:

```typescript
{
  id: 'challenge-5',
  title: 'Novo Desafio',
  description: 'Descrição...',
  difficulty: 'medium',
  questions: [
    {
      id: 'q1',
      text: 'Pergunta?',
      options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
      correctAnswer: 1,
      explanation: 'Explicação...'
    }
  ]
}
```

### Adicionar um Novo Simulador

1. Crie um novo componente em `client/src/pages/Simulators.tsx`
2. Adicione a lógica de simulação
3. Adicione o botão na página de simuladores

## 🎯 Áreas de Contribuição

- **Conteúdo:** Adicionar mais tópicos, seções e desafios
- **Simuladores:** Criar novos simuladores práticos
- **UI/UX:** Melhorar a interface e experiência do usuário
- **Documentação:** Melhorar README e comentários de código
- **Performance:** Otimizar a velocidade da plataforma
- **Acessibilidade:** Melhorar acessibilidade (WCAG)

## 📚 Recursos Úteis

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🚀 Processo de Review

Todos os PRs serão revisados pela equipe. Pode haver sugestões de mudanças. Por favor:
- Seja aberto a feedback
- Responda aos comentários
- Faça as mudanças solicitadas

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

## 💬 Dúvidas?

Se tiver dúvidas, abra uma issue ou entre em contato com a equipe DevOps.

---

**Obrigado por contribuir! 🎉**
