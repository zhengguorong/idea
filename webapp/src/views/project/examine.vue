<template>
  <List :list="examineList"/>
</template>

<script>
import List from './list'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      examineList: 'project/list'
    })
  },
  components: {
    List
  },
  mounted () {
    this.$store.dispatch('project/getExamineList')
  }
}
</script>
