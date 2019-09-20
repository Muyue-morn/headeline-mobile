<template>
<div>
  <van-tabs v-model="active">
  <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">{{channel.name}}</van-tab>
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
    async getChannelsList () {
      let { data } = await getChannels()
      this.channels = data.data.channels
    }
  },
  created () {
    this.getChannelsList()
  }

}
</script>

<style lang="less" scoped>

</style>
