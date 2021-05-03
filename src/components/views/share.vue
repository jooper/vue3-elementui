
<template>
  <div>
    <el-row :gutter="20" class="header-bg-color">
      <el-col :span="24">
        <div style="margin-top: 30px">
          <el-row>
            <el-col :span="4" :offset="1">
              <el-avatar shape="square" :size="80" :src="url"></el-avatar>
            </el-col>
            <el-col :span="16" :offset="2">
              <div>
                <h4 style="color: #f9fafc" v-text="shop_name"></h4>
                <p v-text="shop_desc"></p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: -20px">
      <el-col :span="24">
        <div class="grid-content bg-purple" type="margin-top:-10px">
          <div class="">
            <!-- <div>xxxx</div> -->
            <video-player
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions"
            ></video-player>
          </div>
          <div style="padding: 20px 15px" class="content">
            <h4>商家活动信息</h4>
            <p>
              {{ activeContent }}
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <center>
          <el-button
            type="danger"
            style="
              width: 80%;
              margin-bottom: 15px;
              background-color: rgb(252, 62, 90);
              border-color: rgb(252, 62, 90);
            "
            icon="el-icon-share"
            @click="startUp"
            >分享参与活动</el-button
          >
          <el-button
            type="danger"
            style="
              width: 80%;
              margin-bottom: 15px;
              background-color: rgb(252, 62, 90);
              border-color: rgb(252, 62, 90);
            "
            icon="el-icon-share"
            @click="enterpriseVideoList"
            >test</el-button
          >
        </center>
      </el-col>
    </el-row>
    <el-row class="footer">
      <el-col :span="24">
        <center>
          <div>
            <img
              src="../../assets/img/logo.png"
              class="platlog"
              @click="toHome"
            />
            <!-- <h4><font style="color: red">觅</font>食</h4> -->
            <!-- <span>民以食为天，食以佳为美；觅食--传递身边美好的味道！</span> -->
            <!-- <div>code:{{ code }}-state:{{ state }}</div> -->
          </div>
        </center>
      </el-col>
    </el-row>
  </div>
</template>

<script>
</script>

<style>
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/bootstrap-theme.min.css";
@import "../../assets/css/fontAwesome.css";
@import "../../assets/css/tooplate-style.css";

.platlog {
  width: 50px;
  height: 50px;
}
.content {
  background-color: rgb(253, 253, 253);
  opacity: 0.8;
}
.header-bg-color {
  background-color: rgb(22, 24, 35);
}

.footer h4 {
  margin-top: -15px;
  font-size: 9;
}
.footer img {
  opacity: 0.1;
}
.commcolor {
  border-color: rgb(22, 24, 35);
  background-color: rgb(22, 24, 35);
  border-color: rgb(22, 24, 35);
}
video-player {
  height: 100px;
}
.box-card {
  background-color: rgb(22, 24, 35);
  border-color: rgb(22, 24, 35);
  color: #f9fafc !important;
}
body {
  background-color: rgb(22, 24, 35);
}
.el-button--success {
  background-color: #303133 !important;
  border-color: #303133 !important;
}
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

.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0);
  font-size: 3em;
  /* border-radius: 50%; */
  height: 1.5em !important;
  line-height: 1.5em !important;
  margin-top: -1em !important;
}
.vjs-progress-control {
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf !important;
}
.bg-purple {
  background: #d3dce6 !important;
}
.bg-purple-light {
  background: #e5e9f2 !important;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc !important;
}
</style>


