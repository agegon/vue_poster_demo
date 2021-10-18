<template>
  <el-card shadow="never">
    <h4 class="mb-2">Popular tags</h4>
    <p v-if="!tags.length">
      <small>No tags are here... yet.</small>
    </p>
    <ul v-else class="ma-0 pa-0 mr-n1 mb-n1">
      <li v-for="tag in tags" :key="tag" class="mr-1 mb-1">
        <el-tag type="info" size="small" @click="$emit('click-tag', tag)">{{ tag }}</el-tag>
      </li>
    </ul>
  </el-card>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElCard, ElTag } from 'element-plus';
import { getTags, TAGS_GETTERS } from '@/store/modules/tags';

export default {
  name: 'AppTags',
  setup() {
    const store = useStore();

    const fetchTags = () => {
      store.dispatch(getTags());
    };

    onMounted(() => {
      fetchTags();
    });

    const isLoading = computed(() => store.getters[TAGS_GETTERS.IS_LOADING]);
    const tags = computed(() => store.getters[TAGS_GETTERS.DATA]);

    return {
      tags,
      isLoading,
    };
  },
  emits: ['click-tag'],
  components: {
    ElCard,
    ElTag,
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;

  li {
    cursor: pointer;
    display: inline-block;
  }
}
</style>
