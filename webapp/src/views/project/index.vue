<template>
  <List v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100" :list="list" />
</template>

<script>
import List from './list'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      list: 'project/list'
    })
  },
  data () {
    return {
      page: 1,
      busy: false,
      pageCount: 1
    }
  },
  methods: {
    loadMore () {
      if (this.pageCount <= this.page) return
      this.busy = true
      this.page = this.page + 1
      this.$store.dispatch('project/getList', {page: this.page}).then(res => {
        this.busy = false
      })
    }
  },
  components: {
    List
  },
  mounted () {
    this.$store.dispatch('project/getTotal')
    this.$store.dispatch('project/getList', {page: 1}).then(res => {
      this.pageCount = res.pageCount
    })
  }
}
</script>
