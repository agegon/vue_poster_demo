<template>
  <el-alert
    v-for="(error, idx) in displayErrors"
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
  computed: {
    displayErrors() {
      return Object.keys(this.errors)
        .map((key) => this.errors[key].map((error) => `${key} ${error}`))
        .flat();
    },
  },
  name: 'AppValidationErrors',
  components: {
    ElAlert,
  },
};
</script>
