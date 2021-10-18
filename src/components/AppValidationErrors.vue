<template>
  <el-alert
    v-for="(error, idx) in errors"
    :key="idx"
    :title="error"
    class="mb-1"
    type="error"
  ></el-alert>
</template>

<script>
import { ElAlert } from 'element-plus';

export default {
  props: {
    errors: Object,
  },
  name: 'AppValidationErrors',
  components: {
    ElAlert,
  },
};
</script>
