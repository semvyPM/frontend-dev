// vue.config.js
export default {
    server: {
        proxy: {
            '/api': {
                target: 'http://kalck.ru', // Замените на ваш API-URL
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
};
