<template>
  <div class="main user-layout-register">
    <a-form ref="formRegister" :form="form" id="formRegister">
      <!-- 注册 -->
      <h3><span>{{ $t('user.register.register') }}</span></h3>
      <!-- 用户名 -->
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.register.username.placeholder')"
          v-decorator="[
            'username',
            {rules: [{ required: true,
                       message: $t('user.userName.required') },
                     { validator: handleUsername }],
             validateTrigger: 'change'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <!-- 密码 -->
      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="(trigger) => trigger.parentElement"
        v-model="state.passwordLevelChecked">
        <template slot="content">
          <div :style="{ width: '240px' }" >
            <div :class="['user-register', passwordLevelClass]">{{ $t(passwordLevelName) }}</div>
            <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
            <div style="margin-top: 10px;">
              <span>{{ $t('user.register.password.popover-message') }}
              </span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input-password
            size="large"
            :placeholder="$t('user.register.password.placeholder')"
            v-decorator="['password',
                          {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordLevel }],
                           validateTrigger: 'change'}]"
          ></a-input-password>
        </a-form-item>
      </a-popover>
      <!-- 再次密码 -->
      <a-form-item>
        <a-input-password
          size="large"
          :placeholder="$t('user.register.confirm-password.placeholder')"
          v-decorator="['confirmPassword',
                        {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordCheck }],
                         validateTrigger: 'change'}]"
        ></a-input-password>
      </a-form-item>
      <!-- 手机验证 or 邮箱验证 -->
      <a-tabs
        :activeKey="registrationType"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick">
        <a-tab-pane :key="registrationTypeEnum.MOBILE" :tab="$t('user.mobile.validate')">
          <!-- 手机号 -->
          <a-form-item>
            <a-input
              size="large"
              :placeholder="$t('user.login.mobile.placeholder')"
              v-decorator="['mobile',
                            {rules: [{ required: true, message: $t('user.phone-number.required')},
                                     { validator: this.handlePhoneCheck } ],
                             validateTrigger: 'change' }]">
              <a-select slot="addonBefore" size="large" defaultValue="+86">
                <a-select-option value="+86">+86</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
          <!-- 验证码 -->
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  :placeholder="$t('user.login.mobile.verification-code.placeholder')"
                  v-decorator="['mobileCaptcha',
                                {rules: [{ required: true, message: '请输入验证码' }],
                                 validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                size="large"
                :disabled="state.captchaSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.captchaSendBtn && $t('user.register.get-verification-code')||(state.time+' s')"></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane :key="registrationTypeEnum.EMAIL" :tab="$t('user.email.validate')">
          <!-- 邮箱 -->
          <a-form-item>
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.register.email.placeholder')"
              v-decorator="['email',
                            {rules: [{ required: true, type: 'email', message: $t('user.email.required') }],
                             validateTrigger: 'change'}]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <!-- 验证码 -->
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  :placeholder="$t('user.login.email.verification-code.placeholder')"
                  v-decorator="['emailCaptcha', {rules: [{ required: true, message: $t('user.verification-code.required') }],
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
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtnLoading"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtnLoading">{{ $t('user.register.register') }}
        </a-button>
        <router-link class="login" :to="{ name: 'login' }">{{ $t('user.register.sign-in') }}</router-link>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { getCaptcha, register } from '@/api/login'
import { deviceMixin } from '@/store/device-mixin'
import { scorePassword } from '@/utils/util'

