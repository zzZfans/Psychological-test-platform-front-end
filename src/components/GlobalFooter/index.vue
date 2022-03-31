<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <!--<a href="https://www.github.com/vueComponent/pro-layout" target="_blank">Pro Layout</a>-->
      <a href="https://github.com/zzZfans/DXSXLCSPT-front-end" target="_blank">Github</a>
      <!--<a href="https://www.github.com/sendya/" target="_blank">@Sendya</a>-->
    </template>
    <template v-slot:copyright>
      <!--<a href="https://github.com/vueComponent" target="_blank">vueComponent</a>-->
      <div class="copyright">
        Copyright &copy; 2022 大学生心理测试平台研发小组
      </div>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
