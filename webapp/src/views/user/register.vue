<template>
  <div class="container">
    <div class="login-main">
      <div class="login-title">
        Chaos实验室
      </div>
      <div class="content">
        <el-form :model="loginForm" ref="loginForm" :rules="loginRule">
          <div class="error-info" v-if="errorInfo">
            <div><i class="el-icon-warning"></i><span>{{errorInfo}}</span></div>
          </div>
          <el-form-item prop="userId">
            <el-input type="text" v-model="loginForm.userId" placeholder="登陆账号"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input type="text" v-model="loginForm.name" placeholder="请输入真实名字"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input type="password" v-model="loginForm.checkPassword" auto-complete="off" placeholder="再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click.native.prevent="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.loginForm.checkPassword !== '') {
            this.$refs.loginForm.validateField('checkPassword')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        errorInfo: '',
        loginForm: {
          userId: '',
          name: '',
          password: '',
          checkPassword: ''
        },
        loginRule: {
          userId: [
            {required: true, message: '登陆账号', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入真实名字', trigger: 'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      register (ev) {
        this.errorInfo = ''
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/register', {userId: this.loginForm.userId, nickName: this.loginForm.name, password: this.loginForm.password}).then(res => {
              this.$router.push('/')
            }).catch(e => {
              this.$message.error(e.response.data)
            })
          } else {
            return false
          }
        }
        )
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
    padding: 7px 9px 7px ;
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
