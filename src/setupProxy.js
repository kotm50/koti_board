const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      //target: "http://inssain.com", //AWS 프록시 (안쓰면 //로 주석처리)
      //target: "http://192.168.0.56:8080", //로컬(유선) 프록시 (안쓰면 //로 주석처리)
      target: "http://192.168.0.59:8080", //로컬(무선) 프록시 (안쓰면 //로 주석처리)
      changeOrigin: true,
    })
  );
};
