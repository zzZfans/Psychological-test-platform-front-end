import './index.less'

import { Dropdown, Icon, Menu } from 'ant-design-vue'
import i18nMixin from '@/store/i18n-mixin'

const locales = ['zh-CN']
const languageLabels = {
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
  'en-US': 'English',
  'pt-BR': 'Português'
}
// eslint-disable-next-line
const languageIcons = {
  'zh-CN': '🇨🇳',
  'zh-TW': '🇭🇰',
  'en-US': '🇺🇸',
  'pt-BR': '🇧🇷'
}

const SelectLang = {
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-drop-down'
    }
  },
  name: 'SelectLang',
  mixins: [i18nMixin],
  render () {
    const { prefixCls } = this
    const changeLang = ({ key }) => {
      this.setLang(key)
    }
    const langMenu = (
      <Menu class={['menu', 'ant-pro-header-menu']} selectedKeys={[this.currentLang]} onClick={changeLang}>
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale]}
            </span>{' '}
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    )
    return (
      <Dropdown overlay={langMenu} placement="bottomLeft">
        <span class={prefixCls}>
          <Icon type="global" />
        </span>
      </Dropdown>
    )
  }
}

export default SelectLang
