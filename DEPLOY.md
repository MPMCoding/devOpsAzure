# 🚀 Guia de Deploy

Instruções para fazer deploy da **Azure DevOps Learning Platform** em diferentes plataformas.

## 📋 Pré-requisitos

- Node.js 18+
- pnpm instalado
- Conta em uma plataforma de hospedagem

## 🔨 Build para Produção

```bash
# Instale as dependências
pnpm install

# Faça o build
pnpm build

# Teste localmente
pnpm preview
```

## 🌐 Opções de Deploy

### 1. **Vercel** (Recomendado)

Vercel é a melhor opção para aplicações React.

#### Passos:

1. **Instale o Vercel CLI**
```bash
npm i -g vercel
```

2. **Faça login**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Configure no Vercel Dashboard**
   - Framework: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`

#### Variáveis de Ambiente
Nenhuma variável de ambiente é necessária para esta aplicação estática.

---

### 2. **Netlify**

#### Passos:

1. **Conecte seu repositório**
   - Vá para [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Selecione seu repositório

2. **Configure o Build**
   - Build Command: `pnpm build`
   - Publish Directory: `dist`

3. **Deploy**
   - Netlify fará o deploy automaticamente

---

### 3. **GitHub Pages**

#### Passos:

1. **Configure o repositório**
   - Vá para Settings → Pages
   - Source: Deploy from a branch
   - Branch: main (ou sua branch padrão)

2. **Crie um workflow GitHub Actions**

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      
      - uses: actions/upload-pages-artifact@v2
        with:
          path: 'dist'
      
      - uses: actions/deploy-pages@v2
```

3. **Deploy**
   - Faça push para main
   - GitHub Actions fará o deploy automaticamente

---

### 4. **Azure Static Web Apps**

#### Passos:

1. **Crie um Static Web App**
   - Vá para [Azure Portal](https://portal.azure.com)
   - Crie um novo "Static Web App"
   - Conecte seu repositório GitHub

2. **Configure o Build**
   - Build Presets: Custom
   - App location: `/`
   - API location: (deixe em branco)
   - Output location: `dist`

3. **Configure as variáveis**
   - Vá para Configuration → Application settings
   - Adicione variáveis se necessário

4. **Deploy**
   - Azure fará o deploy automaticamente ao fazer push

---

### 5. **Docker**

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

#### Build e Run

```bash
# Build a imagem
docker build -t azure-devops-learning-platform .

# Execute o container
docker run -p 3000:3000 azure-devops-learning-platform
```

---

## 📊 Monitoramento

### Google Analytics

1. Adicione seu ID do Google Analytics em `client/index.html`
2. Monitore tráfego e comportamento dos usuários

### Sentry (Error Tracking)

1. Crie uma conta em [sentry.io](https://sentry.io)
2. Adicione o Sentry SDK ao projeto
3. Monitore erros em produção

---

## 🔒 Segurança

### Headers de Segurança

Configure headers de segurança no seu servidor:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS

Sempre use HTTPS em produção. Todas as plataformas recomendadas acima fornecem HTTPS automaticamente.

---

## 🚀 CI/CD Pipeline

### GitHub Actions

Exemplo de workflow para testes e deploy:

```yaml
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm check
      - run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📈 Performance

### Otimizações

1. **Gzip Compression**
   - Ativado automaticamente na maioria das plataformas

2. **Image Optimization**
   - Use imagens otimizadas
   - Considere usar WebP

3. **Code Splitting**
   - Vite faz isso automaticamente

4. **Caching**
   - Configure cache headers apropriados

---

## 🆘 Troubleshooting

### Build falha

```bash
# Limpe o cache
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Aplicação não carrega

- Verifique se o `dist/` foi criado
- Verifique se o `package.json` está correto
- Verifique os logs do servidor

### Rotas não funcionam

- Certifique-se de que o servidor está configurado para servir `index.html` para todas as rotas
- Isso é necessário para o roteamento client-side funcionar

---

## 📞 Suporte

Para problemas de deploy, consulte a documentação da plataforma específica ou abra uma issue no repositório.

---

**Happy Deploying! 🎉**
