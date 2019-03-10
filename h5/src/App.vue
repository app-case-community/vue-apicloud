<template>
    <div id="wrap" class="flex-wrap flex-vertical">
    <header>
      <ul>
        <li class="border-b active">益治理APP</li>
      </ul>
    </header>
    <div id="app" class="flex-con">
    </div>
    <div id="footer" class="border-t">
      <ul class="flex-wrap">
        <template v-for="(tab,i) in tabs">
          <li tapmode="hover" :key="'tab_' + i" @click="switchBtn(i)" :class="['flex-con', tab.active ? 'active' : '']">{{tab.text}}</li>
        </template>
      </ul>
    </div>
  </div>
</template>
<style>
  header{ background-color: #272c3b; }
  header ul li { height: 50px; line-height: 50px; text-align: center; display: none; color: #e8ebef; position: relative;font-size: 18px;  }
  header ul li.active{ display: block; }
  #footer{  background-color: #fbf9fb; }
  #footer ul li{ color: #485470;  padding-top: 35px; padding-bottom: 4px; background: url() no-repeat center 4px; background-size: auto 25px; text-align: center; }
  #footer ul li.active{ color: #6cb2e2; }
  #footer ul li:nth-child(1){ background-image: url(./static/image/bottombtn0101.webp); }
  #footer ul li:nth-child(2){ background-image: url(./static/image/bottombtn0201.webp); }
  #footer ul li:nth-child(3){ background-image: url(./static/image/bottombtn0301.webp); }
  #footer ul li:nth-child(4){ background-image: url(./static/image/bottombtn0401.webp); }
  #footer ul li:nth-child(1).active{ background-image: url(./static/image/bottombtn0102.webp); }
  #footer ul li:nth-child(2).active{ background-image: url(./static/image/bottombtn0202.webp); }
  #footer ul li:nth-child(3).active{ background-image: url(./static/image/bottombtn0302.webp); }
  #footer ul li:nth-child(4).active{ background-image: url(./static/image/bottombtn0402.webp); }
  .flex-con{
    overflow: auto
  }
</style>
<script>
var currentTabIdx = 0
export default {
  data () {
    return {
      tabs: [
        {
          text: '看板',
          url: './tab_kanban.html',
          active: true
        },
        {
          text: '地图',
          url: './tab_map.html',
          active: false
        },
        {
          text: '领导上报',
          url: './tab_leader.html',
          active: false
        },
        {
          text: '我的',
          url: './tab_my.html',
          active: false
        }
      ]
    }
  },
  onLoad () {
    this.api.setScreenOrientation({
      orientation: 'auto'
    })
    this.$api.fixStatusBar(this.$api.dom('header'))
    this.api.setStatusBarStyle({
      style: 'light',
      color: '#272c3b'
    })
    this.funInitGroup()
  },
  onWindowChange () {
    if (currentTabIdx === 0) {
      this.api.sendEvent({
        name: 'kanbanSizeChange'
      })
    }
    this.api.setFrameGroupAttr({
      name: 'group_kanban',
      hidden: currentTabIdx !== 0
    })
    this.api.setFrameGroupAttr({
      name: 'group',
      rect: {
        x: 0,
        y: this.$api.dom('header').offsetHeight - 1,
        w: this.api.winWidth,
        h: this.$api.dom('#app').offsetHeight + 1
      }
    })
  },
  computed: {
    curActiveId () {
      return this.tabs.findIndex(it => it.active)
    }
  },
  methods: {
    funInitGroup () {
      var frames = []
      this.tabs.forEach(tab => {
        frames.push({
          name: tab.text,
          url: tab.url,
          bgColor: 'rgba(0,0,0,0)',
          bounces: false
        })
      })
      this.api.openFrameGroup({
        name: 'group',
        scrollEnabled: false,
        rect: {
          x: 0,
          y: this.$api.dom('header').offsetHeight - 1,
          w: this.api.winWidth,
          h: this.$api.dom('#app').offsetHeight + 1
        },
        index: 0,
        frames: frames
      }, function (ret, err) {

      })
    },
    switchBtn (index) {
      if (this.api === undefined || this.curActiveId === index) return
      this.tabs[this.curActiveId].active = false
      this.tabs[index].active = true
      currentTabIdx = index
      if (index === 0) {
        this.api.sendEvent({
          name: 'kanbanSizeChange'
        })
      }
      this.api.sendEvent({
        name: 'kanbanHiddenChange',
        extra: {
          hidden: currentTabIdx !== 0
        }
      })
      this.api.setFrameGroupAttr({
        name: 'group_kanban',
        hidden: currentTabIdx !== 0
      })
      this.api.setFrameGroupIndex({
        name: 'group',
        index: index
      })
    }
  }
}
</script>
