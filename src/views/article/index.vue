<template>
  <div class="articleDetial">
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <van-loading class="article-loading" size="24px" v-if="loading"
      >加载中...</van-loading
    >
    <template v-else-if="articleDetialMsg.title">
      <div class="articleTitle">
        <h2>{{ articleDetialMsg.title }}</h2>
      </div>
      <div class="articleUserInfo">
        <van-image
          :src="articleDetialMsg.aut_photo"
          round
          type="cover"
          width="3rem"
          height="3rem"
        />
        <div class="nameTime">
          <span class="name">{{ articleDetialMsg.aut_name }}</span>
          <span class="time">{{
            articleDetialMsg.pubdate | relativeTime
          }}</span>
        </div>
        <van-button
          round
          type="info"
          size="small"
          class="followBtn"
          @click="changeState(articleDetialMsg.aut_id)"
        >
          &emsp;{{articleDetialMsg.is_followed ? '取消关注' : '十 关注'}}&emsp;
        </van-button>
      </div>
      <div class="articleContent" v-html="articleDetialMsg.content"></div>
      <div class="twobutton">
        <van-button
          class="btn"
          round
          size="small"
          type="default"
          icon="good-job-o"
          >点赞</van-button
        >
        <van-button
          class="btn"
          round
          size="small"
          type="primary"
          plain
          icon="cross"
          >不喜欢</van-button
        >
      </div>
    </template>

    <div class="error" v-else>
      <p>
        网络超时，点击
        <a href="#" @click.prevent="getThisArticleDetial()">刷新</a> 试一试。
      </p>
    </div>
  </div>
</template>

<script>
import { getArticleDetial, followUser, unFollowUser } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      loading: true, // 加载状态
      articleDetialMsg: {}// 文章详细信息
    }
  },
  methods: {
    async changeState (target) {
      if (this.articleDetialMsg.is_followed) {
        // 关注了，点击则取消关注
        await unFollowUser(target)
      } else {
        // 没有关注点击则关注
        await followUser({ target })
      }
      this.articleDetialMsg.is_followed = !this.articleDetialMsg.is_followed
    },
    /**
     * 获取文章详情信息
     */
    async getThisArticleDetial () {
      try {
        let { data } = await getArticleDetial(this.$route.params.articleId)
        // console.log(data)
        this.articleDetialMsg = data.data
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    }
  },
  created () {
    this.getThisArticleDetial()
  }
}
</script>

<style lang="less" scoped>
.articleDetial {
  .article-loading {
    padding-top: 100px;
    text-align: center;
    margin-top: 46px;
  }
  .error {
    padding-top: 100px;
    text-align: center;
  }
  .articleTitle {
    margin-top: 46px;
    text-align: center;
    h2 {
      font-weight: 600;
    }
  }
  .articleUserInfo {
    position: relative;
    padding: 0 20px;
    display: flex;
    .nameTime {
      padding: 2px 10px;
      span {
        display: block;
      }
      .time {
        font-size: 12px;
        color: #666;
      }
    }
    .followBtn {
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
    }
  }
  .articleContent {
    margin-top: 20px;
    padding: 0 20px;
    line-height: 25px;
    width: 100%;
  }
  .twobutton {
    text-align: center;
    .btn {
      margin: 20px;
      padding: 0px 25px;
    }
  }
}
</style>
