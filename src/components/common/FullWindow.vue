<template>
  <div></div>
</template>

<script>
export default {
  name: "FullWindow",
  data() {
    return {};
  },

  mounted() {
    Bus.$on("fullScreen", function (f) {
      this.fullScreen(f.fullScreen);
    }.bind(this));
  },
  beforeDestroy() {
    Bus.$off("fullScreen", this.fullScreen);
  },
  methods: {
    fullScreen(f) {
      //  全屏
        var docElm = document.documentElement;
      if(f){


      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }

      //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }

      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }

      //IE11
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }

      }else{

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }


    }
  }
  }
};
</script>

<style lang='scss' scoped>
</style>
