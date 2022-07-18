const { defineConfig } = require("@vue/cli-service");
const argv = JSON.parse(process.env.npm_config_argv);

console.log(argv, "");
const config = {};
// 获取自定义参数
const cooked = argv.cooked;
if (cooked[3]) {
  config["--apihost"] = cooked[3].split("=")[1];
  console.log(config, "config");
  process.env.VUE_APP_CUSTOM_API = config["--apihost"];
  // console.log("配置的自定义api " + process.env.VUE_APP_CUSTOM_API);
}

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
