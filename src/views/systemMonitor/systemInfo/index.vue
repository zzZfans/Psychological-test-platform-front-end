<template>
  <page-header-wrapper>
    <!--<div v-if="$auth('sys:sysinfo:view')">-->
    <div>
      <!-- 系统信息  Java信息-->
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-card :loading="loading" title="系统信息" style="margin-bottom: 20px" :bordered="false">
            <table class="sysInfo_table">
              <tr>
                <td class="sysInfo_td">系统名称：</td>
                <td class="sysInfo_td">{{ osInfo.osName }}</td>
              </tr>
              <tr>
                <td class="sysInfo_td">系统架构：</td>
                <td class="sysInfo_td">{{ osInfo.osArch }}</td>
              </tr>
              <tr>
                <td class="sysInfo_td">系统版本：</td>
                <td class="sysInfo_td">{{ osInfo.osVersion }}</td>
              </tr>
              <tr>
                <td class="sysInfo_td">主机名称：</td>
                <td class="sysInfo_td">{{ osInfo.osHostName }}</td>
              </tr>
              <tr>
                <td>主机IP地址：</td>
                <td>{{ osInfo.osHostAddress }}</td>
              </tr>
            </table>
          </a-card>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-card :loading="loading" title="Java信息" style="margin-bottom: 20px">
            <table class="sysInfo_table">
              <tr>
                <td class="sysInfo_td">虚拟机名称：</td>
                <td class="sysInfo_td">{{ javaInfo.jvmName }}</td>
              </tr>
              <tr>
                <td class="sysInfo_td">虚拟机版本：</td>
                <td class="sysInfo_td">{{ javaInfo.jvmVersion }}</td>
              </tr>
              <tr>
                <td class="sysInfo_td">虚拟机供应商：</td>
                <td class="sysInfo_td">{{ javaInfo.jvmVendor }}</td>
              </tr>
              <tr>
                <td class="sysInfo_td">java名称：</td>
                <td class="sysInfo_td">{{ javaInfo.javaName }}</td>
              </tr>
              <tr>
                <td>java版本：</td>
                <td>{{ javaInfo.javaVersion }}</td>
              </tr>
            </table>
          </a-card>
        </a-col>
      </a-row>
      <a-card :loading="loading" title="JVM内存信息">
        <table class="sysInfo_table">
          <tr>
            <td class="sysInfo_td">最大内存：</td>
            <td class="sysInfo_td">{{ jvmMemInfo.jvmMaxMemory }}</td>
            <td class="sysInfo_td">可用内存：</td>
            <td class="sysInfo_td">{{ jvmMemInfo.jvmUsableMemory }}</td>
          </tr>
          <tr>
            <td class="sysInfo_td">总内存：</td>
            <td class="sysInfo_td">{{ jvmMemInfo.jvmTotalMemory }}</td>
            <td class="sysInfo_td">已使用内存：</td>
            <td class="sysInfo_td">{{ jvmMemInfo.jvmUsedMemory }}</td>
          </tr>
          <tr class="sysInfo_tr">
            <td>空余内存：</td>
            <td>{{ jvmMemInfo.jvmFreeMemory }}</td>
            <td>使用率：</td>
            <td>{{ jvmMemInfo.jvmMemoryUsedRate }}</td>
          </tr>
        </table>
      </a-card>
    </div>
  </page-header-wrapper>
</template>
<script>
import { systemInfo } from '@/api/systemInfo'

export default {
  data () {
    return {
      loading: true,
      osInfo: [],
      javaInfo: [],
      jvmMemInfo: []
    }
  },
  // 进页面加载
  created () {
    systemInfo().then((res) => {
      console.log(JSON.stringify(res))
      this.loading = false
      this.javaInfo = res.result.javaRuntimeInfo
      this.osInfo = res.result.osInfo
      this.jvmMemInfo = res.result.jvmInfo
    })
  },
  methods: {

  }
}
</script>
<style lang="less">
.sysInfo_table {
  width: 100%;
  min-height: 45px;
  line-height: 45px;
  text-align: center;
}
.sysInfo_td {
  border-bottom: 1px solid #e8e8e8;
}
</style>
