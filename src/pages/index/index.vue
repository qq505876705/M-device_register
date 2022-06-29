<!-- Index -->
<template>
  <div class="">
    这是一个算法日志的内容
    <el-button type="primary" @click="getCategoryList">获取数据123</el-button>
    <div>
      <span :key="index" v-for="(item, index) in categoryList">{{
        item.category
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      categoryList: []
    };
  },
  methods: {
    getCategoryList() {
      this.$axios.get("/category/list").then((res) => {
        console.log(res.data, "res.data");
        this.categoryList = this.categoryList.concat(res.data);

        console.log(this.categoryList, "categoryList");
      });
    }
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
