const backendUrl  = process.env.REACT_APP_BACKEND_API_URL 
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: backendUrl,
            changeOrigin: true,
        })
    );
};