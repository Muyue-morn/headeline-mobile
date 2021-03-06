<template>
  <van-tabs v-model="active">
    <div slot="nav-right" class="wapbtn">
      <van-button icon="wap-nav" hairline type="default" @click="isChannelEditShow = true" />
    </div>
    <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
      <van-pull-refresh v-model="channel.isLoading" @refresh="onRefresh">
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
            @click="toArticleDetial(item.art_id.toString())"
          >
            <template slot="label">
              <van-grid :border="false" :column-num="item.cover.images.length">
                <van-grid-item v-for="(img,index) in item.cover.images" :key="index">
                  <van-image :src="img" lazy-load>
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                  </van-image>
                </van-grid-item>
              </van-grid>
              <div class="article-info">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}}评论</span>
                <span>{{item.pubdate | relativeTime}}</span>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </van-tab>
    <van-popup
      v-model="isChannelEditShow"
      closeable
      round
      position="bottom"
      :style="{ height: '95%' }"
    >
      <!-- 我的频道 -->
      <van-cell-group style="padding-top:30px" :border="false">
        <van-cell title="我的频道">
          <van-button
            type="danger"
            size="mini"
            round
            plain
            @click="editMychannels = !editMychannels"
          >{{editMychannels ? '完成':'编辑'}}</van-button>
        </van-cell>
      </van-cell-group>
      <van-grid :gutter="10" class="mychannel" :border="false">
        <van-grid-item
          v-for="(channel,index) in channels"
          :key="channel.id"
          :text="channel.name"
          @click="deletOrToChannel(channel,index)"
        >
          <van-icon name="clear" slot="icon" class="closeIcon" v-show="editMychannels" />
        </van-grid-item>
      </van-grid>

      <!-- 推荐频道 -->
      <van-cell-group style="padding-top:30px" :border="false">
        <van-cell title="推荐频道" />
      </van-cell-group>
      <van-grid :gutter="10" :border="false" class="remainchannel">
        <van-grid-item
          @click="addToMychannel(channel)"
          v-for="channel in remainingChannels"
          :key="channel.id"
          :text="channel.name"
        />
      </van-grid>
    </van-popup>
  </van-tabs>
</template>

