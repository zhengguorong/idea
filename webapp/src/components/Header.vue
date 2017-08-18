<template>
  <div class="header">
    <div class="main">
      <div class="logo" @click="goHome">
        <span class="title">Chaos</span>
        <span class="split">|</span>
        <span class="icon"></span>
      </div>
      <div class="nav">
        <el-menu theme="dark" class="el-menu-demo" mode="horizontal" :router="true" :default-active="active">
          <el-menu-item index="/index">全部项目<el-badge class="mark" :value="total.all" /></el-menu-item>
          <el-menu-item index="/process">进行中<el-badge class="mark" :value="total.process" /></el-menu-item>
          <el-menu-item index="/finish">已完成<el-badge class="mark" :value="total.finish" /></el-menu-item>
          <el-menu-item v-if="role === 'USER'" index="/my">我的项目<el-badge class="mark" :value="total.my" /></el-menu-item>
          <el-menu-item v-if="role === 'ADMIN'" index="/examine">待审核<el-badge class="mark" :value="total.examine" /></el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <!-- <span class="login">登录</span> -->
        <div class="userInfo" @click="userInfo">{{nickName}}</div>
        <div class="create" @click="createProject" v-if="showCreate">
          <el-button type="primary" size="small">创建项目</el-button>
        </div>
        <!-- <div class="message">
          <i class="el-icon-message"></i>
        </div> -->
         <span class="logout" @click="logout"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    showCreate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      total: 'project/total'
    })
  },
  data () {
    return {
      nickName: '',
      active: 'index',
      role: window.localStorage.getItem('role')
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    createProject () {
      this.$router.push('/createProject')
    },
    logout () {
      this.$router.push('login')
      window.localStorage.setItem('token', '')
    },
    userInfo () {
      this.$router.push('/userInfo')
    }
  },
  mounted () {
    this.nickName = window.localStorage.getItem('nickName')
    this.active = this.$route.path
  }
}
</script>


<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  background: #324057;
  font-family: ".PingFangSC-Regular";
  .main {
    width: 1140px;
    margin: 0 auto;
  }
}
.count {
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  position: absolute;
  right: 0;
  top: 5px;
}
.logo {
  width: 130px;
  margin-left: 12px;
  line-height: 60px;
  height: 60px;
  font-size: 20px;
  color: #fff;
  float: left;
  cursor: pointer;
  .split {
    padding: 0 10px;
  }
  .icon {
    background: url(../assets/idea.png) no-repeat center;
    transform: rotateY(180deg);
    background-size: 30px 30px;
    width: 30px;
    height: 30px;
    float: right;
    padding-top: 25px;
  }
}

.nav {
  float: left;
  margin-left: 50px;
}
.mark {
 margin-top: -6px;
}

.right {
  float: right;
  line-height: 60px;
  color: #fff;
  font-size: 14px;
  display: table-cell;
  vertical-align: bottom;
  .userInfo {
    // margin-right: 20px;
    float: left;
    cursor: pointer;
  }
  .message {
    float: left;
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
  .logout {
    background: url(../assets/logout.png) no-repeat center;
    background-size: 25px 25px;
    width: 25px;
    height: 25px;
    margin: 17px 20px 0 10px;
    float: right;
    cursor: pointer;
  }
  .create {
    float: right;
    margin-right: 10px;
  }
}
</style>
