<template>
  <div class="articleDetial">
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <div class="articleTitle">
      <h2>爱丽丝肯德基</h2>
    </div>
    <div class="articleUserInfo">
      <van-image
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        round
        type="cover"
        width="3rem"
        height="3rem"
      />
      <div class="nameTime">
        <span class="name">拉三等奖</span>
        <span class="time">2019.5.8</span>
      </div>
      <van-button round type="info" size="small" class="followBtn">
        &emsp;十&nbsp;关注&emsp;
      </van-button>
    </div>
    <div class="articleContent">
      阿克苏的将来及的垃圾垃圾垃圾啊连接登录打了大垃圾死垃圾打蜡看手机的了撒娇拉屎啦
    </div>
    <div class="twobutton">
      <van-button class="btn" round size="small" type="default" icon="good-job-o">点赞</van-button>
      <van-button class="btn" round size="small" type="primary" plain icon="cross">不喜欢</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex'
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
  .twobutton{
    text-align: center;
    .btn{
      margin: 20px;
      padding: 0px 25px;
    }
  }
}
</style>
