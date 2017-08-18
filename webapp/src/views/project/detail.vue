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
  mounted () {
    const projectId = this.$route.params.id
    this.$store.dispatch('project/getDetial', projectId)
  }
}
</script>
