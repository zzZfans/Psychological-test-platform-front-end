<template>
  <a-list
    itemLayout="horizontal"
  >
    <a-list-item>
      <span>
        <div style="width: 800px">
          <span class="security-list-description">账户密码管理</span>
          <div style="float: right;right: 80px;">
            <a-button @click="showModal2" type="primary" shape="round" >修改</a-button>
            <a-modal v-model="visible2" title="密码修改" @ok="updatePasswordInfo">
              <span>原密码:</span>
              <a-form-item>
                <a-input-password
                  size="large"
                  :placeholder="$t('user.register.password.placeholder')"
                  v-decorator="['Password',
                                {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordLevel }],
                                 validateTrigger: 'change'}]"
                  v-model="Password"
                ></a-input-password>
                <a-button @click="showModal3" style="float: right;" type="dashed" shape="round" >{{ $t('user.login.forgot-password') }}</a-button>
                <!--                忘记密码-->
                <a-modal v-model="visible3" title="忘记密码" @ok="updateForgetPasswordInfo">
                  <!--               隔开-->
                  <!-- 手机号 -->
                  <a-form-item>
                    <a-input
                      size="large"
                      :placeholder="$t('user.login.mobile.placeholder')"
                      disabled="true"
                      v-model="Phone"
                      v-decorator="['Phone',
                                    {rules: [{ required: true, message: $t('user.phone-number.required')},
                                             { validator: this.handlePhoneCheck } ],
                                     validateTrigger: 'change' }]">
                      <a-select slot="addonBefore" size="large" defaultValue="+86">
                        <a-select-option value="+86">+86</a-select-option>
                      </a-select>
                    </a-input>
                  </a-form-item>
                  <a-input-password
                    size="large"
                    :placeholder="$t('user.register.password.placeholder')"
                    v-decorator="['forgetPassword',
                                  {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordLevel }],
                                   validateTrigger: 'change'}]"
                    v-model="forgetPassword"
                  ></a-input-password>
                  <!-- 验证码 -->
                  <br>
                  <br>
                  <a-row :gutter="16">
                    <a-col class="gutter-row" :span="16">
                      <a-form-item>
                        <a-input
                          size="large"
                          type="text"
                          v-model="mobileCaptcha"
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
                        @click.stop.prevent="getCaptcha('update_password', 0)"
                        v-text="!state.captchaSendBtn && $t('user.register.get-verification-code')||(state.time+' s')"></a-button>
                    </a-col>
                  </a-row>
                </a-modal>
                <!--                忘记密码-->
              </a-form-item>
              <span>新密码:</span>
              <a-form-item>
                <a-input-password
                  size="large"
                  :placeholder="$t('user.register.password.placeholder')"
                  v-decorator="['newPassword',
                                {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordLevel }],
                                 validateTrigger: 'change'}]"
                  v-model="newPassword"
                ></a-input-password>
              </a-form-item>
            </a-modal>
          </div>
        </div>
      </span>
    </a-list-item>
    <a-list-item>
      <span>
        <div style="width: 800px">
          <span class="security-list-description">密保手机</span>
          <br>
          <span style="color:#ccc"> 已绑定手机: </span>
          <span style="color:#ccc" class="security-list-value">{{ geTel(this.Phone) }}</span>
          <div style="float: right;right: 80px;">
            <a-button @click="showModal1" type="primary" shape="round" >修改</a-button>
            <a-modal v-model="visible" title="原手机号码" @ok="handleOk">
              <!--               隔开-->
              <!-- 手机号 -->
              <a-form-item>
                <a-input
                  size="large"
                  :placeholder="$t('user.old.mobile.placeholders')"
                  v-model="Phone"
                  disabled="true"
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
                      v-model="oldPhoneCaptcha"
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
                    @click.stop.prevent="getCaptcha('confirm_mobile_phone_number', 0)"
                    v-text="!state.captchaSendBtn && $t('user.register.get-verification-code')||(state.time+' s')"></a-button>
                </a-col>
              </a-row>
            </a-modal>
            <a-modal v-model="newVisible" title="新手机号码" @ok="newHandleOk">
              <!--               隔开-->
              <!-- 手机号 -->
              <a-form-item>
                <a-input
                  size="large"
                  v-model="newPhone"
                  :placeholder="$t('user.login.mobile.placeholders')"
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
                      v-model="newPhoneCaptcha"
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
                    @click="getCaptcha('update_mobile_phone_number', 1)"
                    v-text="!state.captchaSendBtn && $t('user.register.get-verification-code')||(state.time+' s')"></a-button>
                </a-col>
              </a-row>
            </a-modal>
          </div>
        </div>
      </span>
    </a-list-item>
  </a-list>
