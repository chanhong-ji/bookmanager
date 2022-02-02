const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/check", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/v1", {
      target: "https://openapi.naver.com",
      changeOrigin: true,
    })
  );
};
