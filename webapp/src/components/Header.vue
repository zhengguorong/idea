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
          <el-submenu index="2">
            <template slot="title">项目状态</template>
            <el-menu-item index="/index">全部项目
              <el-badge class="mark" :value="total.all" /></el-menu-item>
            <el-menu-item index="/process">进行中
              <el-badge class="mark" :value="total.process" /></el-menu-item>
            <el-menu-item index="/finish">已完成
              <el-badge class="mark" :value="total.finish" /></el-menu-item>
          </el-submenu>
          <el-menu-item v-if="role === 'USER'" index="/join">我参与的
            <el-badge class="mark" :value="total.join" /></el-menu-item>
          <el-menu-item v-if="role === 'USER'" index="/my">我负责的
            <el-badge class="mark" :value="total.my" /></el-menu-item>
          <el-menu-item v-if="role === 'ADMIN'" index="/examine">待审核
            <el-badge class="mark" :value="total.examine" /></el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <el-autocomplete class="search" size="small"
           v-model="searchKeyWord"
           :fetch-suggestions="querySearchAsync"
           :on-icon-click="search"
           placeholder="搜索标题/负责人"
           icon="search"
           @select="searchSelect">
        </el-autocomplete>
        <div class="userInfo" @click="userInfo">{{nickName}}</div>
        <div class="create" @click="createProject" v-if="showCreate">
          <el-button type="primary" size="small">创建项目</el-button>
        </div>
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
      total: 'project/total',
      restaurants: 'project/searchSuggest'
    })
  },
  data () {
    return {
      nickName: '',
      active: 'index',
      role: window.localStorage.getItem('role'),
      searchKeyWord: ''
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
      this.$router.push('/login')
      window.localStorage.setItem('token', '')
    },
    userInfo () {
      this.$router.push('/userInfo')
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      cb(results)
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 输入关键字后点击搜索
    search () {
      if (this.searchKeyWord) {
        this.$router.push('/search/' + this.searchKeyWord)
      }
    },
    // 选择搜索建议
    searchSelect (item) {
      this.$router.push('/projectDetail/' + item._id)
    }
  },
  mounted () {
    this.nickName = window.localStorage.getItem('nickName')
    this.active = this.$route.path
    this.$store.dispatch('project/getSearchSuggest')
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
  .search {
    float: left;
    width: 200px;
    margin-right: 20px;
  }
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
