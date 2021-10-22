<template>
  <span class="star-count">
    <i class="icon">
      <icon-star></icon-star>
    </i>
    <span>
      <slot></slot>
    </span>
  </span>
</template>

<script>
import { IconStar } from '@/components/icons';

export default {
  name: 'AppStarCount',
  components: { IconStar },
};
</script>

<style lang="scss" scoped>
.star-count {
  color: var(--color-primary);
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 10px 16px;

  span {
    margin-left: 5px;
  }
}
</style>
