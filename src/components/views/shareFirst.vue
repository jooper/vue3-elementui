
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple headcl">
          <el-card class="box-card" style="width: 100%; height: 140px">
            <template>
              <div class="card-header">
                <el-row>
                  <el-col :span="7">
                    <img
                      src="../../assets/img/spark.jpg"
                      alt=""
                      style="width: 80px; height: 80px"
                    />
                  </el-col>
                  <el-col :span="14">
                    <div>
                      <h4>食客来</h4>
                      <p>
                        报名参与鸿蒙OS
                        2.0开发者Beta计划的一些用户，已经收到了鸿蒙OS
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </template>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="width: 100%">
            <template #header>
              <div class="card-header">
                <!-- <div>xxxx</div> -->
                <video-player              
                  class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                ></video-player>
              </div>
            </template>
            <div>
              <h4>蔚来缘何卷入车展维权事件？</h4>
              <p>
                张某与蔚来汽车的直接关联，来源于其在短视频平台发布过的一则视频：
                4月19日凌晨，即车展当天，定位于上海的张某正乘坐车辆出行，网友从内
                饰上判断这辆车是蔚来汽车。
              </p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        
        <center><el-button type="success" icon="el-icon-share" @click="show" round>分享参与活动</el-button
        ></center>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>         
          <h4><font style="color: red">觅</font>食</h4>
          <span>民以食为天，食以佳为美；觅食--传递身边美好的味道！</span>
           <div>code:{{ code }}-state:{{ state }}</div>
        </div>
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

video-player {
  height: 100px;
}
body {
  background-color: #f2f6fc;
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
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "3:2", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            // src: "http://vjs.zencdn.net/v/oceans.mp4", //url地址
            src:
              "https://wds-service-1258344699.file.myqcloud.com/20/5771/mp4/161828221577098f7258cda150095.mp4",
            // src: "" //url地址
          },
        ],
        poster:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb.zol-img.com.cn%2Fdesk%2Fbizhi%2Fimage%2F1%2F1680x1050%2F1349289433496.jpg&refer=http%3A%2F%2Fb.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622044755&t=9405b3e02cfe2e31ada55d7d010c7b0d", //你的封面地址
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