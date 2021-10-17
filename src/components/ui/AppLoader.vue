<template>
  <div class="loading-spinner">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'AppLoader',
};
</script>

<style lang="scss" scoped>
.loading-spinner {
  --spinner-size: 42px;
  text-align: center;

  .circular {
    display: inline;
    height: var(--spinner-size);
    width: var(--spinner-size);
    animation: loading-rotate 2s linear infinite;
  }

  .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: var(--el-color-primary);
    stroke-linecap: round;
  }
}
</style>
