<template>
  <span class="star-count">
    <i class="el-icon-star-off"></i>
    <span>
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  name: 'AppStarCount',
};
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.star-count {
  color: $color-primary;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 10px 16px;

  span {
    margin-left: 5px;
  }
}
</style>
