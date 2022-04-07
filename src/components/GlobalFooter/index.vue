<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <!--<a href="https://github.com/zzZfans/DXSXLCSPT-front-end" target="_blank">Github</a>-->
      <a href="https://gitee.com/zzzfans/DXSXLCSPT-front-end" target="_blank">Gitee</a>
    </template>
    <template v-slot:copyright>
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
