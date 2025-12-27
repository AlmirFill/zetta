Guia rápido: Deploy com Render (app) + Railway (MySQL)

Resumo:
- Serviço Node (Express) hospedado no Render
- Banco MySQL gerenciado no Railway

Passo 1 — Preparar repositório Git
1. Inicialize o repositório localmente (se ainda não):

```bash
cd /path/to/#01.login.eu_so
git init
git add .
git commit -m "Initial commit: prepare for deploy"
```

2. Crie um repositório no GitHub e faça push:

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git branch -M main
git push -u origin main
```

Passo 2 — Criar banco no Railway
1. Acesse https://railway.app e crie uma conta (ou faça login).
2. Crie um novo Project → Add Plugin → MySQL.
3. Aguarde o provisionamento; copie a `DATABASE_URL` (formato `mysql://user:pass@host:port/dbname`).
4. Opcional: importe schema (crie tabelas) via cli/GUI ou rode um script SQL.

Passo 3 — Criar Web Service no Render
1. Acesse https://render.com e crie conta/login.
2. New → Web Service → Connect your GitHub repo (autorize Render).
3. Branch: `main` (ou a que preferir).
4. Environment: `Node` (Render detecta `package.json`).
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Na seção Environment, adicione variáveis de ambiente:
   - `DATABASE_URL` = (valor copiado do Railway)
   - Se preferir usar variáveis separadas: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
8. Clique em Create Web Service. O Render fará o deploy automaticamente.

Observações importantes
- Render define automaticamente `PORT`; o `server.js` já usa `process.env.PORT || 3000`.
- Railway fornece `DATABASE_URL`. O `server.js` aceita essa variável e cria o pool diretamente.
- Caso precise de acesso remoto ao banco para migrações locais, use a `DATABASE_URL` com um cliente MySQL.

Passo 4 — Teste final
1. Abra a URL pública que o Render fornece (ex: `https://seu-servico.onrender.com/login.html`).
2. Verifique logs no painel do Render em caso de erro.
3. Se houver problemas de CORS, ajuste `CORS` no `server.js` ou nas configurações do Render.

Comandos úteis locais
- Rodar localmente com env vars (PowerShell):

```powershell
$env:DATABASE_URL="mysql://user:pass@host:3306/dbname"
npm start
```

- Testar conectividade com a DB (MySQL CLI ou MySQL Workbench)

Próximos passos recomendados
- Criar script de migração (por exemplo com `knex` ou `sequelize`) para criar tabelas automaticamente.
- Habilitar backups automáticos do banco (na Railway).
- Configurar SSL / domain custom no Render (se tiver domínio próprio).
