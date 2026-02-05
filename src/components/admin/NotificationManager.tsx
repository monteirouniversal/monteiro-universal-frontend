import { useEffect } from 'react';
import { toast } from 'sonner';
import socket from '../../services/socket';


export default function NotificationManager() {
    useEffect(() => {
        // Request Browser Notification Permission
        if ("Notification" in window) {
            Notification.requestPermission();
        }

        const handleSystemNotification = (data: any) => {
            // 1. Show Elegant Toast
            toast.success(data.title || 'Nova Atividade', {
                description: data.message || data.name || 'Operação realizada no sistema.',
                duration: 5000,
            });

            // 2. Show Browser Push (if permitted)
            if ("Notification" in window && Notification.permission === "granted") {
                new Notification(`MG Portal: ${data.title || 'Alerta'}`, {
                    body: data.message || data.name || 'Nova atualização disponível.',
                    icon: '/logo.png' // Certifique-se de que existe uma logo na pasta public
                });
            }
        };

        // Listen to specific socket events
        socket.on('admin:health_alert', (data) => {
            toast.error('ALERTA DE SISTEMA', { description: data.message });
        });

        socket.on('admin:user_created', (data) => handleSystemNotification({ title: 'NOVO UTILIZADOR', message: `O utilizador ${data.name} foi registado.` }));
        socket.on('admin:project_created', (data) => handleSystemNotification({ title: 'NOVO PROJETO', message: `O projeto ${data.name} foi inicializado.` }));
        socket.on('admin:service_created', (data) => handleSystemNotification({ title: 'NOVO SERVIÇO', message: `A oferta ${data.name} foi adicionada ao catálogo.` }));

        return () => {
            socket.off('admin:user_created');
            socket.off('admin:project_created');
            socket.off('admin:service_created');
            socket.off('admin:health_alert');
        };
    }, []);

    return null;
}
