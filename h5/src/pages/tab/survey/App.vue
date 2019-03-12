<template>
  <div id="app">
    <div>
      <div style="background:#ecf0f5;height:20px;"></div>
      <div style="padding:5px;background:white;">
        <span>平台信息</span>
      </div>
      <div class="aui-hr"></div>
      <section class="aui-grid">
        <div class="aui-row">
          <template v-for="(info,idx) in platformInfos">
            <div
              class="aui-col-xs-3"
              :key="'info_'+idx"
            >
              <div>
                <div
                  class="circle"
                  :style="{backgroundColor:info.bgColor}"
                >
                  {{info.text}}
                </div>
              </div>
              <div class="aui-grid-label">{{info.name}}</div>
            </div>
          </template>
        </div>
      </section>
      <div class="aui-hr"></div>
      <div class="bottom_info">
        <div class="info_item">1</div>
        <div class="v_line"></div>
        <div class="info_item">2</div>
      </div>
      <div class="aui-hr"></div>

      <div>
        <div style="background:#ecf0f5;height:20px;"></div>
        <div style="padding:5px;background:white;">
          <span>实时数据</span>
        </div>
        <div class="aui-hr"></div>
        <section class="aui-grid">
          <div class="aui-row">
            <template v-for="(info,idx) in realData">
              <div
                class="aui-col-xs-3"
                :key="'info_'+idx"
              >
                <div>
                  <div
                    class="circle"
                    :style="{backgroundColor:info.bgColor}"
                  >
                    {{info.text}}
                  </div>
                </div>
                <div class="aui-grid-label">{{info.name}}</div>
              </div>
            </template>
          </div>
        </section>
        <div class="aui-hr"></div>
        <div
          v-if="showChart"
          class="bottom_info"
        >
          <div class="info_item">
            <a-chart
              ref="vchart"
              :options="polar"
            />
            <div class="center">
              23
            </div>
          </div>
          <div class="v_line"></div>
          <div class="info_item">
            <a-chart
              ref="vchart"
              :options="polar"
            />
            <div class="center">
              23
            </div>
          </div>
        </div>
        <div class="aui-hr"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.echarts {
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
.circle {
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  text-align: justify;
  margin: 0 auto;
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
}
.center {
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  margin: 0 auto;
  width: 50%;
}
.bottom_info {
  display: flex;
  background-color: white;
}
.info_item {
  flex-grow: 0.5;
}
.v_line {
  width: 1px;
  background-color: #dddddd;
  margin: 4px;
}
</style>

<script>
import { platformInfos, realData } from './mock'
export default {
  components: {
    'a-chart': () =>
      import(/* webpackChunkName:"a-chart" */ '~/components/a-chart/index.vue')
  },
  data () {
    return {
      progress: {
        val1: 30
      },
      showChart: false,
      platformInfos,
      realData
    }
  },
  computed: {
    polar () {
      return {
        series: [
          {
            type: 'gauge',
            axisLine: {
              // 仪表盘轴线(轮廓线)相关配置。
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: {
                // 仪表盘轴线样式。
                opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                width: 10, // 轴线宽度,默认 30。
                shadowBlur: 0, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: '#00000000' // 阴影颜色。支持的格式同color。
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: this.progress.val1 }],
            animationDelay: 300
          }
        ]
      }
    }
  },
  onLoad () {
    // eslint-disable-next-line no-console
    console.log('onLoad')
  },
  created () {
    window.refreshData = () => {
      this.loadData()
    }
    window.onresize = () => {
      this.$refs.vchart && this.$refs.vchart.resize()
    }
  },
  mounted () {
    setTimeout(() => {
      this.showChart = true
    }, 500)
  },
  methods: {
    loadData () {
      this.progress.val1 = Math.random() * 100
      setTimeout(() => {
        window.api.refreshHeaderLoadDone()
      }, 1000)
    }
  }
}
</script>
