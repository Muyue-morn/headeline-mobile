<template>
  <div>
    <!-- 头部标题栏 -->
    <van-nav-bar fixed>
      <van-search
        placeholder="请输入搜索关键词"
        readonly
        slot="title"
        shape="round"
        background="#1989fa"
        style="padding:5px"
        @click="ToSearch"
      />
    </van-nav-bar>
    <!-- 主视图 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'TabbarIndex',
  data () {
    return {
      active: 0
    }
  },
  methods: {
    /**
     * 跳转到搜索界面
     */
    ToSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
