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
@import '@/styles/colors.scss';

.banner {
  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  color: $color-white;
}

.banner-primary {
  background-color: desaturate($color-primary, 50%);
}

.banner-success {
  background-color: desaturate($color-success, 50%);
}

.banner-warning {
  background-color: desaturate($color-warning, 50%);
}

.banner-info {
  background-color: desaturate($color-info, 50%);
}
</style>
