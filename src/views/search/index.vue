<template>
  <div>
    <!-- 头部标题栏 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      slot="title"
      shape="round"
      style="padding:5px"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 联想搜索 -->
    <van-cell-group>
      <van-cell icon="search" v-for="item in suggestionSearchList" :key="item" :title="item">
        <!-- <div slot="title">{{ item }}</div> -->
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <span style="margin-right: 10px;">全部删除</span>
        <span>完成</span>
        <van-icon slot="right-icon" name="delete" style="line-height: inherit;" />
      </van-cell>
      <van-cell title="hello" v-for="value in 5" :key="value">
        <van-icon slot="right-icon" name="close" style="line-height: inherit;" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      suggestionSearchList: []
    }
  },
  methods: {
    onSearch () { },
    onCancel () { }
  },
  watch: {
    async searchText (newVal) {
      if (!newVal.length) {
        return null
      } else {
        const { data } = await getSearchSuggestion({ q: newVal })
        this.suggestionSearchList = data.data.options
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
