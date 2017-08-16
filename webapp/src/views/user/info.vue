<template>
  <div class="container">
    <MyHeader></MyHeader>
    <div class="main" v-if="isUserInfoPanel">
      <div class="title">修改个人信息</div>
      <el-form class="form" ref="userForm" label-position="left" :model="user" label-width="100px" :rules="useRule">
        <el-form-item label="登陆账号：">
          <div class="charge">{{user.userId}}</div>
        </el-form-item>
        <el-form-item label="用户名：" prop="nickName">
          <el-input v-model="user.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobilePhone">
          <el-input v-model="user.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">确认修改</el-button>
          <el-button type="text" @click="isUserInfoPanel = false">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main" v-if="!isUserInfoPanel">
      <div class="title">修改密码</div>
      <el-form class="form" ref="pwdForm" label-position="left" :model="user" label-width="100px">
        <el-form-item label="密码：">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input type="password" v-model="user.checkPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePwd">确认修改</el-button>
          <el-button type="text" @click="isUserInfoPanel = true">修改基础信息</el-button>
        </el-form-item>
      </el-form>
      </el-form>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      useRule: {
        nickName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        mobilePhone: [
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur,change' }
        ]
      },
      isUserInfoPanel: true
    }
  },
  components: {
    MyHeader
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  methods: {
    updateUserInfo () {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/update', this.user).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          })
        }
      })
    },
    updatePwd () {
      if (this.user.password === undefined || this.user.checkPassword === undefined) {
        this.$message({
          type: 'error',
          message: '请输入密码'
        })
      } else if (this.user.password !== this.user.checkPassword) {
        this.$message({
          type: 'error',
          message: '两次密码不相同'
        })
      } else {
        this.$store.dispatch('user/changePassword', this.user.password).then(res => {
          this.$message({
            type: 'success',
            message: '修改密码成功'
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '修改密码失败'
          })
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch('user/getUser')
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
  width: 1060px;
  background: #fff;
  margin: 12px auto 0 auto;
  padding: 40px;
  .title {
    font-size: 18px;
    text-align: center;
  }
  .form {
    margin: 40px auto 0 auto;
    width: 400px;
  }
}
</style>
