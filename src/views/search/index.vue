<template>
  <div>
    <!-- 头部标题栏 -->
    <van-nav-bar fixed>
      <van-search
        placeholder="请输入搜索关键词"
        slot="title"
        shape="round"
        background="#1989fa"
        style="padding:5px"
      />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'SearchIndex'
}
</script>

<style lang="less" scoped>
</style>
