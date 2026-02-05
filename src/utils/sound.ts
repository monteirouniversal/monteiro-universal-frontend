export const playNotificationSound = () => {
    try {
        const audio = new Audio('/notification.mp3'); // We will need to ensure this file exists or use a base64
        audio.play().catch(e => console.log('Audio blocked', e));
    } catch (e) {
        console.error('Audio error', e);
    }
};
