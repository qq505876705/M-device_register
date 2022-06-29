<template>
    <div class="fd-404-box">
        <div :class="['fd-item', 'fd-left-part',{'noAccredit':noAccredit}]"></div>
        <div class="fd-item fd-right-part">
            <div class="fd-text-box">
                <p class="fd-error-type">{{noAccredit?401:404}}</p>
                <p class="fd-error-text">{{noAccredit?'未授权用户，请联系管理员':'抱歉，您访问的页面不存在'}}</p>
                <el-button type="primary" @click="$router.push('/')" v-if="!noAccredit">返回首页</el-button>
                <el-button type="primary" @click="goLogin" v-if="noAccredit">返回登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "notFound",
  data() {
    return {
      // 是否是未授权
      noAccredit: false
    };
  },
  created() {
    this.noAccredit = this.$route.query ? this.$route.query.noAccredit ? this.$route.query.noAccredit : false : false;
  },
  methods: {
    goLogin() {
      location.replace(this.$config.systemUrl);
    }
  }
};
</script>

<style scoped lang="less">
    .fd-404-box {
        width: 100%;
        height: 100%;
        font-size: 0;
        background: #fff;

        .fd-item {
            width: 50%;
            display: inline-block;
            height: 100%;
            vertical-align: top;
            text-align: left;

            &.fd-left-part {
                background: url("@/assets/images/common/u333.png") center no-repeat;
                background-size: 50% auto;

                &.noAccredit {
                    background: url("@/assets/images/common/noAccredit.png") center no-repeat;
                }
            }

            &.fd-right-part {
                position: relative;

                .fd-text-box {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);

                    .fd-error-type {
                        font-size: 100px;
                        font-weight: bold;
                        color: #595959;
                        margin-bottom: 10px;
                    }
                    .fd-error-text {
                        color: #0000006D;
                        font-size: 20px;
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
</style>
