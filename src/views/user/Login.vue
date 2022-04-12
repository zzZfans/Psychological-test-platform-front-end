<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="loginType"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane :key="loginTypeEnum.USERNAMEANDPASSWORD" :tab="$t('user.login.tab-login-credentials')">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            :message="$t('user.login.message-invalid-credentials')" />
          <!-- 用户名 -->
          <a-form-item>
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.login.username.placeholder')"
              v-decorator="[
                'username',
                {rules: [{ required: true,
                           message: $t('user.userName.required') },
                         { validator: handleUsernameOrEmail }],
                 validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <!-- 密码 -->
          <a-form-item>
            <a-input-password
              size="large"
              :placeholder="$t('user.login.password.placeholder')"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: $t('user.password.required') }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane :key="loginTypeEnum.MOBILE" :tab="$t('user.login.tab-login-mobile')">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.login.mobile.placeholder')"
              v-decorator="['mobile',
                            {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: $t('user.mobile.required') }],
                             validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  :placeholder="$t('user.login.mobile.verification-code.placeholder')"
                  v-decorator="['mobileCaptcha',
                                {rules: [{ required: true, message: $t('user.verification-code.required') }],
                                 validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.captchaSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.captchaSendBtn && $t('user.register.get-verification-code') || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane :key="loginTypeEnum.EMAIL" :tab="$t('user.login.tab-login-email')">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.login.email.placeholder')"
              v-decorator="['email',
                            {rules: [{ required: true,
                                       pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                                       message: $t('user.email.required') }],
                             validateTrigger: 'change'}
              ]">
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  :placeholder="$t('user.login.email.verification-code.placeholder')"
                  v-decorator="['emailCaptcha',
                                {rules: [{ required: true, message: $t('user.verification-code.required') }],
                                 validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.captchaSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.captchaSendBtn && $t('user.register.get-verification-code') || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">{{ $t('user.login.remember-me') }}
        </a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >{{ $t('user.login.forgot-password') }}
        </router-link>
      </a-form-item>

      <!-- 登录 -->
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >{{ $t('user.login.login') }}
        </a-button>
      </a-form-item>

      <!-- 其他登录方式 -->
      <div class="user-login-other">
        <span>{{ $t('user.login.sign-in-with') }}</span>

        <a-tooltip trigger="click">
          <template slot="title">
            经费不足，尚未开发
          </template>
          <a>
            <a-icon class="item-icon" type="alipay-circle"></a-icon>
          </a>
        </a-tooltip>

        <a-tooltip trigger="click">
          <template slot="title">
            经费不足，尚未开发
          </template>
          <a>
            <a-icon class="item-icon" type="taobao-circle"></a-icon>
          </a>
        </a-tooltip>

        <a-tooltip trigger="click">
          <template slot="title">
            经费不足，尚未开发
          </template>
          <a>
            <a-icon class="item-icon" type="weibo-circle"></a-icon>
          </a>
        </a-tooltip>

        <router-link class="register" :to="{ name: 'register' }">{{ $t('user.login.signup') }}</router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getCaptcha } from '@/api/login'

export default {
  components: {

  },
  data () {
    return {
      loginTypeEnum: {
      USERNAMEANDPASSWORD: 0,
      MOBILE: 1,
        EMAIL: 2
      },
      loginType: null,
      // 是否按下登录
      loginBtn: false,
      isLoginError: false,

      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        captchaSendBtn: false
      }
    }
  },
  created () {
    this.loginType = this.loginTypeEnum.USERNAMEANDPASSWORD
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {

      } else {

      }
      callback()
    },
    handleTabClick (key) {
      this.loginType = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        loginType,
        Login
      } = this

      state.loginBtn = true

      let validateFieldsKeys

        switch (loginType) {
          case this.loginTypeEnum.USERNAMEANDPASSWORD:
            validateFieldsKeys = ['username', 'password']
            break
          case this.loginTypeEnum.MOBILE:
            validateFieldsKeys = ['mobile', 'mobileCaptcha']
            break
          case this.loginTypeEnum.EMAIL:
            validateFieldsKeys = ['email', 'emailCaptcha']
            break
          default:
            validateFieldsKeys = []
        }

      validateFields(validateFieldsKeys, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)

          const loginParams = {}

          switch (loginType) {
            case this.loginTypeEnum.USERNAMEANDPASSWORD:
              loginParams['loginType'] = 'usernameAndPassword'
              loginParams['identity'] = values.username
              loginParams['credentials'] = md5(values.password)
              break
            case this.loginTypeEnum.MOBILE:
              loginParams['loginType'] = 'mobile'
              loginParams['identity'] = values.mobile
              loginParams['credentials'] = values.mobileCaptcha
              break
            case this.loginTypeEnum.EMAIL:
              loginParams['loginType'] = 'email'
              loginParams['identity'] = values.email
              loginParams['credentials'] = values.emailCaptcha
              break
            default:
              loginParams['loginType'] = 'usernameAndPassword'
              loginParams['identity'] = values.username
              loginParams['credentials'] = md5(values.password)
          }

          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const { form: { validateFields }, state, $message, $notification } = this

      let validateFieldsKey

      switch (this.loginType) {
        case this.loginTypeEnum.MOBILE:
          validateFieldsKey = ['mobile']
          break
        case this.loginTypeEnum.EMAIL:
          validateFieldsKey = ['email']
      }

      validateFields(validateFieldsKey, { force: true },
        (err, values) => {
          console.log('values:' + JSON.stringify(values))
          if (!err) {
            state.captchaSendBtn = true

            const interval = window.setInterval(() => {
              if (state.time-- <= 0) {
                state.time = 60
                state.captchaSendBtn = false
                window.clearInterval(interval)
              }
            }, 1000)

            const hide = $message.loading('验证码发送中...', 0)

            let parameter
            let loginType

            switch (this.loginType) {
              case this.loginTypeEnum.MOBILE:
                parameter = { captchaType: 'mobile', value: values.mobile }
                loginType = '短信信息！'
                break
              case this.loginTypeEnum.EMAIL:
                parameter = { captchaType: 'email', value: values.email }
                loginType = '邮箱信息！'
            }

            parameter.scene = 'login'

            getCaptcha(parameter).then(res => {
              console.log('res:' + JSON.stringify(res))
              setTimeout(hide)
              $notification['success']({
                message: '提示',
                description: '验证码发送成功，请留意您的' + loginType,
                duration: 8
              })
            }).catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.captchaSendBtn = false
              this.requestFailed(err)
            })
          }
        }
      )
    },
    loginSuccess (res) {
      console.log(res)
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang='less' scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
