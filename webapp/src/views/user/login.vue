<template>
  <div class="container">
    <div class="login-main">
      <div class="login-title">
        Chaos实验室
      </div>
      <div class="content">
        <el-form :model="loginForm" ref="loginForm" :rules="loginRule">
          <div class="error-info" v-if="loginResult">
            <div><i class="el-icon-warning"></i><span>{{loginResult}}</span></div>
          </div>
          <el-form-item prop="userId">
            <el-input class="login-id" type="text" v-model="loginForm.userId" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="password" type="password" v-model="loginForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:30%" :plain="true" type="success" @click.native.prevent="register">注册</el-button>
            <el-button style="width:65%;float:right" type="primary" class="login-btn" @click.native.prevent="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.routerFrom = from
      })
    },
    data () {
      return {
        routerFrom: {},
        loginForm: {
          userId: '',
          password: ''
        },
        loginRule: {
          userId: [
            {required: true, message: '请输入登陆账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
    },
    computed: {
      loginResult () {
        return this.$store.state.user.loginResult
      }
    },
    methods: {
      login (ev) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/login', {userId: this.loginForm.userId, password: this.loginForm.password}).then(res => {
              if (this.routerFrom.name) {
                this.$router.back()
              } else {
                this.$router.push('/')
              }
            }).catch(e => {
              this.$message.error(e.response.data)
            })
          } else {
            return false
          }
        })
      },
      register () {
        this.$router.push('register')
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    background-image: url('../../assets/login-bg.jpg');
    background-size: auto;
    min-height: calc(100vh);
  }

  .error-info {
    text-align: left;
    background: #ffeeed;
    padding: 7px 9px 7px;
    margin: 0 0 10px;
    border-radius: 6px;
    line-height: 1.5;
    color: #666;
    font-size: 12px;
    i {
      color: #f60;
    }
    span {
      padding-left: 10px;
    }
  }

  .login-main {
    width: 450px;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    top: 100px;
  }

  .login-title {
    margin: 0;
    padding: 30px 20px 26px;
    text-align: center;
    font-size: 18px;
  }

  .content {
    padding: 0 25px 10px;
  }

  .form-item {
    line-height: 1.5;
    margin-bottom: 17px;
  }

  .login-btn {
    width: 100%;
  }
</style>
