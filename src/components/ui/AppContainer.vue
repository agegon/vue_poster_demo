<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppContainer',
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 15px;

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 940px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
}
</style>
