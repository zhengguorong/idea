<template>
  <List :list="myList"/>
</template>

<script>
import List from './list'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      myList: 'project/list'
    })
  },
  components: {
    List
  },
  mounted () {
    this.$store.dispatch('project/getMyList')
  }
}
</script>
