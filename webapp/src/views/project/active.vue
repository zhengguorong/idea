<template>
  <List :list="activeList"/>
</template>

<script>
import List from './list'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      activeList: 'project/list'
    })
  },
  components: {
    List
  },
  mounted () {
    this.$store.dispatch('project/getActiveList')
  }
}
</script>
