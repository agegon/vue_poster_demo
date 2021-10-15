<template>
  <header v-if="$slots.header" class="header">
    <div class="container">
      <slot name="header"></slot>
    </div>
  </header>

  <main>
    <div class="container">
      <slot></slot>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AppLayout',
};
</script>

<style lang="scss" scoped>
.header {
  background: white;
  box-shadow: 0px 2px 8px 0px rgba(34, 60, 80, 0.2);
}

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
