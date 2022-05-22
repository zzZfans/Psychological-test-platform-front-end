import storage from 'store'
import { getInfo, login, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    id: '',
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    faceRecognitionSource: '',
    roles: [],
    permissions: [],
    info: {}
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_faceRecognitionSource: (state, faceRecognitionSource) => {
      state.faceRecognitionSource = faceRecognitionSource
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // console.log('login(userInfo):' + JSON.stringify(response))
          const result = response.result
          storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result
          // console.log('getInfo().then(response => {:' + JSON.stringify(response))
          if (result.roles.length > 0 && result.permissions.length > 0 || result.username === '游客') {
            commit('SET_ROLES', result.roles)
            commit('SET_PERMISSIONS', result.permissions)
            delete result.roles
            delete result.permissions
            commit('SET_INFO', result)
          } else {
            // console.log('不满足条件')
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_ID', result.id)
          commit('SET_NAME', { name: result.username, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)
          commit('SET_faceRecognitionSource', result.faceRecognitionSource)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          // resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
