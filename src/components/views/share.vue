<template>
  <div>
    <section class="">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="text-content">
              <!-- <h2><img src="../../assets/img/logo.png" alt="" style="width: 80px;height: 80px"/></h2> -->
              <h2><font style="color: red">觅</font>食</h2>
              <div class="line-dec"></div>
              <!-- <span>让每个商家都有大众能看到的潮品 &amp; </span> -->
              <span>民以食为天，食以佳为美；觅食--传递身边美好的味道！</span>
              <!-- <div>code is :{{ code }}</div>
              <div>state is :{{ state }}</div> -->

              <!-- <div id="app">
                <el-button type="primary" @click="show">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
              </div> -->

              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
            </div>
          </div>
        </div>

        <div>
          <el-row>
            <el-col :span="8" :md="4" :sm="12"
              ><div class="base-grid-content grid-content"></div
            ></el-col>
            <el-col :span="8" :md="4" :sm="12"
              ><div class="base-grid-content grid-content1">
                <el-button type="primary" @click="show">分享参与活动</el-button>
              </div></el-col
            >
            <el-col :span="8" :md="4" :sm="12"
              ><div class="base-grid-content grid-content2"></div
            ></el-col>
          </el-row>
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
.base-grid-content {
  height: 100px;
  margin-top: 300px;
  text-align: center;
  vertical-align: middle;
}
.grid-content {
  background-color: aquamarine;
}
.grid-content1 {
  background-color: black;
}
.grid-content2 {
  background-color: blueviolet;
}
</style>


<script>
import md5 from "js-md5";
import utils from "../../assets/js/utils";
export default {
  components: {},
  data() {
    return {
      name: "BusImg",
      code: "",
      state: "",      
      loading: false,      
      // 视频播放
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: "http://vjs.zencdn.net/v/oceans.mp4", //url地址
            // src: "" //url地址
          },
        ],
        poster: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb.zol-img.com.cn%2Fdesk%2Fbizhi%2Fimage%2F1%2F1680x1050%2F1349289433496.jpg&refer=http%3A%2F%2Fb.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622044755&t=9405b3e02cfe2e31ada55d7d010c7b0d", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
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
    show() {
      this.$toast.top("top");
      this.$toast.center("center");
      this.$toast("bottom");
      this.$loading("loading...");
      // this.playerOptions['sources'][0]['src'] = '接口地址';更换视频地址
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