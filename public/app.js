// Define API_BASE_URL globalmente (funciona em localhost, Render, ou qualquer domínio)
window.API_BASE_URL = window.location.origin;

// PWA App Manager
class ZettaApp {
    constructor() {
        this.deferredPrompt = null;
        this.isOnline = navigator.onLine;
        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.monitorOnlineStatus();
        this.setupNotifications();
    }

    // Registra o Service Worker
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado:', registration);
                    this.checkForUpdates(registration);
                })
                .catch(error => {
                    console.warn('⚠️ Erro ao registrar Service Worker:', error);
                });
        }
    }

    // Monitora atualizações do Service Worker
    checkForUpdates(registration) {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('🔄 App atualizado com sucesso!');
                this.showUpdateNotification();
            });

            setInterval(() => {
                registration.update();
            }, 60000); // Verifica a cada minuto
        }
    }

    // Configura o prompt de instalação
    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            this.deferredPrompt = event;
            this.showInstallPrompt();
        });

        window.addEventListener('appinstalled', () => {
            console.log('✅ App instalado com sucesso!');
            this.deferredPrompt = null;
        });
    }

    // Mostra o botão de instalação
    showInstallPrompt() {
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.style.display = 'block';
            installBtn.addEventListener('click', async () => {
                if (this.deferredPrompt) {
                    this.deferredPrompt.prompt();
                    const { outcome } = await this.deferredPrompt.userChoice;
                    console.log(`Resultado da instalação: ${outcome}`);
                    this.deferredPrompt = null;
                    installBtn.style.display = 'none';
                }
            });
        }
    }

    // Monitora o status online/offline
    monitorOnlineStatus() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.showOfflineStatus(false);
            console.log('✅ Conectado à internet');
            this.syncData();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineStatus(true);
            console.log('⚠️ Desconectado da internet');
        });
    }

    // Mostra indicador de status offline/online
    showOfflineStatus(isOffline) {
        let statusBar = document.getElementById('offline-status');
        if (!statusBar) {
            statusBar = document.createElement('div');
            statusBar.id = 'offline-status';
            statusBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                padding: 10px;
                text-align: center;
                background-color: ${isOffline ? '#ff6b6b' : '#51cf66'};
                color: white;
                font-weight: bold;
                z-index: 10000;
                transition: all 0.3s ease;
                display: ${isOffline ? 'block' : 'none'};
            `;
            document.body.insertBefore(statusBar, document.body.firstChild);
        }

        statusBar.style.display = isOffline ? 'block' : 'none';
        statusBar.textContent = isOffline 
            ? '📵 Modo Offline - Funcionalidades limitadas' 
            : '✅ Conectado à internet';
    }

    // Sincroniza dados quando volta online
    syncData() {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'SYNC_DATA'
            });
        }
    }

    // Notificações push
    setupNotifications() {
        if ('Notification' in window && Notification.permission === 'granted') {
            console.log('✅ Permissão para notificações concedida');
        }
    }

    // Solicita permissão para notificações
    requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                console.log('Permissão de notificação:', permission);
            });
        }
    }

    // Mostra notificação de atualização
    showUpdateNotification() {
        if (Notification.permission === 'granted') {
            new Notification('Zetta Bovino', {
                body: '🎉 Uma nova versão do app está disponível! Recarregue para atualizar.',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23001F3F" width="192" height="192"/><text x="50%" y="50%" font-size="80" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial">🐄</text></svg>',
                badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23001F3F" width="192" height="192"/><text x="50%" y="50%" font-size="80" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial">🐄</text></svg>'
            });
        }
    }

    // Obtém informações do device
    getDeviceInfo() {
        return {
            online: this.isOnline,
            userAgent: navigator.userAgent,
            storage: navigator.storage,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
        };
    }
}

// Inicializa o app quando o DOM está pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.zettaApp = new ZettaApp();
    });
} else {
    window.zettaApp = new ZettaApp();
}
