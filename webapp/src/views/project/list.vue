<template>
  <div class="container">
    <MyHeader></MyHeader>
    <div class="main">
      <div class="item" v-for="item in activeList">
        <div class="title">{{item.title}}</div>
        <div class="row">
          <span class="label">负责人：</span>
          <span class="value">{{item.charge}}</span>
        </div>
        <div class="row">
          <span class="label">参与人：</span>
          <span class="value">{{nameFormat(item.developer)|| '无'}}</span>
        </div>
        <div class="row">
          <span class="label">开发平台：</span>
          <span class="value">{{platformFormat(item.platform)}}</span>
        </div>
        <div class="row">
          <span class="label">启动时间：</span>
          <span class="value">{{dateFormat(item.startDate)}}</span>
        </div>
        <div class="row">
          <span class="label">结束时间：</span>
          <span class="value">{{dateFormat(item.endDate)}}</span>
        </div>
        <div class="row detail">
          <span class="label">需求说明：</span>
          <span class="value">{{item.detail}}</span>
        </div>
        <div class="row">
          <span class="label">项目进度：</span>
          <span class="value">
            <el-steps :space="100" :active="switchState(item.state)" finish-status="success">
              <el-step title="立项"></el-step>
              <el-step :status="item.state === 'NOTALLOW'? 'error':''" title="项目审核"></el-step>
              <el-step title="人员准备"></el-step>
              <el-step title="需求调研"></el-step>
              <el-step title="UI设计"></el-step>
              <el-step title="项目开发"></el-step>
              <el-step title="项目测试"></el-step>
              <el-step title="上线完毕"></el-step>
            </el-steps>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  computed: {
    ...mapGetters({
      userInfo: 'user/getUserInfo',
      activeList: 'project/getActiveList',
      finishList: 'project/getFinishList'
    })
  },
  methods: {
    dateFormat (dateTime) {
      return moment(dateTime).format('YYYY年MM月DD日')
    },
    nameFormat (arr) {
      let result = ''
      arr.forEach((item) => {
        result = result + item.nickName + '、'
      })
      result = result.substring(0, result.length - 1)
      return result
    },
    platformFormat (arr) {
      let result = ''
      arr.forEach((item) => {
        result = result + item + '、'
      })
      result = result.substring(0, result.length - 1)
      return result
    },
    switchState (state) {
      switch (state) {
        case 'CREATE':
          return 1
        case 'ALLOW':
          return 2
        case 'PP':
          return 3
        case 'SRA':
          return 4
        case 'DESIGN':
          return 5
        case 'CODING':
          return 6
        case 'QA':
          return 7
        case 'FINISH':
          return 8
        default:
          console.log('项目黄了')
          return 1
      }
    }
  },
  components: {
    MyHeader
  },
  mounted () {
    this.$store.dispatch('project/getActiveList')
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  background: #E9E9E9;
  height: 100%;
}

.main {
  width: 1140px;
  margin: 12px auto;
  font-size: 14px;
  overflow: hidden;
  .item {
    background: #fff;
    color: #1F2D3D;
    padding: 20px 10px 10px 20px;
    margin-bottom: 10px;
    width: 100%;
    .title {
      font-size: 19px;
      text-align: center;
      margin-bottom: 10px;
    }
    .row {
      padding: 10px 0px;
      overflow: hidden;
      .label {
        width: 80px;
        text-align: left;
        float: left;
      }
      .value {
        float: left;
        width: 90%;
        line-height: 1.5;
        float: left;
      }
    }
    .row.detail {
      .value {
        text-overflow: ellipsis;
      }
    }
  }
}
</style>


