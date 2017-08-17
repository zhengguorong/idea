<template>
  <List :list="list"/>
</template>

<script>
import List from './list'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      list: 'project/list'
    })
  },
  components: {
    List
  },
  mounted () {
    this.$store.dispatch('project/getList')
    this.$store.dispatch('project/getTotal')
  }
}
</script>
