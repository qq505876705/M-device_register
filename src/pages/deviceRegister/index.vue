<!-- Index -->
<template>
  <div class="fd-al-content">
    <div class="fd-al-main">
      <el-row :gutter="15">
        <el-col :span="4">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="~"
            :clearable="false"
            start-placeholder="开始"
            :picker-options="pickerOptions"
            end-placeholder="结束"
          ></el-date-picker>
        </el-col>
        <el-col :span="20">
          <div class="fd-fr-content">
            <el-select
              v-model="form.model"
              class="fd-product-select"
              placeholder="placeholder"
            >
              <el-option label="产品线" value=""></el-option>
            </el-select>

            <el-input v-model="form.inputValue" class="fd-product-input">
              <i
                slot="suffix"
                class="el-icon-search fd-input-suffix"
                @click="handleSearch"
              ></i>
            </el-input>

            <div
              class="fd-tag-box fd-pre"
              @click.self.stop="divVisible = !divVisible"
            >
              <i
                class="el-icon-collection-tag"
                @click.self.stop="divVisible = !divVisible"
              ></i>
            </div>
            <div class="fd-ex-div" v-if="divVisible" @click.stop>
              <el-checkbox-group
                v-model="checkListResult"
                @change="checkListChange"
              >
                <el-checkbox
                  :label="item.value"
                  v-for="item in checkList"
                  :key="item.value"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </div>

            <div class="fd-tag-box" title="导出csv文件">
              <i class="fd-icon-export"></i>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-table
        :data="formData"
        style="width: 100%"
        class="fd-mt20"
        ref="table"
      >
        <el-table-column
          min-width="150px"
          :prop="item.key"
          :label="item.name"
          v-for="(item, index) in tableDataFields"
          :key="index"
        >
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageInfo.pageSize"
        layout="total,sizes, prev, pager, next,jumper"
        :total="pageInfo.total"
        :page-count="pageInfo.totalPages"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Index",
  data() {
    return {
      // 头部筛选条件的绑定值
      form: {
        // 时间数组
        time: [],
        // 产品线字段
        model: "",
        // 输入框的绑定值
        inputValue: ""
      },
      // 表格的绑定数据
      formData: [],
      // 页码的相关绑定数据
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
      },
      divVisible: false,
      // 表格关键字字段，用于渲染表格title的数据
      tableDataFields: [],
      // 已经选中的表格数据
      checkListResult: [
        "key1",
        "key2",
        "key3",
        "key4",
        "key5",
        "key6",
        "key7",
        "key8"
      ],
      // 所有的可选择字段名字以及关键字
      checkList: [
        {
          label: "注册事件",
          value: "key1"
        },
        {
          label: "产品线",
          value: "key2"
        },
        {
          label: "仪器型号",
          value: "key3"
        },
        {
          label: "使用机构",
          value: "key4"
        },
        {
          label: "装机地点",
          value: "key5"
        },
        {
          label: "工程师（mobile）",
          value: "key6"
        },
        {
          label: "工号（mobile）",
          value: "key7"
        },
        {
          label: "装机工程师",
          value: "key8"
        },
        {
          label: "生产编号",
          value: "key9"
        },
        {
          label: "仪器编号",
          value: "key10"
        },
        {
          label: "注册码",
          value: "key11"
        }
      ]
    };
  },
  computed: {
    // 带日期的选项datetime组件
    pickerOptions() {
      return {
        disabledDate(time) {
          // 两年内时间可选
          const pre = new Date();
          // 获取两年前这个月的1号
          const fullDate =
            pre.getFullYear() -
            2 +
            "/" +
            (pre.getMonth() + 1) +
            "/" +
            pre.getDate();
          const judgeDate = new Date(fullDate);
          const _yesterday = new Date();
          _yesterday.setTime(_yesterday.getTime() - 24 * 60 * 60 * 1000);
          return time.getTime() > _yesterday || time.getTime() < judgeDate;
        }
      };
    }
  },
  beforeUpdate() {
    // 防止表格在动态变化时，表格下掉
    this.$nextTick(() => {
      // 在数据加载完，重新渲染表格
      this.$refs["table"].doLayout();
    });
  },
  created() {
    // 默认展示最近三个月的
    this.form.time[0] = this.$getTime(90).fullDate;
    this.form.time[1] = this.$getTime(1).fullDate;
    console.log(this.form, "form");
    this.login();
  },
  mounted() {
    document.addEventListener("click", this.bodyCloseMenus);
    // 确定表格的表头字段
    this.confirmTableFiled();
  },

  beforeDestroy() {
    document.removeEventListener("click", this.bodyCloseMenus);
  },
  methods: {
    /**
     * 处理input框的搜索图标点击事件
     */
    handleSearch() {},
    /**
     * 表格的页码变化，请求相关的数据
     */
    handleSizeChange(size) {
      this.pagesize = size;
      this.pageInfo.currentPage = 1;
    },
    /**
     * 当前页面的表格的翻页功能
     */
    handleCurrentChange(currentPage) {
      this.pageInfo.currentPage = currentPage;
    },
    /**
     * 点击空白处关闭弹窗事件
     */
    bodyCloseMenus(e) {
      this.divVisible = false;
    },
    // checkbox列表变更事件
    checkListChange() {
      console.log(this.checkListResult, "result");
      this.confirmTableFiled();
    },
    /**
     * 自定义指标字段的确认事件
     */
    confirmTableFiled() {
      this.pageInfo.currentPage = 1;
      this.getTableFieldsData();
      this.requestTableData();
    },
    /**
     * 根据自定义字段获取表格数据
     **/
    getTableFieldsData() {
      this.tableDataFields = [];
      this.checkList.forEach((val) => {
        // 将我们默认的字段循环，找出选中的，这样做是为了展示顺序跟我们选择字段的顺序是一样的
        const arrIndex = this.checkListResult.findIndex((item) => {
          return item === val.value;
        });
        if (arrIndex !== -1) {
          this.tableDataFields.push({
            name: this.transformFiled(val.value),
            key: val.value
          });
        }
      });

      console.log(this.tableDataFields, "tableDataFields");
    },
    // 根据id转换对应字段名称
    transformFiled(val) {
      for (let i = 0; i < this.checkList.length; i++) {
        if (val === this.checkList[i].value) {
          return this.checkList[i].label;
        }
      }
    },
    login() {
      const url = "/account/verifyLogin";
      const params = {
        une: "admin", pwd: "Mcloud!"
      };
      this.$axios.post(url, qs.stringify(params)).then(res => {
        console.log(res, "res");
      });
    },
    /**
     * 获取表格的绑定数据
     */
    requestTableData() {
      const param = {
        pageNum: 1,
        pageSize: 10,
        category: 10,
        qcLot: "",
        model: "",
        qcName: ""
      };
      this.$axios.post("/qc/10/list", qs.stringify(param)).then(res => {
        const result = res.data;
        console.log(result, "result");
      });
    }
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.fd-al-content {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  // padding: 0 120px;
  border-radius: 5px;
  // background-color: #fff;
  padding: 15px 0;
  .fd-al-main {
    background-color: #fff;
    height: 100%;
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 5px 8px #ccc;
    .fd-al-form-right {
      padding-left: 150px;
    }
    .fd-fr-content {
      float: right;
      height: 100%;
      .fd-product-select {
        display: inline-block;
        width: 120px;
        margin-right: 15px;
      }
      .fd-product-input {
        display: inline-block;
        width: 150px;
        margin-right: 15px;
      }
      .fd-tag-box {
        margin-right: 15px;
        display: inline-block;
        height: 32px;
        width: 32px;
        line-height: 30px;
        border: 1px solid #ccc;
        margin-bottom: 0;
        border-radius: 6px;
        &:hover {
          opacity: 0.6;
          cursor: pointer;
        }
        .fd-icon-export {
          background: url("../../assets/images/icon/export-btn.png") left center
            no-repeat;
          display: inline-block;
          height: 14px;
          width: 14px;
          vertical-align: middle;
          background-size: 100%;
          cursor: pointer;
          // &:hover {
          //   opacity: 0.6;
          // }
        }
      }

      /deep/.el-input__suffix {
        line-height: 32px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .fd-ex-div {
      border: 1px solid rgba(235, 235, 235, 1);
      border-radius: 5px;
      background-color: #fff;
      padding: 5px;
      position: absolute;
      width: 150px;
      padding-bottom: 10px;
      top: 40px;
      right: 65px;
      line-height: 24px;
      z-index: 50;
      /deep/.el-checkbox:last-of-type {
        margin-right: 30px;
      }
      text-align: left;
      /deep/.el-checkbox-group {
        margin-left: 10px;
      }
    }
    /deep/.el-pagination {
      text-align: center;
      margin-right: 0.5vw;
      margin-top: 50px;
      margin-bottom: 50px;
    }
    /deep/.el-pagination__editor.el-input {
      margin-left: 10px;
      margin-right: 5px;
    }

    /deep/.el-pagination__total {
      line-height: 32px;
    }
    /deep/.el-pager li {
      font-size: 13px;
      font-weight: normal;
      border-radius: 4px;
      min-width: 30px;
      height: 30px;
      line-height: 30px;
      margin-top: 1px;
      border: 1px solid #d9d9d9;
      margin: 0 5px;
    }
    /deep/.el-pager li.active {
      color: #fff;
      background-color: #1890ff;
      min-width: 30px;
      height: 30px;
      line-height: 30px;
      border: 0;
    }
    /deep/.el-table .cell {
      height: 20px !important;
    }
  }
}
</style>
