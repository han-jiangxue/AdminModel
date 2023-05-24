<script setup lang="ts">
import { regionData } from 'element-china-area-data'

const res = ref(0)
onMounted(() => {
  res.value = 888
})
</script>

<template>
  <div mt-14 bg-gray class="hover:bg-#34fda3aa">
    so,why are you so stupid, hhhhhhhhh {{ res }} <div class="i-material-symbols:blind color-red" />
  </div>
  <div color-lightBlue>
    hhhhh<el-button>Default</el-button>
  </div>
  <el-cascader
    placeholder="请选择地区"
    size="default"
    :options="regionData"
  />
</template>
