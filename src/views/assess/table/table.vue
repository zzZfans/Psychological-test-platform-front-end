<template>
  <page-header-wrapper>
    <a-card class="ant-pro-pages-list-projects-cardList">
      <!--      进度条-->
      <div style=" width: 90%;white-space: nowrap ">
        <a-progress
          :strokeWidth="17"
          stroke-linecap="square"
          :show-info="false"
          :percent="10"/>
        <span>&nbsp;&nbsp; 2/20</span>
      </div>

      <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-list-projects-card" hoverable>
            <img slot="cover" :src="item.cover" :alt="item.title" />
            <a-card-meta :title="item.title">
              <template slot="description">
                <ellipsis :length="50">{{ item.description }}</ellipsis>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>

export default {
  name: 'Table'
}
</script>

<style scoped>

</style>
