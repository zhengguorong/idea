<template>
  <div class="container">
    <MyHeader></MyHeader>
  </div>
</template>

<script>
import MyHeader from '@/components/Header.vue'
export default {
  data () {
    return {}
  },
  components: {
    MyHeader
  }
}
</script>

<style lang="less" scoped>
  .container {
    width: 1024px;
    margin: 0 auto
  }
</style>

