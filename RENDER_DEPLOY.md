# 🚀 Deploy na Render - Guia Passo a Passo

Este guia mostra como fazer deploy da **Azure DevOps Learning Platform** na Render de forma rápida e fácil.

## 📋 Pré-requisitos

1. Conta no GitHub (com o repositório já criado)
2. Conta na Render (crie em [render.com](https://render.com))
3. O projeto já deve estar no GitHub

## 🔧 Passo 1: Prepare o Projeto Localmente

### 1.1 Certifique-se que tudo está commitado

```bash
cd /home/ubuntu/azure-devops-learning-platform

# Verifique o status
git status

# Se houver mudanças, faça commit
git add .
git commit -m "feat: final adjustments before Render deploy"
git push origin main
```

### 1.2 Teste o build localmente

```bash
pnpm install
pnpm build
pnpm preview
```

Se tudo funcionar, você está pronto! ✅

---

## 🌐 Passo 2: Crie um Repositório no GitHub

Se ainda não tiver:

1. Acesse [github.com](https://github.com)
2. Clique em **"New"** para criar um novo repositório
3. Nome: `azure-devops-learning-platform`
4. Descrição: `Plataforma interativa de aprendizado sobre Azure DevOps`
5. Clique em **"Create repository"**

### 2.1 Push do projeto para GitHub

```bash
cd /home/ubuntu/azure-devops-learning-platform

# Se ainda não tiver configurado o remote
git remote add origin https://github.com/seu-usuario/azure-devops-learning-platform.git
git branch -M main
git push -u origin main
```

---

## 🎯 Passo 3: Configure na Render

### 3.1 Acesse a Render

1. Vá para [render.com](https://render.com)
2. Clique em **"Sign up"** ou **"Sign in"**
3. Use sua conta do GitHub para fazer login (recomendado)

### 3.2 Crie um novo Web Service

1. No dashboard, clique em **"New +"**
2. Selecione **"Web Service"**
3. Clique em **"Connect a repository"**

### 3.3 Conecte seu repositório

1. Selecione **"GitHub"**
2. Procure por `azure-devops-learning-platform`
3. Clique em **"Connect"**

### 3.4 Configure o Build

Na página de configuração, preencha:

| Campo | Valor |
|-------|-------|
| **Name** | `azure-devops-learning-platform` |
| **Environment** | `Node` |
| **Region** | `São Paulo` (ou sua região) |
| **Branch** | `main` |
| **Build Command** | `pnpm install && pnpm build` |
| **Start Command** | `pnpm start` |

### 3.5 Configurações Avançadas (Opcional)

- **Auto-deploy:** Ativado (fará deploy automático ao fazer push)
- **Autoscaling:** Desativado (para projeto estático)

### 3.6 Clique em "Create Web Service"

A Render começará a fazer o build automaticamente. Isso pode levar 2-5 minutos.

---

## ✅ Passo 4: Acompanhe o Deploy

1. Você verá uma página com o progresso do build
2. Procure por mensagens como:
   - ✅ `Build succeeded`
   - ✅ `Service is live`

3. Quando terminar, você receberá uma URL como:
   ```
   https://azure-devops-learning-platform.onrender.com
   ```

---

## 🔗 Passo 5: Acesse sua Aplicação

1. Clique no link gerado
2. Sua plataforma estará ao vivo! 🎉

---

## 🔄 Atualizações Futuras

Toda vez que você fizer push para `main`, a Render fará deploy automaticamente:

```bash
# Faça suas mudanças
git add .
git commit -m "feat: nova feature"
git push origin main

# Render fará deploy automaticamente em ~2 minutos
```

---

## 🆘 Troubleshooting

### Build falha com erro de dependências

```bash
# Limpe o cache localmente
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build

# Faça push
git add .
git commit -m "fix: clean dependencies"
git push origin main
```

### Aplicação não carrega

1. Verifique os logs na Render:
   - Vá para seu serviço
   - Clique em **"Logs"**
   - Procure por erros

2. Verifique se o `dist/` foi criado:
   ```bash
   pnpm build
   ls -la dist/
   ```

### Erro 404 em rotas

A Render pode precisar de configuração especial para SPA (Single Page Application).

**Solução:** Crie um arquivo `render.yaml` na raiz do projeto:

```yaml
services:
  - type: web
    name: azure-devops-learning-platform
    env: node
    buildCommand: pnpm install && pnpm build
    startCommand: pnpm start
    routes:
      - path: /*
        destination: /index.html
        matchType: rewrite
```

---

## 📊 Monitoramento

Após o deploy, você pode:

1. **Ver Logs:** Clique em "Logs" para ver o que está acontecendo
2. **Métricas:** Veja CPU, memória e requisições
3. **Alertas:** Configure notificações de erro

---

## 💡 Dicas

- **Domínio Customizado:** Render permite adicionar seu próprio domínio (pago)
- **Variáveis de Ambiente:** Se precisar no futuro, use a seção "Environment"
- **Redeploy Manual:** Vá em "Manual Deploy" se precisar fazer deploy sem fazer push

---

## 🎉 Pronto!

Sua plataforma está no ar! Compartilhe o link com a equipe:

```
https://azure-devops-learning-platform.onrender.com
```

---

## 📞 Suporte

- Documentação Render: [render.com/docs](https://render.com/docs)
- Problemas? Abra uma issue no GitHub

**Bom deploy! 🚀**