<script>
import md5 from "js-md5";
import utils from "../../assets/js/utils";
import { setItem, getItem, remItem } from "../../utils/com";
export default {
  components: {},
  data() {
    return {
      url: "http://rrtd.biezhenwenhua.com/uploads/images/01/Pr7k1dcI_Y.png",
      url2: "../../assets/img/spark.jpg",
      shop_name: "春哥新派铁板烧",
      shop_desc: "铁板烧,铁板烧,一天不吃,想的发烧,一吃铁板烧,马上就退烧",
      activeContent:
        "点击下方发布按钮转发探店视频，即可向前台领取精美礼品+12.8元霸王餐抵用券（消费任意金额均可使用）",
      name: "BusImg",
      accessTk: "",
      code: "",
      state: "",
      videoTitle: "",
      videoUrl:"",
      videoMask:"",
      loading: false,
      // 视频播放
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "3:2", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            // src: "http://vjs.zencdn.net/v/oceans.mp4", //url地址
            src: "http://rrtd.biezhenwenhua.com/uploads/e/60/-dHoHe9eCt.mp4",
            // "https://wds-service-1258344699.file.myqcloud.com/20/5771/mp4/161828221577098f7258cda150095.mp4",
            // src: "" //url地址
          },
        ],
        poster:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1.meituan.net%2Fxianfu%2Fd9d7438b9a262df6702709a2d59084a665729.jpg%2540700w_700h_1e_1c_1l%257Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20&refer=http%3A%2F%2Fp1.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622474659&t=c3416af905702ff342003ea89b1522a5", //你的封面地址
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
    this.loading = false;
    this.getAccessToken();  
    this.enterpriseVideoList();     
  },
  beforeCreate() {
    //beforeCreate()，created(), beforeMount(), mounted() 都可以
    // this.getAccessToken();
  },
  created(){  
  
  },
  computed: {},
  methods: {
    getAccessToken() {
      // document.title = "xxx";
      this.code = utils.getUrlKey("code");
      this.dyCallstate = utils.getUrlKey("state");
      console.log("code:" + this.code);
      console.log("state:" + this.dyCallstate);

      setItem("lastCode", this.code);
      let useCode = getItem("code");
      if (this.code == useCode) {
        return;
      }
      setItem("code", this.code);

      let paras = { code: this.code };

      this.$store
        .dispatch("accessToken", paras)
        .then((res) => {
          if (res && res.message == "success") {
            this.$toast.center("授权成功");
            this.loading = false;
            this.accessTk = getItem("access_token");
            // this.$store
            // .dispatch("MenuList", { userId: res.resObj.userId })
            // .then((res) => {});
            // this.$link("/home");
          } else if (res.data.error_code == 10007) {
            //code 过期
            return;
          } else {
            this.loading = false;
            return false;
          }
        })
        .catch((res) => {
          this.loading = false;
        });
    },
    userInfo() {
      let paras = {
        openId: getItem("open_id"),
        accessToken: getItem("access_token"),
      };
      this.$store
        .dispatch("userInfo", paras)
        .then((res) => {
          if (res && res.message == "success") {
            // this.$toast.center("授权成功");
            this.loading = false;
            console.log(res);
            this.$toast.center(res);
          } else if (res && res.data.error_code == 2190008) {
            //access_token过期
            // this.getAccessToken();
          } else {
            this.loading = false;
            return false;
          }
        })
        .catch((res) => {
          this.loading = false;
        });
    },

    uploadVideo() {
      let paras = {
        path: this.playerOptions.sources[0].src,
        openId: getItem("open_id"),
        accessToken: getItem("access_token"),
      };

      if (!paras || !paras.path) {
        this.$toast.center("path不能为空");
        return;
      }
      setItem("video.video_id", "");

      this.$store
        .dispatch("uploadVideo", paras)
        .then((res) => {
          if (res && res.data.error_code == 0) {
            // this.videoList();
                  this.createVideo();
          } else if (res && res.data.error_code == 2190008) {
            //access_token过期
            // this.getAccessToken();
          } else {
            this.loading = false;
            return false;
          }
        })
        .catch((res) => {
          this.loading = false;
          return;
        });
    },

    createVideo() {
      let getPara = {
        openId: getItem("open_id"),
        accessToken: getItem("access_token"),
      };
      let postPara = {
        videoId: getItem("video.video_id"),
        text: this.videoTitle,
        // poiId: null,
        // poiName: null,
        // microAppId: null,
        // microAppTitle: null,
        // microAppUrl: null,
        // articleId: null,
        // articleTitle: null,
        // timelinessLabel: null,
        // timelinessKeyword: null,
        // gameId: null,
        // gameContent: null,
        coverTsp: 5,
        // atUsers: null,
      };
      if (!getPara || !postPara || !postPara.videoId) {
        this.$toast.center("videoId不能为空");
        return;
      }
      let paras = {
        getParas: getPara,
        postParas: postPara,
      };
      this.$store
        .dispatch("createVideo", paras)
        .then((res) => {
          if (res && res.data) {
            this.$toast.center("分享成功");
            //打开用户中心
          } else if (res && res.data.error_code == 2190008) {
            //access_token过期
            // this.getAccessToken();
          } else {
            this.loading = false;
            return false;
          }
        })
        .catch((res) => {
          this.loading = false;
          return;
        });
    },

    videoList() {
      let paras = {
        openId: getItem("open_id"),
        accessToken: getItem("access_token"),
        pageNum: 0,
        pageSize: 20,
      };
      this.$store
        .dispatch("videoList", paras)
        .then((res) => {
          if (res && res.data.error_code == 0) {
            let viedeoList = res.data.list;
            let rnd = Math.floor(Math.random() * (viedeoList.length - 1) + 1);
            let itemVideo = viedeoList[rnd];
            this.createVideo(itemVideo.item_id);
            this.$toast.center("分享成功");
            console.log(res);
            //打开用户中心
          } else if (res && res.data.error_code == 2190008) {
            //access_token过期
            // this.getAccessToken();
          } else {
            this.loading = false;
            return false;
          }
        })
        .catch((res) => {
          this.loading = false;
        });
    },

    enterpriseVideoList() {
      let paras = {
        enterpriseCode: this.dyCallstate, // "A0001",
      };
      this.$store
        .dispatch("enterpriseVideoList", paras)
        .then((res) => {
          if (res) {            
            this.shop_name = res.enterprise_name;
            this.shop_desc = res.enterprise_desc;
            this.videoTitle = res.text;
            this.activeContent = res.active_desc;
            this.playerOptions.sources[0].src = res.video_path;
            this.playerOptions.poster = res.custom_cover_image_url;            
          } else {
            this.loading = false;
            return false;
          }
        })
        .catch((res) => {
          this.loading = false;
        });
    },

    startUp() {
      // this.enterpriseVideoList();
      this.uploadVideo();
      // this.createVideo();
    },
    toHome() {
      this.$router.push("/index");
      // this.$link("/index");
    },
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
          // this.loading = true;
          this.ruleForm.password = md5(this.ruleForm.password);
          // 以下仅本地测试
          this.getInfoes.userName = this.ruleForm.userName;
          setItem("getInfo", this.getInfoes);
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