<template>
  <div class="container">
    <MyHeader :showCreate="false"></MyHeader>
    <div class="main">
      <div class="title">项目信息</div>
      <el-form class="form" ref="projectForm" label-position="left" :model="form" label-width="100px" :rules="projectRule">
        <el-form-item label="项目名字：" prop="title">
          <el-input v-model="form.title" placeholder="简单直接的名字"></el-input>
        </el-form-item>
        <el-form-item label="负责人：">
          <div class="charge">{{form.charge}}</div>
        </el-form-item>
        <el-form-item label="参与人：">
          <el-select v-model="form.developer" multiple placeholder="请选择" value-key="userId">
            <el-option v-for="user in users" :key="user.userId" :label="user.nickName" :value="user">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开发平台：" prop="platform">
          <el-checkbox-group v-model="form.platform">
            <el-checkbox-button v-for="platform in platforms" :label="platform" :key="platform">{{platform}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="开发时间" required>
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker type="date" v-model="form.startDate" placeholder="选择开始日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endDate">
              <el-date-picker type="date" v-model="form.endDate" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="需求说明" prop="detail">
          <el-input :rows="5" type="textarea" v-model="form.detail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="create">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header.vue'
import ProjectModel from '@/model/project'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: new ProjectModel(),
      platforms: ['App', '微信', '网站', '管理后台'],
      projectRule: {
        title: [
          { required: true, message: '请输入项目标题', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入需求说明', trigger: 'blur' }
        ],
        platform: [
          { type: 'array', required: true, message: '请至少选择一个开发平台', trigger: 'change' }
        ],
        startDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        endDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers'
    })
  },
  methods: {
    create () {
      this.$refs['projectForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('project/create', this.form).then(res => {
            this.$message.success('创建成功')
            this.$router.go('-1')
          })
        }
      })
    }
  },
  components: {
    MyHeader
  },
  mounted () {
    this.form.charge = window.localStorage.getItem('nickName')
    this.form.author = window.localStorage.getItem('nickName')
    this.$store.dispatch('user/getUsers')
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
  width: 1060px;
  background: #fff;
  margin: 12px auto;
  padding: 40px;
  .title {
    font-size: 18px;
  }
  .form {
    margin-top: 40px;
    width: 500px;
    .charge {
      color: #20A0FF;
    }
    .invitation {
      color: #20A0FF;
      cursor: pointer;
      text-decoration: underline;
      margin-left: 10px;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .line {
      text-align: center;
    }
  }
}
</style>
