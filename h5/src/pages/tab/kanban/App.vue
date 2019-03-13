<template>
<div id="wrap" class="flex-wrap flex-vertical">
    <header>
      <ul class="flex-wrap">
        <template v-for="(tab,i) in tabs">
          <li tapmode="hover" :key="'tab_' + i" @click="switchBtn(i)" :class="['flex-con', tab.active ? 'active' : '']">{{tab.text}}</li>
        </template>
      </ul>
      <div id="slider"></div>
    </header>
    <div id="app" class="flex-con">
    </div>
  </div>
</template>
<style>
header{
      background-color: #ffffff;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2)
    }
    header ul li{ color: #767676;  padding-top: 10px; padding-bottom: 10px; background: url() no-repeat center 2px; background-size: auto 30px; text-align: center; }
    header ul li.active{ color: #2baff5; }
    header #slider {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 25%;
      background-color: #2baff5;
    }
    .flex-con{
      overflow: auto
    }
</style>
<script>
import { prefixStyle } from './slider'
var currentIdx = 0
var isHidden = false
export default {
  data () {
    return {
      tabs: [
        {
          text: '概况',
          url: './tab_survey.html',
          active: true
        },
        {
          text: '受理',
          url: './tab_accept.html',
          active: false
        },
        {
          text: '处置',
          url: './tab_dispose.html',
          active: false
        },
        {
          text: '督查',
          url: './tab_supervision.html',
          active: false
        }
      ]
    }
  },
  onReady () {
    const self = this
    this.$api.dom('#slider').style.width = this.api.winWidth / this.tabs.length
    this.api.addEventListener({
      name: 'kanbanHiddenChange'
    }, function (ret) {
      isHidden = ret.hidden
    })
    this.api.addEventListener({
      name: 'kanbanSizeChange'
    }, function (ret) {
      setTimeout(function () {
        self.switchBtn(currentIdx, false)
      }, 200)
    })
    this.funInitGroup()
  },
  computed: {
    curActiveId () {
      return this.tabs.findIndex(it => it.active)
    }
  },
  methods: {
    funInitGroup () {
      const self = this
      var frames = []
      this.tabs.forEach(tab => {
        frames.push({
          name: tab.text,
          pageParam: {
            refresh: true
          },
          url: tab.url,
          bgColor: 'rgba(0,0,0,0)',
          bounces: false
        })
      })
      this.api.openFrameGroup({
        name: 'group_kanban',
        scrollEnabled: true,
        rect: {
          x: 0,
          y: this.$api.dom('header').offsetHeight + 50,
          w: this.api.winWidth,
          h: this.$api.dom('#app').offsetHeight
        },
        index: 0,
        frames: frames
      }, function (ret, err) {
        self.switchBtn(ret.index, false)
      })
    },

    switchBtn (index, isSet = true) {
      if (this.api === undefined || this.curActiveId === index) return
      this.tabs[this.curActiveId].active = false
      this.tabs[index].active = true
      var width = this.api.winWidth / this.tabs.length
      this.$api.dom('#slider').style.width = width
      this.setSliderTransform(index * width)
      this.api.setFrameGroupAttr({
        name: 'group_kanban',
        hidden: isHidden,
        rect: {
          x: 0,
          y: this.$api.dom('header').offsetHeight + 50,
          w: this.api.winWidth,
          h: this.$api.dom('#app').offsetHeight
        }
      })
      currentIdx = index
      if (isSet === false) {
        return
      }
      this.api.setFrameGroupIndex({
        name: 'group_kanban',
        index: index
      })
    },
    setSliderTransform (offset) {
      var slider = this.$api.dom('#slider')
      if (typeof offset === 'number') {
        offset = `${offset}px`
      }
      if (slider) {
        var TRANSFORM = prefixStyle('transform')
        var TRANSITION = prefixStyle('transition')
        slider.style[TRANSITION] = `${TRANSFORM} 0.2s linear`
        slider.style[TRANSFORM] = `translateX(${offset}) translateZ(0)`
      }
    }
  }
}
</script>
