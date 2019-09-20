<template>
  <div>
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <van-list v-model="channels[active].loading" :finished="channels[active].finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in channels[active].list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: []
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
      })
      this.channels = data.data.channels
    },
    /**
     * list拉取数据
     */
    onLoad () {
      // 获取每个频道的对象
      let channel = this.channels[this.active]
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          channel.list.push(channel.list.length + 1)
        }
        // 加载状态结束
        channel.loading = false

        // 数据全部加载完成
        if (channel.list.length >= 40) {
          channel.finished = true
        }
      }, 500)
    }
  },
  created () {
    this.getChannelsList()
  }

}
</script>

<style lang="less" scoped>
</style>
