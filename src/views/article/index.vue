<template>
  <div class="articleDetial">
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
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
        <span class="time">{{ articleDetialMsg.pubdate | relativeTime }}</span>
      </div>
      <van-button round type="info" size="small" class="followBtn">
        &emsp;十&nbsp;关注&emsp;
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
  </div>
</template>

<script>
import { getArticleDetial } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      articleDetialMsg: {}
    }
  },
  methods: {
    /**
     * 获取文章详情信息
     */
    async getThisArticleDetial () {
      let { data } = await getArticleDetial(this.$route.params.articleId)
      console.log(data)
      this.articleDetialMsg = data.data
    }
  },
  created () {
    this.getThisArticleDetial()
  }
}
</script>

<style lang="less" scoped>
.articleDetial {
  .articleTitle {
    text-align: center;
    margin-top: 46px;
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
