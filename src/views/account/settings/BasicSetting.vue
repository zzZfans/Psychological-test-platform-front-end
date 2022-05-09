<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">

        <a-form layout="vertical">
          <a-form-item
            :label="$t('用户名称')"
          >
            <a-input :placeholder="$t(userNickname)" v-model="userNickname"></a-input>
          </a-form-item>
          <a-form-item
            :label="$t('邮箱信息')"
            :required="false"
          >
            <a-input
              size="large"
              type="text"
              :placeholder="$t(userEmail)"
              v-model="userEmail"
              v-decorator="['email',
                            {rules: [{ required: true, type: 'email', message: $t('user.email.required') }],
                             validateTrigger: 'change'}]"
              @blur="email_blur"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="updateBaseInfo">{{ $t('account.settings.basic.update') }}</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar"/>

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
// import { baseMixin } from '@/store/app-mixin'
import { updateBaseInfo, getUser } from '@/api/user'

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      // 获取个人信息
      userId: 0,
      user: '',
      userNickname: '',
      userEmail: '',
      message: '',
      // cropper
      preview: {},
      option: {
        img: this.getImg(),
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  methods: {
    getImg () {
      getUser().then(res => {
        if (res.success) {
          return res.result.avatar
        }
      })
    },
    updateBaseInfo () {
      const data = {
        updateUserName: this.userNickname,
        updateUserAddress: this.userEmail
      }
      updateBaseInfo(data).then(res => {
        if (res.success) {
          alert('修改成功')
        } else {
          alert(this.$error)
        }
      })
    },
    setavatar (url) {
      this.option.img = url
    },
    getUser () {
      getUser().then(res => {
        if (res.success) {
          this.userNickname = res.result.username
          // alert(this.userNickname)
          this.userEmail = res.result.emailAddress
          this.userId = res.result.id
          this.option.img = res.result.avatar
        }
        // alert(this.userEmail)
      })
    },
    email_blur () {
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      if (!verify.test(this.userEmail)) {
        this.message = '邮箱格式错误, 请重新输入'
      } else {
        this.message = '可以请求接口了'
      }
    }
  },
  mounted () {
    this.getUser()
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
