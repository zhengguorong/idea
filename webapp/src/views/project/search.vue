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
  watch: {
    '$route': ['search']
  },
  methods: {
    search () {
      const keyword = this.$route.params.keyword
      this.$store.dispatch('project/search', keyword)
    }
  },
  mounted () {
    this.search()
  }
}
</script>
