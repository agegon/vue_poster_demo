<template>
  <el-empty description="Ooops... Something went wrong."></el-empty>
</template>

<script>
import { ElEmpty } from 'element-plus';

export default {
  name: 'AppError',
  props: {
    error: String,
  },
  components: {
    ElEmpty,
  },
};
</script>
