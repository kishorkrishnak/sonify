const { createProxyMiddleware } = require('http-proxy-middleware');
const backendUrl  = process.env.REACT_APP_BACKEND_API_URL 
console.log(backendUrl);
module.exports = function (app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: backendUrl,
            changeOrigin: true,
        })
    );
};