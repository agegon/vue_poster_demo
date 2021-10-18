<template>
  <app-container>
    <el-row class="mt-4">
      <el-col xs="24" :sm="{ span: 16, offset: 4 }" :md="{ span: 12, offset: 6 }">
        <div class="mb-2">
          <h1>{{ title }}</h1>
          <p v-if="$slots.link" class="mt-1">
            <slot name="link"></slot>
          </p>
        </div>
        <slot></slot>
      </el-col>
    </el-row>
  </app-container>
</template>

<script>
import { ElRow, ElCol } from 'element-plus';
import AppContainer from '@/components/ui/AppContainer';

export default {
  name: 'AppAuthLayout',
  props: {
    title: String,
  },
  components: {
    AppContainer,
    ElCol,
    ElRow,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

p {
  text-align: center;
}
</style>
