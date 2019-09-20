<template>
  <div>
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <van-list
          v-model="currentChannel.loading"
          :finished="currentChannel.finished"
          finished-text="没有更多了"
          @load="onLoad"
          style="margin-bottom:50px"
        >
          <van-cell
            v-for="item in currentChannel.list"
            :key="item.art_id.toString()"
            :title="item.title"
          />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import { getAllArticles } from '@/api/articles'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {
    currentChannel () {
      return this.channels[this.active]
    }
  },
  methods: {

    /**
     * 获得频道列表
     */
    async getChannelsList () {
      let { data } = await getChannels()
      data.data.channels.forEach(channel => {
        channel.list = []
        channel.loading = false
        channel.finished = false
        channel.pre_timestamp = null
      })
      this.channels = data.data.channels
    },
    /**
     * list拉取数据
     */
    async onLoad () {
      // 获取每个频道的对象
      let channel = this.currentChannel
      // 异步更新数据
      /**
       * 获取频道对应文章数据
       */
      let { data } = await getAllArticles({
        channel_id: this.active,
        timestamp: channel.pre_timestamp || Date.now(),
        with_top: 1
      })
      // console.log(data)
      // 语言风格问题变量不可以是非驼峰命名这里重命名了
      const { pre_timestamp: preTimestamp, results } = data.data
      channel.list.push(...results)

      // 加载状态结束
      channel.loading = false

      // 数据全部加载完成
      if (preTimestamp === null) {
        channel.finished = true
      } else {
        // 保存时间戳
        channel.pre_timestamp = preTimestamp
      }
    }
  },
  created () {
    this.getChannelsList()
  }

}
</script>

<style lang="less" scoped>
</style>
