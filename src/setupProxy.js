const { createProxyMiddleware } = require("http-proxy-middleware");
const backendUrl = process.env.REACT_APP_BACKEND_API_URL;
module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
    })
  );
};