<script>
import {
  getUserOrDefualtChannels,
  getAllChannels,
  resetUserChannels,
  deletUserChannels
} from '@/api/channel'
import { getAllArticles } from '@/api/articles'
import { mapState } from 'vuex'
import { getItem, setItem } from '@/store/storage'
export default {
  name: 'HomeIndex',
  data () {
    return {
      editMychannels: false, // 编辑我的频道
      allChannels: [], // 所有的频道信息列表
      isChannelEditShow: false, // 频道编辑弹窗
      active: 0, // 当前频道的索引
      channels: []// 频道列表
    }
  },
  computed: {
    /**
     * @return {object} 当前频道
     */
    currentChannel () {
      return this.channels[this.active]
    },
    /**
     * 映射到此组件的user对象存储着token
     */
    ...mapState(['user']),
    /**
     * @return {object[]} 除去我的频道后剩余的频道数组
     */
    remainingChannels () {
      let remainChannelsList = []
      this.allChannels.forEach(channel => {
        let index = this.channels.findIndex(item => item.id === channel.id)
        if (index === -1) {
          remainChannelsList.push(channel)
          // console.log(channel)
        }
      })

      return remainChannelsList
    }
  },
  methods: {
    /**
     * 携带文章id到该文章的详情页
     * @param {string} articleId =>文章的id号
     */
    toArticleDetial (articleId) {
      this.$router.push({
        name: 'article',
        params: {
          articleId
        }
      })
    },
    /**
     * @param channel 点击的频道信息，为了获取id实现物理删除
     * @param index 点击的频道所在的下标，方便逻辑删除
     */
    async deletOrToChannel (channel, index) {
      if (this.editMychannels) {
        this.channels.splice(index, 1)
        if (this.user) {
          await deletUserChannels(channel.id)
        } else {
          setItem('channels', this.channels)
        }
      } else {
        this.active = index
        this.isChannelEditShow = false
      }
    },
    /**
     * @param {object} channel =>添加的频道信息对象
     * 向我的频道添加新的频道
     */
    async addToMychannel (channel) {
      this.channels.push(channel)
      /**
       * 如果登录了则存到服务器上否则存到本地中
       */
      if (this.user) {
        let channels = []
        this.channels.slice(1).forEach((item, index) => {
          channels.push({
            id: item.id,
            seq: index + 2
          })
        })
        await resetUserChannels({ channels })
      } else {
        setItem('channels', this.channels)
      }
    },
    /**
     * 获得所有的频道信息
     */
    async getAllChannelsList () {
      let { data } = await getAllChannels()
      let channels = data.data.channels
      channels.forEach(channel => {
        channel.list = [] // 每个频道的数据列表
        channel.loading = false// 每个频道的上滑加载状态
        channel.finished = false// 每个频道的数据是否加载完成状态
        channel.pre_timestamp = null // 每个频道记录的上一次请求返回的时间戳
        channel.isLoading = true// 每个频道下拉加载状态
      })
      // console.log(channels)
      this.allChannels = channels
    },
    /**
     * 下拉刷新事件
     */
    async onRefresh () {
      // 记录所下拉的频道
      const channel = this.currentChannel
      /**
       * 获取频道对应文章数据
       */
      let { data } = await getAllArticles({
        channel_id: this.active,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      channel.list.unshift(...results)
      channel.isLoading = false
      /**
       * 判断当前频道是否还是之前的频道若是这会提示加载完成,否则不会提示
       */
      if (channel.id === this.currentChannel.id) {
        this.$toast('加载完成')
      }
    },
    /**
     * 获得用户或者默认频道列表
     */
    async getChannelsList () {
      let channels = []
      if (this.user) {
        // 用户登录了获取用户频道数据
        // console.log(123)
        let { data } = await getUserOrDefualtChannels()
        channels = data.data.channels
      } else {
        // 用户未登录先判断本地是否有频道数据保存，有的话则使用本地的，若没有则请求使用系统默认的
        let localChannels = getItem('channels')
        if (localChannels) {
          channels = localChannels
        } else {
          let { data } = await getUserOrDefualtChannels()
          channels = data.data.channels
        }
      }

      channels.forEach(channel => {
        channel.list = [] // 每个频道的数据列表
        channel.loading = false// 每个频道的上滑加载状态
        channel.finished = false// 每个频道的数据是否加载完成状态
        channel.pre_timestamp = null // 每个频道记录的上一次请求返回的时间戳
        channel.isLoading = true// 每个频道下拉加载状态
      })
      this.channels = channels
    },
    /**
     * list拉取数据
     */
    async onLoad () {
      /**
       * 获取每个频道的对象
       */
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
    this.getAllChannelsList()
    this.getChannelsList()
  }

}
</script>

<style lang="less" scoped>
.article-info {
  span {
    margin: 3px 5px;
  }
}
/deep/.van-tabs__wrap {
  position: fixed;
  top: 44px;
  z-index: 2;
  right: 0;
  left: 0;
}
/deep/.van-tabs__content {
  margin-top: 90px;
}
.wapbtn {
  position: sticky;
  right: 0;
  top: 0;
}
/deep/.van-popup__close-icon {
  left: 16px;
}
.remainchannel /deep/.van-grid-item__content {
  background-color: #ccc;
  border-radius: 15%;
}
/deep/.van-grid-item__text {
  color: #000;
}
.mychannel {
  /deep/.van-grid-item__content {
    background-color: #aaa;
    border-radius: 15%;
  }
  .closeIcon {
    position: absolute;
    top: -5px;
    right: 5px;
    color: #000;
  }
}
</style>
