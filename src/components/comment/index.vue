<template>
  <div class="articleComments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.com_id.toString()">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate | relativeTime}}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getArticleComments } from '@/api/comment'

export default {
  name: 'CommentIndex',
  props: ['articleId'],
  data () {
    return {
      offset: null,
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      let { data } = await getArticleComments({
        type: 'a',
        source: this.articleId,
        offset: this.offset,
        limit: 50
      })
      let result = data.data.results
      console.log(data.data)
      this.list.push(...result)
      this.offset = data.data.last_id
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (this.offset === null) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
}

.van-list {
  margin-bottom: 45px;
}
</style>
