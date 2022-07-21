<!--  -->
<template>
  <div class="">
    <!-- {{resultQrCodeString}} -->
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      resultQrCodeString: "",
      productArr: [
        2, 1, 8, 1, 2, 18, 8, 12, 365, 3, 2, 502, 1, "1806101", "3-AHα", 1018, 0.3233333, 1.4, 1028, 0.5, 1.6, 1001, 0.4, 1.7,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      configArr: [
        { length: 4, type: "整型" },
        { length: 4, type: "整型" },
        { length: 4, type: "整型" },
        { length: 4, type: "整型" },
        { length: 4, type: "整型" },
        { length: 8, type: "整型" },
        { length: 4, type: "整型" },
        { length: 5, type: "整型" },
        { length: 10, type: "整型" },
        { length: 4, type: "整型" },
        { length: 4, type: "整型" },
        { length: 12, type: "整型" },
        { length: 5, type: "整型" },
        { length: 56, type: "字符" },
        { length: 120, type: "字符" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" },
        { length: 16, type: "整型" },
        { length: 32, type: "浮点" },
        { length: 32, type: "浮点" }
      ]
    };
  },
  mounted() {
    // this.productArr = [
    //   2, 1, 8, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1806101", "3-AH", 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    // ];
    const result = this.$common.mainMethods(this.productArr, this.configArr);
    // "", this.float_to_binary("0")
    // console.log(this.stringToHex("0"));
    console.log(result);
    this.resultQrCodeString = result;
  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
