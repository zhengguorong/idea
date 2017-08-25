<template>
  <List :list="detail"/>
</template>

<script>
import List from './list'
export default {
  computed: {
    detail () {
      let list = []
      const detail = this.$store.getters['project/getDetail']
      list.push(detail)
      return list
    }
  },
  components: {
    List
  },
  // 解决相同路由，参数不同无法触发mounted方法的问题
  watch: {
    '$route': ['getDetail']
  },
  methods: {
    getDetail () {
      const projectId = this.$route.params.id
      this.$store.dispatch('project/getDetial', projectId)
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>
