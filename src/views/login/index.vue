<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <ValidationObserver tag="form" ref="loginForm">
        <ValidationProvider name="手机号" rules="required|mobile" ref="mobile" v-slot="{errors}">
          <van-field
            :error-message="errors[0]"
            placeholder="请输入手机号"
            label="手机"
            left-icon="phone-o"
            v-model="user.mobile"
          />
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required" v-slot="{errors}">
          <van-field
            :error-message="errors[0]"
            type="password"
            placeholder="请输入验证码"
            label="验证码"
            left-icon="comment-o"
            v-model="user.code"
          >
            <van-button
              round
              :disabled="codeAbled"
              style="width:95px"
              size="small"
              slot="button"
              color="#aaa"
              :text="codeText"
              @click="sendCode"
            ></van-button>
          </van-field>
        </ValidationProvider>
      </ValidationObserver>
    </van-cell-group>
    <div class="loginBtn">
      <van-button
        type="info"
        click="loginUp"
        :disabled="isDisabled"
        :loading="isLoading"
        @click="loginSubmit"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { loginUp } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '15955555555',
        code: '24681'
      },
      isLoading: false,
      isDisabled: true,
      codeText: '发送验证码',
      codeAbled: false,
      time: 5
    }
  },
  methods: {
    /**
     * 判断本地存储是否存在tiem以及他是否大于0,防止刷新验证码计时器失效,以便刷新重启计时器
     *
     */
    existTime () {
      let time = window.localStorage.getItem('time')
      time > 0 && this.sendCode(time, false)
    },
    /**
     * 验证码计时器
     */
    setTimer () {
      this.codeText = `重新发送(${this.time})`
      this.codeAbled = true
      let timer = window.setInterval(() => {
        this.time--
        // console.log(this.time)
        this.codeText = `重新发送(${this.time})`
        // console.log(this.codeText)
        window.localStorage.setItem('time', this.time)
        if (this.time === 0) {
          window.clearInterval(timer)
          this.codeText = `发送验证码`
          this.codeAbled = false
          this.time = 5
        }
      }, 1000)
    },
    /**
     * 发送验证码
     */
    async sendCode (oldTime, flag = true) {
      if (flag) {
        let { valid } = await this.$refs.mobile.validate()
        if (!valid) {
          this.$toast.fail('请先输入正确格式的手机号')
        } else {
          this.setTimer()
        }
      } else {
        this.time = oldTime
        this.setTimer()
      }
    },
    /**
     * 登录请求
     */
    async loginSubmit () {
      try {
        this.isLoading = true
        let { data } = await loginUp(this.user)
        this.isLoading = false
        this.$toast.success('登陆成功')
        this.$store.commit('saveToken', data.data)
        this.$router.push('/tabbar')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
          // console.log(this.$toast)
          this.isLoading = false
        }
      }
    }
  },
  watch: {
    /**
     * 监听user的变化得到验证是否通过的结果控制按钮是否禁用
     */
    user: {
      async handler (newVal) {
        this.isDisabled = !await this.$refs.loginForm.validate()
        // console.log(this.isDisabled)
      },
      deep: true
    }
  },
  created () {
    this.existTime()
  }
}
</script>

<style lang="less" scoped>
.login {
  .loginBtn {
    padding: 20px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
