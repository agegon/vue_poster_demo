<template>
  <div class="banner py-2 mb-2" :class="`banner-${type}`">
    <app-container>
      <slot></slot>
    </app-container>
  </div>
</template>

<script>
import AppContainer from './ui/AppContainer';

export default {
  name: 'AppBanner',
  props: {
    type: {
      type: String,
      default: 'info',
    },
  },
  components: {
    AppContainer,
  },
};
</script>

<style lang="scss" scoped>
.banner {
  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  color: white;
}

.banner-primary {
  background-color: var(--el-color-primary);
}

.banner-success {
  background-color: var(--el-color-success);
}

.banner-warning {
  background-color: var(--el-color-warning);
}

.banner-info {
  background-color: var(--el-color-info);
}
</style>
