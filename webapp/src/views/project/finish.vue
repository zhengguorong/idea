<template>
  <List :list="finishList"/>
</template>

<script>
import List from './list'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      finishList: 'project/list'
    })
  },
  components: {
    List
  },
  mounted () {
    this.$store.dispatch('project/getFinishList')
  }
}
</script>
