const { defineConfig } = require("@vue/cli-service");
const argv = JSON.parse(process.env.npm_config_argv);

console.log(argv, "");
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: false,
  devServer: {
    port: 9099,
    proxy: {
      "/api": {
        target: "http://10.2.33.182:1358",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/api": "" }
      }
    }
  }
});
