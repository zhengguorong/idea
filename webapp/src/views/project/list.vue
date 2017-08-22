<template>
  <div class="container">
    <MyHeader></MyHeader>
    <div class="main">
      <!-- <div class="empty" v-if="list.length === 0"></div> -->
      <div class="item" v-for="item in list" :key="item._id">
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
        <div class="row" v-if="item.hardRes">
          <span class="label">硬件资源：</span>
          <span class="value">{{item.hardRes}}</span>
        </div>
        <div class="row" v-if="item.devRes">
          <span class="label">开发资源：</span>
          <span class="value">{{item.devRes}}</span>
        </div>
        <div class="row detail">
          <span class="label">应用价值：</span>
          <span class="value">{{item.detail}}</span>
        </div>

        <div class="row" v-if="item.files&&item.files.length > 0">
          <span class="label">附件：</span>
          <span class="value">
            <template v-for="file in item.files">
              <a :key="file.name" class="file" :href="file.url" target="_blank">
                <i class="el-icon-document"></i>{{file.name}}
              </a>
            </template>
          </span>
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
        <div class="row" v-if="item.examineMessage">
          <span class="label">审核意见：</span>
          <span class="value">{{item.examineMessage}}</span>
        </div>
        <div class="row">
          <span class="label">&nbsp;</span>
          <span class="value">
            <el-button v-if="item.state === 'CREATE'&&role === 'ADMIN'" @click="changeState(item._id, 'ALLOW')" size="small" icon="circle-check" type="primary">审核通过</el-button>
            <el-button v-if="item.state === 'CREATE'&&role === 'ADMIN'" @click="changeState(item._id, 'NOTALLOW')" size="small" type="danger" icon="circle-close">审核不通过</el-button>
            <el-button v-if="role === 'USER'&&item.state!=='FINISH' && item.state !== 'NOTALLOW'&& getNextState(item.state).key !== 'ALLOW' && userId === item.author" @click="changeState(item._id, getNextState(item.state).key)" type="primary" size="small" icon="check">{{getNextState(item.state).name}}</el-button>
          </span>
        </div>
        <div class="action">
          <i @click="toUpdate(item._id)" v-if="item.author === userId" class="el-icon-edit"> 编辑</i>
          <i @click="del(item._id)" v-if="item.author === userId" class="el-icon-delete2"> 删除</i>
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
      arr && arr.forEach((item) => {
        result = result + item.nickName + '、'
      })
      result = result.substring(0, result.length - 1)
      return result
    },
    platformFormat (arr) {
      let result = ''
      arr && arr.forEach((item) => {
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
            this.$message({
              title: '成功',
              message: '删除成功！',
              type: 'success'
            })
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
          return { key: 'ALLOW', name: '等待审核' }
        case 'ALLOW':
          return { key: 'PP', name: '人员已确认' }
        case 'PP':
          return { key: 'SRA', name: '需求调研完毕' }
        case 'SRA':
          return { key: 'DESIGN', name: 'UI设计完毕' }
        case 'DESIGN':
          return { key: 'CODING', name: '开发完毕' }
        case 'CODING':
          return { key: 'QA', name: '测试完毕' }
        case 'QA':
          return { key: 'FINISH', name: '上线完毕' }
        case 'FINISH':
          return { key: 'FINISH', name: '上线完毕' }
        default:
          return 1
      }
    },
    changeState (id, state) {
      if (state === 'ALLOW' || state === 'NOTALLOW') {
        let message = state === 'ALLOW' ? '确认审核通过项目？' : '确认审核不通过项目'
        this.$prompt(message).then(res => {
          this.$store.dispatch('project/update', { _id: id, examineMessage: res.value })
          this.$store.dispatch('project/changeState', { id: id, state: state }).then(res => {
            this.$message({
              title: '成功',
              message: '修改项目进度成功！',
              type: 'success'
            })
          }).catch(e => {
            this.$message({
              title: '错误',
              message: e.response.data,
              type: 'error'
            })
          })
        })
      } else {
        this.$confirm('确认修改项目进度吗？').then(res => {
          this.$store.dispatch('project/changeState', { id: id, state: state }).then(res => {
            this.$message({
              title: '成功',
              message: '修改项目进度成功！',
              type: 'success'
            })
          }).catch(e => {
            this.$message({
              title: '错误',
              message: e.response.data,
              type: 'error'
            })
          })
        })
      }
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
  margin: 12px auto 0 auto;
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
      .file {
        padding-right: 15px;
        cursor: pointer;
        color: #20a0ff;
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
        font-size: 15px;
        margin-right: 30px;
      }
      i:hover {
        color: #20a0ff
      }
      .el-icon-edit {
        color: #20a0ff
      }
    }
  }
}
</style>


