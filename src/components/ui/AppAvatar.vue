<template>
  <el-avatar
    class="avatar"
    icon="el-icon-user-solid"
    :style="{ fontSize: 0.6 * size + 'px' }"
    :shape="shape"
    :size="size"
    :src="src"
  ></el-avatar>
</template>

<script>
import { ElAvatar } from 'element-plus';

export default {
  name: 'AppAvatar',
  props: {
    shape: {
      default: 'circle',
      type: String,
    },
    size: {
      default: 32,
      type: Number,
    },
    src: String,
  },
  components: {
    ElAvatar,
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  display: block;

  &::v-deep > img {
    height: 100%;
    width: 100%;
  }
}
</style>
