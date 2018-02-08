<template>
  <div class="header">
    <div class="toolbar">
      <div class="bar-button">
          <span class="button-inner" v-if="!isshow && !isgo">
              <i class="icon" @click=" $router.go(-1) ">&#xe606;</i>
          </span>
          <span class="button-inner"  v-if="isshow">
              <i class="icon" @click="goback()" v-html="seticon"></i>
          </span>
        <router-link class="button-inner" v-else-if="router && router != -1" :to="router" replace>
          <i class="icon">&#xe606;</i>
        </router-link>
      </div>

      <div class="bar-button" @click="$r_callback">
        <router-link v-if="r_router && r_title" :to="r_router" v-text="r_title" class="button-inner" replace></router-link>
        <span v-if="r_title && !r_router" class="button-inner"  v-text="r_title" @click="sured()"></span>
        <span v-if="r_icon" class="button-inner"> <i class="icon" v-html="r_icon" @click="goPage()"></i> </span>
      </div>

      <div class="title-h">
        <div class="toolbar-title" v-if="title" @click="$h_callback">
          {{title}} <i v-if="h_callback" class="icon">&#xe635;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'y-header',
    props: {
      seticon:{
        type:String,
        default:"&#xe606;"
      },
      isgo:{
        type:Boolean,
        default:false
      },
      isshow:{
        type:Boolean,
        default:false,
      },
      title: {
        type: String,
        default: "标题",
      },
      r_title: {
        type: String,
        default: "",
      },
      router: {
        type: Object,
      },
      r_router: {
        type: Object,
      },
      r_callback: {
        type: Function,
      },
      h_callback: {
        type: Function,
      },
      r_icon: {
        type: String,
      },
    },
    mounted: function () {

    },
    methods: {
      $r_callback(){
        this.$emit('r_callback');
        if (this.r_callback && typeof this.r_callback === "function") {
          this.r_callback()
        }
      },
      $h_callback(){
        if (this.h_callback && typeof this.h_callback === "function") {
          this.h_callback()
        }
      },
      goPage(){
        this.$emit("go")
      },
      sured(){
        this.$emit("sured")
      },
      goback(){
        this.$emit("goback")
      }
    }
  }
</script>

<style>
  .header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: block;
    width: 100%;
    background: #4fa5ff;
  }

  .toolbar {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
    contain: content;
    padding: 4px;
    height: 0.45rem;
  }

  .bar-button {
    padding: 0 4px;
    height: 0.32rem;
    border: 0;
    border-radius: 4px;
    font-size: 0.14rem;
    color: #fff;
    background-color: transparent;
    text-decoration: none;
    pointer-events: auto;
    font-family: inherit;
    font-style: inherit;
    font-variant: inherit;
    -moz-appearance: none;
    -ms-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    display: inline-block;
    margin: 0;
    line-height: 1;
    text-align: center;
    text-overflow: ellipsis;
    text-transform: none;
    white-space: nowrap;
    cursor: pointer;
    vertical-align: top;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .button-inner {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: row nowrap;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fff !important;
  }

  .button-inner i.icon {
    font-size: 20px;
    color: #fff;
  }

  .title-h {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 90px 1px;
    width: 100%;
    height: 100%;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    pointer-events: none;
  }

  .toolbar-title {
    display: block;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.18rem;
    text-align: center;
    color: #fff;
    pointer-events: auto;
  }
</style>
