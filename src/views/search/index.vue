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
    <van-cell-group v-show="suggestionSearchList.length">
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
    <van-cell-group v-show="!suggestionSearchList.length">
      <van-cell title="历史记录">
        <!-- 控制删除元素的按钮图标 -->
        <van-icon
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
          v-if="isDeletIcon"
          @click="isDeletIcon = !isDeletIcon"
        />
        <template v-else>
          <!-- 删除界面按钮 -->
          <span style="margin-right: 10px;" @click="deletAllRecord"
            >全部删除</span
          >
          <span @click="isDeletIcon = !isDeletIcon">完成</span>
        </template>
      </van-cell>
      <van-cell
        :title="value"
        v-for="(value, index) in searchHistoryList"
        :key="index"
        @click="onSearch(value)"
      >
        <!-- 每条记录的删除按钮图标 -->
        <van-icon
          slot="right-icon"
          name="close"
          style="line-height: inherit;"
          v-show="!isDeletIcon"
          @click="deletThisRecord(index)"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/store/storage'
import { debounce } from 'lodash'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchHistoryList: getItem('searchHistoryList'), // 搜索历史记录列表
      isDeletIcon: true, // 删除图标的显示与否
      searchText: '', // 搜索关键字
      suggestionSearchList: [] // 搜索联想建议列表
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {

  },
  methods: {
    /**
     * 删除所有历史搜索记录
     */
    deletAllRecord () {
      this.searchHistoryList.splice(0, this.searchHistoryList.length)
      if (this.user) {

      } else {
        setItem('searchHistoryList', this.searchHistoryList)
      }
    },
    /**
     * 删除单条历史搜索记录
     * @param {number} index =>本条记录在历史记录中的下标
     */
    deletThisRecord (index) {
      this.searchHistoryList.splice(index, 1)
      if (this.user) {

      } else {
        setItem('searchHistoryList', this.searchHistoryList)
      }
    },
    /**
     * @param {string} searchText =>搜索条件，也是传递的参数
     */
    onSearch (searchText) {
      let nowSearchText = searchText.trim().toLowerCase()
      let index = this.searchHistoryList.findIndex(
        item => item.trim().toLowerCase() === nowSearchText)
      /**
       * 1.历史记录中找不到就添加新的历史记录
       * 2.历史记录找到了则删除原有的记录
       * 3.最后把本次的插入到最前面达成记录提前的效果
       */
      index !== -1 && this.searchHistoryList.splice(index, 1)
      this.searchHistoryList.unshift(searchText)
      if (this.user) {
        /**
         * 登录则存储在后台服务器中
         */
      } else {
        /**
         * 没有登录历史搜索记录存储在本地中
         */
        setItem('searchHistoryList', this.searchHistoryList)
      }
      /**
       * 路由跳转搜索结果
       */
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
      handler: debounce(async function (newVal) {
        // console.log(newVal.length)
        if (!newVal.length) {
          this.suggestionSearchList = []
        } else {
          const { data } = await getSearchSuggestion({ q: newVal })
          this.suggestionSearchList = data.data.options
        }
      }, 300),
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
