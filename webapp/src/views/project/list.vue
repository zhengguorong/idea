<template>
  <div class="container">
    <MyHeader></MyHeader>
    <div class="main">
      <!-- <div class="empty" v-if="list.length === 0"></div> -->
      <div class="item" v-for="item in list">
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
        <div class="row">
          <span class="label">&nbsp;</span>
          <span class="value">
            <el-button v-if="item.state === 'CREATE'&&role === 'ADMIN'" @click="changeState(item._id, 'ALLOW')" size="small" icon="circle-check" type="primary">审核通过</el-button>
            <el-button v-if="item.state === 'CREATE'&&role === 'ADMIN'" @click="changeState(item._id, 'NOTALLOW')" size="small" type="danger" icon="circle-close">审核不通过</el-button>
            <el-button v-if="role === 'USER'&&item.state!=='FINISH' && item.state !== 'NOTALLOW'&& getNextState(item.state).key !== 'ALLOW'" @click="changeState(item._id, getNextState(item.state).key)" type="success" size="small" icon="check">{{getNextState(item.state).name}}</el-button>
          </span>
        </div>
        <div class="action">
            <i @click="toUpdate(item._id)" v-if="item.author === userId" class="el-icon-edit"></i>
            <i @click="del(item._id)" v-if="item.author === userId" class="el-icon-delete"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header.vue'
import moment from 'moment'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      userId: window.localStorage.getItem('userId'),
      role: window.localStorage.getItem('role')
    }
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
    toUpdate (id) {
      this.$router.push('/updateProject/' + id)
    },
    del (id) {
      this.$confirm('确认删除项目？')
        .then(res => {
          this.$store.dispatch('project/del', id).then(res => {
            const index = this.list.findIndex((item, index) => {
              return item._id === id
            })
            this.list.splice(index, 1)
            this.$message.success('删除成功！')
          })
        })
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
          return 1
      }
    },
    getNextState (state) {
      switch (state) {
        case 'CREATE':
          return {key: 'ALLOW', name: '等待审核'}
        case 'ALLOW':
          return {key: 'PP', name: '人员准备'}
        case 'PP':
          return {key: 'SRA', name: '需求调研'}
        case 'SRA':
          return {key: 'DESIGN', name: 'UI设计'}
        case 'DESIGN':
          return {key: 'CODING', name: '项目开发'}
        case 'CODING':
          return {key: 'QA', name: '项目测试'}
        case 'QA':
          return {key: 'FINISH', name: '上线完毕'}
        case 'FINISH':
          return {key: 'FINISH', name: '上线完毕'}
        default:
          return 1
      }
    },
    changeState (id, state) {
      this.$store.dispatch('project/changeState', {id: id, state: state})
      .catch(e => {
        this.$notify.error({
          title: '错误',
          message: e.response.data
        })
      })
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  background: #E9E9E9;
  min-height: 100%;
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
    position: relative;
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
    .action {
      position: absolute;
      top: 50px;
      right: 20px;
      i {
        cursor: pointer;
        font-size: 20px;
        margin-right: 30px;
      }
      i:hover {
        color: #20a0ff
      }
    }
  }
  // .empty {
  //   background: url("../../assets/empty.png") no-repeat center;
  //   background-size: 100px 100px;
  //   width: 100px;
  //   height: 100px;
  //   margin: 100px auto;
  // }
}
</style>


