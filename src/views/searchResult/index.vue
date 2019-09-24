<template>
  <div>
    <van-nav-bar title="搜索结果" left-arrow fixed  @click-left="$router.back()"/>
    <van-list
      v-model="isLoading"
      :finished="isFinished"
      finished-text="没有更多了"
      @load="onLoad"
      style="margin-top:46px"
    >
      <van-cell v-for="item in searchResultsList" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'

export default {
  name: 'SearchResultIndex',
  data () {
    return {
      searchResultsList: [],
      isLoading: false,
      isFinished: false,
      page: {
        page: 1,
        per_page: 10
      }
    }
  },
  methods: {
    /**
     * 加载数据
     */
    async onLoad () {
      // 异步更新数据
      let { data } = await getSearchResults({
        page: this.page.page,
        per_page: this.page.per_page,
        q: this.$route.params.searchText
      })
      let searchResults = data.data.results
      /**
       * 判断是否有数据若有则加入列表，并结束此次加载，令页码加1
       * 否则结束此次加载，同时把数据加载是否完成的状态设置为TRUE
       */
      if (searchResults.length) {
        this.searchResultsList.unshift(...searchResults)
        this.page.page++
        this.isLoading = false
      } else {
        this.isLoading = false
        this.isFinished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar .van-icon{
  color: #fff
}
</style>