const levelNames = {
  0: 'user.password.strength.short',
  1: 'user.password.strength.low',
  2: 'user.password.strength.medium',
  3: 'user.password.strength.strong'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  name: 'Register',
  components: {
  },
  mixins: [deviceMixin],
  data () {
    return {
      registrationTypeEnum: {
        MOBILE: 0,
        EMAIL: 1
      },
      registrationType: null,
      form: this.$form.createForm(this),

      state: {
        time: 60,
        level: 0,
        captchaSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtnLoading: false
    }
  },
  created () {
    this.registrationType = this.registrationTypeEnum.MOBILE
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {
    handleTabClick (key) {
      this.registrationType = key
      // this.form.resetFields()
    },
    handleUsername (rule, value, callback) {
      // 用户名正则，1 到 32 位（中文，字母，数字，下划线，减号）
      const usernameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{1,32}$/
      const phoneNumberRegex = /^1[3456789]\d{9}$/
      if (usernameRegex.test(value) && !phoneNumberRegex.test(value)) {
        callback()
      } else {
        callback(new Error('用户名 1 到 32 位（中文，字母，数字，下划线，减号），且不能将手机号作为用户名！'))
      }
    },
    handlePasswordLevel (rule, value, callback) {
      if (value === undefined) {
       return callback()
      }
      this.handlePasswordInputClick()
      console.log('scorePassword:', scorePassword(value))
      if (value.length >= 6) {
        if (scorePassword(value) >= 30) {
          this.state.level = 1
        }
        if (scorePassword(value) >= 60) {
        this.state.level = 2
        }
        if (scorePassword(value) >= 80) {
        this.state.level = 3
        }
      } else {
        this.state.level = 0
        callback(new Error(this.$t('user.password.strength.msg')))
      }
      this.state.passwordLevel = this.state.level
      this.state.percent = this.state.level * 33

      callback()
    },

    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(this.$t('user.password.twice.msg')))
      }
      callback()
    },

    handlePhoneCheck (rule, value, callback) {
      console.log('handlePhoneCheck, rule:', rule)
      console.log('handlePhoneCheck, value', value)
      console.log('handlePhoneCheck, callback', callback)
      if (value === undefined) {
         return callback()
      }
      const phoneNumberRegex = /^1[3456789]\d{9}$/
      if (!phoneNumberRegex.test(value)) {
        callback(new Error(this.$t('user.phone-number.wrong-format')))
      }
      callback()
    },

    handlePasswordInputClick () {
      if (!this.isMobile) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handleSubmit () {
      const { form: { validateFields }, state, $router, registrationType } = this

      const validateFieldsKeys = ['username', 'password', 'confirmPassword']

      switch (registrationType) {
        case this.registrationTypeEnum.MOBILE:
          validateFieldsKeys.push('mobile')
          validateFieldsKeys.push('mobileCaptcha')
          break
        case this.registrationTypeEnum.EMAIL:
          validateFieldsKeys.push('email')
          validateFieldsKeys.push('emailCaptcha')
      }

      validateFields(validateFieldsKeys, { force: true }, (err, values) => {
        console.log('values:' + JSON.stringify(values))
        if (!err) {
          this.registerBtnLoading = true
          state.passwordLevelChecked = false

          let parameter

          switch (this.registrationType) {
            case this.registrationTypeEnum.MOBILE:
              parameter = { registrationType: 'mobile',
                username: values.username,
                password: md5(values.password),
                mobile: values.mobile,
                captcha: values.mobileCaptcha
              }
              break
            case this.registrationTypeEnum.EMAIL:
              parameter = { registrationType: 'email',
                username: values.username,
                password: md5(values.password),
                email: values.email,
                captcha: values.emailCaptcha
              }
          }
          console.log('parameter:' + JSON.stringify(parameter))
          register(parameter).then(res => {
            $router.push({ name: 'registerResult', params: { ...values } })
          }).catch(err => {
            this.registerBtnLoading = false
            this.requestFailed(err)
          })
        }
      })
    },

    getCaptcha (e) {
      e.preventDefault()
      const { form: { validateFields }, state, $message, $notification } = this

      let validateFieldsKey

      switch (this.registrationType) {
        case this.registrationTypeEnum.MOBILE:
          validateFieldsKey = ['mobile']
          break
        case this.registrationTypeEnum.EMAIL:
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
            let registrationType

            switch (this.registrationType) {
              case this.registrationTypeEnum.MOBILE:
                parameter = { captchaType: 'mobile', value: values.mobile }
                registrationType = '短信信息！'
                break
              case this.registrationTypeEnum.EMAIL:
                parameter = { captchaType: 'email', value: values.email }
                registrationType = '邮箱信息！'
            }

            getCaptcha(parameter).then(res => {
              console.log('res:' + JSON.stringify(res))
              setTimeout(hide)
              $notification['success']({
                message: '提示',
                description: '验证码发送成功，请留意您的' + registrationType,
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
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.registerBtnLoading = false
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }

  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .register-button {
      width: 50%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>
