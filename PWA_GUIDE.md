# Zetta Automação Bovina - PWA (Progressive Web App)

Esta aplicação foi transformada em um **PWA (Progressive Web App)**, o que significa que agora ela funciona como um aplicativo nativo com suporte para:

## ✨ Recursos PWA Implementados

### 1. **Modo Offline**
- Funciona sem conexão com internet
- Service Worker cacheia automaticamente as páginas e recursos
- Indicador visual quando está offline

### 2. **Instalação como App**
- Pode ser instalado na tela inicial do dispositivo
- Funciona como um aplicativo nativo
- Não precisa abrir o navegador

### 3. **Sincronização de Dados**
- Sincroniza automaticamente quando volta online
- Requisições pendentes são enviadas assim que há conexão

### 4. **Notificações Push**
- Receba notificações sobre atualizações do app
- Notificações quando novas versões estão disponíveis

## 🚀 Como Usar

### Instalação Local

1. **No Windows:**
```powershell
cd c:\Users\Dell\Downloads\#01.login.eu_so
npm install
npm start
```

2. **Abra no navegador:**
```
http://localhost:3000/login.html
```

### Instalando como App

#### No Desktop (Windows/Mac/Linux):
1. Abra `http://localhost:3000/login.html` no Chrome ou Edge
2. Clique no botão "📥 Instalar App" ou procure pelo ícone de instalação na barra de endereço
3. Clique em "Instalar"

#### No Mobile (Android):
1. Abra `http://localhost:3000/login.html` no Chrome
2. Menu (⋮) → "Instalar app" ou
3. Toque no banner de instalação (se aparecer)

#### No Mobile (iOS):
1. Abra `http://localhost:3000/login.html` no Safari
2. Toque no botão de compartilhamento
3. Selecione "Adicionar à tela inicial"

## 📁 Arquivos Adicionados/Modificados

### Novos Arquivos:
- **`public/manifest.json`** - Metadados do app (nome, ícone, cores)
- **`public/service-worker.js`** - Script para funcionalidade offline e cache
- **`public/app.js`** - Gerenciador de PWA (instalação, sincronização, status online)

### Arquivos Modificados:
- **`public/login.html`** - Adicionado suporte a PWA
- **`public/home.html`** - Adicionado suporte a PWA

## 🔧 Configuração Técnica

### manifest.json
Define os metadados do app:
```json
{
  "name": "Zetta Automação Bovina",
  "short_name": "Zetta Bovino",
  "display": "standalone",
  "start_url": "/login.html",
  "theme_color": "#001F3F",
  "background_color": "#001F3F"
}
```

### Service Worker
Implementa cache com estratégia **Network First**:
- **APIs**: Tenta rede primeiro, depois cache
- **Recursos estáticos**: Cache primeiro, depois rede
- Sincronização automática quando volta online

### app.js
Gerencia:
- Registração do Service Worker
- Prompt de instalação
- Indicador de status online/offline
- Sincronização de dados
- Notificações

## 📊 Status Online/Offline

A aplicação mostra um indicador visual:
- **Verde**: Conectado à internet
- **Vermelho**: Modo offline

## 🔄 Atualizações

O app verifica automaticamente por atualizações a cada minuto. Quando uma atualização está disponível, aparece uma notificação pedindo para recarregar.

## ⚙️ Requisitos

- **Node.js** 14+ instalado
- **npm** (gerenciador de pacotes)
- Servidor rodando na porta 3000
- Navegador moderno com suporte PWA (Chrome, Edge, Safari 15+, Firefox)

## 🐛 Troubleshooting

### Service Worker não está funcionando
1. Verifique se o app está rodando com HTTPS (ou localhost)
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Abra DevTools (F12) → Application → Service Workers

### Instalação não aparece
1. Certifique-se que está em HTTPS (ou localhost)
2. O manifest.json está presente
3. O Service Worker está registrado

### Cache desatualizado
1. DevTools → Application → Storage → Clear site data
2. Recarregue a página (Ctrl+F5)

## 📝 Próximos Passos

Para melhorar ainda mais o PWA:
1. Implementar banco de dados local (IndexedDB) para cache offline de dados
2. Adicionar mais ícones em diferentes tamanhos
3. Implementar notificações push do servidor
4. Adicionar tela de splash personalizada
5. Implementar atualização automática em background

## 📚 Referências

- [MDN Web Docs - PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web App Manifest Spec](https://www.w3.org/TR/appmanifest/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
