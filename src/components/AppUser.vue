<template>
  <el-row>
    <app-avatar class="mr-1" :src="image" :size="32"></app-avatar>
    <div>
      <p>
        <router-link class="link link--info" :to="{ name: 'userProfile', params: { username } }">
          {{ username }}
        </router-link>
      </p>
      <p v-if="displayDate" class="date">{{ displayDate }}</p>
    </div>
  </el-row>
</template>

<script>
import { computed } from 'vue';
import { ElRow } from 'element-plus';
import AppAvatar from '@/components/ui/AppAvatar';

export default {
  name: 'AppUser',
  setup(props) {
    const displayDate = computed(() => (props.date ? new Date(props.date).toLocaleString() : null));

    return {
      displayDate,
    };
  },
  props: {
    date: String,
    image: String,
    username: String,
  },
  components: {
    AppAvatar,
    ElRow,
  },
};
</script>

<style lang="scss" scoped>
.link {
  font-weight: bold;
  color: inherit;

  &:hover,
  &:focus,
  &:active {
    color: inherit;
    opacity: 0.8;
  }
}

.date {
  font-size: 0.8rem;
  opacity: 0.6;
}

.avatar {
  &::v-deep > img {
    height: 100%;
    width: 100%;
  }
}
</style>
