<template>
  <div class="container">
    <MyHeader :showCreate="false"></MyHeader>
    <div class="main">
      <div class="title">项目信息</div>
      <el-form class="form" ref="projectForm" label-position="left" :model="detail" label-width="100px" :rules="projectRule">
        <el-form-item label="项目名字：" prop="title">
          <el-input v-model="detail.title" placeholder="简单直接的名字"></el-input>
        </el-form-item>
        <el-form-item label="负责人：">
          <div class="charge">{{detail.charge}}</div>
        </el-form-item>
        <el-form-item label="参与人：">
          <el-select v-model="detail.developer" multiple placeholder="请选择" value-key="userId">
            <el-option v-for="user in users" :key="user.userId" :label="user.nickName" :value="user">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开发平台：" prop="platform">
          <el-checkbox-group v-model="detail.platform">
            <el-checkbox-button v-for="platform in platforms" :label="platform" :key="platform">{{platform}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="开发时间" required>
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker type="date" v-model="detail.startDate" placeholder="选择开始日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endDate">
              <el-date-picker type="date" v-model="detail.endDate" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="文件上传：">
          <el-upload
            ref="upload"
            :action="uploadUrl"
            :multiple="true"
            :file-list="detail.files"
            :on-error="uploadError">
            <el-button size="small" type="text">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">文件不超过20mb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="应用价值" prop="detail">
          <el-input :rows="5" type="textarea" v-model="detail.detail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header.vue'
import { mapGetters } from 'vuex'
import appConst from '@/util/appConst'
export default {
  data () {
    return {
      platforms: ['App', '微信', '网站', '管理后台'],
      uploadUrl: appConst.BACKEND_DOMAIN + '/api/upload',
      projectRule: {
        title: [
          { required: true, message: '请输入项目标题', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入需求说明', trigger: 'blur' }
        ],
        platform: [
          { type: 'array', required: true, message: '请至少选择一个开发平台', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers',
      detail: 'project/getDetail' || {}
    })
  },
  methods: {
    update () {
      const files = this.getUploadFiles()
      this.detail.files = files
      this.$refs['projectForm'].validate((valid) => {
        if (valid && this.checkDate()) {
          this.detail.startDate = this.detail.startDate.getTime()
          this.detail.endDate = this.detail.endDate.getTime()
          this.$store.dispatch('project/update', this.detail).then(res => {
            this.$notify({
              title: '成功',
              message: '修改成功!',
              type: 'success'
            })
            this.$router.go('-1')
          })
        }
      })
    },
    checkDate () {
      if (this.detail.startDate.getTime() < new Date().getTime() - 86400000) {
        this.$message({
          type: 'error',
          message: '开始日期不能小于当天'
        })
        return false
      } else if (this.detail.endDate.getTime() < new Date().getTime() - 86400000) {
        this.$message({
          type: 'error',
          message: '结束日期不能小于当天'
        })
        return false
      } else if (this.detail.endDate - this.detail.startDate < 0) {
        this.$message({
          type: 'error',
          message: '结束日期必须大于开始日期'
        })
        return false
      } else {
        return true
      }
    },
    uploadError (err) {
      if (err.status === 413) {
        this.$message({
          message: '上传文件不能大于20MB',
          type: 'error'
        })
      } else if (err.status === 400) {
        this.$message({
          message: '上传文件超出限制',
          type: 'error'
        })
      }
    },
    getUploadFiles () {
      const files = this.$refs['upload'].uploadFiles
      const uploadFils = files.map((item, index) => {
        if (item.response) {
          return {name: item.response.name, url: item.response.url}
        } else {
          const data = {name: item.name, url: item.url}
          return data
        }
      })
      return uploadFils
    }
  },
  components: {
    MyHeader
  },
  mounted () {
    const projectId = this.$route.params.id
    this.$store.dispatch('project/getDetial', projectId)
    this.$store.dispatch('user/getUsers')
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