</template>

<script>
import { updatePasswordInfo, updateForgetPasswordInfo, getUser, updatePhoneByCaptcha } from '@/api/user'
import { confirmCaptcha } from '@/api/captcha'
import md5 from 'md5'
import { getCaptcha, register } from '@/api/login'
// import { deviceMixin } from '@/store/device-mixin'
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
  data () {
    return {
      registrationTypeEnum: {
        MOBILE: 0,
        EMAIL: 1
      },
      registrationType: null,
      form: this.$form.createForm(this),
      visible: false,
      visible2: false,
      visible3: false,
      newVisible: false,
      PasswordStrength: '', // 密码强度
      Password: '', // 原密码
      newPassword: '', // 新密码
      forgetPassword: '', // 忘记密码
      mobileCaptcha: '', // 验证码
      PasswordValue: 0,
      Phone: 0,
      newPhone: '',
      newPhoneCaptcha: '',
      oldPhoneCaptcha: '',
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      state: {
        time: 60,
        level: 0,
        captchaSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      }
    }
  },
  created () {
    this.registrationType = this.registrationTypeEnum.MOBILE
  },
  methods: {
    newHandleOk () {
      const data = {
        phoneNumber: this.newPhone,
        captcha: this.newPhoneCaptcha
      }
      updatePhoneByCaptcha(data).then(res => {
        if (res.success) {
          this.$message.success('手机修改成功！')
          this.newVisible = false
          this.Phone = this.newPhone
          this.newPhone = ''
        } else {
          this.$message.error('验证码错误！')
        }
      })
    },
    handleOk () {
      const data = {
        mobile: this.Phone,
        code: this.oldPhoneCaptcha
      }
      confirmCaptcha(data).then(res => {
        if (res.success) {
          this.visible = false
          this.newVisible = true
        } else {
          this.$message.error('验证码错误！')
        }
      })
    },
    shows () {
      alert(7)
    },
    getUser () {
      getUser().then(res => {
        // console.log(res)
        // alert(JSON.stringify(res))
        this.userNickname = res.result.username
        this.userEmail = res.result.emailAddress
        // this.Password = res.result.
        // this.Password = res.result.
        this.Phone = res.result.phoneNumber
        // alert(this.Phone)
        // alert(this.userEmail)
      }).catch(err => {
        alert(err)
      })
    },
    showModal1 () {
      this.visible = true
    },
    showModal2 () {
      this.visible2 = true
    },
    showModal3 () {
      this.visible2 = false
      this.visible3 = true
    },
    // 修改密码
    updatePasswordInfo () { // 待理解
      // alert(this.Password + this.newPassword)
      // alert('新密码对应的md5值' + md5(this.Password) + md5(this.newPassword))
      const data = { // 待数据即可
        password: md5(this.Password),
        newPassword: md5(this.newPassword)
      }
      updatePasswordInfo(data).then(res => {
        if (res.success) {
          alert('修改成功')
          this.visible2 = false
        } else {
          alert(this.$error)
          this.visible2 = false
        }
      })
      // this.visible = false
    },
    // 忘记密码设置
    updateForgetPasswordInfo () {
      alert(this.Phone + this.mobileCaptcha + this.forgetPassword)
      const data = {
        newPassword: md5(this.forgetPassword),
        mobileCaptcha: this.mobileCaptcha,
        mobile: this.Phone
      }
      alert(JSON.stringify(data))
      updateForgetPasswordInfo(data).then(res => {
        if (res.success) {
          alert('重新密码设置成功')
          this.visible3 = false
        } else {
          alert(this.$error)
          this.visible3 = false
        }
      })
    },
    // 手机号码测试
    geTel (Phone) {
      return Phone.substring(0, 3) + '****' + Phone.substr(Phone.length - 4)
       },
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

    getCaptcha (type, lb) {
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

            switch (lb) {
              case 0: // 旧手机号
                parameter = { captchaType: 'mobile', value: this.Phone }
                registrationType = '短信信息！'
                break
              case 1: // 新手机号
                parameter = { captchaType: 'mobile', value: this.newPhone }
                registrationType = '短信信息！'
            }

            parameter.scene = type

            alert(JSON.stringify(parameter))
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
  },
  mounted () {
    this.getUser()
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
