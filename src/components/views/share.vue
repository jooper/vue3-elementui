<template>
  <div>
    <section class="first-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="text-content">
              <!-- <h2><img src="../../assets/img/logo.png" alt="" style="width: 80px;height: 80px"/></h2> -->
              <h2><font style="color: red">觅</font>食</h2>
              <div class="line-dec"></div>
              <!-- <span>让每个商家都有大众能看到的潮品 &amp; </span> -->
              <span>民以食为天，食以佳为美；觅食--传递身边美好的味道！</span>
              <div>code is :{{ code }}</div>
              <div>state is :{{ state }}</div>

              <div id="app">
                <el-button type="primary" @click="show">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/bootstrap-theme.min.css";
@import "../../assets/css/fontAwesome.css";
@import "../../assets/css/tooplate-style.css";
</style>


<script>
import md5 from "js-md5";
import utils from "../../assets/js/utils";
export default {
  components: {},
  data() {
    return {
      code: "",
      state: "",
      ruleForm: {
        userName: null,
        password: null,
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loading: false,
      getInfoes: {
        userName: null,
        loginIp: "192.168.2.45",
        loginTime: Date.now(),
        ipAddr: "亚洲",
      },
    };
  },
  mounted() {
    this.code = utils.getUrlKey("code");
    this.state = utils.getUrlKey("state");
    console.log("code:" + this.code);
    console.log("state:" + this.state);
  },
  computed: {},
  methods: {
    show()
    {
      
     this.$toast.top('top');
     this.$toast.center('center');
     this.$toast('bottom');
     this.$loading('loading...');
     
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.ruleForm.password = md5(this.ruleForm.password);
          // 以下仅本地测试
          this.getInfoes.userName = this.ruleForm.userName;
          this.$setItem("getInfo", this.getInfoes);
          this.$store.commit("SET_GETINFO", this.getInfoes);
          this.loading = false;
          this.$link("/home");
        } else {
          this.loading = false;
          return false;
        }
      });
    },
  },
};
</script>