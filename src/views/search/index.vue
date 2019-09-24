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
      @search="onSearch(searchText)"
      @cancel="onCancel"
    />
    <!-- 联想搜索 -->
    <van-cell-group>
      <van-cell
        icon="search"
        v-for="(item, index) in suggestionSearchList"
        :key="index"
        @click="onSearch(item)"
      >
        <div slot="title" v-html="heightLineSearch(item, index)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <van-icon
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
          v-if="isDeletIcon"
          @click="isDeletIcon = !isDeletIcon"
        />
        <template v-else>
          <span style="margin-right: 10px;">全部删除</span>
          <span @click="isDeletIcon = !isDeletIcon">完成</span>
        </template>
      </van-cell>
      <van-cell title="hello" v-for="value in 5" :key="value">
        <van-icon
          slot="right-icon"
          name="close"
          style="line-height: inherit;"
          v-show="!isDeletIcon"
        />
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
      isDeletIcon: true, // 删除图标的显示与否
      searchText: '', // 搜索关键字
      suggestionSearchList: [] // 搜索联想建议列表
    }
  },
  methods: {
    /**
     * @param {string} searchText =>搜索条件，也是传递的参数
     */
    onSearch (searchText) {
      this.$router.push({
        name: 'searchResult',
        params: {
          searchText
        }
      })
    },
    onCancel () { },
    /**
     * @param {string} str =>含有高亮关键字的字符串
     * 搜索关键字高亮实现
     */
    heightLineSearch (str) {
      const reg = new RegExp(`(${this.searchText})`, 'gi')
      return str.replace(reg, '<span style="color: red;">$1</span>')
    }
  },
  watch: {
    /**
     * 监听搜索条件的变化，进而发送请求
     */
    searchText: {
      async handler (newVal) {
        // console.log(newVal.length)
        if (!newVal.length) {
          this.suggestionSearchList = null
        } else {
          const { data } = await getSearchSuggestion({ q: newVal })
          this.suggestionSearchList = data.data.options
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
